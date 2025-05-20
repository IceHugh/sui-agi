import {
	CopilotRuntime,
	ExperimentalEmptyAdapter,
	copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime';
import { MastraClient } from '@mastra/client-js';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
	// Rate limit: 10 requests per 10 seconds per IP
	const ip =
		req.headers.get('x-forwarded-for') ||
		req.headers.get('x-real-ip') ||
		'127.0.0.1';
	const address = req.headers.get('address') || '';
	const identifier = `${ip}:${address}`;
	const ratelimit = new Ratelimit({
		redis: Redis.fromEnv(),
		limiter: Ratelimit.slidingWindow(10, '10 s'),
		prefix: '@upstash/ratelimit/copilotkit',
		analytics: true,
	});
	const { success, limit, remaining } = await ratelimit.limit(identifier);
	if (!success) {
		return new NextResponse(
			JSON.stringify({ error: 'Too many requests. Please try again later.' }),
			{
				status: 429,
				headers: {
					'Content-Type': 'application/json',
					'X-RateLimit-Limit': limit.toString(),
					'X-RateLimit-Remaining': remaining.toString(),
				},
			},
		);
	}

	const clonedReq = req.clone();
	const body = await clonedReq.json();

	const resourceId = body.resourceId || 'TEST';
	const baseUrl = process.env.MASTRA_BASE_URL || 'https://sui.btcname.link';

	const mastra = new MastraClient({
		baseUrl,
		headers: {
			address: req.headers.get('address') || '',
			network: req.headers.get('network') || '',
			signature: req.headers.get('signature') || '',
		},
	});

	const mastraAgents = await mastra.getAGUI({
		resourceId,
	});

	const runtime = new CopilotRuntime({
		agents: mastraAgents,
	});

	const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
		runtime,
		serviceAdapter: new ExperimentalEmptyAdapter(),
		endpoint: '/api/copilotkit',
	});
	return handleRequest(req);
};
