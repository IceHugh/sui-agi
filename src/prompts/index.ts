
import { generateSuiVisionUrl } from "@/lib/suivision";
import { SuiNetwork } from "@/types";

export const gernerateTxPrompt = (digest: string, network: SuiNetwork) => {
  return `交易hash是：${digest}，访问地址是：${generateSuiVisionUrl({ network, path: `txblock/${digest}` })} `
}