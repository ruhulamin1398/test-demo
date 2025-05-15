
"use client";

import React from "react";
import { LeaderboardTable } from "./LeaderboardTable";

import { useLeader } from "@/contracts/contractUtils/useLeader";
interface Props extends React.ComponentProps<"div"> {}

export const TopLeaders = ({ ...props }: Props) => {
  const {topLeaders, topLeaderRunningBalance} = useLeader(); 
  return (
    <div {...props}>
      <LeaderboardTable  users= {topLeaders as any[]} reward={topLeaderRunningBalance as number} />
    </div>
  );
};
