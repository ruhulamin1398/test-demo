import { SubmissionHomeView } from "@/sections/submission/view";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: "Submission List" };

export default async function Page() {
  const entryList = [
    {
      id: 1,
      title: "Mountain Sunset",
      category: "Photography",
      image: "/banner-back.jpg",
      likes: 234,
      author: "Sarah Parker",
      description: "Capture the beauty of nature in its purest form.",
      isVote: true,
    },
    {
      id: 2,
      title: "City Lights",
      description: "Capture the beauty of nature in its purest form.",
      category: "Video",
      image: "/banner-back.jpg",
      likes: 189,
      author: "Mike Chen",
      isVote: false,
    },
    {
      id: 3,
      title: "Colors of Life",
      description: "Capture the beauty of nature in its purest form.",
      category: "Story",
      image: "/banner-back.jpg",
      likes: 156,
      author: "Emma Wilson",
      isVote: false,
    },
    {
      id: 4,
      title: "Colors of Life",
      description: "Capture the beauty of nature in its purest form.",
      category: "Story",
      image: "/banner-back.jpg",
      likes: 156,
      author: "Emma Wilson",
      isVote: false,
    },
    {
      id: 5,
      title: "Colors of Life",
      description: "Capture the beauty of nature in its purest form.",
      category: "Story",
      image: "/banner-back.jpg",
      likes: 156,
      author: "Emma Wilson",
      isVote: false,
    },
    {
      id: 6,
      title: "Colors of Life",
      description: "Capture the beauty of nature in its purest form.",
      category: "Story",
      image: "/banner-back.jpg",
      likes: 156,
      author: "Emma Wilson",
      isVote: false,
    },
    {
      id: 7,
      title: "Colors of Life",
      description: "Capture the beauty of nature in its purest form.",
      category: "Story",
      image: "/banner-back.jpg",
      likes: 156,
      author: "Emma Wilson",
      isVote: false,
    },
  ];

  return <SubmissionHomeView entries={entryList} />;
}
