# replace it with the network your contract lives on
$NETWORK = "devnet"
# replace it with your contract address
$CONTRACT_ADDRESS = "0x2620d61d56edff48639f9eabb5a3636a153a34f17b27cfb4902896f4589a5358"
# replace it with your module name, every .move file except move script has module_address::module_name {}
$MODULE_NAME = "create_nft"

# save the ABI to a TypeScript file
Invoke-RestMethod -Uri "https://fullnode.$NETWORK.aptoslabs.com/v1/accounts/$CONTRACT_ADDRESS/module/$MODULE_NAME" |
    Select-Object -ExpandProperty abi | ConvertTo-Json -Compress |
    Foreach-Object { "export const ABI = $_ as const" } |
    Out-File -FilePath "abi.ts"