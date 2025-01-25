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
  FacebookOutlined,
  Google,
  HeartBroken,
  Instagram,
  Share,
  Twitter,
} from "@mui/icons-material";
import { purple, red } from "@mui/material/colors";
import StickyScrollableTabs from "./StickyScrollableTabs";
import CompetitionSummary from "./CompetitionSummary";
import CompetitionDetailSidebar from "./CompetitionDetailSidebar";

const CompetitionDetail: React.FC = () => {
  return (
    <Container sx={{ marginTop: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <MuiCard elevation={6} sx={{ overflow: "unset" }}>
            <CardHeader
              title={
                <Typography
                  component={"h1"}
                  variant="h4"
                  fontWeight={900}
                  sx={(theme) => ({
                    [theme.breakpoints.down("sm")]: { fontSize: "1.25rem" },
                  })}
                >
                  Winter Photography Competition
                </Typography>
              }
              subheader={"Bojoyee platforms."}
              avatar={
                <Avatar
                  variant="rounded"
                  sizes="large"
                  aria-label="recipe"
                  sx={(theme) => ({
                    bgcolor: "primary.main",
                    width: 60,
                    height: 60,
                    [theme.breakpoints.up("md")]: { width: 100, height: 100 },
                  })}
                >
                  R
                </Avatar>
              }
            />
            <CardContent>
              <CompetitionSummary />
            </CardContent>
          </MuiCard>
          <Box
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: { display: "none" },
            })}
            pt={2}
          >
            <CompetitionDetailSidebar />
          </Box>
          <StickyScrollableTabs />
        </Grid>
        <Grid
          size={{ lg: 4, xs: 12 }}
          sx={(theme) => ({
            [theme.breakpoints.down("lg")]: { display: "none" },
          })}
        >
          <Box
            sx={{
              position: "sticky",
              top: "64px",
            }}
          >
            <CompetitionDetailSidebar />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompetitionDetail;
