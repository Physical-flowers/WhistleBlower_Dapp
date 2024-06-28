// contract/actions/surfClient.ts
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { createSurfClient } from '@thalalabs/surf';
import { ABI } from "../abi/abi";

const config = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(config);

export const surfClient = createSurfClient(aptos).useABI(ABI);
