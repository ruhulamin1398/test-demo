import type { Metadata } from "next";

import { CONFIG } from "@/global-config";

import { UserListView } from "@/sections/competition/view";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `User list | Dashboard - ${CONFIG.appName}`,
};

export default function Page() {
  return <UserListView />;
}
