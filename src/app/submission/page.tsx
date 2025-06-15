import { mockSubmissions } from "@/_mock/data";
import { CONFIG } from "@/global-config";
import { SubmissionHomeView } from "@/sections/submission/view";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Submission List - ${CONFIG.appName}`,
};

export default async function Page() {
  return <SubmissionHomeView submissions={mockSubmissions} />;
}
