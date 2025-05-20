// 格式化余额，避免科学计数法，保留千分位和最多6位小数
export function formatBalance(balance: string | number, decimals: number) {
  const num = Number(balance);
  if (isNaN(num)) return balance;
  return num?.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: Math.min(10, decimals),
  });
}
