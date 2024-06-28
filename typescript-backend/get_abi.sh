#! /bin/bash
 
# replace it with the network your contract lives on
NETWORK=devnet
# replace it with your contract address
CONTRACT_ADDRESS=4422cae46aea5e7654b84f3e81a4013a4767113c3addc8be7cf8e55ef1eb2321
# replace it with your module name, every .move file except move script has module_address::module_name {}
MODULE_NAME=usdk
 
# save the ABI to a TypeScript file
echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$CONTRACT_ADDRESS/module/$MODULE_NAME | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > ./src/contract/abi/abi.ts