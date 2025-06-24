import Grid from "@mui/material/Grid2";
import { ContestDateTimeLine } from "../contest-date-timeline";
import { EnrollmentCard } from "../enroll-contest";
import { PrizeList } from "../prize-list";
import { Box, Card } from "@mui/material";
import { ICompetition } from "@/interfaces";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { SubmissionCard } from "../Submission-card";
import { CompetitionPageSubmissions } from "../competition-page-submissions";

// ----------------------------------------------------------------------
type Props = {
  competition: ICompetition;
};

const CompetitionSidebar = ({ competition }: Props) => {
  const { enrollIds } = useSelector(
    (state: RootState) => state.auth.competitionInfo
  );
  const isEnroled = enrollIds.includes(competition.id);

  return (
    <>
      <Card
        sx={{
          mb: 3,
          width: "100%",
          gap: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid size={12}>
          {isEnroled && (
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
          <ContestDateTimeLine
            title="Stages and timeLine "
            rounds={competition.rounds}
          />
        </Grid>

        <Grid size={12}>
          <PrizeList title="Prizes" prizes={competition.prizes} />
        </Grid>
      </Card>
    </>
  );
};

export default CompetitionSidebar;

// ----------------------------------------------------------------------
