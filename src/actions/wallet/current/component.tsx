
import { useCurrentWallet } from "@mysten/dapp-kit";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export function CurrentWalletCard() {
  const { currentWallet, connectionStatus } = useCurrentWallet();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current wallet</CardTitle>
        <CardDescription>
          {connectionStatus === "connected" && currentWallet
            ? "Connected"
            : `Connection status: ${connectionStatus}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {connectionStatus === "connected" && currentWallet ? (
          <>
              <div>Name: {currentWallet.name}</div>
            <div>
              Accounts:
              <ul className="list-disc pl-5">
                {currentWallet.accounts.map((account) => (
                  <li key={account.address} className="break-all">
                    {account.address}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
