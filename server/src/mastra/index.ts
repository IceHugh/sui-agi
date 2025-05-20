import { MastraClient } from '@mastra/client-js';
import { createLogger } from '@mastra/core/logger';
import { Mastra } from '@mastra/core/mastra';
import { CloudflareDeployer } from '@mastra/deployer-cloudflare';
import { NetlifyDeployer } from '@mastra/deployer-netlify';
import { LibSQLStore } from '@mastra/libsql';
import { verifyPersonalMessageSignature } from '@mysten/sui/verify';
import { suiWalletAgent } from './agents';

type SuiRuntimeContext = {
	address: string;
};

export const mastra = new Mastra({
	agents: { suiWalletAgent },
	storage: new LibSQLStore({
		url: ':memory:',
	}),
	logger: createLogger({
		name: 'Mastra',
		level: 'info',
	}),
	deployer: new NetlifyDeployer({
		scope: 'wallet-demo',
		projectName: 'sui-agi-server',
		token: 'nfp_JDCtVcNWeC9bKfhcDR3DcRCneQKBxUVHe460',
	}) as any,

	// deployer: new CloudflareDeployer({
	//   scope: "8545c1d1e40852251172ef7ea5fe4b88",
	//   projectName: "sui-agi-mastra",
	//   routes: [
	//     {
	//       pattern: "sui-agi-mastra.ygz0425.workers.dev/*",
	//       zone_name: "sui-agi-mastra.ygz0425.workers.dev",
	//       custom_domain: false,
	//     },
	//   ],
	//   workerNamespace: "sui-agi",
	//   auth: {
	//     apiToken: "73gJVOCTDwJVpnJOOkLQqsD0XI1ZOzAqd2sEN2Nr",
	//     apiEmail: "ygz0425@gmail.com",
	//   },
	// }) as any,

	server: {
		cors: {
			origin: ['*'],
			allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			allowHeaders: [
				'x-development',
				'Content-Type',
				'Authorization',
				'address',
				'signature',
				'message',
			],
			credentials: false,
		},
		middleware: [
			async (c, next) => {
				console.log('c', c.req.path);
				const address = c.req.header('address');
				console.log('address', address);
				const signature = c.req.header('signature');
				console.log('signature', signature);
				// if (!address || !signature) {
				//   return c.text("Missing auth headers", 401);
				// }
				if (address) {
					const runtimeContext = c.get('runtimeContext');
					runtimeContext.set('address', address);
				}
				// try {
				//   const message = new TextEncoder().encode('sui-agi');
				//   const isValid = await verifyPersonalMessageSignature(
				//     message,
				//     signature
				//   );
				//   console.log("isValid", isValid);

				//   if (!isValid) {
				//     return c.text("Invalid signature", 401);
				//   }
				// } catch (e) {
				//   return c.text("Invalid signature", 401);
				// }
				await next();
			},
		],
	},
});
