import { CONFIG } from "@/global-config";
import { HomeView } from "@/sections/home/view";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: `Home Page - ${CONFIG.appName}` };
export default async function HomePage() {
  return <HomeView />;
}
