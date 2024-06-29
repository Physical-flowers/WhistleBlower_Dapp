// contract/actions/mintTokens.ts
import { surfClient } from "./surfClient";
import { Account } from "@aptos-labs/ts-sdk";

export async function mintTokens(signer: Account, targetAccountAddress: string, amount: number): Promise<any> {
  const mintResult = await surfClient.entry.mint({
    account: signer,
    functionArguments: [`0x${targetAccountAddress}`, amount],
    typeArguments: [],
  });
  // console.log("Mint Result:", mintResult);
  return mintResult;
}
