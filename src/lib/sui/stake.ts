import { Transaction } from "@mysten/sui/transactions";
import { SUI_SYSTEM_STATE_OBJECT_ID } from "@mysten/sui/utils";

export interface BuildSuiStakeTxParams {
  sender: string;
  suiCoin: any;
  amount: number; // 单位：SUI
  validator: string;
}

export async function buildSuiStakeTx({
  suiCoin,
  sender,
  amount,
  validator,
}: BuildSuiStakeTxParams) {
  console.log('suiCoin', suiCoin);
  console.log('amount', amount);
  console.log('sender', sender);
  console.log('validator', validator);
  console.log('SUI_SYSTEM_STATE_OBJECT_ID', SUI_SYSTEM_STATE_OBJECT_ID);

  const amountInMinUnit = BigInt(Math.floor(amount * Math.pow(10, suiCoin.meta.decimals)));
  const txb = new Transaction();
  txb.setSender(sender);
  txb.setGasOwner(sender);
  console.log('poolId', txb.pure.address(validator));

  const [stakeCoin] = txb.splitCoins(txb.gas, [txb.pure.u64(amountInMinUnit)]);

  // 质押move call
  txb.moveCall({
    target: "0x3::sui_system::request_add_stake",
    arguments: [
      txb.object(SUI_SYSTEM_STATE_OBJECT_ID),
      stakeCoin,
      txb.pure.address(validator),
    ],
  });

  return txb;
}

export function createUnstakeTransaction({ stakedSuiId }: { stakedSuiId: string }) {
  const tx = new Transaction();
  tx.moveCall({
    target: '0x3::sui_system::request_withdraw_stake',
    arguments: [tx.object(SUI_SYSTEM_STATE_OBJECT_ID), tx.object(stakedSuiId)],
  });
  return tx;
}
