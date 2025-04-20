import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { paths } from "@/routes/paths";

import { Iconify } from "@/components/iconify";

import { SubmissionItemSkeleton } from "./submission-skeleton";
import { SubmissionItem } from "./submission-item";
import { ISubmissionItem } from "@/types/submission";

// ----------------------------------------------------------------------

type Props = {
  data: ISubmissionItem[];
  loading?: boolean;
};

export function SubmissionList({ data, loading }: Props) {
  const renderLoading = () => (
    <Box
      sx={{
        gap: 3,
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
      }}
    >
      <SubmissionItemSkeleton />
    </Box>
  );

  const renderList = () => (
    <Grid container spacing={3}>
      {data.slice(3, data.length).map((item) => (
        <Grid
          key={item.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <SubmissionItem
            item={item}
            detailsHref={paths.post.details(item.title)}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      {loading ? renderLoading() : renderList()}

      {data.length > 8 && (
        <Stack sx={{ mt: 8, mb: { xs: 10, md: 15 }, alignItems: "center" }}>
          <Button
            size="large"
            variant="outlined"
            startIcon={
              <Iconify icon="svg-spinners:12-dots-scale-rotate" width={24} />
            }
          >
            Load More
          </Button>
        </Stack>
      )}
    </>
  );
}
