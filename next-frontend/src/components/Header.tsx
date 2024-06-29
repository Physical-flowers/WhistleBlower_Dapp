// components/Header.tsx
import React from 'react';
import { WalletSelector } from "./WalletSelector";
import { TransferTokenButton } from './TransferTokenButton';

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="w-full bg-white p-4 shadow-md flex justify-between items-center transition-transform duration-300">
      <div className="flex items-center">
        <button className="p-2" onClick={toggleSidebar}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold ml-4 whitespace-nowrap"><a href="/">WhistleBlower</a></h1>
      </div>
      <div className="flex-1"></div>
      <div className="flex-shrink-0 flex gap-4">
        <TransferTokenButton />
        <WalletSelector />
      </div>
    </header>
  );
}
