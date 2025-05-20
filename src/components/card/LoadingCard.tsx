import { Card } from "@/components/ui/card";
import { Icon } from "@iconify-icon/react";
export const LoadingCard = () => {
  return (
    <Card className="flex justify-center items-center h-24">
        <Icon icon="tabler:loader" className="text-4xl animate-spin" />
    </Card>
  );
};