import { cn } from "@/utils";
import React from "react";

import { usePremiumBalance } from "@/contracts/contractUtils/usePremiumBalance";
interface Props extends React.ComponentProps<"div"> {
  jackpotFund: string;  
  leaderboardBonus: string;  
  premiumBonus: string;  
  referralCommission: string;
} 

export const ShowEarningCard = ({
  className,
  jackpotFund,
  leaderboardBonus,
  premiumBonus,
  referralCommission,
  ...props
}: Props) => {
  
  const {premiumBalance, premiumStatus }= usePremiumBalance();
  const EarningSources = [
    {
      name: "Jackpot fund",
      value: `${jackpotFund}`,
    },
    {
      name: "Referral Commission",
      value: `${referralCommission}`,
    },
    {
      name: "Leader Bonus",
      value: `${leaderboardBonus}`,
    },
   
  ];
  if(premiumStatus === true){
    EarningSources.push( {
      name: "Premium User Bonus ",
      value: `${premiumBonus}`,
    });
  }
  return (
    <div {...props} className={cn("rounded-2xl px-4 py-4", className)}>
      <div className="flex items-center justify-between px-0 py-3">
        <h4 className="w-full text-center text-lg lg:text-2xl">Total Earning Summary</h4>
        <p></p>
      </div>

      <div className="mt-4 space-y-4">
        {EarningSources.map((source) => (
          <div
            key={source.name}
            className="flex items-center justify-between rounded-md px-2 lg:text-xl"
          >
            <p className="">{source.name}</p>
            <p className="space-x-1">
              <span className="text-green-400">{source.value}</span>
              <span className="usdt">USDT</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
