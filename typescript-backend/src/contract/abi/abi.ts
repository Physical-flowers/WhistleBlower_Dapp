export const ABI = {
  address: "0x575ef47f4791eef3da85455b8c988a32f047b43ba5407df52c559bcad2f5cda",
  name: "create_nft",
  friends: [],
  exposed_functions: [
    {
      name: "delayed_mint_event_ticket",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: [
        "&signer",
        "&signer",
        "vector<0x1::string::String>",
        "vector<0x1::string::String>",
      ],
      return: [],
    },
  ],
  structs: [
    {
      name: "ModuleData",
      is_native: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [
        { name: "token_data_id", type: "0x3::token::TokenDataId" },
        { name: "cid", type: "vector<0x1::string::String>" },
        { name: "key", type: "vector<0x1::string::String>" },
      ],
    },
  ],
} as const;
