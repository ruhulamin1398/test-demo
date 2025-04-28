import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { _mock } from "@/_mock";
import { Button, Container, Link } from "@mui/material";
import { Iconify } from "@/components/iconify";
import { HomeFeaturedContestCarousel } from "./featured-contest-carousel";

import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function HomeFeaturedContest() {
  // Contest Data

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
            mb: 1,
            px: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Typography variant="h5">Featured Contest</Typography>
          <Link
            component={RouterLink}
            href="competition"
            color="inherit"
            underline="none"
          >
            <Button
              color="primary"
              variant="outlined"
              endIcon={<Iconify icon="ic:round-arrow-forward" />}
            >
              View All
            </Button>
          </Link>
        </Box>
        <HomeFeaturedContestCarousel
          title="Competitions You May Enroll"
          list={competitions}
        />
      </Box>
    </Container>
  );
}
