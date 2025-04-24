"use client";

import type { FabProps } from "@mui/material/Fab";
import type { UseBackToTopReturn } from "minimal-shared/hooks";

import { useBackToTop } from "minimal-shared/hooks";

import Fab from "@mui/material/Fab";
import SvgIcon from "@mui/material/SvgIcon";

import {
  ScrollProgress,
  useScrollProgress,
} from "@/components/animate/scroll-progress";
import { CompetitionDetailsHero } from "../competition-details-hero";
import Grid from "@mui/material/Grid2";
import { Container } from "@mui/material";
import { ContestSummaryOverview } from "../OverView";
import { ContestDetailsContent } from "../competition-details-content";
import { CompetitionSidebar } from "./competition-sidebar";

// ----------------------------------------------------------------------

export function SiingleCompetitionView() {
  const pageProgress = useScrollProgress();

  const { onBackToTop, isVisible } = useBackToTop("90%");

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[
          (theme) => ({ position: "fixed", zIndex: theme.zIndex.appBar + 1 }),
        ]}
      />

      <BackToTopButton isVisible={isVisible} onClick={onBackToTop} />
      <CompetitionDetailsHero />

      <Container sx={{ my: 5 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 12, lg: 12 }}>
            <ContestSummaryOverview />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            {/* //left side  */}
            <Grid>
              <ContestDetailsContent />
            </Grid>
          </Grid>

          <Grid container spacing={3} size={{ xs: 12, md: 6, lg: 4 }}>
            <CompetitionSidebar />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

type BackToTopProps = FabProps & {
  isVisible: UseBackToTopReturn["isVisible"];
};

function BackToTopButton({ isVisible, sx, ...other }: BackToTopProps) {
  return (
    <Fab
      aria-label="Back to top"
      sx={[
        (theme) => ({
          width: 48,
          height: 48,
          position: "fixed",
          transform: "scale(0)",
          right: { xs: 24, md: 32 },
          bottom: { xs: 24, md: 32 },
          zIndex: theme.zIndex.speedDial,
          transition: theme.transitions.create(["transform"]),
          ...(isVisible && { transform: "scale(1)" }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <SvgIcon>
        {/* https://icon-sets.iconify.design/solar/double-alt-arrow-up-bold-duotone/ */}
        <path
          fill="currentColor"
          d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z"
          opacity="0.5"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057"
          clipRule="evenodd"
        />
      </SvgIcon>
    </Fab>
  );
}
