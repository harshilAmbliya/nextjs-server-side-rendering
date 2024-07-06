"use client";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};
export default function ToastContainerWrapper({ children }: Props) {
  return (
    <div>
      {children}
      <Toaster richColors theme="system"  />
    </div>
  );
}
