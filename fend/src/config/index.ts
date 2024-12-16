
import "@rainbow-me/rainbowkit/styles.css";
import { createConfig } from "wagmi";
import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createClient, http } from "viem";
import {
  metaMaskWallet,
  trustWallet,
  rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { polygon, polygonAmoy } from "wagmi/chains";
import { blockChainConfig } from "@/contracts/const";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recomended",
      wallets: [metaMaskWallet, rabbyWallet, trustWallet],
    },
  ],
  {
    appName: "lottaverse10",
    projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
  },
);

 
 

const polygonAmoyChain = {
  ...polygonAmoy,
  id: 80002, // Chain ID for Polygon Amoy
 
};

export const wagmiConfig = createConfig({
  connectors: connectors,
  chains: [polygonAmoyChain],
  ssr: false,
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
