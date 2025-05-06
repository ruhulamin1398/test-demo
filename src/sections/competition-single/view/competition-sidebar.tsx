import type { FabProps } from "@mui/material/Fab";
import type { UseBackToTopReturn } from "minimal-shared/hooks";

import Grid from "@mui/material/Grid2";
import { ContestDateTimeLine } from "../contest-date-timeline";
import { EnrolmentCard } from "../enroll-contest";
import { PrizeList } from "../prize-list";
import { Box } from "@mui/material";
import { ICompetition } from "@/interfaces";

// ----------------------------------------------------------------------
type Props = {
  competition: ICompetition;
};

export function CompetitionSidebar({ competition }: Props) {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Grid size={12}>
          <EnrolmentCard
            price={competition.price ? `${competition.price}` : "Free"}
            title={competition.title}
            description={competition.description}
            competitionId={competition.id}
          />
        </Grid>
        <Grid size={12}>
          <PrizeList title="Prizes" prizes={competition.prizes} />
        </Grid>
        <Grid size={12}>
          <ContestDateTimeLine
            title="Stages and timeLine "
            rounds={competition.rounds}
          />
        </Grid>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
