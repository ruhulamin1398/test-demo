import { CircularProgress } from "@/components/charts";
import { cn } from "@/utils";
import { useLeader } from "@/contracts/contractUtils/useLeader";

import React from "react";
import { blockChainConfig } from "@/contracts/const";
interface Props extends React.ComponentProps<"div"> {}

export const LeaderboardBonusCards = ({ className, ...props }: Props) => {
  const { topLeaderRunningBalance, topBuyerRunningBalance } = useLeader();
  return (
    <div {...props} className={cn("space-y-10 rounded-2xl px-8 py-6 2xl:px-24", className)}>
      <h5 className="text-center text-2xl">Leaderboard Bonus Poll</h5>

      <div className="items-center justify-between px-5 lg:flex lg:gap-8">
        <div className="flex flex-col items-center gap-x-2 gap-y-4">
          <p className="text-xl">Top Buyer (USDT) </p>
          <CircularProgress
            value={(topBuyerRunningBalance / blockChainConfig.decimals).toFixed(2)}
            className="size-40"
            strokeWidth={10}
          />
        </div>

        <div className="mt-16 flex flex-col items-center gap-x-2 gap-y-4 md:mt-14 lg:mt-0">
          <p className="text-xl">Top Leader (USDT) </p>
          <CircularProgress
            value={(topLeaderRunningBalance / blockChainConfig.decimals).toFixed(2)}
            className="size-40"
            strokeWidth={10}
          />
        </div>
      </div>
    </div>
  );
};
