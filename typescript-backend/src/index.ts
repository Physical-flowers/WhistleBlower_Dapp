import { Account, Aptos, AptosConfig, Network, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { createSurfClient } from '@thalalabs/surf';
import { ABI } from "./contract/abi/abi";
import {
  removeFromDenylist,
  transferToken,
} from "./contract/actions";

// Specify which network to connect to via AptosConfig
async function testUsdkContract() {
 
  // Setup the client
  const config = new AptosConfig({ network: Network.DEVNET });
  const aptos = new Aptos(config);

  // Setup the account
  let privateKey = new Ed25519PrivateKey("0xa6bc454dac2b7177c2f3fd119964a051d68e49aad04e216176932f4dc1d1b47f")
  const pin = Account.fromPrivateKey({ privateKey });

  privateKey = new Ed25519PrivateKey("0xc7f3556f097199143b5bf1170030a4e36bbf8f6a8c0b800b250db21337d1f860")
  const ili = Account.fromPrivateKey({ privateKey });

  console.log("=== Addresses ===\n");
  console.log(`Pin's address is: ${pin.accountAddress}`);
  console.log(`Ili's address is: ${ili.accountAddress}`);

  console.log("=== Public Keys ===\n");
  console.log(`Pin's public key is: ${pin.publicKey}`);
  console.log(`Ili's public key is: ${ili.publicKey}`)

  // Interact with contract
  const surfClient = createSurfClient(aptos).useABI(ABI);

  console.log("=== Try Surf Client ===\n");

  try {
    
    let result = await transferToken(pin, ili.accountAddress.toStringWithoutPrefix(), 1000);
    console.log("Transfer result:", result.success);

  } catch (error) {
    console.error("Error executing Surf Client operations:", error);
  }
  }

 
testUsdkContract();