// contract/actions/undenylist.ts
import { surfClient } from "./surfClient";
import { Account } from "@aptos-labs/ts-sdk";

export async function removeFromDenylist(signer: Account, targetAccountAddress: string): Promise<any> {
  const undenylistResult = await surfClient.entry.undenylist({
    account: signer,
    functionArguments: [`0x${targetAccountAddress}`],
    typeArguments: [],
  });
  // console.log("Undenylist Result:", undenylistResult);
  return undenylistResult;
}
