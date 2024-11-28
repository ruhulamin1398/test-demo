import { useAccount, useContractRead } from 'wagmi';
import { blockChainConfig } from '../const';  
import { useEffect } from 'react';

 
export interface ReferralsAddress {
    refereesAddress: string[];  
  }
  
  export interface LotteryReferralData {
    totalPurchasedTicket:number;
    totalReferredAmount: number;          
    referralAmounts: number[];            
    referees: ReferralsAddress[];          
  }
  
  export const useReferralData = () => {
    const { address, isConnected } = useAccount();
  
    // Use wagmi's useContractRead to read referral data
    const { data: referralData, isError } = useContractRead({
      address: blockChainConfig.contractAddress  as `0x${string}`,
      abi: blockChainConfig.lotteryABI,
      functionName: 'getLotteryReferralAmountByUser',
      args: [address],
      enabled: isConnected && !!address,  
    });

    useEffect(()=>{
      console.log("referralData  ", referralData)

    },[referralData])
    // console.log("ref data :", referralData);
  
    // Transform the referral data into the LotteryReferralData interface format
    const referralInfo: LotteryReferralData | null = referralData
      ? {
        totalPurchasedTicket : Number(referralData[0] ) || 0,
          totalReferredAmount: Number(referralData[1])/blockChainConfig.decimals || 0,
          referralAmounts: referralData[2].map((amount: any) => Number(amount)/blockChainConfig.decimals),  
          referees: referralData[3].map((referee: any) => ({
            refereesAddress: referee.refereesAddress, 
          })),
        }
      : null;
  
      
    return { referralInfo, isError };
  };