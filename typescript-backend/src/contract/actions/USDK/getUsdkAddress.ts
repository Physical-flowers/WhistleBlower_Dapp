// contract/actions/getUsdkAddress.ts
import { surfClient } from "./surfClient";

export async function getUsdkAddress(): Promise<any> {
  const usdkAddress = await surfClient.view.usdk_address({
    functionArguments: [],
    typeArguments: [],
  });
  // console.log("USDK Address:", usdkAddress);
  return usdkAddress;
}
