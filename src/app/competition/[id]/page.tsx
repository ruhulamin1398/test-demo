import React from "react"; // Import your Apollo Client instance
import ProfileHeroSection from "@/components/organisms/ProfileHeroSection";
import CompetitionDetail from "@/components/organisms/CompetitionDetail";

export default async function HomePage() {
  return (
    <div>
      <ProfileHeroSection />
      <CompetitionDetail />
    </div>
  );
}
