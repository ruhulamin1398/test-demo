 
import lotteryABIAmoy from "./LotteryAmoy.json"
import erc20ABIAmoy from "./ERC20Amoy.json";
export const secretKey = "lottaverse2.0_by@oxwd3v"
  
const  devAmoyConfig = {
   contractAddress: process.env.NEXT_PUBLIC_DEV_CONTRACT_ADDRESS, 
   owner: "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59",
   USDTaddress : "0x237Df06e20BD560EfA074a48BBe46f32d0D7f3a0",
   LInkAddress : "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
   ProviderUrl : "https://rpc-amoy.polygon.technology",
   lotteryABI : lotteryABIAmoy.abi,
   erc20ABI: erc20ABIAmoy,
   decimals:1e6,
} 
const  prodAmoyConfig = {
   contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, 
   owner: "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59",
   USDTaddress : "0x237Df06e20BD560EfA074a48BBe46f32d0D7f3a0",
   LInkAddress : "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
   ProviderUrl : "https://rpc-amoy.polygon.technology",
   lotteryABI : lotteryABIAmoy.abi,
   erc20ABI: erc20ABIAmoy,
   decimals:1e6,
}


const getBlockchainConfig=  () => {
   const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod';
   if(environment == "dev"){
      console.log("dev Environment ", devAmoyConfig)
      return devAmoyConfig;
   }
   else{
      console.log("prod Environment ", prodAmoyConfig)
      return prodAmoyConfig;
   }
  
}

 

 export const  blockChainConfig = getBlockchainConfig();





 
