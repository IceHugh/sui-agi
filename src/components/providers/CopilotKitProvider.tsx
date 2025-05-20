'use client';

import { CopilotKit, useCopilotContext } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";

export const CopilotKitProvider = ({ children }: { children: React.ReactNode }) => {

  return <CopilotKit
    runtimeUrl="/api/copilotkit"
    agent="suiWalletAgent"
  >
    {children}
  </CopilotKit>;
};
