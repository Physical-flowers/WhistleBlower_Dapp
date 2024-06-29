// contract/actions/getContractAddress.ts
import { ABI } from "../../abi/abi";

export function getContractAddress(): string {
  const contractAddress = ABI.address;
  // console.log("Contract Address:", contractAddress);
  return contractAddress;
}
