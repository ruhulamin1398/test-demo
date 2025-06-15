import { Box, Card, CardHeader, Link, Stack } from "@mui/material";
import { useDate } from "@/hooks/use-date";
import { IRound } from "@/interfaces";
import { Iconify } from "../iconify";

type Props = {
  round: IRound;
};

const RoundDetails = ({ round }: Props) => {
  const { formatDate } = useDate();
  return (
    <Card sx={{ my: 2 }}>
      <CardHeader
        title={` Round ${round.roundNumber} :  ${round.title}`}
        subheader={`Started ${formatDate(
          round.startDate
        )} - Ended at ${formatDate(round.endDate)}  `}
      />

      <Stack spacing={2} sx={{ p: 3, typography: "body2" }}>
        <Box>{round.description}</Box>

        <Box sx={{ display: "flex" }}>
          <Iconify width={24} icon="mingcute:calendar-fill" sx={{ mr: 2 }} />
          Submission Started :
          <Link variant="subtitle2" color="inherit">
            &nbsp; {formatDate(round.submissionStartDate)}
          </Link>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Iconify width={24} icon="mingcute:calendar-fill" sx={{ mr: 2 }} />
          Submission Ended :
          <Link variant="subtitle2" color="inherit">
            &nbsp; {formatDate(round.submissionEndDate)}
          </Link>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Iconify width={24} icon="ic:round-upload-file" sx={{ mr: 2 }} />
          Submission Type :
          <Link variant="subtitle2" color="inherit">
            &nbsp; {round.submissionType} (Max: 5mb)
          </Link>
        </Box>
      </Stack>
    </Card>
  );
};

export default RoundDetails;
