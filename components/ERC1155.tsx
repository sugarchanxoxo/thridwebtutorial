"use client";

import {
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { getNFTs } from "thirdweb/extensions/erc1155";
import { ERC1155Contract } from "../utils/contract";
import { client } from "@/app/client";

export const ERC1155 = () => {
  // write condition for here
  const account = useActiveAccount();

  const { data: nfts } = useReadContract(getNFTs, {
    contract: ERC1155Contract,
  });

  return (
    <div style={{ textAlign: "center" }}>
      {account && (
        <>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {nfts && nfts.length > 0 ? (
              nfts.map((nft) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px",
                    backgroundColor: "#333",
                    borderRadius: "8px",
                    margin: "8px",
                    maxWidth: "30%",
                  }}
                  key={nft.id}
                >
                  <MediaRenderer
                    client={client}
                    src={nft.metadata.image}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))
            ) : (
              <p>No NFTs</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
