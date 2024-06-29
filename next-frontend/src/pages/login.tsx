import { useRouter } from 'next/router';
import GmailLoginWalletButton from '../components/GmailLoginWalletButton';
import { usePhysicsFlowerWallet } from '@/context/PhysicsFlowerWalletContext';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

const Login: React.FC = () => {
  const router = useRouter();
  const { walletAddress } = usePhysicsFlowerWallet();

  const handleLoginSuccess = (walletAddress: string) => {
    // 可以在這裡處理進一步的邏輯，例如將錢包地址發送到後端進行驗證
    // 例如：router.push('/dashboard');
    console.log('Logged in with wallet address:', walletAddress);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <Avatar className="mx-auto mb-4">
          <AvatarImage src="/path-to-your-image.jpg" alt="WhistleBlower" className="w-24 h-24 rounded-full" />
          <AvatarFallback className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">WB</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-semibold mb-4">Welcome to WhistleBlower</h1>
        <p className="mb-4 text-gray-600">Click the button below to login with your Gmail account and create a wallet.</p>
        <GmailLoginWalletButton onLoginSuccess={handleLoginSuccess} />
        {walletAddress && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Wallet Address:</h2>
            <p className="text-gray-700 break-words">{walletAddress}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
