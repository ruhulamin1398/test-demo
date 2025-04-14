import { HomeContestCategories } from "@/sections/home/home-contest-categories";
import { HomeFeaturedContest } from "@/sections/home/home-featured-contest";
import { HomeHero } from "@/sections/home/home-hero";
import { HomeHowItWorks } from "@/sections/home/home-how-it-works";
import React from "react";

export default async function HomePage() {
  return (
    <div>
      <HomeHero />

      <HomeContestCategories />

      <HomeFeaturedContest />

      {/* <LeaderboardSuccess/>
      <SuccessStories/> */}
      {/* <BrowseContests/> */}
      <HomeHowItWorks />
      {/* <ContestCTA /> */}
    </div>
  );
}
