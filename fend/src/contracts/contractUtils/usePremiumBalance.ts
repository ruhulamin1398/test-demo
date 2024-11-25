
import { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { blockChainConfig } from '../const';

export const usePremiumBalance = () => {
  const [premiumBalance, setPremiumBalance] = useState<number>(0);
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);
  const { address, isConnected } = useAccount(); 

  // Use wagmi's useContractRead to read contract data
  const { data: contractData } = useContractRead({
    address: blockChainConfig.contractAddress  as `0x${string}`,
    abi: blockChainConfig.lotteryABI,
    functionName: 'getPremiumRewardBalance',
    args: [address],
    enabled: isConnected && !!address, // Only run if connected and address is available
    onError() {
      console.error("Error fetching premium data");
      setPremiumBalance(0);

    },
  });

  useEffect(() => {
    if (contractData) {
      // console.log(" premium data ",contractData);
      setPremiumStatus(contractData[1]);
      const balance = Number(contractData[0]) / blockChainConfig.decimals;
      setPremiumBalance( balance);
      // console.log("Premium reserve of account is:", balance);
    }
  }, [contractData]);

  return {premiumBalance,premiumStatus} ;
};
