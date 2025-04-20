import Box from "@mui/material/Box";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CreateIcon from "@mui/icons-material/Create";
import PaletteIcon from "@mui/icons-material/Palette";
import { ContestCategoryCarousel } from "./components/contest-category-carousel";
import { _mock } from "@/_mock";
import { Container } from "@mui/material";

// ----------------------------------------------------------------------

const contestData = [
  {
    id: 1,
    title: "Coding Challenges",
    icon: <EmojiEventsIcon fontSize="large" color="primary" />,
    description: "Test your coding skills",
    count: "85 Contests",
  },
  {
    id: 2,
    title: "Writing Contests",
    icon: <CreateIcon fontSize="large" color="secondary" />,
    description: "Show your creativity",
    count: "95 Contests",
  },
  {
    id: 3,
    title: "Design Competitions",
    icon: <PaletteIcon fontSize="large" color="success" />,
    description: "Let your art shine",
    count: "80 Contests",
  },
  {
    id: 4,
    title: "Math Contests",
    icon: <EmojiEventsIcon fontSize="large" color="primary" />,
    description: "Challenge your logic",
    count: "70 Contests",
  },
  {
    id: 5,
    title: "Poetry Slams",
    icon: <CreateIcon fontSize="large" color="secondary" />,
    description: "Express through poetry",
    count: "60 Contests",
  },
];

// ----------------------------------------------------------------------

export function HomeContestCategoriesOld() {
  return (
    <Container>
      <Box
        sx={{
          gap: 5,
          my: 10,
        }}
      >
        <ContestCategoryCarousel data={contestData} />
      </Box>
    </Container>
  );
}
