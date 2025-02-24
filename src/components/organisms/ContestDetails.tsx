import React from "react";
import { Box, Typography, Paper, Stack, Container } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Grid from "@mui/material/Grid2";

const ContestDetails = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "white",
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": { boxShadow: 2 },
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="black">
                About the Contest
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: "#555" }}>
                Join us in celebrating the art of photography in our annual
                Global Photography Awards. This contest brings together talented
                photographers from around the world to showcase their best work
                across multiple categories.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    sx={{
                      p: 2,
                      transition: "0.3s",
                      "&:hover": { boxShadow: 2 },
                    }}
                    elevation={1}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      Start Date
                    </Typography>
                    <Typography variant="body2">March 1, 2025</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    sx={{
                      p: 2,
                      transition: "0.3s",
                      "&:hover": { boxShadow: 2 },
                    }}
                    elevation={1}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      End Date
                    </Typography>
                    <Typography variant="body2">April 15, 2025</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Prizes Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                transition: "0.3s",
                backgroundColor: "white",
                "&:hover": { boxShadow: 2 },
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="black">
                Prizes
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmojiEventsIcon sx={{ color: "gold" }} />
                  <Box>
                    <Typography fontWeight="bold">First Prize</Typography>
                    <Typography variant="body2">
                      $5,000 + Pro Camera Kit
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MilitaryTechIcon sx={{ color: "silver" }} />
                  <Box>
                    <Typography fontWeight="bold">Second Prize</Typography>
                    <Typography variant="body2">$2,500 + Lens Kit</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <WorkspacePremiumIcon sx={{ color: "#cd7f32" }} />
                  <Box>
                    <Typography fontWeight="bold">Third Prize</Typography>
                    <Typography variant="body2">
                      $1,000 + Photography Gear
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>
      </Grid>
    </Container>
  );
};

export default ContestDetails;