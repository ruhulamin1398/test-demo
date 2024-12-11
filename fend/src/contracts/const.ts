 
import lotteryABI from "./LotteryABI.json"
import ERC20ABI from "./ERC20ABI.json" 

import { polygon, polygonAmoy  } from "wagmi/chains";




export const secretKey = "lottaverse2.0_by@oxwd3v"
  
const  devAmoyConfig = {
   chainName : polygonAmoy,
   contractAddress: process.env.NEXT_PUBLIC_DEV_CONTRACT_ADDRESS ||'0x441FB277D087173Bf0b5Fd90Df707130a828c60B',  
   owner: "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59",
   USDTaddress : "0x237Df06e20BD560EfA074a48BBe46f32d0D7f3a0", 
   ProviderUrl : "https://rpc-amoy.polygon.technology",
   lotteryABI : lotteryABI.abi,
   erc20ABI: ERC20ABI,
   decimals:1e6,
} 
const  polygonConfig = {
   chainName : polygon,
   contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x1f0e27757Da3A3473E7c89d5b18C37389efdeBF9', 
   owner: process.env.NEXT_PUBLIC_OWNER,
   USDTaddress : "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", 
   ProviderUrl : "https://rpc-mainnet.matic.quiknode.pro",
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
      // console.log("prod Environment ", polygonConfig)
      return polygonConfig;
   }
  
}

 

 export const  blockChainConfig = getBlockchainConfig();





 
