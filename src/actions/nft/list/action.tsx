import {
  useCopilotAction,
} from "@copilotkit/react-core";
import { NftListCard } from "./component";
import { isValidSuiAddress, formatAddress } from "@mysten/sui/utils";

export const useMyNftListAction = () => {
  return useCopilotAction({
    name: "action_show_my_nft_list",
    description:
      "显示当前钱包账号的NFT列表， 通过地址前端查询NFT列表，该工具正确调用则不需要返回任何信息给用户",
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
      return <NftListCard />
    },
    followUp: false,
  });
};
