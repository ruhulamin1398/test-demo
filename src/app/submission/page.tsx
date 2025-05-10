import { mockSubmissions } from "@/_mock/data";
import { SubmissionHomeView } from "@/sections/submission/view";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: "Submission List" };

export default async function Page() {
  return <SubmissionHomeView submissions={mockSubmissions} />;
}
