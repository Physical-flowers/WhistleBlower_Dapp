import React, { useCallback, useState } from 'react';
import { 
  AnyAptosWallet, 
  WalletItem, 
  isInstallRequired, 
  partitionWallets, 
  truncateAddress, 
  useWallet 
} from '@aptos-labs/wallet-adapter-react';
import { ChevronDown, Copy, LogOut } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import * as Collapsible from '@radix-ui/react-collapsible';

export function WalletSelector() {
  const { disconnect, account, connected } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address);
      alert('Copied wallet address to clipboard.');
    } catch {
      alert('Failed to copy wallet address.');
    }
  }, [account?.address]);

  return connected ? (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          {account?.ansName || truncateAddress(account?.address) || 'Unknown'}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-white border rounded shadow-md">
        <DropdownMenu.Item onSelect={copyAddress} className="flex gap-2 p-2 hover:bg-gray-100 cursor-pointer">
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={disconnect} className="flex gap-2 p-2 hover:bg-gray-100 cursor-pointer">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ) : (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Connect a Wallet</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg focus:outline-none">
          <Dialog.Title className="text-lg font-bold">Connect Wallet</Dialog.Title>
          <ConnectWalletDialog close={closeDialog} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface ConnectWalletDialogProps {
  close: () => void;
}

function ConnectWalletDialog({ close }: ConnectWalletDialogProps) {
  const { wallets } = useWallet();
  const { defaultWallets, moreWallets } = partitionWallets(wallets ?? []);

  return (
    <div className="flex flex-col gap-3 pt-3">
      {defaultWallets.map((wallet) => (
        <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
      ))}
      {!!moreWallets.length && (
        <Collapsible.Root>
          <Collapsible.Trigger asChild>
            <button className="flex items-center gap-2 mt-4 text-blue-500">
              More wallets <ChevronDown />
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content className="flex flex-col gap-3 mt-2">
            {moreWallets.map((wallet) => (
              <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
            ))}
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </div>
  );
}

interface WalletRowProps {
  wallet: AnyAptosWallet;
  onConnect?: () => void;
}

function WalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem
      wallet={wallet}
      onConnect={onConnect}
      className="flex items-center justify-between px-4 py-3 gap-4 border rounded-md"
    >
      <div className="flex items-center gap-4">
        <WalletItem.Icon className="h-6 w-6" />
        <WalletItem.Name className="text-base font-normal" />
      </div>
      {isInstallRequired(wallet) ? (
        <button className="text-sm text-blue-500">
          <WalletItem.InstallLink />
        </button>
      ) : (
        <WalletItem.ConnectButton asChild>
          <button className="text-sm bg-blue-500 text-white py-1 px-2 rounded">
            Connect
          </button>
        </WalletItem.ConnectButton>
      )}
    </WalletItem>
  );
}
