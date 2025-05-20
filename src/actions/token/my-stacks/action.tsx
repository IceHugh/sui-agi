import {
  useCopilotAction,
  } from "@copilotkit/react-core";
import { MyStacksListCard } from "./component";
import { isValidSuiAddress, formatAddress } from "@mysten/sui/utils";
export const useShowMyStacksAction = () => {
  return useCopilotAction({
    name: "action_show_my_stacks",
    description:
      "显示当前钱包账号的质押信息， 通过地址前端查询质押信息，该工具正确调用则不需要返回任何信息给用户",
    parameters: [
      {
        name: "address",
        type: "string",
        description: "The address of the wallet",
      },
    ],
    handler: async ({ address }) => {
      console.log(address);

      return isValidSuiAddress(address) ? 'success' : 'error'
    },
    render: ({ args }) => {
      return <MyStacksListCard />
    },
    followUp: false,
  });
};
