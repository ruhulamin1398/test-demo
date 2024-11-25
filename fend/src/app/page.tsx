import React from "react";
import { RootNav } from "@/components/shared/RootNav";
import { Hero, ShowLotteryDetails, ShowHomeStates, HomeFooter, HomeFAQ } from "./_home";
import { Noise } from "@/components/shared";

const RootPage = () => {
  return (
    <Noise className="mx-auto 2xl:container">
      <RootNav />
      <div className="mx-auto">
        <Hero />
        <ShowLotteryDetails />

        <HomeFAQ />
        <ShowHomeStates />
        <HomeFooter />
      </div>
    </Noise>
  );
};

export default RootPage;
