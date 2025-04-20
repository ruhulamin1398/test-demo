import React from "react"; // Import your Apollo Client instance
import ProfileHeroSection from "@/components/organisms/ProfileHeroSection";
import CompetitionDetail from "@/components/organisms/CompetitionDetail";
import { SiingleCompetitionView } from "@/sections/competition-single/view";

export default async function HomePage() {
  return (
    <div>
      <SiingleCompetitionView />
      {/* <ProfileHeroSection /> */}
      <CompetitionDetail />
    </div>
  );
}
