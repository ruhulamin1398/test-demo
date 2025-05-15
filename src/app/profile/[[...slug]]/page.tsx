import type { Metadata } from "next";

import { CONFIG } from "@/global-config";
import { ProfileView } from "@/sections/profile/view";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Profile- ${CONFIG.appName}` };

export default async function Page() {
  return <ProfileView />;
}
