import { useCopilotAction } from "@copilotkit/react-core";
import { TransferTokenCard } from "./component";

interface TransferTokenArgs {
  amount: number;
  toAddresses: string[];
  coinType: string;
}

export const useTransferTokenAction = () => {
  return useCopilotAction({
    name: "action_transfer_token",
    description: "需要调用mcp 获取相关信息，然后转移用户的token到指定地址,地址可以是一个或者多个，每个地址都是相同的金额和token类型",
    parameters: [
      {
        name: "amount",
        type: "number",
        description: "转账金额",
        required: true,
      },
      {
        name: "toAddresses",
        type: "string[]",
        description: "收款地址数组",
        required: true,
      },
      {
        name: "coinType",
        type: "string",
        description: "币种类型",
        required: true,
      }
    ],
    renderAndWaitForResponse: ({ args, respond, status }) => {
      return <TransferTokenCard
        onConfirm={(data) => {
          respond?.(data);
        }}
        onCancel={(error) => {
          respond?.(error || "cancel");
        }}
        amount={args.amount ?? 0}
        toAddresses={args.toAddresses ?? []}
        coinType={args.coinType ?? ""}
        status={status}
      />
    },
    followUp: false,
  });
};
