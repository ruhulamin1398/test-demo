"use client";
import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const ContestCTA: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#4F46E5",
        py: 10,
        textAlign: "center",
        color: "#ffffff",
      }}
    >
      <Container>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Unleash Your Creativity. Join a Contest Today!
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffffff",
              color: "#4F46E5",
              fontWeight: 600,
              borderRadius: "50px",
              px: 4,
              py: 1,
              '&:hover': {
                backgroundColor: "#E0E7FF",
              },
            }}
          >
            Browse Contests
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#ffffff",
              color: "#ffffff",
              fontWeight: 600,
              borderRadius: "50px",
              px: 4,
              py: 1,
              '&:hover': {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Contest Alert
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ContestCTA;
