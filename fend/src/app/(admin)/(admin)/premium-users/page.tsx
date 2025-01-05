"use client"

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopLeaders } from "../../leaderboard/TopLeaders";
import { TopBuyer } from "../../leaderboard/TopBuyer"; 
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { usePremiumBalance } from "@/contracts/contractUtils/usePremiumBalance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PremiumUsers = async () => {
  const {premiumUserList,premiumReserve} = usePremiumBalance();
  // const axiosSecure = useAxiosSecure();

  // console.log(axiosSecure)

  // const response = await axiosSecure.get("/leaderBuyer");

  // console.log("leader", response);

  return ( <> 
    <section className="[#16183E] bg-transparent">
      
    <h1 className="mb-1 mt-0 text-xl font-bold">Premium User List</h1>


    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Reward</TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody>
          {premiumUserList?.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
               <TableCell>
                {user.user.slice(0, 4)}...{user.user.slice(-4)}
              </TableCell> 
             <TableCell>${(Number(user.amount) / 1e6).toFixed(2)}</TableCell>  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    </section>
    </>
  );
};

export default PremiumUsers;
