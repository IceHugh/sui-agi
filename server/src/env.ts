import type { Env } from './type';
let globalEnv: Env;

export function getEnv(): Env {
  if (!globalEnv) {
    throw new Error('Env not initialized');
  }
  return globalEnv;
}

export function setEnv(env: Env) {
  globalEnv = env;
}
