import { IEnrolment, IUser } from "@/interfaces";
import { _mock } from "./_mock";

export const SUBMISSION_SORT_TIME_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];
export const SUBMISSION_FILTER_CATEGORY_OPTIONS = [
  { value: "wild", label: "Wildlife" },
  { value: "nature", label: "Nature" },
  { value: "art", label: "Oldest" },
];
export const SUBMISSION_FILTER_CONTEST_OPTIONS = [
  { value: "latest", label: "Morning Dew on Leaves" },
  { value: "popular", label: "Portrait of a Smile" },
  { value: "oldest", label: "Waves Crashing on Rocks" },
];
export const SUBMISSION_FILTER_ROUND_OPTIONS = [
  { value: "latest", label: "Round 1" },
  { value: "popular", label: "Round 2 " },
  { value: "oldest", label: "Round 3" },
];

export interface IDeadlineReminder {
  id: string;
  title: string; //@h this may be round title
  roundId: string;
  competitionId: string; //@h
  submissionEndDate: Date;
}
export const mockCoursesReminder: IDeadlineReminder[] = [
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
  title?: string;
  description?: string;
  competition?: {
    id: string;
    title: string;
  };

  roundId?: string;
  enrolId?: IEnrolment;
  user?: {
    id: string;
    name: string;
    profilePicture: string;
  };
  category?: {
    name: string;
  };
  score?: number;
  vote?: number;
  submittedContent?: string;
  createdAt?: Date;
}

export const mockMyRecentSubmissions: ISubmissions[] = [
  {
    id: "1",
    createdAt: new Date("2025-05-10T12:00:00Z"),
    score: 85,
    submittedContent: "Image123.png",
    title: "Sunset Over the Mountains",
  },
  {
    id: "2",
    createdAt: new Date("2025-05-09T09:00:00Z"),
    score: 70,
    submittedContent: "ArtPiece1.jpg",
    title: "Abstract Colors",
  },
  {
    id: "3",
    createdAt: new Date("2025-05-08T10:30:00Z"),
    score: 90,
    submittedContent: "PhotoX.png",
    title: "City Lights at Night",
  },
  {
    id: "4",
    roundId: "round-2",
    createdAt: new Date("2025-05-08T14:15:00Z"),
    score: 60,
    submittedContent: "Sunset.png",
    title: "Morning Dew on Leaves",
  },
  {
    id: "5",
    createdAt: new Date("2025-05-07T08:20:00Z"),
    score: 95,
    submittedContent: "Portrait.jpg",
    title: "Portrait of a Smile",
  },
  {
    id: "6",
    createdAt: new Date("2025-05-07T11:45:00Z"),
    score: 78,
    submittedContent: "Skyline.jpeg",
    title: "Skyline at Dusk",
  },
  {
    id: "7",
    createdAt: new Date("2025-05-06T16:00:00Z"),
    score: 82,
    submittedContent: "Nature.jpg",
    title: "Waves Crashing on Rocks",
  },
  {
    id: "8",
    createdAt: new Date("2025-05-06T17:30:00Z"),
    score: 88,
    submittedContent: "River.jpg",
    title: "River Reflections",
  },
];

export const mockMyVottedSubmissionsIds: string[] = [
  "607c35a6f1d2c12e8c8b4567", // Sunset Over the Ocean
  "607c35a6f1d2c12e8c8b4568", // Abstract Art Piece
  "607c35a6f1d2c12e8c8b4570", // Portrait of a Smile
  "607c35a6f1d2c12e8c8b4572", // Underwater Wonders
  "607c35a6f1d2c12e8c8b4575", // Culinary Delights
  "607c35a6f1d2c12e8c8b4580", // The Beauty of Simplicity
];

