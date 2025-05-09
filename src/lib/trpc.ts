import type { AppRouter as WorkerAppRouter } from '@server/src/router';
import { createTRPCContext } from '@trpc/tanstack-react-query';

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<WorkerAppRouter>();
export type AppRouter = WorkerAppRouter;
