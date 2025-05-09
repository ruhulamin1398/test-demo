import type { BoxProps } from "@mui/material/Box";

import { Beenhere } from "@mui/icons-material";
import { Iconify } from "@/components/iconify";
import { Label, labelClasses } from "@/components/label";
import { Button, Box } from "@mui/material";
import { ICompetition } from "@/interfaces";
import { useDate } from "@/hooks/use-date";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  competition: ICompetition;
};

export function SubmissionCard({ competition, sx, ...other }: Props) {
  const { formatDate } = useDate();
  const { submissions } = useSelector(
    (state: RootState) => state.auth.competitionInfo
  );

  const activeRound = competition.rounds.find(
    (round) => round.isActiveRound === true
  );
  return (
    <>
      <Box
        sx={[
          (theme) => ({
            p: 5,
            borderRadius: 2,
            position: "relative",
            color: "common.white",
            backgroundImage: `linear-gradient(135deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.primary.dark})`,
            width: "100%",
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {activeRound ? (
          <>
            <Box
              sx={{
                whiteSpace: "pre-line",
                typography: "h4",
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Active Round
            </Box>

            <Box
              sx={{
                gap: 1,
                my: 2,
                display: "flex",
                flexWrap: "wrap",
                [`& .${labelClasses.root}`]: {
                  typography: "h5",
                  color: "common.white",
                  bgcolor: "primary.main",
                },
              }}
            >
              <Box sx={{ whiteSpace: "pre-line", typography: "h6" }}>
                {activeRound.title}
              </Box>
              <Box sx={{ typography: "body2" }}>
                {`Started ${formatDate(
                  activeRound.startDate
                )} - Ended at ${formatDate(activeRound.endDate)}  `}
              </Box>
            </Box>

            {submissions.some(
              (submission) => submission.roundId === activeRound.id
            ) ? (
              <Box
                sx={{
                  typography: "h6",
                  textAlign: "center",
                  color: "success.main",
                  pt: 6,
                }}
              >
                You have already submitted
              </Box>
            ) : (
              <Button
                fullWidth
                size="large"
                startIcon={<Beenhere />}
                color="primary"
                variant="contained"
                onClick={() => {}}
              >
                Submit Now
              </Button>
            )}
          </>
        ) : (
          <Box
            sx={{
              gap: 1,
              my: 2,
              display: "flex",
              flexWrap: "wrap",
              [`& .${labelClasses.root}`]: {
                typography: "body2",
                color: "common.white",
                bgcolor: "primary.main",
              },
            }}
          >
            There are no acitve round
          </Box>
        )}
      </Box>
    </>
  );
}
