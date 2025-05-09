import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export function useToast() {
  const toast = ({
    title,
    description,
    action,
    variant = "default",
  }: ToastProps) => {
    return sonnerToast(title, {
      description,
      action,
      className: variant === "destructive" ? "destructive" : undefined,
    });
  };

  return {
    toast,
  };
}
