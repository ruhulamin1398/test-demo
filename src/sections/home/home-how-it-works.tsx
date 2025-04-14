"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Iconify } from "@/components/iconify";
import { Container } from "@mui/material";

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: "Find a Contest",
    description: "Browse through our wide selection of creative competitions.",
    icon: "solar:magnifer-linear",
  },
  {
    title: "Submit Your Entry",
    description: "Upload your work and showcase your creativity to the world.",
    icon: "solar:upload-linear",
  },
  {
    title: "Vote & Win",
    description: "Get votes from the community and win amazing prizes.",
    icon: "solar:cup-star-linear",
  },
];

// ----------------------------------------------------------------------

export function HomeHowItWorks() {
  return (
    <Container sx={{ py: 2, textAlign: "center" }}>
      <Box
        sx={{
          alignItems: "center",
          gap: 5,
          mb: {
            xs: 2,
            md: 4,
          },
          px: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Typography variant="h5">How It Works</Typography>
      </Box>

      <Box
        sx={{
          gap: 5,
          my: 10,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
        }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: "center", px: 5 }}>
            <Iconify
              icon={item.icon}
              width={32}
              sx={{ color: "primary.main" }}
            />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
