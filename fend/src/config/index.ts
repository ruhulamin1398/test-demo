"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { createConfig } from "wagmi";
import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createClient, http } from "viem";
import {
  metaMaskWallet,
  trustWallet,
  binanceWallet,
  walletConnectWallet,
  tokenPocketWallet,
  safeWallet,
  bitgetWallet,
  uniswapWallet,
  okxWallet,
  imTokenWallet,
  compassWallet,
  foxWallet,
  gateWallet,
  coinbaseWallet,
  omniWallet,
  rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { polygon, polygonAmoy } from "wagmi/chains";
import { blockChainConfig } from "@/contracts/const";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recomended",
      wallets: [metaMaskWallet,coinbaseWallet, rabbyWallet, trustWallet, binanceWallet,tokenPocketWallet, safeWallet, bitgetWallet,uniswapWallet,okxWallet,omniWallet,imTokenWallet,gateWallet,compassWallet,foxWallet, walletConnectWallet],
    },
  ],
  {
    appName: "lottaverse",
    projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
  },
);

export const wagmiConfig = createConfig({
  connectors: connectors,
  chains: [blockChainConfig.chainName ],
  ssr: true,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});
 
 


const  prodAppConfig = {
  api: process.env.NEXT_PUBLIC_API_URL, 
  app: process.env.NEXT_PUBLIC_APP_URL, 
}

const  devdAppConfig = {
  api: process.env.NEXT_PUBLIC_DEV_API_URL, 
  app: process.env.NEXT_PUBLIC_APP_URL, 
}
 

const getAppConfig = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "prod";
  if (environment == "dev") {
    return devdAppConfig;
  } else {
    return prodAppConfig;
  }
};

export const appConfig = getAppConfig();
