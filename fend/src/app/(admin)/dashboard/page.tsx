/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useCallback, useEffect, useState } from "react";

import { JackPotCards } from "./JackPotCards";
import { ResultsCards } from "./ResultsCards";
import { ShowEarningCard } from "./ShowEarningCard";
import { LeaderboardBonusCards } from "./LeaderboardBonusCards";
import { SrbijaFont } from "@/fonts";
import { Lottery } from "@/types";
import { GetLottery } from "@/Api/GetLottery";
import { useAccount, useContractRead } from "wagmi";
import { usePremiumBalance } from "@/contracts/contractUtils/usePremiumBalance";
import { useReferralData } from "@/contracts/contractUtils/useReferralData";
import { useLeader } from "@/contracts/contractUtils/useLeader";
import { useUser } from "@/contracts/contractUtils/useUser";


import { useCreateUserMutation, useGetSingleUserDetailsQuery } from "@/redux/api/all-api/users";

import { useGetLotteryForBoardQuery } from "@/redux/api/all-api/lottery";
import { SuperResultsCards } from "./SuperResultsCards";

import { blockChainConfig } from "@/contracts/const";


const Dashboard = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { premiumBalance, premiumStatus } = usePremiumBalance();
  const { referralInfo } = useReferralData();

  const { data, isLoading } = useGetSingleUserDetailsQuery({ address });

  const { data: boardData, isLoading: boardLoading } = useGetLotteryForBoardQuery(undefined)

  const { lotteries, loading } = GetLottery();

  const [createAccount, { isSuccess }] = useCreateUserMutation();

  const [sendData, setSendData] = useState<boolean>(false);
  const { leaderBalance } = useLeader();
  const { user } = useUser();
  // console.log("Leader balance " , leaderBalance);
  const [latestSuper, setLatestSuper] = useState<number>(-1);
  const [latestEasy, setLatestEasy] = useState<number>(-1);

  useEffect(() => {
    for (let i = 0; i < lotteries.length; i++) {
      if (lotteries[i]?.lotteryType === "1" && lotteries[i]?.lotteryId > latestSuper) {
        setLatestSuper(i);
      }

      if (lotteries[i]?.lotteryType === "0" && lotteries[i]?.lotteryId > latestEasy) {
        setLatestEasy(i);
      }
    }

  }, [lotteries])
  const sendAccountData = useCallback(async () => {
    if (isConnected && !sendData) {
      const ref = localStorage.getItem("ref");

      try {
        const data = {
          referredById: ref,
          account: {
            address: address,
          },
        };

        const response = await createAccount(data);

        if (
          response.data?.message === "Account created successful." ||
          (response?.error && "status" in response.error && response.error.status === 400)
        ) {
          setSendData(true);
          localStorage.removeItem("ref");
        }
      } catch (error) {
        setSendData(true);
        localStorage.removeItem("ref");
      }
    }
  }, [sendData, createAccount, isSuccess]);

  useEffect(() => {
    if (isConnected && !sendData) {
      sendAccountData();
    }
  }, [isConnected, sendData, sendAccountData]);

  useEffect(() => {
    if (isConnected) {
      setSendData(true);
    }
    if (isDisconnected) {
      setSendData(false);
    }
  }, [isDisconnected, isConnected]);


  // console.log("boardData", boardData)


  if (loading || isLoading || boardLoading) return;



  return (
    <div>
      <h1 className="mb-3 mt-5 text-xl font-black">Dashboard</h1>

      <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
         
     {(latestEasy>-1) && <JackPotCards
            lottery={lotteries[latestEasy]}
            loading={loading}
            key={lotteries[latestEasy]?._id}
            className={`${lotteries[latestEasy]?.lotteryType === "0" ? "main-gradient" : "primary-bg-gradient"} ${lotteries[latestEasy]?.drawn !== false && "hidden"}`}
          />}
                
     {(latestSuper>-1) && <JackPotCards
            lottery={lotteries[latestSuper]}
            loading={loading}
            key={lotteries[latestSuper]?._id}
            className={`${lotteries[latestSuper]?.lotteryType === "0" ? "main-gradient" : "primary-bg-gradient"} ${lotteries[latestSuper]?.drawn !== false && "hidden"}`}
          />}
          
     
       
      </div>

      {/* <h4 className="mt-5">Results Board </h4> */}
      <div className="grid w-full grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2 mt-12">
        <ResultsCards className="main-gradient" round={boardData?.roundForEasy} data={boardData?.lotteryType0} />


        <SuperResultsCards className="primary-bg-gradient" round={boardData?.roundForSuper} data={boardData?.lotteryType1} />
      </div>

      {/* <h4 className="mt-5">Earning Board</h4> */}
      <div
        className={`grid w-full grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2 mt-12 ${SrbijaFont.className}`}
      >

        <ShowEarningCard className="main-gradient"
          jackpotFund={user?.winningAmount?.toFixed(2) || "0.00"}
          leaderboardBonus={((user?.topBuyerTax + user?.topLeaderTax) / blockChainConfig.decimals)?.toFixed(2) || "0.00"}
          premiumBonus={premiumBalance.toFixed(2)}

          referralCommission={((isNaN(user?.premiumReferralRewards) ? 0 : user?.premiumReferralRewards) +        (isNaN(referralInfo?.totalReferredAmount) ? 0 : referralInfo?.totalReferredAmount)).toFixed(2) || "0.00"}

        />

        <LeaderboardBonusCards className="primary-bg-gradient" />
      </div>
    </div>
  );
};

export default Dashboard;
