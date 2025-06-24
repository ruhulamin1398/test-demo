import { useEnrollment } from "@/app/hooks/useEnrollment";
import EnrollmentConfirmationDialog from "@/components/confirmation-dialog";
import { ICompetition } from "@/interfaces";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { RootState } from "@/store/store";
import { AddOutlined, Beenhere, Link } from "@mui/icons-material";
import { Button } from "@mui/material";

import { useSelector } from "react-redux";

type Props = {
  competition: ICompetition;
};

const EnrollSubmissionButton = ({ competition }: Props) => {
  const { enrollIds } = useSelector(
    (state: RootState) => state.auth.competitionInfo
  );

  const { submissions } = useSelector(
    (state: RootState) => state.auth.competitionInfo
  );

  const activeRound = competition.rounds.find(
    (round) => round?.isActiveRound === true
  );

  const isEnroled = enrollIds.includes(competition.id);

  const renderSubmissionButton = () => {
    return (
      <>
        {activeRound && (
          <>
            <Button
              size="large"
              startIcon={<Beenhere />}
              color="primary"
              variant="contained"
            >
              <Link
                component={RouterLink}
                href={paths.submission.details(competition.id)}
                color="inherit"
              >
                {submissions.some(
                  (submission) => submission.roundId === activeRound.id
                )
                  ? "View Submission"
                  : "Submit Now"}
              </Link>
            </Button>
          </>
        )}
      </>
    );
  };

  const renderEnrollmentButton = () => {
    const {
      openDialog,
      handleOpenEnrollmentConfirmationDialog,
      handleCloseEnrollmentConfirmationDialog,
      onAgreeEnrollment,
      loading,
    } = useEnrollment();

    return (
      <>
        <Button
          color="primary"
          startIcon={<AddOutlined />}
          variant="contained"
          disableElevation
          sx={{ height: { xs: 40, md: 48 } }}
          onClick={() => {
            handleOpenEnrollmentConfirmationDialog(competition.id);
          }}
        >
          Join Contest
        </Button>

        <EnrollmentConfirmationDialog
          open={!!openDialog?.competitionId}
          onAgree={onAgreeEnrollment}
          onDisagree={handleCloseEnrollmentConfirmationDialog}
          createLoading={loading}
        />
      </>
    );
  };

  return (
    <>{!isEnroled ? renderEnrollmentButton() : renderSubmissionButton()}</>
  );
};

export default EnrollSubmissionButton;
