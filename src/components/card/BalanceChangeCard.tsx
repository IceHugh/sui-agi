import React from "react";
import { Icon } from "@iconify-icon/react";
import { formatBalance } from "@/utils";

interface BalanceChangeCardProps {
  coinType: string;
  before: number | string; // 转账前余额（最小单位）
  change: number | string; // 变化金额（负数，最小单位）
  meta?: any; // 新增，币种元信息
}

/**
 * 余额变化卡片
 * 展示币种、转账前余额、变化金额、转账后余额
 */
export const BalanceChangeCard: React.FC<BalanceChangeCardProps> = ({ coinType, before, change, meta }) => {
  const decimals = meta?.decimals || 0;
  const symbol = meta?.symbol || '';
  const name = meta?.name || '';
  const iconUrl = meta?.iconUrl;

  // 计算转账后余额
  const beforeNum = Number(before) / Math.pow(10, decimals);
  const changeNum = Number(change);
  const afterNum = beforeNum + changeNum;
  console.log(beforeNum, changeNum);
  return (
    <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-900/60 rounded-lg px-3 py-2 shadow-sm">
      {iconUrl ? (
        <img src={iconUrl || "/sui-logo.svg"} alt={symbol} className="w-8 h-8" />
      ) : (
        <Icon icon="tabler:coin" className="text-4xl text-blue-400" />
      )}
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{name || symbol}</div>
        <div className="flex flex-col gap-0.5 text-xs font-mono">
          <div>
            <span className="text-gray-500">Before transfer:</span>
            <span>{formatBalance(beforeNum, decimals)}</span>
            <span className="ml-1 text-gray-400">{symbol}</span>
          </div>
          <div>
            <span className="text-gray-500">Change:</span>
            <span className={changeNum < 0 ? 'text-red-500' : 'text-green-500'}>
              {changeNum > 0 ? '+' : ''}{formatBalance(changeNum, decimals)}
            </span>
            <span className="ml-1 text-gray-400">{symbol}</span>
          </div>
          <div>
            <span className="text-gray-500">After transfer:</span>
            <span className="text-green-600 font-bold">{formatBalance(afterNum, decimals)}</span>
            <span className="ml-1 text-gray-400">{symbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
