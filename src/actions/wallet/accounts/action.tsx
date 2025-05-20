import { useCopilotAction } from "@copilotkit/react-core";
import { AccountsCard } from "./component";

export const useAccountsAction = () => {
  return useCopilotAction({
    name: "action_show_accounts",
    description: "显示所有可用的钱包账户列表",
    parameters: [],
    render: () => <AccountsCard />,
    followUp: false,
  });
};
