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
            onClick={() => setIsOpenDialog(true)}
          >
            Submit Now
          </Button>
        }
      >
        You didn't submit at
        <Typography component="span" fontWeight={700} sx={{ px: 1 }}>
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
