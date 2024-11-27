
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
    
    console.log("balance", balance);
  }
}, [balance])


useEffect(()=>{
  if(userData){
console.log("userData", userData);
console.log("userData spend", userData?.spend);
console.log("userData totalRewadBalanceWithdraw", userData?.spend?.totalRewadBalanceWithdraw);
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
    console.log("Owner Tax:", ownerTax);  

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
        premium: Number(userData?.premium ) ,
        totalSpend: Number(userData?.totalspend )/ blockChainConfig.decimals,
        purchasedTickets: Number(userData?.purchasedTickets )/ blockChainConfig.decimals,
        firstLottery: Number(userData?.firstLottery )/ blockChainConfig.decimals,
        lastTicketPurchased: Number(userData?.lastTicketPurchased )/ blockChainConfig.decimals,
        referrer: userData?.referrer,
        winningAmount: Number(userData?.winningAmount) / blockChainConfig.decimals || 0,
        topBuyerTax:Number(userData?.topBuyerTax),
        topLeaderTax: Number(userData?.topLeaderTax),
        premiumReferralRewards: Number(userData?.premiumReferralRewards) / blockChainConfig.decimals || 0,
        totalRewadBalanceWithdraw: Number(userData?.spend?.totalRewadBalanceWithdraw),
        usdT:Number(balance)/blockChainConfig.decimals,
        ownerTax:ownerTaxAmount, 
     
      }
    : null;

  return { user, isError  };
};

