
import { generateSuiVisionUrl } from "@/lib/suivision";

export const gernerateTxPrompt = (digest: string) => {
  return `交易hash是：${digest}，访问地址是：${generateSuiVisionUrl({ network: 'testnet', path: `txblock/${digest}` })} `
}