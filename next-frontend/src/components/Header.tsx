import { WalletSelector } from "./WalletSelector";

export function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
      <h1 className="display">
        <a href="/">WhistleBlower</a>
      </h1>
      <div className="flex gap-2 items-center flex-wrap">
        <WalletSelector />
      </div>
    </div>
  );
}
