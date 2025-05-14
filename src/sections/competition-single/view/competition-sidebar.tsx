import type { FabProps } from "@mui/material/Fab";
import type { UseBackToTopReturn } from "minimal-shared/hooks";

import Grid from "@mui/material/Grid2";
import { ContestDateTimeLine } from "../contest-date-timeline";
import { EnrolmentCard } from "../enroll-contest";
import { PrizeList } from "../prize-list";
import { Box } from "@mui/material";
import { ICompetition } from "@/interfaces";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { SubmissionCard } from "../Submission-card";
import { CompetitionPageSubmissions } from "../competition-page-submissions";

// ----------------------------------------------------------------------
type Props = {
  competition: ICompetition;
};

export function CompetitionSidebar({ competition }: Props) {
  const { enrollIds } = useSelector(
    (state: RootState) => state.auth.competitionInfo
  );
  const isEnroled = enrollIds.includes(competition.id);

  return (
    <>
      <Box
        sx={{
          mb: 3,
          width: "100%",
          gap: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid size={12}>
          {!isEnroled ? (
            <EnrolmentCard
              price={competition.price ? `${competition.price}` : "Free"}
              title={competition.title}
              description={competition.description}
              competitionId={competition.id}
              deadlineEndDate={competition.enrolmentDeadline.endDate}
            />
          ) : (
            <>
              <SubmissionCard competition={competition} />
              <CompetitionPageSubmissions
                title="My Submissions"
                competitionId={competition.id}
              />
            </>
          )}
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
