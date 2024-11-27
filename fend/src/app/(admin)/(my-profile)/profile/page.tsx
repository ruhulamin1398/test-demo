"use client";
import usdtIcons from "@/assets/svg/USDT-icon.svg";
import { LogoMin } from "@/components/shared/Logo";
import { Copy, SquareMousePointer, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils";
import { useGetSingleUserDetailsQuery } from "@/redux/api/all-api/users";
import { usePremiumBalance } from "@/contracts/contractUtils/usePremiumBalance";
import { useUser } from "@/contracts/contractUtils/useUser";
import { useReferralData } from "@/contracts/contractUtils/useReferralData";
import { useLeader } from "@/contracts/contractUtils/useLeader";
import { blockChainConfig } from "@/contracts/const";

import { toast } from "react-toastify";
import { parseEther, parseGwei } from 'viem'


import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { BrowserProvider, Contract, ethers, JsonRpcProvider, solidityPackedKeccak256 } from "ethers"

const Profile = () => {

  const { address } = useAccount();
  const { premiumBalance } = usePremiumBalance();
  const { referralInfo } = useReferralData();
  const { user } = useUser();

  const { data, isLoading } = useGetSingleUserDetailsQuery({ address });
  const [totalEarning, setTotalEarning] = useState<number>(0);
  const [totalUSDTBalance, setTotalUSDTBalance] = useState<number>(0);



  const { data: withdrawAmountHash, writeContract: withdrawAmount, error: withdrawAmountErr } = useWriteContract();
  const { isLoading: isWithDewing, isSuccess: iswithDrwan } = useWaitForTransactionReceipt({ hash: withdrawAmountHash });

  const {data: usdtApprovalHash, writeContract: approveUSDT, error: usdtApprovalErr,  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({hash: usdtApprovalHash, });

  const {data: becomePremiumHash,writeContract: becomePremium,error: becomePremiumErr, } = useWriteContract();
  const { isLoading: becomePremiumLoading, isSuccess: becomePremiumCompleted } = useWaitForTransactionReceipt({hash: becomePremiumHash,});

  const withDrawOwnerReawrdAmount = async () => {

    toast.loading("Transferring ...");
    try {





      withdrawAmount({
        abi: blockChainConfig.lotteryABI,
        address: blockChainConfig.contractAddress as `0x${string}`,
        functionName: 'OwnerTaxWithDraw',
        args: [],
        maxFeePerGas: parseGwei('30'),
        gas: 25_333_333n,
      });





    } catch (err) {
      toast.dismiss();
      toast.error("Error in Withdraw ");
    }
  }


  const withDrawReawrdAmount = async () => {
    if (totalUSDTBalance < 10) {

      toast.error(`Withdraw required minimum 10 USDT`);
    } else {

      toast.loading("Transferring ...");
      try {





        withdrawAmount({
          abi: blockChainConfig.lotteryABI,
          address: blockChainConfig.contractAddress as `0x${string}`,
          functionName: 'WithDrawRewardBaalance',
          args: [],
          maxFeePerGas: parseGwei('30'),
          gas: 25_333_333n,
        });





      } catch (err) {
        toast.dismiss();
        toast.error("Error in Withdraw ");
      }

    }



  }
const becomePremiumAccount= async()=>{
  const requireUsdtAmount = 200 ;
//  console.log( "Current usdT balance is ", user?.usdT)
 toast.loading("Wait .......");

  if(user?.usdT < requireUsdtAmount ){
    toast.dismiss();
    toast.error(`Balance required minimum 200 USDT`);

    return ;
  }

  //apparove 200 used to become premium

  try {
    approveUSDT({
      abi: blockChainConfig.erc20ABI,
      address: blockChainConfig.USDTaddress as `0x${string}`,
      functionName: "approve",
      args: [blockChainConfig.contractAddress as `0x${string}`, requireUsdtAmount* blockChainConfig.decimals],

    });
  } catch (err) {
    // console.log("error", err);
  }

}

useEffect(() => {
  if (usdtApprovalHash   && isConfirmed) {
    
    try {
      becomePremium({
        abi: blockChainConfig.lotteryABI,
        address: blockChainConfig.contractAddress as `0x${string}`,
        functionName: "addPremiumAccountWithReferral",
        args: [
          data?.originalUser?.referredBy?.address,
        ],
      });
    } catch (err) {
      toast.error("An error occurred during become Premium"); 
    }

 
    
  }
}, [isConfirmed]);

useEffect(()=>{
  if(becomePremiumCompleted){
    toast.dismiss();
    toast.success("You are now a premium account");
  }

}, [becomePremiumCompleted])


  useEffect(() => {
    // console.log(" withDraw in  iswithDrwan Changed  ", iswithDrwan)

    if (iswithDrwan) {
      toast.dismiss();
      toast.success("Withdraw success");
    }

  }, [iswithDrwan]);

  const formatAddress = (address: string) => {
    return `${address?.slice(0, 6)}......${address?.slice(-6)}`;
  };
  useEffect(() => {
    if (
      premiumBalance !== undefined &&
      referralInfo?.totalReferredAmount !== undefined &&
      user?.winningAmount !== undefined &&
      user?.topLeaderTax !== undefined &&
      user?.topBuyerTax !== undefined &&
      user?.totalRewadBalanceWithdraw !== undefined
    ) {

      // setTotalEarning(premiumBalance + referralInfo?.totalReferredAmount  + user?.winningAmount+(user?.topLeaderTax+user?.topBuyerTax+ user?.totalRewadBalanceWithdraw)/blockChainConfig.decimals);
      const earning = (isNaN(premiumBalance) ? 0 : premiumBalance) +
        (isNaN(referralInfo?.totalReferredAmount) ? 0 : referralInfo?.totalReferredAmount) +
        (isNaN(user?.winningAmount) ? 0 : user?.winningAmount) +
        (isNaN(user?.topLeaderTax) ? 0 : user?.topLeaderTax / blockChainConfig.decimals) +
        (isNaN(user?.topBuyerTax) ? 0 : user?.topBuyerTax / blockChainConfig.decimals) +
        (isNaN(user?.totalRewadBalanceWithdraw) ? 0 : user?.totalRewadBalanceWithdraw / blockChainConfig.decimals)

      setTotalEarning(earning);


      // setTotalUSDTBalance(premiumBalance + referralInfo?.totalReferredAmount  + user?.winningAmount+(user?.topLeaderTax+user?.topBuyerTax)/blockChainConfig.decimals);
      const ustdBal =
        (isNaN(premiumBalance) ? 0 : premiumBalance) +
        (isNaN(referralInfo?.totalReferredAmount) ? 0 : referralInfo?.totalReferredAmount) +
        (isNaN(user?.winningAmount) ? 0 : user?.winningAmount) +
        (isNaN(user?.premiumReferralRewards) ? 0 : user?.premiumReferralRewards) +
        (isNaN(user?.topLeaderTax) ? 0 : user?.topLeaderTax / blockChainConfig.decimals) +
        (isNaN(user?.topBuyerTax) ? 0 : user?.topBuyerTax / blockChainConfig.decimals)


      setTotalUSDTBalance(ustdBal);


    }


  }, [premiumBalance, user]);

  const arr = [
    {
      title: "USDT Balance",
      value: `$${totalUSDTBalance.toFixed(2)}`,
    },
    {
      title: "Total Earnings",
      value: `$${totalEarning.toFixed(2)}`,
    },
    {
      title: "Total Purchase",

      value: `$${user?.totalSpend.toFixed(2)}`,
    },
  ];

  if (isLoading) return;

  return (
    <section>
      <div className="mt-10">
        <h2 className="mb-2 text-lg font-extrabold lg:text-2xl">My Profile </h2>
        <div className="flex items-start gap-3 rounded-sm bg-[#1A1D46] pt-2 text-gray-200 sm:p-2 lg:items-center">
          <LogoMin className="ml-2 size-24" />
          <div className="flex flex-1 flex-col items-start justify-between gap-y-3 px-2 lg:flex-row lg:items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-x-2">
                <p className="font-black text-gray-400 lg:text-xl">
                  {formatAddress(data?.originalUser?.address)}
                </p>
                <Copy className="size-3 -translate-y-1" />
              </div>

              <div className="flex flex-col items-start gap-x-4 gap-y-2 md:flex-row">
                <div className="flex items-center gap-x-4">
                  <div className="flex h-5 items-center">
                    <User className="size-4" />
                    <p className="h-full font-black">
                      {data?.originalUser?.userType === "user" ? "User" : "Premium"}
                    </p>
                  </div>

                  <div className="flex h-5 items-center">
                    <User className="size-4" />
                    <p className="h-full font-black">
                      {data?.originalUser?.userStatus === "active" ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>

                <div className="flex h-5 items-center">
                  <SquareMousePointer className="size-4" />
                  <p className="h-full font-black">
                    <span className="text-sm leading-3 text-gray-300 mr-2">EXP: </span>
                    <span>
                      {new Date(data?.originalUser?.expiryDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true, // This ensures AM/PM is displayed
                      })}
                    </span>

                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              {(process.env.NEXT_PUBLIC_OWNER == address) ?
                <button className="btn-gradient-purple lg:text-lg" onClick={() => withDrawOwnerReawrdAmount()}>Withdraw Owner Tax</button>
                :
                <>
                
                <button className="btn-gradient-purple lg:text-lg" onClick={() => withDrawReawrdAmount()}>Withdraw</button>
                </>
              }
              {(user?.premium==0 && process.env.NEXT_PUBLIC_OWNER != address)&&(<button className="btn-gradient-purple lg:text-lg" onClick={() => becomePremiumAccount()}>Become Premium</button>)}
             
             
              
            </div>
          </div>
        </div>

        {(process.env.NEXT_PUBLIC_OWNER != address) ?
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {arr.map((items, index) => {
              return (
                <div key={items.title} className="gap-x-3 rounded-sm bg-[#1A1D46] p-4 text-gray-200">
                  <p className="font-black lg:text-xl">{items?.title}</p>
                  <p
                    className={cn("mt-3 gap-x-1 text-lg font-black lg:text-xl", {
                      "flex items-center": index === 0,
                    })}
                  >
                    {index === 0 && <Image src={usdtIcons} alt="USDT Icon" className="size-5" />}
                    <span className="translate-y-1"> {items?.value}</span>
                  </p>
                </div>
              );
            })}

          </div> :
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">


            <div className="gap-x-3 rounded-sm bg-[#1A1D46] p-4 text-gray-200">
              <p className="font-black lg:text-xl">Owner Tax </p>
              <p
                className="mt-3 gap-x-1 text-lg font-black lg:text-xl   flex items-center"
              >
                <Image src={usdtIcons} alt="USDT Icon" className="size-5" />
                <span className="translate-y-1">{Number(user?.ownerTax[0])/blockChainConfig.decimals}</span>
              </p>
            </div>



          
            <div className="gap-x-3 rounded-sm bg-[#1A1D46] p-4 text-gray-200">
              <p className="font-black lg:text-xl">Owner Premium Tax </p>
              <p
                className="mt-3 gap-x-1 text-lg font-black lg:text-xl   flex items-center"
              >
                <Image src={usdtIcons} alt="USDT Icon" className="size-5" />
                <span className="translate-y-1">{Number(user?.ownerTax[1])/blockChainConfig.decimals}</span>
              </p>
            </div>

          
            <div className="gap-x-3 rounded-sm bg-[#1A1D46] p-4 text-gray-200">
              <p className="font-black lg:text-xl">Owner Total Tax </p>
              <p
                className="mt-3 gap-x-1 text-lg font-black lg:text-xl   flex items-center"
              >
                <Image src={usdtIcons} alt="USDT Icon" className="size-5" />
                <span className="translate-y-1">{Number(user?.ownerTax[2])/blockChainConfig.decimals }</span>
              </p>
            </div>



          </div>
        }
      </div>
    </section>
  );
};

export default Profile;
