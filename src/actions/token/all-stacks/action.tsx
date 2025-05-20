import {
  useCopilotAction,
} from "@copilotkit/react-core";
import { StacksListCard } from "./component";
import { useSuiClient, useSuiClientQuery } from '@mysten/dapp-kit';
export const useShowAllStacksAction = () => {
  const client = useSuiClient();
  return useCopilotAction({
    name: "action_show_all_stacks",
    description:
      "显示所有可质押的验证者列表，只有用户没有质押或者直接询问所有质押列表时，才调用该工具，",
    parameters: [
    ],
    render: ({ args }) => {
      return <StacksListCard />
    },
    followUp: false,
  });
};
