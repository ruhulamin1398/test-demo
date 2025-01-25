import { Box, Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import TimelineItem from "../molecules/TimelineItem";

const TimeLine = () => {
  return (
    <Card>
      <CardHeader title={"Stages & Timeliine"} />
      <CardContent>
        <Box>
          <TimelineItem
            title="Priliminary Round"
            description="This is a public voting selection round. Top 100 contestant will be advanced to next round"
          />
          <TimelineItem
            title="Priliminary Round"
            description="This is a public voting selection round. Top 100 contestant will be advanced to next round"
          />
          <TimelineItem
            title="Priliminary Round"
            description="This is a public voting selection round. Top 100 contestant will be advanced to next round"
          />
          <TimelineItem
            isLastItem={true}
            title="Priliminary Round"
            description="This is a public voting selection round. Top 100 contestant will be advanced to next round"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimeLine;
