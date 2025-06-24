import React from "react";
import { SingleCompetitionView } from "@/sections/competition-single/view";
import { Metadata } from "next";
import { CONFIG } from "@/global-config";

export const metadata: Metadata = { title: `Competitions - ${CONFIG.appName}` };
export default async function HomePage() {
  return (
    <div>
      <SingleCompetitionView />
    </div>
  );
}
