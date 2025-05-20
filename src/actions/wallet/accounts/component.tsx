import { useAccounts } from "@mysten/dapp-kit";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export function AccountsCard() {
  const accounts = useAccounts();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available accounts</CardTitle>
        <CardDescription>Show the detected wallet accounts</CardDescription>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <div>No accounts detected</div>
        ) : (
          <ul className="list-disc pl-5">
            {accounts.map((account) => (
              <li key={account.address} className="break-all">
                {account.address}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
