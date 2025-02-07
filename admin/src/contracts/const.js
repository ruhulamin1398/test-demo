import lotteryABI from "./LotteryABI.json";
import ERC20ABI from "./ERC20ABI.json";
import { JsonRpcProvider } from "ethers";

export const secretKey = "lottaverse2.0_by@oxwd3v";

const devAmoyConfig = {
  contractAddress: process.env.NEXT_PUBLIC_DEV_CONTRACT_ADDRESS,
  owner: "0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59",
  USDTaddress: "0x7722DA925D988533f825D13C353ee9A0085d347e",
  lotteryABI: lotteryABI.abi,
  erc20ABI: ERC20ABI,
  chainId: 80002,
  provider: new JsonRpcProvider(
    "https://polygon-amoy.infura.io/v3/276f8cf7af2341738b0fd12245ffd948",
    {
      chainId: 80002, // Chain ID for Polygon Amoy testnet
      name: "polygon-amoy",
    }
  ),
  decimals: 1e6,
};

const polygonConfig = {
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
  owner: "0x821D0D38885Fc83a2bB36dB69714F0C45d711996",
  USDTaddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  LInkAddress: "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
  lotteryABI: lotteryABI.abi,
  erc20ABI: ERC20ABI,

  chainId: 137,
  provider: new JsonRpcProvider(
    "https://polygon-mainnet.infura.io/v3/276f8cf7af2341738b0fd12245ffd948",
    {
      chainId: 137,
      name: "polygon-mainnet",
    }
  ),
  decimals: 1e6,
};

const getBlockchainConfig = () => {
  const environment = process.env.REACT_APP_ENVIRONMENT;

  // console.log("environment is ", environment);

  if (environment == "dev") {
    console.log("config is ", devAmoyConfig);
    return devAmoyConfig;
  } else {
    console.log("config is ", polygonConfig);
    return polygonConfig;
  }
};

export const pk = process.env.REACT_APP_PK;
export const blockChainConfig = getBlockchainConfig();
