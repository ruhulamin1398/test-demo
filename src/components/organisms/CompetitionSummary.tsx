"use client";
import {
  AccessTime,
  AccessTimeFilled,
  Beenhere,
  CalendarMonth,
  FacebookOutlined,
  Google,
  Instagram,
  Money,
  Twitter,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  cyan,
  green,
  lightBlue,
  orange,
  pink,
  red,
} from "@mui/material/colors";
import React from "react";

const CompetitionSummary = () => {
  return (
    <div>
      <List sx={{ width: "100%" }} disablePadding>
        <ListItem disableGutters>
          <ListItemAvatar>
            <Avatar
              sx={{
                color: cyan[500],
                backgroundColor: cyan[200],
              }}
            >
              <Money />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="PRISE MONEY WORTH 100000 TAKA" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemAvatar>
            <Avatar
              sx={{
                color: cyan[500],
                backgroundColor: cyan[200],
              }}
            >
              <CalendarMonth />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="DATE AND TIME"
            secondary="Jan 9, 2014 - Jan 31, 2014"
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemAvatar>
            <Avatar
              sx={{
                color: orange[500],
                backgroundColor: orange[200],
              }}
            >
              <Beenhere />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="ENROLMENT OPEN FROM"
            secondary="Jan 9, 2014 - Jan 31, 2014"
          />
        </ListItem>
      </List>
    </div>
  );
};

export default CompetitionSummary;
