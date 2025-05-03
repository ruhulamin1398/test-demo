import { competitions } from "@/_mock/contest";
import CompetitionSubmissionDialog from "@/components/competition-submission-dialog";
import { Alert, Button, Container, Typography } from "@mui/material";
import Card, { CardProps } from "@mui/material/Card";
import { useState } from "react";

// ----------------------------------------------------------------------

export function SubmissionNotificationAlert({ sx, ...other }: CardProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const competition = competitions[0];
  const dismissDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <Alert
        severity="info"
        action={
          <Button
            color="info"
            size="small"
            variant="soft"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" } }}
            onClick={() => setIsOpenDialog(true)}
          >
            Submit
          </Button>
        }
        sx={{
          typography: { xs: "body2", sm: "body1" },
          px: { xs: 1, sm: 2 },
        }}
      >
        You didn't submit at
        <Typography
          component="span"
          sx={{
            px: { xs: 0.5, sm: 1 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
          fontWeight={700}
        >
          {competition.title}
        </Typography>
      </Alert>

      <CompetitionSubmissionDialog
        competition={competition}
        open={!!isOpenDialog}
        dismissDialog={dismissDialog}
      />
    </>
  );
}
