 

import lotteryABI from "./LotteryABI.json"
import ERC20ABI from "./ERC20ABI.json"; 
 



export const secretKey = "lottaverse2.0_by@oxwd3v"



 const  devAmoyConfig = {   
    contractAddress : process.env.REACT_APP_DEV_CONTRACT_ADDRESS,
    owner: "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59",
    USDTaddress : "0x237Df06e20BD560EfA074a48BBe46f32d0D7f3a0", 
    lotteryABI : lotteryABI.abi,
    erc20ABI: ERC20ABI,
    decimals:1e6,
 }
 


 const  polygonConfig = {   
    contractAddress :process.env.REACT_APP_CONTRACT_ADDRESS,
    owner: "0x9B1e830584caDf455F1406C255F24e84e6BE5738",
    USDTaddress : "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    LInkAddress : "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904", 
    lotteryABI : lotteryABI.abi,
    erc20ABI: ERC20ABI,
    decimals:1e6,
 }
 


 const getBlockchainConfig=  () => {
   const environment = process.env.REACT_APP_ENVIRONMENT;

   // console.log("environment is ", environment);
   
   
   if(environment == "dev"){
      // console.log("config is ", devAmoyConfig);
      return devAmoyConfig;
   }
   else{
      // console.log("config is ", polygonConfig);
      return polygonConfig;
   }
  
}



export const pk =process.env.REACT_APP_PK;
export const  blockChainConfig =  getBlockchainConfig();
