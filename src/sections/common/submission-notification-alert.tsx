import { ICompetition } from "@/interfaces";
import { Alert, Button, Container, Typography } from "@mui/material";
import Card, { CardProps } from "@mui/material/Card";

// ----------------------------------------------------------------------
type Props = CardProps & {
  competition: ICompetition;
};

const SubmissionNotificationAlert = ({ competition, sx, ...other }: Props) => {
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
    </>
  );
};

export default SubmissionNotificationAlert;
