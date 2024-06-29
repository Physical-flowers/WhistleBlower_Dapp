// components/TransferDialog.tsx
import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useWallet } from '@aptos-labs/wallet-adapter-react'; 
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";


interface TransferDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransferDialog({ isOpen, onClose }: TransferDialogProps) {
  const { account, connected, signAndSubmitTransaction, changeNetwork } = useWallet();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
  }, []);

  const handleTransfer = async () => {
    // try {
    //   await changeNetwork(Network.DEVNET);
    // } catch (err) {
    //   console.error('Failed to change network', err);
    //   alert('Failed to change network');
    //   return;
    // }

    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }

    // 檢查 address 是否有值並且是有效的錢包地址
    if (!address || !/^0x[0-9a-fA-F]{64}$/.test(address)) {
      alert('Please enter a valid wallet address.');
      return;
    }

    // 檢查 amount 是否有值並且是有效的數字
    const transferAmount = parseFloat(amount);
    if (!amount || isNaN(transferAmount) || transferAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const config = new AptosConfig({ network: Network.DEVNET });
    const aptos = new Aptos(config);

    try {
      // 簽署並提交交易
      const response = await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: '0x4422cae46aea5e7654b84f3e81a4013a4767113c3addc8be7cf8e55ef1eb2321::usdk::transfer',
          typeArguments: [],
          functionArguments: [address, transferAmount.toString()], // 假設 amount 是以小數表示，乘以 1e8 轉換為最小單位
        }
      });
      // 等待交易完成
      // let result = await aptos.waitForTransaction(response.hash);
      alert(`Transaction submitted: ${response.hash}`);
      alert(`Transferring ${amount} tokens to ${address} from ${account.address}`);
    } catch (error) {
      console.error('Transaction failed', error);
      alert('Transaction failed');
    }

    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg focus:outline-none">
          <Dialog.Title className="text-lg font-bold">Transfer Token</Dialog.Title>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Transfer Wallet Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter wallet address"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Transfer Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter amount"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleTransfer}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Transfer
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
