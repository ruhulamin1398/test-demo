 
import lotteryABI from "./LotteryABI.json"
import ERC20ABI from "./ERC20ABI.json" 

import { polygon, polygonAmoy  } from "wagmi/chains";




export const secretKey = "lottaverse2.0_by@oxwd3v"
  
const  devAmoyConfig = {
   chainName : polygonAmoy,
   contractAddress: process.env.NEXT_PUBLIC_DEV_CONTRACT_ADDRESS, 
   owner: "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59",
   USDTaddress : "0x237Df06e20BD560EfA074a48BBe46f32d0D7f3a0",
   LInkAddress : "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
   ProviderUrl : "https://rpc-amoy.polygon.technology",
   lotteryABI : lotteryABI.abi,
   erc20ABI: ERC20ABI,
   decimals:1e6,
} 
const  polygonConfig = {
   chainName : polygon,
   contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, 
   owner: "0x9B1e830584caDf455F1406C255F24e84e6BE5738",
   USDTaddress : "0x0CD9B5C5a54188f6057143383243968CdF4CaD66",
   LInkAddress : "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
   ProviderUrl : "https://polygon.llamarpc.com",
   lotteryABI : lotteryABI.abi,
   erc20ABI: ERC20ABI,
   decimals:1e6,
}


const getBlockchainConfig=  () => {
   const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod';
   if(environment == "dev"){
      console.log("dev Environment ", devAmoyConfig)
      return devAmoyConfig;
   }
   else{
      console.log("prod Environment ", polygonConfig)
      return polygonConfig;
   }
  
}

 

 export const  blockChainConfig = getBlockchainConfig();





 
