import { OverviewAppView } from "@/sections/app/view";
import type { Metadata } from "next";

import { CONFIG } from "src/global-config";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewAppView />;
}
