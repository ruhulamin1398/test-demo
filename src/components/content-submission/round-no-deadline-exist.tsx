import { Box, Card, CardHeader, Link, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useDate } from "@/hooks/use-date";
import { IRound } from "@/interfaces";

type Props = {
  round?: IRound;
};

const RoundNoDeadlineExist = ({ round }: Props) => {
  const { formatDate } = useDate();
  return (
    <Card sx={{ my: 2 }}>
      <Stack
        spacing={2}
        sx={{
          p: { sx: 2, md: 4 },
          typography: "h6",
          bgcolor: "#eee",
          textAlign: "center",
        }}
      >
        {round?.submissionStartDate &&
          dayjs().isBefore(dayjs(round.submissionStartDate)) && (
            <>
              <Box aria-live="polite">Submission has not started yet. </Box>
              <Box>
                <Typography variant="h4">
                  Please submit after {formatDate(round.submissionStartDate)}
                </Typography>
              </Box>
            </>
          )}

        {round?.submissionEndDate &&
          dayjs().isAfter(dayjs(round.submissionEndDate)) && (
            <>
              <Box aria-live="polite">Submission time has already ended. </Box>
              <Box>
                <Typography variant="h4">
                  The deadline was {formatDate(round.submissionEndDate)}
                </Typography>
              </Box>
            </>
          )}
      </Stack>
    </Card>
  );
};

export default RoundNoDeadlineExist;
