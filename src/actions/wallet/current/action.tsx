import { useCopilotAction } from "@copilotkit/react-core";
import { CurrentWalletCard } from "./component";

export const useCurrentWalletAction = () => {
  return useCopilotAction({
    name: "action_show_current_wallet",
    description: "显示当前连接的钱包信息",
    parameters: [],
    render: () => <CurrentWalletCard />,
    followUp: false,
  });
};
