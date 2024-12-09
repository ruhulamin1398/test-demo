
"use client";

import React, { useEffect, useState } from "react";
import { LargeRootNav } from "./LargeRootNav";
import { MobileRootNav } from "./MobileRootNav";
import { useCreatePurchaseMutation } from "@/redux/api/all-api/lottery";
import { useContractRead } from "wagmi";
import { blockChainConfig } from "@/contracts/const";
interface Props extends React.ComponentProps<"div"> {}

export const RootNav = ({ ...props }: Props) => {

  const [latestEasyLottery, setLatestEasyLottery] = useState<any>([]);
  const [latestSuperLottery, setLatestSuperLottery] = useState<any>([]);

  const [createPurchase] = useCreatePurchaseMutation();

  const routs = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "about",
      path: "/about",
    },
    {
      name: "prize",
      path: "/prize",
    },
    {
      name: "winners",
      path: "/winners",
    },
    {
      name: "contact",
      path: "/contact",
    },
  ];


  // useEffect(() => {

  //   const SendToDb = async () => {

  //     const dbData = localStorage.getItem("dbData");
  //     if(dbData){

  //       const response = await createPurchase(JSON.parse(dbData)).unwrap();
        
  //       if (response.message === "Ticket purchased successfully") {
          
  //         localStorage.removeItem("purchaseStatus");
  //         localStorage.removeItem("dbData");
          
          
  //         // toast.success("Ticket purchased successfully");
          
          
  //       } else {
  //         // toast.error("An error occurred during the purchase.");
  //       }
  //     }
  //   }
  //   const status = localStorage.getItem("dbData");

  //   if (status !== null) {
  //     SendToDb();
  //   }



  // }, [])

  // const { data: LatestEasy } = useContractRead({
  //   address: blockChainConfig.contractAddress as `0x${string}`,
  //   abi: blockChainConfig.lotteryABI,
  //   functionName: 'GetLatestLottery',
  //   args: [0],
  // });





  // const { data: LatestSuper } = useContractRead({
  //   address: blockChainConfig.contractAddress as `0x${string}`,
  //   abi: blockChainConfig.lotteryABI,
  //   functionName: 'GetLatestLotteryTicketRoundCustomerCount',
  //   args: [1],
  // });


  // useEffect(() => {
  //   if(LatestEasy){
  //     console.log(LatestEasy);
  //     setLatestEasyLottery(LatestEasy);
  //   }
  // }, [LatestEasy]);

  // useEffect(() => {
  //   if(LatestSuper){
  //     setLatestSuperLottery(LatestSuper);
  //   }
  // }, [LatestSuper]);

  return (
    <nav {...props} className="border-b border-gray-400/50 bg-[#1A1D46] px-10 py-3 text-white">
      <MobileRootNav className="lg:hidden" routs={routs} />
      <LargeRootNav className="hidden lg:flex" routs={routs} />
    </nav>
  );
};
