import { ToolAction, ToolStatus } from "@/types/tool";
export const clientToolsMap: Record<string, any> = {
  [ToolAction.GET_ADDRESS]: {
    id: ToolAction.GET_ADDRESS,
    description: `The wallet address to check the token balances for (e.g., '0x02a070b3f469b08368b492f61534ad01c71aa74c7d262b0d473caba5585e1d8e'). If omitted, the tool will return the addressof the connected account.`,
    inputSchema: {
      type: 'object',
      properties: {
        address: { type: 'string' },
      },
      required: ['address'],
    },
    execute: (props: { address: string }) => {
      return {
        action: ToolAction.GET_ADDRESS,
        data: {
          address: props.address,
        },
        status: ToolStatus.SUCCESS,
      }
    },
  },
};