 

import { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { blockChainConfig } from '../const';
import { Contract, BrowserProvider, JsonRpcProvider } from "ethers";

// Create a new instance of the JSON-RPC provider with the Polygon Amoy testnet provider
let provider: BrowserProvider | null = null;
let contract: Contract | null = null;

 
export const useLatestLottery = () => {
  const [latestEasyLottery, setLatestEasyLottery] = useState<any>([]);
  const [latestSuperLottery, setLatestSuperLottery] = useState<any>([]);




  const { data: LatestEasy } = useContractRead({
    address: blockChainConfig.contractAddress as `0x${string}`,
    abi: blockChainConfig.lotteryABI,
    functionName: 'GetLatestLotteryTicketRoundCustomerCount',
    args: [0],
  });
  const { data: LatestSuper } = useContractRead({
    address: blockChainConfig.contractAddress as `0x${string}`,
    abi: blockChainConfig.lotteryABI,
    functionName: 'GetLatestLotteryTicketRoundCustomerCount',
    args: [1],
  });



  useEffect(() => {
    if(LatestEasy){
      setLatestEasyLottery(LatestEasy);
    }
  }, [LatestEasy]);

  useEffect(() => {
    if(LatestSuper){
      setLatestSuperLottery(LatestSuper);
    }
  }, [LatestSuper]);
 

  return { latestEasyLottery, latestSuperLottery };
};
