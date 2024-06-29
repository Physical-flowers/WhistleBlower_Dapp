// components/TransferTokenButton.tsx
import React from 'react';
import { useTransferDialog } from '../hooks/useTransferDialog';
import { TransferDialog } from './TransferDialog';

export function TransferTokenButton() {
  const { handleTransferClick, closeDialog, isDialogOpen } = useTransferDialog();

  return (
    <>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleTransferClick}
      >
        Transfer Token
      </button>
      <TransferDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </>
  );
}
