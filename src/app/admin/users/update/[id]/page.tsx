import type { Metadata } from "next";
import { CONFIG } from "src/global-config";
import { UserFormView } from "../UserFormView";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Create a new user | Dashboard - ${CONFIG.appName}`,
};

export default function Page() {
  return <UserFormView />;
}
