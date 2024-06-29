// pages/_app.tsx
import { AppProps } from 'next/app';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PhysicsFlowerWalletProvider } from '@/context/PhysicsFlowerWalletContext';
import '@/app/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <AptosWalletAdapterProvider
        autoConnect={true}
        onError={(error) => console.log("Custom error handling", error)}
      >
        <QueryClientProvider client={queryClient}>
          <PhysicsFlowerWalletProvider>
            <Component {...pageProps} />
          </PhysicsFlowerWalletProvider>
        </QueryClientProvider>
      </AptosWalletAdapterProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
