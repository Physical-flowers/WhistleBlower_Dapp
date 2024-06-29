import { createContext, useContext, useState, ReactNode } from 'react';
import { KeylessAccount } from '@aptos-labs/ts-sdk';

interface PhysicsFlowerWalletContextProps {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  keylessAccount: KeylessAccount | null;
  setKeylessAccount: (account: KeylessAccount | null) => void;
}

const PhysicsFlowerWalletContext = createContext<PhysicsFlowerWalletContextProps | undefined>(undefined);

export const PhysicsFlowerWalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [keylessAccount, setKeylessAccount] = useState<KeylessAccount | null>(null);

  return (
    <PhysicsFlowerWalletContext.Provider value={{ walletAddress, setWalletAddress, keylessAccount, setKeylessAccount }}>
      {children}
    </PhysicsFlowerWalletContext.Provider>
  );
};

export const usePhysicsFlowerWallet = (): PhysicsFlowerWalletContextProps => {
  const context = useContext(PhysicsFlowerWalletContext);
  if (!context) {
    throw new Error('usePhysicsFlowerWallet must be used within a PhysicsFlowerWalletProvider');
  }
  return context;
};
