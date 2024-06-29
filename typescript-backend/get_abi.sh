#! /bin/bash
 
# replace it with the network your contract lives on
NETWORK=devnet
# replace it with your contract address
CONTRACT_ADDRESS=0575ef47f4791eef3da85455b8c988a32f047b43ba5407df52c559bcad2f5cda
# replace it with your module name, every .move file except move script has module_address::module_name {}
MODULE_NAME=create_nft
 
# save the ABI to a TypeScript file
echo "export const ABI = $(curl https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$CONTRACT_ADDRESS/module/$MODULE_NAME | sed -n 's/.*"abi":\({.*}\).*}$/\1/p') as const" > ./src/contract/abi/abi.ts