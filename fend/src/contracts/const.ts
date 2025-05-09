import lotteryABI from "./LotteryABI.json";
import ERC20ABI from "./ERC20ABI.json";

import { polygon, polygonAmoy } from "wagmi/chains";

import { JsonRpcProvider } from "ethers";
 
export const secretKey = "lottaverse2.0_by@oxwd3v";
// settings for amoy
const devAmoyConfig = {
  chainName: polygonAmoy,
  contractAddress: process.env.NEXT_PUBLIC_DEV_CONTRACT_ADDRESS,
  owner: "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59",
  USDTaddress: "0xe7aB779bC1fd78539491CcD8248c96D7C979E0d1",
  ProviderUrl: "https://rpc-amoy.polygon.technology",
  lotteryABI: lotteryABI.abi,
  erc20ABI: ERC20ABI,
  decimals: 1e6,
  provider: new JsonRpcProvider(
    "https://polygon-amoy.infura.io/v3/276f8cf7af2341738b0fd12245ffd948",
    {
      chainId: 80002, // Chain ID for Polygon Amoy testnet
      name: "polygon-amoy",
    },
  ),
};
const polygonConfig = {
  chainName: polygon,
  contractAddress:
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x1f0e27757Da3A3473E7c89d5b18C37389efdeBF9",
  owner: process.env.NEXT_PUBLIC_OWNER,
  USDTaddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  ProviderUrl: "https://rpc-mainnet.matic.quiknode.pro",
  lotteryABI: lotteryABI.abi,
  erc20ABI: ERC20ABI,
  decimals: 1e6,
  provider: new JsonRpcProvider(
    "https://polygon-mainnet.infura.io/v3/276f8cf7af2341738b0fd12245ffd948",
    {
      chainId: 137,
      name: "polygon-mainnet",
    },
  ),
};

const getBlockchainConfig = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "prod";
  if (environment == "dev") {
    console.log("dev Environment ", devAmoyConfig);
    return devAmoyConfig;
  } else {
    // console.log("prod Environment ", polygonConfig)
    return polygonConfig;
  }
};

export const blockChainConfig = getBlockchainConfig();
