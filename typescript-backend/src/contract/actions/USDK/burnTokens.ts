// contract/actions/burnTokens.ts
import { surfClient } from "./surfClient";
import { Account } from "@aptos-labs/ts-sdk";

export async function burnTokens(signer: Account, targetAccountAddress: string, amount: number): Promise<any> {
  const burnResult = await surfClient.entry.burn({
    account: signer,
    functionArguments: [`0x${targetAccountAddress}`, amount],
    typeArguments: [],
  });
  // console.log("Burn Result:", burnResult);
  return burnResult;
}
