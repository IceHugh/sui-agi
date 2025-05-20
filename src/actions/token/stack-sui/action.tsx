import { useCopilotAction } from "@copilotkit/react-core";
import { StackSuiTxCard } from "./component";

export const useStackSuiAction = () => {
  return useCopilotAction({
    name: "action_stack_sui",
    description: "质押SUI到指定pool, 如果没有指定pool，则调用 action_show_system_stacks 获取所有质押池供用户选择",
    parameters: [
      {
        name: "amount",
        type: "number",
        description: "质押金额",
        required: true,
      },
      {
        name: "validator",
        type: "string",
        description: "验证者地址",
        required: true,
      },
    ],
    renderAndWaitForResponse: function ({ args, respond, status }) {
      return (
        <StackSuiTxCard
          amount={args.amount ?? 0}
          validatorAddress={args.validator ?? ''}
          status={status}
          onConfirm={(data) => {
            respond?.(data || "stack sui success");
          }}
          onCancel={(error) => {
            respond?.(error || "cancel stack sui");
          }}
        />
      );
    },
    followUp: false,
  });
};
