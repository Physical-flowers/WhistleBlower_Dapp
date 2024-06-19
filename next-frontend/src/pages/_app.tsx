import { AppProps } from 'next/app';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import '@/app/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      onError={(error) => console.log("Custom error handling", error)}
    >
      <QueryClientProvider client={queryClient}>
        <Header/>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AptosWalletAdapterProvider>
  );
}

export default MyApp;
