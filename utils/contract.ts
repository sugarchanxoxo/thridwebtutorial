import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";

const ERC1155ContractAddress = "0xf6Ef0b56E955a52EAE06d1ee1e45d2a714c68b45";

export const ERC1155Contract = getContract({
  client: client,
  chain: chain,
  address: ERC1155ContractAddress,
});
