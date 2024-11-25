 

import lotteryABIAmoy from "./LotteryAmoy.json"
import erc20ABIAmoy from "./ERC20Amoy.json"; 
 


export const contractAddress = "0xe9D7970A79a7542C3969f9F5CD098418817D3cc7";
export const owner = "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59";
export const USDTaddress = "0xAb231A5744C8E6c45481754928cCfFFFD4aa0732";
export const LInkAddress = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";
export const fujiProviderUrl = "https://api.avax-test.network/ext/bc/C/rpc"; 
export const secretKey = "lottaverse2.0_by@oxwd3v"



 const  devAmoyConfig = {   
    contractAddress : process.env.REACT_APP_DEV_CONTRACT_ADDRESS,
    owner: "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59",
    USDTaddress : "0x237Df06e20BD560EfA074a48BBe46f32d0D7f3a0",
    LInkAddress : "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
    ProviderUrl : "https://rpc-amoy.polygon.technology",
    lotteryABI : lotteryABIAmoy.abi,
    erc20ABI: erc20ABIAmoy,
    decimals:1e6,
 }
 


 const  prodAmoyConfig = {   
    contractAddress :process.env.REACT_APP_CONTRACT_ADDRESS,
    owner: "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59",
    USDTaddress : "0x237Df06e20BD560EfA074a48BBe46f32d0D7f3a0",
    LInkAddress : "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
    ProviderUrl : "https://rpc-amoy.polygon.technology",
    lotteryABI : lotteryABIAmoy.abi,
    erc20ABI: erc20ABIAmoy,
    decimals:1e6,
 }
 


 const getBlockchainConfig=  () => {
   const environment = process.env.REACT_APP_ENVIRONMENT;

   console.log("environment is ", environment);
   
   
   if(environment == "dev"){
      console.log("config is ", devAmoyConfig);
      return devAmoyConfig;
   }
   else{
      console.log("config is ", prodAmoyConfig);
      return prodAmoyConfig;
   }
  
}



export const pk = "0xd9eade4f755adc2e4bce6e65996f746e894748e4af10a61796e7fd75a12701a3";
export const  blockChainConfig =  getBlockchainConfig();
