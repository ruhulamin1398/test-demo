import type { CardProps } from "@mui/material/Card";
import type { TimelineItemProps } from "@mui/lab/TimelineItem";

import Card from "@mui/material/Card";
import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import { IRound } from "@/interfaces";

import { useDate } from "@/hooks/use-date";
// ----------------------------------------------------------------------

type Props = {
  title?: string;
  rounds: IRound[];
};

export function ContestDateTimeLine({ title, rounds }: Props) {
  console.log("___  rounds ___", rounds);
  return (
    <Timeline
      sx={{
        m: 0,
        p: 3,
        [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
      }}
    >
      {rounds.map((item, index) => (
        <Item
          key={item.title}
          item={item}
          lastItem={index === rounds.length - 1}
        />
      ))}
    </Timeline>
  );
}

// ----------------------------------------------------------------------

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  item: IRound;
};

function Item({ item, lastItem, ...other }: ItemProps) {
  const { formatDate } = useDate();
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          color={
            (item.roundNumber === 4 && "primary") ||
            (item.roundNumber === 1 && "success") ||
            (item.roundNumber === 2 && "info") ||
            (item.roundNumber === 3 && "warning") ||
            "error"
          }
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">
          Round {item.roundNumber}: {item.title}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {formatDate(item.startDate)} - {formatDate(item.endDate)}
        </Typography>
        <br />

        {/* <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {"date2"}
        </Typography> */}
      </TimelineContent>
    </TimelineItem>
  );
}
