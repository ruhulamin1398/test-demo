"use client";
import React from "react";
import { LeaderboardTable } from "./LeaderboardTable";
import { useLeader } from "@/contracts/contractUtils/useLeader";
interface Props extends React.ComponentProps<"div"> {}

const TopBuyer = ({ ...props }: Props) => {
  const { topBuyers, topBuyerRunningBalance } = useLeader();

  return (
    <div {...props}>
      <LeaderboardTable users={topBuyers as any[]} reward={topBuyerRunningBalance as number} />
    </div>
  );
};

export default TopBuyer;
