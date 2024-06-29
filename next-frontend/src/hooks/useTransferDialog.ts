// hooks/useTransferDialog.ts
import { useCallback, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export function useTransferDialog() {
  const { connected } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTransferClick = useCallback(() => {
    if (!connected) {
      alert('Please connect your wallet first.');
      return;
    }
    setIsDialogOpen(true);
  }, [connected]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return {
    handleTransferClick,
    closeDialog,
    isDialogOpen,
  };
}
