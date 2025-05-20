import { SuiNetwork } from "@/types";

export const SUI_VISION_URL_MAP: Record<SuiNetwork, string> = {
  mainnet: 'https://suivision.xyz',
  testnet: 'https://testnet.suivision.xyz',
  devnet: 'https://devnet.suivision.xyz',
}

export function generateSuiVisionUrl({
  network,
  path,
}: {
  path: string;
  network: SuiNetwork;
}) {
  return `${SUI_VISION_URL_MAP[network]}/${path}`;
}

