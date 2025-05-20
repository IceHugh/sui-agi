import { useCopilotAction } from "@copilotkit/react-core";
import { UnStackSuiTxCard } from "./component";

export const useUnstackSuiAction = () => {
  return useCopilotAction({
    name: "action_unstake_sui",
    description: "unstack SUI",
    parameters: [
      {
        name: "stakedSuiId",
        type: "string",
        description: "质押的 stackedSuiId, 如果没有则调用 action_show_my_stacks 获取所有质押的SUI，该工具不调用",
        required: true,
      },
    ],
    renderAndWaitForResponse: function ({ args, respond, status }) {
      if (status === "executing" || status === "inProgress") {
        return (
          <UnStackSuiTxCard
            stakedSuiId={args.stakedSuiId ?? ''}
            status={status}
            onConfirm={(data) => {
              respond?.(data || "stack sui success");
            }}
            onCancel={(error) => {
              respond?.(error || "cancel stack sui");
            }}
          />
        );
      } else {
        return <div>操作已完成</div>;
      }
    },
    followUp: false,
  });
};
