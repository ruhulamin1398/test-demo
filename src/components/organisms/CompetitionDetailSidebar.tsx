"use client";
import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card as MuiCard,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PhotographyCompetitionTimeline from "./PhotographyCompetitionTimeline";
import {
  Beenhere,
  BeenhereOutlined,
  CalendarMonth,
  EmojiPeopleSharp,
  FacebookOutlined,
  Google,
  HeartBroken,
  Instagram,
  People,
  Share,
  Twitter,
} from "@mui/icons-material";
import { purple } from "@mui/material/colors";
import StickyScrollableTabs from "./StickyScrollableTabs";
import CompetitionSummary from "./CompetitionSummary";

const CompetitionDetailSidebar: React.FC = () => {
  return (
    <Box>
      <Box pb={2}>
        <Card>
          <CardHeader
            action={
              <Grid container spacing={1}>
                <Grid>
                  <IconButton aria-label="settings">
                    <HeartBroken />
                  </IconButton>
                </Grid>
                <Grid>
                  <IconButton aria-label="settings">
                    <Share />
                  </IconButton>
                </Grid>
              </Grid>
            }
            title="FREE"
          />
          <CardContent>
            <Button
              fullWidth
              size="large"
              startIcon={<Beenhere />}
              color="primary"
              variant="contained"
            >
              ENROLL NOW
            </Button>
          </CardContent>
          <Divider />
          <CardContent>
            <List sx={{ width: "100%" }} disablePadding>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar>
                    <People />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Registered" secondary="1000+" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar>
                    <EmojiPeopleSharp />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Team Size" secondary="Indivisual" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar>
                    <Beenhere />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Registration Deadline"
                  secondary="3 days left."
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
      <Box pb={2}>
        <Card>
          <CardHeader title="Eligibility" />
          <CardContent>
            <Typography variant="body1">Anyone can join.</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CompetitionDetailSidebar;
