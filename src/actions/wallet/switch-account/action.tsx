import { useCopilotAction } from "@copilotkit/react-core";
import { SwitchAccountConfirmDialog } from "./component";

export const useSwitchAccountAction = () => {
  return useCopilotAction({
    name: "action_switch_account",
    description: "显示当前wallet 的账户列表，由用户选择要切换的账户",
    renderAndWaitForResponse: ({ args, respond }) => (
      <SwitchAccountConfirmDialog
        onConfirm={() => {
          respond?.("switched");
        }}
        onCancel={() => {
          respond?.("cancel");
        }}
      />
    ),
    followUp: false,
  });
};
