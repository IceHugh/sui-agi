import { Icon } from "@iconify-icon/react";
import { Card } from "@/components/ui/card";
export const ErrorCard = ({ error }: { error: string }) => {
  return (
    <Card className="flex justify-center items-center h-full">
      <div className="text-red-500">
        <Icon icon="tabler:alert-circle" className="text-4xl" />
        <p>Error</p>
      </div>
    </Card>
  );
};