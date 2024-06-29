// contract/actions/transferToken.ts
import { surfClient } from "./surfClient";
import { Account } from "@aptos-labs/ts-sdk";

export async function transferToken(signer: Account, targetAccountAddress: string, amount: number): Promise<any> {
    const transferResult = await surfClient.entry.transfer({
        account: signer,
        functionArguments: [`0x${targetAccountAddress}`, amount],
        typeArguments: [],
    });
    // console.log("Transfer result:", transferResult);
    return transferResult;
};