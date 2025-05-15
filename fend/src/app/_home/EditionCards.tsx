import { Gift } from "lucide-react";
import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";
interface Props extends React.ComponentProps<"div"> {
  jackpotType: string;
  price: string;
  lottery: any;
  lotteryFromBc: any;
}

export const EditionCards = ({ jackpotType, lotteryFromBc, price, lottery, ...props }: Props) => {
  const data = lottery?.prizeDistribution;
  // const ticketSold = Number(lotteryFromBc ? lotteryFromBc[1] : 0);
  const ticketSold = 50;
  const maxTicket = lottery?.maxTicket || 0;
  console.log(" lottery is ", lottery);
  const ordinal = (n: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const mod100 = n % 100;
    return suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0];
  };
  console.log("lotteryFromBc    ________________", lotteryFromBc);
  return (
    <div {...props}>
      <div className="flex justify-between px-5 py-3 text-center text-base uppercase md:text-lg">
        <p>{jackpotType} Jackpot</p>
        <p>
          Ticket Price {price} <span className="usdt">USDT</span>
        </p>
      </div>
      <div className="glassmorphism test-xs space-y-1 px-2 py-4 md:space-y-3 md:px-10 md:py-12 md:text-base">
        <ProgressBar
          labelClassName="font-normal"
          completed={(100 * ticketSold) / maxTicket}
          customLabel={`${ticketSold}/${maxTicket}`}
        />
        {data?.map((item, id) => {
          return (
            <div className={`flex items-center justify-between gap-x-2 py-2`} key={id}>
              <p className="flex items-center gap-x-1">
                <Gift className="text-yellow-500" />
                <span className={`uppercase`}>
                  {id + 1}
                  {ordinal(id + 1)} Prize {item?.person} Person
                </span>
              </p>
              <p className="space-x-1 leading-4 text-green-400">
                <span>{item?.amount}</span>
                <span className="usdt">USDT</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
