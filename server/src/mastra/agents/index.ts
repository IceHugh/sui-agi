import { Agent } from '@mastra/core/agent';
import { LibSQLStore } from '@mastra/libsql';
import { Memory } from '@mastra/memory';
import { volcengineModel } from '../lib/model';
import { mcp } from '../mcp';

export const suiWalletAgent = new Agent({
	name: 'Sui Wallet Agent',
	instructions: async ({ runtimeContext }) => {
		const address = runtimeContext.get('address');
		return `你是一个sui钱包助手。只回答和sui钱包相关的问题以及相关的action和tool工具,action一次只执行一个。
    除了用户的当前地址，其他地址不允许被提及。
    请优先调用工具（如有），并直接返回工具的完整结构化结果。
    理解用户的需求
    如果工具没有结果，你需要自己生成回复。
    回复内容要精准，不要出现任何无关内容，同时有可能用户的输入不满足具体工具的输入要求，要回复具体错误信息。
    具体金额校验交给前端判断，你只需要判断是否输入了金额。
    比如用户要转账，但是没有输入转账金额，要回复：“转账金额不能为空”。
    没有输入转账地址，要回复：“转账地址不能为空”。
    当前用户地址：${address}`;
	},

	model: volcengineModel,
	// tools: await mcp.getTools(),

	memory: new Memory({
		storage: new LibSQLStore({
			url: 'file:../mastra.db', // path is relative to the .mastra/output directory
		}),
		options: {
			lastMessages: 10,
			semanticRecall: false,
			threads: {
				generateTitle: false,
			},
		},
	}),
});
