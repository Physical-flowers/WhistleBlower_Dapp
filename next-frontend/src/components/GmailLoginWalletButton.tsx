import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { EphemeralKeyPair } from '@aptos-labs/ts-sdk';
import { usePhysicsFlowerWallet } from '@/context/PhysicsFlowerWalletContext';
import { storeEphemeralKeyPair } from '../utils/ephemeralKeyPairStorage';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface GmailLoginWalletButtonProps {
  onLoginSuccess?: (walletAddress: string) => void;
}

const GmailLoginWalletButton: React.FC<GmailLoginWalletButtonProps> = ({ onLoginSuccess }) => {
  const { walletAddress, setWalletAddress, keylessAccount, setKeylessAccount } = usePhysicsFlowerWallet();
  const [message, setMessage] = useState('');
  const [ephemeralKeyPair, setEphemeralKeyPair] = useState<EphemeralKeyPair | null>(null);

  useEffect(() => {
    if (!ephemeralKeyPair) {
      const keyPair = EphemeralKeyPair.generate();
      storeEphemeralKeyPair(keyPair);
      setEphemeralKeyPair(keyPair);
    }
  }, [ephemeralKeyPair]);

  const handleLogin = () => {
    if (ephemeralKeyPair) {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const redirectUri = `http://localhost:3000/verify`;
      const nonce = ephemeralKeyPair.nonce;
      const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid&nonce=${nonce}`;
      window.location.href = loginUrl;
    }
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setMessage('Wallet address copied!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleDisconnect = () => {
    setWalletAddress('');
    setKeylessAccount(null);
  };

  return (
    <div className="relative">
      {keylessAccount ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Loading...'}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="bg-white shadow-lg rounded-md p-2 mt-2">
            <DropdownMenu.Item className="px-4 py-2 cursor-pointer" onClick={handleCopyAddress}>
              Copy Wallet Address
            </DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-2 cursor-pointer" onClick={handleDisconnect}>
              Disconnect
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Sign In with Google
        </button>
      )}
      {message && <p className="absolute left-0 right-0 mt-2 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default GmailLoginWalletButton;
