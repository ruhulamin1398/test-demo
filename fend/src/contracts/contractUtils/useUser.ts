import { useAccount, useContractRead, useSendTransaction } from "wagmi";
import { blockChainConfig } from "../const";
import { useEffect, useState } from "react";

import { ethers } from "ethers";

export interface User {
  premium: number;
  totalSpend: number; // Total amount spent
  referrer: string; // Referrer address
  winningAmount: number;
  topBuyerTax: number;
  topLeaderTax: number;
  topBuyerTickets: number;
  refTax: [];
  availeableRefTax: number;
  premiumTax: number;
  usdT: number;
  premiumReferralRewards: number;

  totalEarningPremiumReferralTax: number;
  totalEarningPremiumTax: number;
  totalEarningRefTax: number;
  totalEarningTopBuyerTax: number;
  totalEarningTopLeaderTax: number;
  totalEarningWinningAmount: number;

  ///
  avaibleUsdBalance: number;

  totalEarningBalance: number;
  totalRefBalance: number;
  totalLeaderBalance: number;
  totalPremiumBalance: number;
  lastPurchased: number;
}

export const useUser = () => {
  const { address, isConnected } = useAccount();
  const [ownerTaxAmount, setOwnerTaxAmount] = useState([0, 0, 0]);
  const [userInformation, setUserInformation] = useState<User | null>(null); /// user infromation from blockchain
  const [user, setUser] = useState<User>({
    premium: 0, // The premium balance
    totalSpend: 0, // Total amount spent
    referrer: "", // Referrer address
    winningAmount: 0,
    topBuyerTax: 0,
    topLeaderTax: 0,
    refTickets: 0,
    refTax: [],
    availeableRefTax: 0,
    premiumTax: 0,
    usdT: 0,
    premiumReferralRewards: 0,

    totalEarningPremiumReferralTax: 0,
    totalEarningPremiumTax: 0,
    totalEarningRefTax: 0,
    totalEarningTopBuyerTax: 0,
    totalEarningTopLeaderTax: 0,
    totalEarningWinningAmount: 0,

    avaibleUsdBalance: 0,

    totalEarningBalance: 0,
    totalRefBalance: 0,
    totalLeaderBalance: 0,
    totalPremiumBalance: 0,

    lastPurchased: 0,
  });
  // cosnt [totalEarning , setTotalEarning] = useState<number>(0);

  // Use wagmi's useContractRead to read user data
  const { data: userData, isError } = useContractRead({
    address: blockChainConfig.contractAddress as `0x${string}`,
    abi: blockChainConfig.lotteryABI,
    functionName: "getUser",
    args: [address],
    enabled: isConnected && !!address, // Only run if connected and address is available
  });

  const {
    data: balance,
    isLoading,
    error,
  } = useContractRead({
    address: blockChainConfig.USDTaddress as `0x${string}`,
    abi: blockChainConfig.erc20ABI,
    functionName: "balanceOf",
    args: [address],
    enabled: isConnected && !!address, // Only run if connected and address is available
  });

  const calculateAvailableRefTax = (refTax) => {
    let totalRefTax = 0;

    for (let i = 0; i < refTax.length; i++) {
      totalRefTax += Number(refTax[i]) ;
    }
    return totalRefTax;
  };

  useEffect(() => {
    if (balance) {
      // console.log("balance", balance);
    }
  }, [balance]);

  async function fetchOwnerTax() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        blockChainConfig.contractAddress,
        blockChainConfig.lotteryABI,
        signer,
      );
      const ownerTax = await contract.getOwnerBalance();
      console.log("Owner Tax:", ownerTax);

      let ownerTx = 0;
      let ownerPremiumTx = 0;
      let ownerTotalTx = 0;
      if (!isNaN(Number(ownerTax[0]) / blockChainConfig.decimals)) {
        ownerTx = (Number(ownerTax[0]) / blockChainConfig.decimals).toFixed(2);
      }
      if (!isNaN(Number(ownerTax[1]) / blockChainConfig.decimals)) {
        ownerPremiumTx = (Number(ownerTax[1]) / blockChainConfig.decimals).toFixed(2);
      }
      if (!isNaN(Number(ownerTax[2]) / blockChainConfig.decimals)) {
        ownerTotalTx = Number(ownerTax[2]) / blockChainConfig.decimals;
      }

      setOwnerTaxAmount([ownerTx, ownerPremiumTx, ownerTotalTx]);
    } catch (error) {
      // console.error("Error fetching owner tax:", error.message);
    }
  }

  // Call the function

  useEffect(() => {
    fetchOwnerTax();
  }, []);

  // useEffect(()=>{
  //   console.log("ownerTaxAmount" , ownerTaxAmount)

  // },[ownerTaxAmount])

  // Transform the user data into the User interface format

  useEffect(() => {
    console.log("user from blockchain ", userData);
    let userInformationData = {
      premium: isNaN(Number(userData?.premium)) ? 0 : Number(userData?.premium),
      totalSpend: isNaN(Number(userData?.totalPurchaseTicketCost))
        ? 0
        : Number(userData?.totalPurchaseTicketCost) / blockChainConfig.decimals,
      ///
      referrer: userData?.referrer || "", // assuming referrer can be a string and empty if not available
      winningAmount: isNaN(Number(userData?.availableTax.winningAmount))
        ? 0
        : Number(userData?.availableTax.winningAmount)  ,
      //
      topBuyerTax: isNaN(Number(userData?.availableTax.topBuyerTax))
        ? 0
        : Number(userData?.availableTax.topBuyerTax),
      topLeaderTax: isNaN(Number(userData?.availableTax.topLeaderTax))
        ? 0
        : Number(userData?.availableTax.topLeaderTax),
      refTax: userData?.availableTax.refTax,
      premiumReferralRewards: isNaN(Number(userData?.availableTax.premiumReferralTax))
        ? 0
        : Number(userData?.availableTax.premiumReferralTax)   || 0,
      premiumTax: isNaN(Number(userData?.availableTax.premiumTax))
        ? 0
        : Number(userData?.availableTax.premiumTax)   || 0,
      //
      refTickets: isNaN(Number(userData?.purchasedTickets.topBuyerTickets))
        ? 0
        : Number(userData?.purchasedTickets.topBuyerTickets) || 0,
      /// total amount area
      totalEarningPremiumReferralTax: isNaN(Number(userData?.totalEarning.premiumReferralTax))
        ? 0
        : Number(userData?.totalEarning.premiumReferralTax) / blockChainConfig.decimals || 0,
      ///
      totalEarningPremiumTax: isNaN(Number(userData?.totalEarning.premiumTax))
        ? 0
        : Number(userData?.totalEarning.premiumTax) / blockChainConfig.decimals || 0,
      ///
      totalEarningRefTax: isNaN(Number(userData?.totalEarning.refTax))
        ? 0
        : Number(userData?.totalEarning.refTax) / blockChainConfig.decimals || 0,
      ///
      totalEarningTopBuyerTax: isNaN(Number(userData?.totalEarning.topBuyerTax))
        ? 0
        : Number(userData?.totalEarning.topBuyerTax) / blockChainConfig.decimals || 0,
      ///
      totalEarningTopLeaderTax: isNaN(Number(userData?.totalEarning.topLeaderTax))
        ? 0
        : Number(userData?.totalEarning.topLeaderTax) / blockChainConfig.decimals || 0,
      ///
      totalEarningWinningAmount: isNaN(Number(userData?.totalEarning.winningAmount))
        ? 0
        : Number(userData?.totalEarning.winningAmount) / blockChainConfig.decimals || 0,
      ///

      usdT: isNaN(Number(balance)) ? 0 : Number(balance) / blockChainConfig.decimals,
    };

    setUserInformation(userInformationData);
  }, [userData, balance]);

  useEffect(() => {
    if (userInformation) {
      /// calculate total erning

      let userInformationTemp = userInformation;
      const totalEarningBalance =
        userInformation.totalEarningPremiumReferralTax +
        userInformation.totalEarningPremiumTax +
        userInformation.totalEarningRefTax +
        userInformation.totalEarningTopBuyerTax +
        userInformation.totalEarningTopLeaderTax +
        userInformation.totalEarningWinningAmount;
      let availeableRefTax = 0;
      if (userInformation.refTax) {
        availeableRefTax = calculateAvailableRefTax(userInformation.refTax);
      }

      setUser({
        ...userInformation,
        totalEarningBalance: totalEarningBalance,
        availeableRefTax: availeableRefTax/blockChainConfig.decimals,
        totalRefBalance:
          userInformation.totalEarningPremiumReferralTax + userInformation.totalEarningRefTax,
        totalLeaderBalance:
          userInformation.totalEarningTopBuyerTax + userInformation.totalEarningTopLeaderTax,
        totalPremiumBalance: userInformation.totalEarningPremiumTax,
        //
        avaibleUsdBalance:
          (userInformation.winningAmount +
            userInformation.premiumReferralRewards +
            userInformation.premiumTax +
            availeableRefTax +
            userInformation.topBuyerTax +
            userInformation.topLeaderTax) /
          blockChainConfig.decimals,
        lastPurchased: 0, //  This seems to be unused in the current implementation
      });
    }
  }, [userInformation]);

  useEffect(() => {
    if (user) {
      console.log("user  info", user);
    }
  }, [user]);

  return { user, isError, ownerTaxAmount };
};
