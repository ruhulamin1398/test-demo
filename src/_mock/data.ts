export interface IDeadlineReminder {
  id: string;
  title: string; //@h this may be round title
  roundId: string;
  competitionId: string; //@h
  submissionEndDate: Date;
}
export const CoursesReminder: IDeadlineReminder[] = [
  {
    id: "1",
    title: "Photo Competition round 2",
    roundId: "round2",
    competitionId: "competition1", // Assuming competition IDs for example
    submissionEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    id: "2",
    title: "Art Competition round 1",
    roundId: "round1",
    competitionId: "competition2", // Assuming competition IDs for example
    submissionEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    id: "3",
    title: "Photo Competition round 2",
    roundId: "round2",
    competitionId: "competition1", // Assuming competition IDs for example
    submissionEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    id: "4",
    title: "Photo Competition round 2",
    roundId: "round2",
    competitionId: "competition1", // Assuming competition IDs for example
    submissionEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
];

export interface ISubmissions {
  id: string;
  roundId: string;
  createdAt: Date;
  score: number;
  submittedContent: string;
  title: string; //@h this may be round title
  competitionId: string; //@h
}

export const MyRecentSubmissions: ISubmissions[] = [
  {
    id: "1",
    roundId: "round-2",
    createdAt: new Date("2025-05-10T12:00:00Z"),
    score: 85,
    submittedContent: "Image123.png",
    title: "Sunset Over the Mountains",
    competitionId: "photo-competition",
  },
  {
    id: "2",
    roundId: "round-1",
    createdAt: new Date("2025-05-09T09:00:00Z"),
    score: 70,
    submittedContent: "ArtPiece1.jpg",
    title: "Abstract Colors",
    competitionId: "art-competition",
  },
  {
    id: "3",
    roundId: "round-2",
    createdAt: new Date("2025-05-08T10:30:00Z"),
    score: 90,
    submittedContent: "PhotoX.png",
    title: "City Lights at Night",
    competitionId: "photo-competition",
  },
  {
    id: "4",
    roundId: "round-2",
    createdAt: new Date("2025-05-08T14:15:00Z"),
    score: 60,
    submittedContent: "Sunset.png",
    title: "Morning Dew on Leaves",
    competitionId: "photo-competition",
  },
  {
    id: "5",
    roundId: "round-2",
    createdAt: new Date("2025-05-07T08:20:00Z"),
    score: 95,
    submittedContent: "Portrait.jpg",
    title: "Portrait of a Smile",
    competitionId: "photo-competition",
  },
  {
    id: "6",
    roundId: "round-2",
    createdAt: new Date("2025-05-07T11:45:00Z"),
    score: 78,
    submittedContent: "Skyline.jpeg",
    title: "Skyline at Dusk",
    competitionId: "photo-competition",
  },
  {
    id: "7",
    roundId: "round-2",
    createdAt: new Date("2025-05-06T16:00:00Z"),
    score: 82,
    submittedContent: "Nature.jpg",
    title: "Waves Crashing on Rocks",
    competitionId: "photo-competition",
  },
  {
    id: "8",
    roundId: "round-2",
    createdAt: new Date("2025-05-06T17:30:00Z"),
    score: 88,
    submittedContent: "River.jpg",
    title: "River Reflections",
    competitionId: "photo-competition",
  },
];
