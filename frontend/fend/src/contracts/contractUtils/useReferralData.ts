import { useAccount, useContractRead } from 'wagmi';
import { blockChainConfig } from '../const';  
import { useEffect } from 'react';
import { userAgent } from 'next/server';

 
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



//     const { data: userData } = useContractRead({
//       address: blockChainConfig.contractAddress  as `0x${string}`,
//       abi: blockChainConfig.lotteryABI,
//       functionName: 'getUser',
//       args: ['0x2fbE3D8c2938dc7D066728e52284B5f7bC939542'],
//       enabled: isConnected && !!address, // Only run if connected and address is available
//     });
// useEffect(()=>{
//   console.log("userData", userData )

// },[userData])


 
       
    // const { data: referralDataTest } = useContractRead({
    //   address: blockChainConfig.contractAddress  as `0x${string}`,
    //   abi: blockChainConfig.lotteryABI,
    //   functionName: 'getUnilevelReferrals',
    //   args: ['0x656C98c03BB2b6D57D4b633aEA3181E5C25E1de7'],
    //   enabled: isConnected && !!address,  
    // });

    // useEffect(()=>{
    //   console.log("0x656C98c03BB2b6D57D4b633aEA3181E5C25E1de7  ", referralDataTest)

    // },[referralDataTest])
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