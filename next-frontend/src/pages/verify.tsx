import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { jwtDecode } from 'jwt-decode';
import { getLocalEphemeralKeyPairs } from '../utils/ephemeralKeyPairStorage';
import { usePhysicsFlowerWallet } from '@/context/PhysicsFlowerWalletContext';

export default function Verify() {
  const { walletAddress, setKeylessAccount, setWalletAddress } = usePhysicsFlowerWallet();
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {

    // 设置cookie
    document.cookie = "name=value; SameSite=None; Secure";

    const url = new URL(window.location.href);
    const fragment = url.hash.substring(1);
    const params = new URLSearchParams(fragment);
    const idToken = params.get('id_token');

    if (idToken) {
      const { nonce } = jwtDecode<{ nonce: string }>(idToken);
      const accounts = getLocalEphemeralKeyPairs();
      const ephemeralKeyPair = accounts[nonce];

      if (ephemeralKeyPair) {
        const aptos = new Aptos(new AptosConfig({ network: Network.DEVNET }));
        const deriveAccount = async () => {
          try {
            const account = await aptos.deriveKeylessAccount({ jwt: idToken, ephemeralKeyPair });
            console.log('Derived keyless account:', account.accountAddress.toString());
            setWalletAddress(account.accountAddress.toString());
            setKeylessAccount(account);
            setMessage('Successfully logged in!');
            // 在成功獲取錢包地址後重定向到首頁
            setTimeout(() => {
              router.push('/');
            }, 2000); // 延遲2秒以顯示錢包地址，然後重定向
          } catch (error) {
            console.error('Error deriving keyless account:', error);
            setMessage('Error deriving keyless account.');
          }
        };
        deriveAccount();
      } else {
        console.error('No ephemeral key pair found for the given nonce');
        setMessage('No ephemeral key pair found for the given nonce');
      }
    } else {
      console.error('No id_token found in URL');
      setMessage('No id_token found in URL');
    }
  }, [router, setKeylessAccount]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Verify</h1>
        {walletAddress ? (
          <div>
            <p className="text-lg font-semibold mb-2">Successfully logged in!</p>
            <p className="text-gray-700">Wallet Address:</p>
            <p className="text-gray-900 break-words">{walletAddress}</p>
            <p className="mt-4 text-sm text-gray-600">Redirecting to homepage...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-gray-600">Logging in...</p>
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
