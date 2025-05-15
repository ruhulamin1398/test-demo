"use client";

import React, { useEffect, useState } from "react";
import { EditionCards } from "./EditionCards";
import { GetLottery } from "@/Api/GetLottery";
import { useLatestLottery } from "@/contracts/contractUtils/useLatestLottery";
interface Props extends React.ComponentProps<"div"> {}

export const ShowLotteryDetails = ({ ...props }: Props) => {
  const { lotteries, loading } = GetLottery();

  const [latestSuper, setLatestSuper] = useState<number>(-1);
  const [latestEasy, setLatestEasy] = useState<number>(-1);

  const { latestEasyLottery, latestSuperLottery } = useLatestLottery();

  useEffect(() => {
    for (let i = 0; i < lotteries.length; i++) {
      if (lotteries[i]?.lotteryType === "1" && lotteries[i]?.lotteryId > latestSuper) {
        setLatestSuper(i);
      }

      if (lotteries[i]?.lotteryType === "0" && lotteries[i]?.lotteryId > latestEasy) {
        setLatestEasy(i);
      }
    }
  }, [lotteries]);

  return (
    <div {...props} className="mx-4 md:mx-10">
      <div className="py-6">
        <h3 className="home-header">super rare edition GAMING HUBS</h3>
        <p className="home-subheader">
          Find your maximum and daily revenue share by modifying the calculators settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <EditionCards
          jackpotType="Easy"
          price="3"
          lottery={lotteries[latestEasy]}
          lotteryFromBc={latestEasyLottery}
        />
        <EditionCards
          jackpotType="Super"
          price="10"
          lottery={lotteries[latestSuper]}
          lotteryFromBc={latestSuperLottery}
        />
      </div>
    </div>
  );
};
