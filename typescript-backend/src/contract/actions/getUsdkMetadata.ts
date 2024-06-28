// contract/actions/getUsdkMetadata.ts
import { surfClient } from "./surfClient";

export async function getUsdkMetadata(): Promise<any> {
  const usdkMetadata = await surfClient.view.metadata({
    functionArguments: [],
    typeArguments: [],
  });
  // console.log("USDK Metadata:", usdkMetadata);
  return usdkMetadata;
}
