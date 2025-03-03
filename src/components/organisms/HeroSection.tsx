"use client";
import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const HeroContainer = styled(Box)({
  position: "relative", 
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "left",
  color: "#ffffff",
  padding: "0 20px",
  paddingLeft: "5%",
});

const OverlayContent = styled(Box)({
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  maxWidth: "700px",
});

const BackgroundImage = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  background: "linear-gradient(rgba(79, 70, 229, 0.7), rgba(79, 70, 229, 0.7)), url(/contest.png) no-repeat center center/cover",
  filter: "brightness(0.7)",
  zIndex: 1,
  backgroundSize: "cover",
});

const StyledButton = styled(Button)({
  borderRadius: "50px",
  padding: "10px 20px",
  fontWeight: 600,
  transition: "all 0.3s ease-in-out",
  '&:hover': {
    transform: "scale(1.05)",
  }
});

const HeroSection: React.FC = () => {
  useEffect(() => {
    const handleScroll = (): void => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeroContainer>
      <BackgroundImage />
      <OverlayContent>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Showcase Your Talent & Win Big!
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
          Join top competitions, win prizes, and gain recognition in our
          global creative community.
        </Typography>
        <Box display="flex" gap={2}>
          <StyledButton
            variant="contained"
            sx={{ backgroundColor: "#ffffff", color: "#4A00E0" }}
          >
            Explore Contests
          </StyledButton>
          <StyledButton
            variant="outlined"
            sx={{ borderColor: "#ffffff", color: "#ffffff" }}
          >
            Submit Entry
          </StyledButton>
        </Box>
      </OverlayContent>
    </HeroContainer>
  );
};

export default HeroSection;
