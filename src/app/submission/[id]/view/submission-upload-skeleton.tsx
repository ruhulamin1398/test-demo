"use client";

import type { Grid2Props } from "@mui/material/Grid2";

import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function SubmissionUploadSkeleton({ ...other }: Grid2Props) {
  return (
    <Grid container spacing={8} {...other}>
      <Grid size={{ xs: 12 }}>
        <Skeleton sx={{ pt: "100%" }} />
      </Grid>
    </Grid>
  );
}
