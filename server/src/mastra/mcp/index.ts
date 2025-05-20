import { MCPClient } from '@mastra/mcp';

export const mcp = new MCPClient({
	servers: {
		'sui-mcp-agent': {
			command: 'bunx',
			args: ['mcp-remote', 'https://sui-assist-mcp.ygz0425.workers.dev/mcp'],
		},
		// filesystem: {
		//   command: "bunx",
		//   args: [
		//     "-y",
		//     "@modelcontextprotocol/server-filesystem",
		//     "/Users/icehugh/Downloads",
		//   ],
		// },
		// "sui-mcp": {
		//   "command": "bunx",
		//   "args": [
		//     "-y",
		//     "sui-serverless-mcp",
		//     "--sui_private_key=suiprivkey1qry099nd9nqqa7l7gs6hpz6p6vwhjcp36fhq8x7vfh7cr05cvr4nv3jrcqu",
		//     "--sui_network=testnet"
		//   ],
		// }
	},
});
