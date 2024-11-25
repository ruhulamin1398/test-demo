import { Gift } from "lucide-react";
import React from "react";
import { ShowBuyModal } from "./ShowBuyModal";
import { SrbijaFont } from "@/fonts";
import { cn } from "@/utils";
import Counter from "@/components/counter/Counter";
import { Lottery, Prize } from "@/types";

import { useLatestLottery } from "@/contracts/contractUtils/useLatestLottery";
interface Props extends React.ComponentProps<"div"> {
  lottery: Lottery;
  loading: boolean;
}

interface CustomerData {
  customer: string;
}

export const JackPotCards = ({ className, lottery, loading, ...props }: Props) => {
  const { lotteryType, holders, price, prizeDistribution, ticketSold } = lottery;
  const { latestEasyLottery, latestSuperLottery } = useLatestLottery();

  const activeLottery = lotteryType == "0" ? latestEasyLottery : latestSuperLottery;
  // console.log("active lottery is ", activeLottery.tickets);

  // const uniqueCustomers = new Set<string>(activeLottery?.tickets?.map((item: CustomerData) => item?.customer));

  if (loading) return;

  return (
    <div {...props}>
      <div className="mb-2 flex w-full items-center justify-end gap-x-2">
        <p className="flex items-center justify-center gap-x-2 rounded-lg bg-green-500 px-2">
          <span>Live</span> <span className="inline-block size-4 rounded-full bg-red-600"></span>
        </p>
        <Counter />
      </div>

      <div className={cn("rounded-2xl p-6", className)}>
        <div className="flex items-center justify-between">
          <p className="font-black">{lotteryType == "0" ? "EASY" : "SUPER"} JACKPOT</p>
          <div>
            <p>Per Tickets</p>
            <p className={`text-end text-xl font-black text-green-400 ${SrbijaFont.className}`}>
              {price} <span className="usdt">USDT</span>
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {prizeDistribution.slice(0, 5).map((prize: Prize, idx: number) => {
            const ordinal = (n: number) => {
              const suffixes = ["th", "st", "nd", "rd"];
              const mod100 = n % 100;
              return suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0];
            };

            return (
              <div
                className={`flex items-center justify-between gap-x-2 ${SrbijaFont.className}`}
                key={idx}
              >
                <p className="flex items-center gap-x-1">
                  <Gift className="text-yellow-500" />
                  <span className={`font-medium uppercase`}>
                    {`${idx + 1}${ordinal(idx + 1)} Prize ${prize.person} Person${prize.person > 1 ? "s" : ""}`}
                  </span>
                </p>
                <p className="space-x-1 text-xl font-medium leading-4 text-green-400">
                  <span>{prize.amount}</span>
                  <span className="usdt">USDT</span>
                </p>
              </div>
            );
          })}
        </div>

        <div className={`mt-6 w-full text-center ${SrbijaFont.className}`}>
          <div className="grid grid-cols-3">
            <p className="pl-6 text-left">Round</p>
            <p className="whitespace-nowrap">Ticket Purchase </p>
            <p>Participants</p>
          </div>

          <div className="main-gradient-reserver grid grid-cols-3 rounded-md py-2">
            <p>{Number(activeLottery ? activeLottery[0] : 0)} </p>
            <p>{Number(activeLottery ? activeLottery[1] : 0)} </p>
            <p>{Number(activeLottery ? activeLottery[2] : 0)} </p>
          </div>
        </div>

        <ShowBuyModal lottery={lottery} activeLottery={activeLottery} />
      </div>
    </div>
  );
};
