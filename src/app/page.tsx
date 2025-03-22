"use client";

import {
  ConnectEmbed,
  useActiveAccount,
  useConnect,
  useDisconnect,
  useActiveWallet,
  useAutoConnect,
} from "thirdweb/react";
import { ConnectButton } from "@/app/thirdweb";
import { client } from "./client";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { ERC1155 } from "../../components/ERC1155";

function CustomWallets() {
  const recommendedWallets = [createWallet("io.metamask")];
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
  ];

  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      recommendedWallets={recommendedWallets}
      connectModal={{
        size: "compact",
      }}
      connectButton={{ label: "Connect Wallet" }}
    />
  );
}

function CustomConnectEmbed() {
  const account = useActiveAccount();
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
  ];

  return (
    <div>
      <ConnectEmbed
        client={client}
        wallets={wallets}
        showThirdwebBranding={false}
      />
      {account && <ConnectButton client={client} />}
    </div>
  );
}

function InAppWallets() {
  return (
    <div>
      <ConnectButton client={client} wallets={[inAppWallet()]} />
    </div>
  );
}

function CustomInAppWallets() {
  return (
    <div>
      <ConnectButton
        client={client}
        wallets={[
          inAppWallet({
            auth: {
              options: ["google", "apple", "email"],
            },
          }),
        ]}
      />
    </div>
  );
}

function SingleWalletFlow() {
  // Get active account and wallet
  const account = useActiveAccount();
  const connectedWallet = useActiveWallet();

  // Get connect and disconnect functions
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Auto connect wallet on page load => not working in this example
  const { data } = useAutoConnect({
    client: client,
    wallets: [createWallet("io.metamask")],
    onConnect(wallet) {
      console.log("Auto connected wallet", wallet);
    },
  });

  return (
    <div>
      {account && connectedWallet ? (
        <button
          className="bg-red-500 text-white-400 px-4 py-2 rounded-md"
          onClick={() => disconnect(connectedWallet)}
        >
          Disconnect
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white-400 px-4 py-2 rounded-md"
          onClick={() =>
            connect(async () => {
              const wallet = createWallet("io.metamask");
              await wallet.connect({ client: client });
              return wallet;
            })
          }
        >
          Metamask
        </button>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <CustomWallets />
        <ERC1155 />
      </main>
    </div>
  );
}
