import { useCopilotAction } from "@copilotkit/react-core";
import { DisconnectWalletConfirmDialog } from "./component";

export const useDisconnectWalletAction = () => {
  return useCopilotAction({
    name: "action_disconnect_wallet",
    description: "断开当前钱包连接",
    parameters: [],
    renderAndWaitForResponse: ({ respond }) => (
      <DisconnectWalletConfirmDialog
        onConfirm={() => {
          respond?.("disconnected");
        }}
        onCancel={() => {
          respond?.("cancel");
        }}
      />
    ),
    followUp: false,
  });
};
