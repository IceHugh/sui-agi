import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const MODEL_NAME = 'deepseek-v3-250324';
export const volcengineProvider = createOpenAICompatible({
	baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
	name: MODEL_NAME,
	apiKey: process.env.VOLCENGINE_API_KEY,
});

export const volcengineModel = volcengineProvider.chatModel(MODEL_NAME);
