"use client";
import ContentSubmission from "@/components/content-submission";
import { ICompetition } from "@/interfaces";
import { Grid2 as Grid, Typography } from "@mui/material";
import React from "react";
type Props = { competition: ICompetition };
const PageContent = ({ competition }: Props) => {
  return (
    <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
      <Grid size={{ xs: 12, md: 6, lg: 7 }}>
        <ContentSubmission
          competitionId={""}
          competitionTitle={""}
          competitionNameSubtitle={""}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 5 }}>
        {competition && (
          <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
            {competition.description}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default PageContent;
