import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { _mock } from "@/_mock";
import { Button, Container, Link } from "@mui/material";

import { EmptyContent } from "@/components/empty-content";
import { mockCategoyList } from "@/_mock/data";
import HomeFeaturedCategoryCarousel from "./featured-category-carousel";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function HomeContestCategories() {
  const renderNotFound = () => <EmptyContent filled sx={{ py: 10 }} />;
  return (
    <Container sx={{ py: 2 }}>
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
          <Typography variant="h6">Featured Categories</Typography>
        </Box>
        <HomeFeaturedCategoryCarousel list={mockCategoyList} />
      </Box>
    </Container>
  );
}