export const mockSubmissions: ISubmissions[] = [
  {
    id: "607c35a6f1d2c12e8c8b4567",
    title: "Sunset Over the Ocean View with Vibrant Colors",
    description:
      "A beautiful sunset captured from the beach. Finding peace in the midst of chaos.",
    competition: {
      id: "comp-1",
      title: "Photography Contest",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b1234", // MongoDB ID
      name: "Alice Johnson",
      profilePicture: "/assets/images/mock/avatar/avatar-1.webp", // Updated avatar number
    },
    category: {
      name: "Nature",
    },
    vote: 120,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(1),
  },
  {
    id: "607c35a6f1d2c12e8c8b4568",
    title: "Abstract Art Piece with Bold Colors and Shapes",
    description:
      "An exploration of finding peace in the midst of chaos through colors and shapes.",
    competition: {
      id: "comp-2",
      title: "Art Competition",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4569", // MongoDB ID
      name: "Bob Smithson",
      profilePicture: "/assets/images/mock/avatar/avatar-2.webp", // Updated avatar number
    },
    category: {
      name: "Art",
    },
    vote: 95,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(2),
  },
  {
    id: "607c35a6f1d2c12e8c8b4569",
    title: "City Lights and Nightlife Adventures Await",
    description:
      "The vibrant nightlife of the city. Finding peace in the midst of chaos.",
    competition: {
      id: "comp-1",
      title: "Photography Contest",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4570", // MongoDB ID
      name: "Charlie Brownstone",
      profilePicture: "/assets/images/mock/avatar/avatar-3.webp", // Updated avatar number
    },
    category: {
      name: "Urban",
    },
    vote: 80,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(3),
  },
  {
    id: "607c35a6f1d2c12e8c8b4570",
    title: "Portrait of a Smile Captured in Time",
    description: "Capturing joy and happiness in every moment.",
    competition: {
      id: "comp-2",
      title: "Art Competition",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4571", // MongoDB ID
      name: "Diana Prince",
      profilePicture: "/assets/images/mock/avatar/avatar-4.webp", // Updated avatar number
    },
    category: {
      name: "Portrait",
    },
    vote: 110,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(4),
  },
  {
    id: "607c35a6f1d2c12e8c8b4571",
    title: "Mountain Majesty and Scenic Views",
    description:
      "Finding peace in the midst of chaos. The breathtaking view of the mountains.",
    competition: {
      id: "comp-1",
      title: "Photography Contest",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4572", // MongoDB ID
      name: "Eve Adams",
      profilePicture: "/assets/images/mock/avatar/avatar-5.webp", // Updated avatar number
    },
    category: {
      name: "Nature",
    },
    vote: 150,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(5),
  },
  {
    id: "607c35a6f1d2c12e8c8b4572",
    title: "Underwater Wonders and Marine Life Exploration",
    description: "Exploring the beauty of marine life.",
    competition: {
      id: "comp-3",
      title: "Oceanic Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4573", // MongoDB ID
      name: "Frank Ocean",
      profilePicture: "/assets/images/mock/avatar/avatar-6.webp", // Updated avatar number
    },
    category: {
      name: "Wildlife",
    },
    vote: 130,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(6),
  },
  {
    id: "607c35a6f1d2c12e8c8b4573",
    title: "Vintage Car Show with Classic Models",
    description: "A display of classic cars.",
    competition: {
      id: "comp-2",
      title: "Car Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4574", // MongoDB ID
      name: "George Miller",
      profilePicture: "/assets/images/mock/avatar/avatar-7.webp", // Updated avatar number
    },
    category: {
      name: "Automotive",
    },
    vote: 75,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(7),
  },
  {
    id: "607c35a6f1d2c12e8c8b4574",
    title: "Starry Night Over the Cityscape",
    description: "Capturing the beauty of the night sky.",
    competition: {
      id: "comp-1",
      title: "Photography Contest",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4575", // MongoDB ID
      name: "Hannah Lee",
      profilePicture: "/assets/images/mock/avatar/avatar-8.webp", // Updated avatar number
    },
    category: {
      name: "Astrophotography",
    },
    vote: 140,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(8),
  },
  {
    id: "607c35a6f1d2c12e8c8b4575",
    title: "Culinary Delights and Food Art",
    description: "A feast for the eyes and taste buds.",
    competition: {
      id: "comp-2",
      title: "Food Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4576", // MongoDB ID
      name: "Ivy Wong",
      profilePicture: "/assets/images/mock/avatar/avatar-9.webp", // Updated avatar number
    },
    category: {
      name: "Food",
    },
    vote: 90,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(9),
  },
  {
    id: "607c35a6f1d2c12e8c8b4576",
    title: "Fashion Forward: Trends of the Season",
    description: "Showcasing the latest trends in fashion.",
    competition: {
      id: "comp-3",
      title: "Fashion Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4577", // MongoDB ID
      name: "Jackie Chan",
      profilePicture: "/assets/images/mock/avatar/avatar-10.webp", // Updated avatar number
    },
    category: {
      name: "Fashion",
    },
    vote: 115,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(10),
  },
  {
    id: "607c35a6f1d2c12e8c8b4577",
    title: "Wildlife in Action: Nature's Beauty",
    description: "Capturing animals in their natural habitat.",
    competition: {
      id: "comp-1",
      title: "Wildlife Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4578", // MongoDB ID
      name: "Liam Neeson",
      profilePicture: "/assets/images/mock/avatar/avatar-11.webp", // Updated avatar number
    },
    category: {
      name: "Wildlife",
    },
    vote: 130,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(11),
  },
  {
    id: "607c35a6f1d2c12e8c8b4578",
    title: "Serenity in the Forest: A Peaceful Retreat",
    description: "A peaceful scene in the woods.",
    competition: {
      id: "comp-2",
      title: "Nature Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4579", // MongoDB ID
      name: "Mia Wong",
      profilePicture: "/assets/images/mock/avatar/avatar-12.webp", // Updated avatar number
    },
    category: {
      name: "Nature",
    },
    vote: 125,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(12),
  },
  {
    id: "607c35a6f1d2c12e8c8b4579",
    title: "Dance of the Flames: Art in Motion",
    description: "Capturing the beauty of fire in motion.",
    competition: {
      id: "comp-3",
      title: "Artistic Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4580", // MongoDB ID
      name: "Nina Simone",
      profilePicture: "/assets/images/mock/avatar/avatar-13.webp", // Updated avatar number
    },
    category: {
      name: "Art",
    },
    vote: 100,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(13),
  },
  {
    id: "607c35a6f1d2c12e8c8b4580",
    title: "The Beauty of Simplicity in Art",
    description: "A minimalist approach to photography.",
    competition: {
      id: "comp-1",
      title: "Minimalist Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4581", // MongoDB ID
      name: "Oscar Wilde",
      profilePicture: "/assets/images/mock/avatar/avatar-14.webp", // Updated avatar number
    },
    category: {
      name: "Minimalism",
    },
    vote: 85,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(14),
  },
  {
    id: "607c35a6f1d2c12e8c8b4581",
    title: "Reflections of Time: A Conceptual Journey",
    description: "A deep dive into the concept of time.",
    competition: {
      id: "comp-2",
      title: "Conceptual Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4582", // MongoDB ID
      name: "Paula Abdul",
      profilePicture: "/assets/images/mock/avatar/avatar-15.webp", // Updated avatar number
    },
    category: {
      name: "Conceptual",
    },
    vote: 95,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(15),
  },
  {
    id: "607c35a6f1d2c12e8c8b4582",
    title: "A Journey Through Time: Historical Insights",
    description: "Exploring historical sites.",
    competition: {
      id: "comp-3",
      title: "Historical Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4583", // MongoDB ID
      name: "Quentin Tarantino",
      profilePicture: "/assets/images/mock/avatar/avatar-16.webp", // Updated avatar number
    },
    category: {
      name: "History",
    },
    vote: 115,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(16),
  },
  {
    id: "607c35a6f1d2c12e8c8b4583",
    title: "The Color of Emotions: A Vibrant Display",
    description: "A vibrant representation of feelings.",
    competition: {
      id: "comp-1",
      title: "Emotional Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4584", // MongoDB ID
      name: "Rihanna",
      profilePicture: "/assets/images/mock/avatar/avatar-17.webp", // Updated avatar number
    },
    category: {
      name: "Emotional",
    },
    vote: 140,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(17),
  },
  {
    id: "607c35a6f1d2c12e8c8b4584",
    title: "The Dance of Nature: Celebrating Beauty",
    description: "A celebration of nature's beauty.",
    competition: {
      id: "comp-2",
      title: "Nature's Dance",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4585", // MongoDB ID
      name: "Sofia Vergara",
      profilePicture: "/assets/images/mock/avatar/avatar-18.webp", // Updated avatar number
    },
    category: {
      name: "Nature",
    },
    vote: 130,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(18),
  },
  {
    id: "607c35a6f1d2c12e8c8b4585",
    title: "Urban Jungle: The City Experience",
    description: "The beauty of city life.",
    competition: {
      id: "comp-3",
      title: "Urban Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4586", // MongoDB ID
      name: "Tom Hardy",
      profilePicture: "/assets/images/mock/avatar/avatar-19.webp", // Updated avatar number
    },
    category: {
      name: "Urban",
    },
    vote: 125,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(19),
  },
  {
    id: "607c35a6f1d2c12e8c8b4586",
    title: "Harmony in Chaos: Finding Balance",
    description:
      "Finding peace in the midst of chaos. Finding peace in the midst of chaos.",
    competition: {
      id: "comp-1",
      title: "Chaos Photography",
    },
    user: {
      id: "607c35a6f1d2c12e8c8b4587", // MongoDB ID
      name: "Uma Thurman",
      profilePicture: "/assets/images/mock/avatar/avatar-20.webp", // Updated avatar number
    },
    category: {
      name: "Conceptual",
    },
    vote: 110,
    createdAt: new Date("2025-05-06T16:00:00Z"),
    submittedContent: _mock.image.cover(20),
  },
];
