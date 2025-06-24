import type { TimelineItemProps } from "@mui/lab/TimelineItem";

import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import { IRound } from "@/interfaces";

import { useDate } from "@/hooks/use-date";
import { Box, CardHeader } from "@mui/material";
// ----------------------------------------------------------------------

type Props = {
  title?: string;
  round?: IRound | null;
};

const RoundDateTimeLine = ({ title, round }: Props) => {
  const { formatDate } = useDate();
  return (
    <Box
      sx={{
        mb: 2,
        gap: 0.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
      }}
    >
      {title && (
        <Box component="span">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Box>
      )}
      <Timeline
        sx={{
          m: 0,

          [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
        }}
      >
        <Item
          key={1}
          index={1}
          title={"Submission Open"}
          text={`${formatDate(
            round?.submissionDeadline?.startDate
          )} - ${formatDate(round?.submissionDeadline?.endDate)}`}
          lastItem={false}
        />

        {round?.votingDeadline?.startDate && (
          <Item
            key={2}
            index={2}
            title={"Voting Deadline"}
            text={`${formatDate(
              round?.votingDeadline?.startDate
            )} - ${formatDate(round?.votingDeadline?.endDate)}`}
            lastItem={false}
          />
        )}

        {round?.judgingDeadline?.startDate && (
          <Item
            key={3}
            index={3}
            title={"Judging Deadline"}
            text={`${formatDate(
              round?.judgingDeadline?.startDate
            )} - ${formatDate(round?.judgingDeadline?.endDate)}`}
            lastItem={true}
          />
        )}
      </Timeline>
    </Box>
  );
};

export default RoundDateTimeLine;

// ----------------------------------------------------------------------

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  index: number;
  title: string;
  text: string;
};

function Item({ index, title, text, lastItem, ...other }: ItemProps) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          color={
            (index === 4 && "primary") ||
            (index === 1 && "success") ||
            (index === 2 && "info") ||
            (index === 3 && "warning") ||
            "error"
          }
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {text}
        </Typography>
        <br />
      </TimelineContent>
    </TimelineItem>
  );
}
