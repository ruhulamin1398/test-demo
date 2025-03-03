import React from "react";
import HeroSection from "@/components/organisms/HeroSection";
import ContestCategories from "@/components/organisms/ContestCategories";
import FeaturedContests from "@/components/organisms/FeaturedContests";
import BrowseContests from "@/components/organisms/BrowseContests";
import HowItWorks from "@/components/organisms/HowItWorks";
import ContestCTA from "@/components/organisms/ContestCTA";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      {/* <CompetitionGrid /> */}
      <ContestCategories/>
      <FeaturedContests/>
      {/* 
      <LeaderboardSuccess/>
      <SuccessStories/> */}
      <BrowseContests/>
      <HowItWorks/>
      <ContestCTA/>
    </div>
  );
}
