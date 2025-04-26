"use client";
import ContentSubmission from "@/components/content-submission";
import { Iconify } from "@/components/iconify";
import { ICompetition } from "@/interfaces";
import { ContestDateTimeLine } from "@/sections/competition-single/contest-date-timeline";
import { ContestTimeLineData } from "@/sections/competition-single/view/competition-sidebar";
import { Box, Grid2 as Grid, IconButton, Typography } from "@mui/material";
import React from "react";
type Props = { competition: ICompetition };
const PageContent = ({ competition }: Props) => {
  return (
    <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
      <Grid size={{ xs: 12, md: 6, lg: 7 }}>
        <ContentSubmission competitionId={competition.id} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 5 }}>
        {competition && (
          <>
            <Box>
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                Important date and times
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 2,
                gap: 0.5,
                display: "flex",
                alignItems: "center",
                typography: "subtitle2",
              }}
            >
              <Iconify
                icon="mdi:account-group-outline"
                sx={{ color: "primary" }}
              />
              <Box
                component="span"
                sx={{ typography: "body2", color: "text.primary" }}
              >
                Eligibility :
              </Box>
              Anyone can join
            </Box>
            <ContestDateTimeLine list={ContestTimeLineData} />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default PageContent;
