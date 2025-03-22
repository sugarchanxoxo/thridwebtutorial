"use client";

import {
  MediaRenderer,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { claimTo, getNFTs, getOwnedNFTs } from "thirdweb/extensions/erc1155";
import { ERC1155Contract } from "../utils/contract";
import { client } from "@/app/client";

export const ERC1155 = () => {
  // write condition for here
  const account = useActiveAccount();

  const { data: nfts } = useReadContract(getNFTs, {
    contract: ERC1155Contract,
  });

  const { data: ownedNFTs, refetch: refetchOwnedNFTs } = useReadContract(
    getOwnedNFTs,
    {
      contract: ERC1155Contract,
      address: account?.address || "",
    }
  );

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
                  <TransactionButton
                    transaction={() =>
                      claimTo({
                        contract: ERC1155Contract,
                        to: account.address || "",
                        tokenId: nft.id,
                        quantity: BigInt(1),
                      })
                    }
                    onTransactionConfirmed={() => {
                      alert("NFT claimed");
                      refetchOwnedNFTs();
                    }}
                  >
                    Claim NFT
                  </TransactionButton>
                </div>
              ))
            ) : (
              <p>No NFTs</p>
            )}
          </div>
          <div>
            <p>Owned NFTs:</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
              }}
            >
              {ownedNFTs && ownedNFTs.length > 0 ? (
                ownedNFTs.map((nft) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "16px",
                      backgroundColor: "#333",
                      borderRadius: "8px",
                      margin: "8px",
                    }}
                    key={nft.id}
                  >
                    {/*<MediaRenderer
                      client={client}
                      src={nft.metadata.image}
                      style={{ width: "100%", height: "auto" }}
                    />*/}
                    <p>Token ID: {nft.id.toString()}</p>
                    <p>Quantity: {nft.quantityOwned.toString()}</p>
                  </div>
                ))
              ) : (
                <p>No owned NFTs</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
