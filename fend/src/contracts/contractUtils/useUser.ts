
import { useAccount, useContractRead, useSendTransaction } from 'wagmi';
import { blockChainConfig } from '../const';
import { use, useEffect, useState } from 'react';

import {  ethers } from "ethers";





export interface User {
  premium: number;           // The premium balance
  totalSpend: number;       // Total amount spent 
  totalEarning: number;       // Total amount spent 
  referrer: string;         // Referrer address 
  winningAmount:number;
  topBuyerTax:number;
  topLeaderTax : number; 
  refTax : number; 
  premiumTax : number; 
  usdT:number; 
  premiumReferralRewards:number; 
}




export const useUser = () => {
  const { address, isConnected } = useAccount();
  const [ownerTaxAmount, setOwnerTaxAmount] = useState([0,0,0]);
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

 let ownerTx=0;
 let ownerPremiumTx=0;
 let ownerTotalTx=0;
 if(! isNaN(Number( ownerTax[0]) / blockChainConfig.decimals)){
  ownerTx= (Number( ownerTax[0]) / blockChainConfig.decimals).toFixed(2)
 }
 if(! isNaN(Number( ownerTax[1]) / blockChainConfig.decimals)){
  ownerPremiumTx= (Number( ownerTax[1]) / blockChainConfig.decimals).toFixed(2)
 }
 if(! isNaN(Number( ownerTax[2]) / blockChainConfig.decimals)){
  ownerTotalTx= (Number( ownerTax[2]) / blockChainConfig.decimals)
 }
    
     


    setOwnerTaxAmount([ownerTx, ownerPremiumTx, ownerTotalTx]);
  } catch (error) {
    // console.error("Error fetching owner tax:", error.message);
  }
}

// Call the function


useEffect(()=>{
  fetchOwnerTax();
  
}, [])
 
// useEffect(()=>{
//   console.log("ownerTaxAmount" , ownerTaxAmount)

// },[ownerTaxAmount])

  // Transform the user data into the User interface format
  const user: User | null = userData
  ? {
      premium: isNaN(Number(userData?.premium)) ? 0 : Number(userData?.premium),
      totalSpend: isNaN(Number(userData?.totalPurchaseTicketCost)) ? 0 : Number(userData?.totalPurchaseTicketCost) / blockChainConfig.decimals, 
      totalEarning: isNaN(Number(userData?.totalEarning)) ? 0 : Number(userData?.totalEarning) / blockChainConfig.decimals, 
      referrer: userData?.referrer || '',  // assuming referrer can be a string and empty if not available
      winningAmount: isNaN(Number(userData?.availableTax.winningAmount)) ? 0 : Number(userData?.availableTax.winningAmount) / blockChainConfig.decimals || 0,
      topBuyerTax: isNaN(Number(userData?.availableTax.topBuyerTax)) ? 0 : Number(userData?.availableTax.topBuyerTax),
      topLeaderTax: isNaN(Number(userData?.availableTax.topLeaderTax)) ? 0 : Number(userData?.availableTax.topLeaderTax),
      refTax: isNaN(Number(userData?.availableTax.refTax)) ? 0 : Number(userData?.availableTax.refTax) / blockChainConfig.decimals,
      premiumReferralRewards: isNaN(Number(userData?.availableTax.premiumReferralTax)) ? 0 : Number(userData?.availableTax.premiumReferralTax) / blockChainConfig.decimals || 0, 
      premiumTax: isNaN(Number(userData?.availableTax.premiumTax)) ? 0 : Number(userData?.availableTax.premiumTax) / blockChainConfig.decimals || 0, 
      usdT: isNaN(Number(balance)) ? 0 : Number(balance) / blockChainConfig.decimals,
      
    }
  : null;



  useEffect(()=>{
    if(userData){
  console.log("userData", userData);
  console.log("user", user);
  // console.log("userData spend", userData?.spend); 
    }
  }, [userData, user])

  return { user, isError,ownerTaxAmount  };
};

