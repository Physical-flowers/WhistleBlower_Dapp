// contract/actions/addMinter.ts
import { surfClient } from "./surfClient";
import { Account } from "@aptos-labs/ts-sdk";

export async function addMinter(signer: Account, targetAccountAddress: string): Promise<any> {
  const addMinterResult = await surfClient.entry.add_minter({
    account: signer,
    functionArguments: [`0x${targetAccountAddress}`],
    typeArguments: [],
  });
  // console.log("Add Minter Result:", addMinterResult);
  return addMinterResult;
}
