// contract/actions/denylist.ts
import { surfClient } from "./surfClient";
import { Account } from "@aptos-labs/ts-sdk";

export async function addToDenylist(signer: Account, targetAccountAddress: string): Promise<any> {
  const denylistResult = await surfClient.entry.denylist({
    account: signer,
    functionArguments: [`0x${targetAccountAddress}`],
    typeArguments: [],
  });
  // console.log("Denylist Result:", denylistResult);
  return denylistResult;
}
