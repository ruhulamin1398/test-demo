import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { CalendarMonthOutlined, EmojiEvents } from "@mui/icons-material";

const RewardsAndPrizes = () => {
  return (
    <Card>
      <CardHeader title={"Rewards and Prizes"} />
      <CardContent>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemIcon>
              <EmojiEvents />
            </ListItemIcon>
            <ListItemText primary="Champion" secondary="BDT 10,000 Cash." />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <EmojiEvents />
            </ListItemIcon>
            <ListItemText
              primary="First Runner Up"
              secondary="BDT 5,000 Cash."
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default RewardsAndPrizes;
