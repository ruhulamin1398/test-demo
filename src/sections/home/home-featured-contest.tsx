import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { _mock } from "@/_mock";
import { Button, Container } from "@mui/material";
import { FeaturedContestCarousel } from "./components/featured-contest-carousel";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function HomeFeaturedContest() {
  // Contest Data
  const contests = [
    {
      id: 1,
      title: "Nature Photography 2025",
      description: "Capture the beauty of nature in its purest form.",
      prize: "$5,000 Prize",
      status: "Ongoing",
      image: "/banner-back.jpg",
      detailsHref: "competition/submission",
    },
    {
      id: 2,
      title: "Digital Art Challenge",
      description: "Create the future through digital artistry.",
      prize: "$3,000 Prize",
      status: "Upcoming",
      image: "/banner-back.jpg",
      detailsHref: "competition/submission",
    },
    {
      id: 3,
      title: "Creative Writing",
      description: "Tell your story to the world.",
      prize: "$2,000 Prize",
      status: "Ongoing",
      image: "/banner-back.jpg",
      detailsHref: "competition/submission",
    },
    {
      id: 4,
      title: "Music Composition",
      description: "Compose a masterpiece and showcase.",
      prize: "$4,000 Prize",
      status: "Upcoming",
      image: "/banner-back.jpg",
      detailsHref: "competition/submission",
    },
    {
      id: 5,
      title: "Filmmaking Contest",
      description: "Create a short film that captivates the audience.",
      prize: "$6,000 Prize",
      status: "Ongoing",
      image: "/banner-back.jpg",
      detailsHref: "competition/submission",
    },
  ];

  return (
    <Container sx={{ py: 6 }}>
      <Box
        sx={{
          gap: 5,
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
            mb: {
              xs: 2,
              md: 4,
            },
            px: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Typography variant="h5">Featured Contest</Typography>
          <Button
            color="primary"
            variant="outlined"
            endIcon={<Iconify icon="ic:round-arrow-forward" />}
          >
            View All
          </Button>
        </Box>

        <FeaturedContestCarousel data={contests} />
      </Box>
    </Container>
  );
}
