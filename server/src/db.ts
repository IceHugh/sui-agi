import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { getEnv } from './env';

export const createPrismaClient = () => {
  const env = getEnv();
  return new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate());
};
