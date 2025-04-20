"use client";
import React from "react";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { Instagram, Twitter, Facebook } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

const Footer2 = () => {
  return (
    <Box sx={{ backgroundColor: "#0B0E14", color: "#fff", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              BeeJoyi
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              Discover, compete, and win in the world most exciting creative
              contests.
            </Typography>
          </Grid>

          {/* Center Section - Quick Links */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Quick Links
            </Typography>
            <Typography
              variant="body2"
              mt={1}
              sx={{ cursor: "pointer", "&:hover": { color: "#6A5ACD" } }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              mt={1}
              sx={{ cursor: "pointer", "&:hover": { color: "#6A5ACD" } }}
            >
              How It Works
            </Typography>
            <Typography
              variant="body2"
              mt={1}
              sx={{ cursor: "pointer", "&:hover": { color: "#6A5ACD" } }}
            >
              FAQs
            </Typography>
            <Typography
              variant="body2"
              mt={1}
              sx={{ cursor: "pointer", "&:hover": { color: "#6A5ACD" } }}
            >
              Contact
            </Typography>
          </Grid>

          {/* Social Media Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Follow Us
            </Typography>
            <Box display="flex" gap={2} mt={1}>
              <Instagram
                sx={{ cursor: "pointer", "&:hover": { color: "#6A5ACD" } }}
              />
              <Twitter
                sx={{ cursor: "pointer", "&:hover": { color: "#6A5ACD" } }}
              />
              <Facebook
                sx={{ cursor: "pointer", "&:hover": { color: "#6A5ACD" } }}
              />
            </Box>
          </Grid>

          {/* Subscription Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Contest Alert
            </Typography>
            <Box display="flex" mt={1}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your email"
                size="small"
                sx={{
                  bgcolor: "#1C1F26",
                  borderRadius: 1,
                  input: { color: "#fff" },
                }}
              />
              <Button
                variant="contained"
                sx={{ bgcolor: "#6A5ACD", ml: 1, px: 3, borderRadius: 1 }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="textSecondary">
            © 2025 BeeJoyi. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer2;
