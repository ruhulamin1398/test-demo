import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopLeaders } from "./TopLeaders";
import { TopBuyer } from "./TopBuyer";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const Leaderboard = async () => {
  // const axiosSecure = useAxiosSecure();

  // console.log(axiosSecure)

  // const response = await axiosSecure.get("/leaderBuyer");

  // console.log("leader", response);

  return (
    <section className="[#16183E] bg-transparent">
      <Tabs defaultValue="Top-Buyer">
        <TabsList className="bg-transparent">
          <TabsTrigger value="Top-Buyer">Top Buyer</TabsTrigger>
          <TabsTrigger value="Top-Leaders">Top Leaders</TabsTrigger>
        </TabsList>

        <TabsContent value="Top-Buyer">
          <TopBuyer />
        </TabsContent>
        <TabsContent value="Top-Leaders">
          <TopLeaders />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Leaderboard;
