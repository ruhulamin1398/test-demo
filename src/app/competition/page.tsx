import React from "react"; // Import your Apollo Client instance
import ProfileHeroSection from "@/components/organisms/ProfileHeroSection";
import CompetitionGridInfiniteScroll from "@/components/organisms/CompetitionGridInfiniteScroll";

export default async function HomePage() {
  return (
    <div>
      <ProfileHeroSection />
      <CompetitionGridInfiniteScroll />
    </div>
  );
}
