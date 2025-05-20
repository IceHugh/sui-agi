import { Transaction } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";

export interface BuildSuiBatchTransferTxParams {
  client: SuiClient;
  sender: string;
  coinType: string;
  toAddresses: string[];
  amount: number;
}

export async function buildSuiBatchTransferTx({
  client,
  sender,
  coinType,
  toAddresses,
  amount,
}: BuildSuiBatchTransferTxParams) {
  // 查询所有余额
  const balances = await client.getAllBalances({ owner: sender });
  const asset = balances.find((b: any) => b.coinType === coinType);
  if (!asset) throw new Error("未持有该币种资产");

  // 查询币种元数据
  const metadata = await client.getCoinMetadata({ coinType });
  const decimals = metadata?.decimals || 0;

  // 查询所有 coin 对象
  const allCoins = await client.getCoins({ owner: sender, coinType });
  if (!allCoins.data.length) throw new Error("未找到可用 coin 对象");

  // 检查余额
  const totalBalance = allCoins.data.reduce(
    (sum, coin) => sum + Number(coin.balance),
    0
  );
  const amountInMinUnit = amount * Math.pow(10, decimals);
  const totalAmount = amountInMinUnit * toAddresses.length;
  if (totalBalance < totalAmount) throw new Error("余额不足");

  // 组装 tx
  const txb = new Transaction();
  txb.setSender(sender);
  txb.setGasOwner(sender);

  const [mainCoin, ...restCoins] = allCoins.data;

  const isSui = coinType === "0x2::sui::SUI";
  const coinObjId = isSui ? txb.gas : mainCoin.coinObjectId;

  // 批量 split
  const splitCoins = txb.splitCoins(
    coinObjId,
    toAddresses.map(() => amountInMinUnit)
  );

  // 只有非 SUI token 才合并剩余 coin
  if (!isSui && restCoins.length > 0) {
    txb.mergeCoins(
      txb.object(mainCoin.coinObjectId),
      restCoins.map((coin) => txb.object(coin.coinObjectId))
    );
  }

  // 批量 transfer
  toAddresses.forEach((to, idx) => {
    txb.transferObjects([splitCoins[idx]], to);
  });

  return txb;
}
