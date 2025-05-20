import {
  useCopilotAction,
} from "@copilotkit/react-core";
import { BalanceCard } from "./component";
import { isValidSuiAddress, formatAddress } from "@mysten/sui/utils";

export const useBalanceAction = () => {
  return useCopilotAction({
    name: "action_show_balance",
    description:
      "显示当前钱包账号的余额， 通过地址前端查询余额，该工具正确调用则不需要返回任何信息给用户",
    parameters: [
      {
        name: "address",
        type: "string",
        description: "The address of the wallet",
      },
    ],
    handler: ({ address }) => {
      return isValidSuiAddress(address) ? 'success' : 'error'
    },
    render: ({ args }) => {
      return <BalanceCard />
    },
    followUp: false,
  });
};
