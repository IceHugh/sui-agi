import React from "react";
import { Icon } from "@iconify-icon/react";
import { formatBalance } from "@/utils";
import { formatAddress } from "@mysten/sui/utils";

interface ReceiverCardProps {
  address: string;
  amount: number | string; // 收到的金额（最小单位）
  coinType: string;
  meta?: any; // 新增，币种元信息
}

/**
 * 接收者卡片
 * 展示接收者地址、收到的金额、币种信息
 */
export const ReceiverCard: React.FC<ReceiverCardProps> = ({ address, amount, coinType, meta }) => {
  const decimals = meta?.decimals || 0;
  const symbol = meta?.symbol || '';
  const iconUrl = meta?.iconUrl;
  const amountNum = Number(amount);
  console.log(amountNum);

  return (
    <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-900/60 rounded-lg px-3 py-2 shadow-sm">
      <img src={iconUrl || "/sui-logo.svg"} alt={symbol} className="w-8 h-8" />

      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-0.5">Receiver</div>
        <div className="text-sm font-mono text-gray-900 dark:text-white mb-1">{formatAddress(address)}</div>
        <div className="text-xs font-mono">
          <span className="text-green-600 font-bold">+{formatBalance(amountNum, decimals)}</span>
          <span className="ml-1 text-gray-400">{symbol}</span>
        </div>
      </div>
    </div>
  );
};
