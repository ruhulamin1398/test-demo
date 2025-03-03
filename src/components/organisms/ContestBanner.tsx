"use client";
import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "linear-gradient(135deg, #6e7fff, #7b65ff)",
  borderRadius: "10px",
  padding: "30px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: "30px",
  marginTop:'20px',
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const BannerText = styled(Box)(({ theme }) => ({
  flex: 1,
  color: "#fff",
  paddingRight: "30px",
  [theme.breakpoints.down("md")]: {
    paddingRight: 0,
  },
}));

const BannerImage = styled("img")({
  maxWidth: "300px",
  width: "100%",
});

const ContestBanner: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BannerContainer>
        <BannerText>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Find the Perfect Contest & Win Big!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Join thousands of participants and showcase your talent
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffffff",
              color: "#3b39cc",
              borderRadius: 2,
              padding: "10px 20px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#6e7fff",
                color: "#ffffff",
              },
            }}
          >
            Get Started Now
          </Button>
        </BannerText>
        <Box sx={{ flex: 0.5 }}>
          <BannerImage src="contest-banner.png" alt="Trophy" />
        </Box>
      </BannerContainer>
    </Container>
  );
};

export default ContestBanner;
