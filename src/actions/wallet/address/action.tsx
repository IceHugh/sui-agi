import {
  useCopilotAction,
} from "@copilotkit/react-core";
import { AddressCard } from "./component";
export const useShowAddressAction = () => {
  return useCopilotAction({
    name: "action_show_wallet_address",
    description:
      "当用户需要显示当前钱包账号的地址时，比如用户需要查看自己的钱包地址，或者需要将钱包地址分享给他人时，需要接收他人转账时，也会显示地址的二维码，调用该工具",

    render: ({ args }) => {
      return <AddressCard />
    },
    followUp: false,
  });
};
