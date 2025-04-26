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

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  list: {
    id: number;
    title: string;
    text: string;
    date: string;
  }[];
};

export function ContestDateTimeLine({ title, list }: Props) {
  return (
    <Timeline
      sx={{
        m: 0,
        p: 3,
        [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
      }}
    >
      {list.map((item, index) => (
        <Item
          key={item.title}
          item={item}
          lastItem={index === list.length - 1}
        />
      ))}
    </Timeline>
  );
}

// ----------------------------------------------------------------------

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  item: Props["list"][number];
};

function Item({ item, lastItem, ...other }: ItemProps) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          color={
            (item.id === 4 && "primary") ||
            (item.id === 1 && "success") ||
            (item.id === 2 && "info") ||
            (item.id === 3 && "warning") ||
            "error"
          }
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{item.date}</Typography>
        <Typography variant="caption">{item.title}</Typography>
        <br />

        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {item.date}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
