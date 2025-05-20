import React from "react";
import { Icon } from "@iconify-icon/react";
import { formatBalance } from "@/utils";

interface CoinCardProps {
  coinType: string;
  balance: string | number;
  meta?: any;
}

export const CoinCard: React.FC<CoinCardProps> = ({ coinType, balance, meta }) => {
  if (!meta) return (
    <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-900/60 rounded-lg px-3 py-2 shadow-sm animate-pulse min-h-[56px]">
      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1" />
        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
      </div>
    </div>
  );

  const decimals = meta?.decimals || 0;
  const symbol = meta?.symbol || '';
  const name = meta?.name || '';
  const iconUrl = meta?.iconUrl;
  const displayBalance = formatBalance(
    Number(balance) / Math.pow(10, decimals),
    decimals
  );

  return (
    <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-900/60 rounded-lg px-3 py-2 shadow-sm">
      {iconUrl ? (
        <img src={iconUrl || "/sui-logo.svg"} alt={symbol} className="w-8 h-8" />
      ) : (
        <Icon icon="tabler:coin" className="text-4xl text-blue-400" />
      )}
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{name || symbol}</div>
        <div className="text-xs text-gray-500 dark:text-gray-300 font-mono">
          {displayBalance} <span className="ml-1 text-gray-400">{symbol}</span>
        </div>
      </div>
    </div>
  );
};
