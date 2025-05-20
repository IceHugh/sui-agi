import { useSwitchAccountAction, useDisconnectWalletAction, useCurrentWalletAction, useAccountsAction, useShowAddressAction } from "./wallet";
import { useShowMyStacksAction, useShowAllStacksAction, useStackSuiAction, useTransferTokenAction, useBalanceAction, useUnstackSuiAction } from "./token";
import { useMyNftListAction } from "./nft";

const copilotActionsConfig = {
  showWalletAddress: { enabled: true, action: useShowAddressAction },
  switchAccount: { enabled: true, action: useSwitchAccountAction },
  disconnectWallet: { enabled: true, action: useDisconnectWalletAction },
  currentWallet: { enabled: true, action: useCurrentWalletAction },
  accounts: { enabled: true, action: useAccountsAction },
  showMyStacks: { enabled: true, action: useShowMyStacksAction },
  showAllStacks: { enabled: true, action: useShowAllStacksAction },
  stackSui: { enabled: true, action: useStackSuiAction },
  unstackSui: { enabled: true, action: useUnstackSuiAction },
  transferToken: { enabled: true, action: useTransferTokenAction },
  balance: { enabled: true, action: useBalanceAction },
  myNftList: { enabled: true, action: useMyNftListAction },
};

export const useCopilotActions = () => {
  Object.values(copilotActionsConfig).forEach(({ enabled, action }) => {
    if (enabled) action();
  });
};