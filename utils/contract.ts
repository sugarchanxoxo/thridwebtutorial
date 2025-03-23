import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";

const ERC1155ContractAddress = process.env.NEXT_PUBLIC_CONTRACTADDRESS || "";

export const ERC1155Contract = getContract({
  client: client,
  chain: chain,
  address: ERC1155ContractAddress,
});
