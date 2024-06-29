// hooks/useTransferDialog.ts
import { useCallback, useState } from "react";
import { usePhysicsFlowerWallet } from "@/context/PhysicsFlowerWalletContext";

export function useTransferDialog() {
  const { keylessAccount } = usePhysicsFlowerWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTransferClick = useCallback(() => {
    if (!keylessAccount) {
      alert("Please connect your wallet first.");
      return;
    }
    setIsDialogOpen(true);
  }, [keylessAccount]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return {
    handleTransferClick,
    closeDialog,
    isDialogOpen,
  };
}
