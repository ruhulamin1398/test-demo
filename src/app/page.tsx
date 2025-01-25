import React from "react";
import HeroSection from "@/components/organisms/HeroSection"; // Import your Apollo Client instance
import CompetitionGrid from "@/components/organisms/CompetitionGrid";
import { cookies } from "next/headers";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <CompetitionGrid />
    </div>
  );
}
