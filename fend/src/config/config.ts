import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rabbyWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig,createStorage, http } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'



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



export const config = createConfig({
  chains: [polygonAmoy],
  connectors:connectors,  
  syncConnectedChain: false, 
  multiInjectedProviderDiscovery: false, 
  cacheTime: 4_000, 

  batch: { multicall: true }, 
  transports: {
    [polygonAmoy.id]: http('https://polygon-amoy.infura.io/v3/276f8cf7af2341738b0fd12245ffd948'), 
  },
})
