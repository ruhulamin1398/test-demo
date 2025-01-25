import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { CalendarMonthOutlined } from "@mui/icons-material";

const DatesAndDeadline = () => {
  return (
    <Card>
      <CardHeader title={"Dates & Deadlines"} />
      <CardContent>
        <List sx={{ width: "100%" }} disablePadding>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar variant="rounded">
                <CalendarMonthOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="ENROLMENT OPEN TILL"
              secondary="Jan 9, 2014 - Jan 31, 2014"
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar variant="rounded">
                <CalendarMonthOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="CONTENT SUBMISSION"
              secondary="Jan 9, 2014 - Jan 31, 2014"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default DatesAndDeadline;
