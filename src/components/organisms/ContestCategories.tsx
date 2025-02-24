"use client";
import React from "react";
import { Container, Box, Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CreateIcon from "@mui/icons-material/Create";
import PaletteIcon from "@mui/icons-material/Palette";

const contestData = [
  {
    id: 1,
    icon: <EmojiEventsIcon fontSize="large" color="primary" />,
    title: "Coding Challenges",
    description: "Test your coding skills",
    count: "85 Contests",
  },
  {
    id: 2,
    icon: <CreateIcon fontSize="large" color="secondary" />,
    title: "Writing Contests",
    description: "Show your creativity",
    count: "95 Contests",
  },
  {
    id: 3,
    icon: <PaletteIcon fontSize="large" color="success" />,
    title: "Design Competitions",
    description: "Let your art shine",
    count: "80 Contests",
  },
];

const ContestCategories: React.FC = () => {
  return (
    <Container>
      <Box textAlign="center" py={5}>
        <Grid container spacing={6} justifyContent="center" py={4}>
          {contestData.map((contest) => (
            <Grid
              size={{ xs: 12, sm: 4, md: 4 }}
              key={contest.id}
              sx={{
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Card sx={{ textAlign: "center", p: 3, boxShadow: "none" }}>
                <Box display="flex" justifyContent="center" pb={2}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 3,
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {contest.icon}
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {contest.title}
                  </Typography>
                  <Typography color="textSecondary" pb={1}>
                    {contest.description}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {contest.count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ContestCategories;
