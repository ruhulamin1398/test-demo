"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";

const LeaderboardSuccess: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#5A5A5A", py: 4, color: "white" }}>
      <Container>
        <Box display="flex" alignItems="center">
          {/* Placeholder for the Image or Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#A0A0A0",
              borderRadius: "50%",
              mr: 2,
            }}
          />
          {/* Text Content */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Leaderboard & Success Stories
            </Typography>
            <Typography variant="body2">
              See top users and read inspiring success stories
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LeaderboardSuccess;
