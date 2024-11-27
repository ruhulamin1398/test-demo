
import { useAccount, useContractRead, useSendTransaction } from 'wagmi';
import { blockChainConfig } from '../const';
import { use, useEffect, useState } from 'react';

import {  ethers } from "ethers";





export interface User {
  premium: number;           // The premium balance
  totalSpend: number;       // Total amount spent
  purchasedTickets: number;  // Number of tickets purchased
  firstLottery: number;     // Timestamp or ID of the first lottery
  lastTicketPurchased: number; // Timestamp or ID of the last ticket purchased
  referrer: string;         // Referrer address 
  winningAmount:number;
  topBuyerTax:number;
  topLeaderTax : number;
  totalRewadBalanceWithdraw:number;
  usdT:number;
  ownerTax:number;
  premiumReferralRewards:number; 
}




export const useUser = () => {
  const { address, isConnected } = useAccount();
  const [ownerTaxAmount, setOwnerTaxAmount] = useState(0);
  // cosnt [totalEarning , setTotalEarning] = useState<number>(0);

  // Use wagmi's useContractRead to read user data
  const { data: userData, isError } = useContractRead({
    address: blockChainConfig.contractAddress  as `0x${string}`,
    abi: blockChainConfig.lotteryABI,
    functionName: 'getUser',
    args: [address],
    enabled: isConnected && !!address, // Only run if connected and address is available
  });

  const { data: balance, isLoading, error } = useContractRead({
    address: blockChainConfig.USDTaddress as `0x${string}`,
    abi: blockChainConfig.erc20ABI,
    functionName: 'balanceOf',
    args: [address], 
    enabled: isConnected &&!!address, // Only run if connected and address is available
  });  
 
 


    


useEffect(()=>{
 
  if(balance){
    
    // console.log("balance", balance);
  }
}, [balance])


useEffect(()=>{
  if(userData){
// console.log("userData", userData);
// console.log("userData spend", userData?.spend);
// console.log("userData totalRewadBalanceWithdraw", userData?.spend?.totalRewadBalanceWithdraw);
  }
}, [userData])

async function fetchOwnerTax() {
  try { 
    const provider = new ethers.BrowserProvider(window.ethereum);  
    const signer = await provider.getSigner();
     
    const contract = new ethers.Contract(
      blockChainConfig.contractAddress, 
      blockChainConfig.lotteryABI,  
      signer  
    ); 
    const ownerTax = await contract.getOwnerBalance();
    // console.log("Owner Tax:", ownerTax);  

    setOwnerTaxAmount(ownerTax);
  } catch (error) {
    // console.error("Error fetching owner tax:", error.message);
  }
}

// Call the function


useEffect(()=>{
  fetchOwnerTax();
}, [])
 
  // Transform the user data into the User interface format
  const user: User | null = userData
  ? {
      premium: isNaN(Number(userData?.premium)) ? 0 : Number(userData?.premium),
      totalSpend: isNaN(Number(userData?.totalspend)) ? 0 : Number(userData?.totalspend) / blockChainConfig.decimals,
      purchasedTickets: isNaN(Number(userData?.purchasedTickets)) ? 0 : Number(userData?.purchasedTickets) / blockChainConfig.decimals,
      firstLottery: isNaN(Number(userData?.firstLottery)) ? 0 : Number(userData?.firstLottery) / blockChainConfig.decimals,
      lastTicketPurchased: isNaN(Number(userData?.lastTicketPurchased)) ? 0 : Number(userData?.lastTicketPurchased) / blockChainConfig.decimals,
      referrer: userData?.referrer || '',  // assuming referrer can be a string and empty if not available
      winningAmount: isNaN(Number(userData?.winningAmount)) ? 0 : Number(userData?.winningAmount) / blockChainConfig.decimals || 0,
      topBuyerTax: isNaN(Number(userData?.topBuyerTax)) ? 0 : Number(userData?.topBuyerTax),
      topLeaderTax: isNaN(Number(userData?.topLeaderTax)) ? 0 : Number(userData?.topLeaderTax),
      premiumReferralRewards: isNaN(Number(userData?.premiumReferralRewards)) ? 0 : Number(userData?.premiumReferralRewards) / blockChainConfig.decimals || 0,
      totalRewadBalanceWithdraw: isNaN(Number(userData?.spend?.totalRewadBalanceWithdraw)) ? 0 : Number(userData?.spend?.totalRewadBalanceWithdraw),
      usdT: isNaN(Number(balance)) ? 0 : Number(balance) / blockChainConfig.decimals,
      ownerTax: isNaN(ownerTaxAmount) ? 0 : ownerTaxAmount,
    }
  : null;


  return { user, isError  };
};

