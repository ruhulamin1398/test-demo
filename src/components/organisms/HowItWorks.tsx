"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Search, CloudUpload, EmojiEvents } from "@mui/icons-material";

const steps = [
  {
    id: 1,
    title: "Find a Contest",
    description: "Browse through our wide selection of creative competitions.",
    icon: <Search sx={{ fontSize: 40, color: "#4F46E5" }} />,
  },
  {
    id: 2,
    title: "Submit Your Entry",
    description: "Upload your work and showcase your creativity to the world.",
    icon: <CloudUpload sx={{ fontSize: 40, color: "#4F46E5" }} />,
  },
  {
    id: 3,
    title: "Vote & Win",
    description: "Get votes from the community and win amazing prizes.",
    icon: <EmojiEvents sx={{ fontSize: 40, color: "#4F46E5" }} />,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <Container sx={{ py: 2, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={4} py={5} justifyContent="center">
        {steps.map((step) => (
          <Grid size={{xs:12, sm:4}} key={step.id}>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
              <Box sx={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#EDE7F6",
                mb: 2,
              }}>
                {step.icon}
              </Box>
              <Typography variant="h6" fontWeight="bold">
                {step.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {step.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorks;
