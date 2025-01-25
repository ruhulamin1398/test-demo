"use client";
import React, { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import BalloonExplosion from "./BalloonExplosion";

const HeroContainer = styled(Box)({
  position: "relative",
  height: "60vh",
  width: "100vw",
  overflow: "hidden",
});

const OverlayContent = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  color: "#ffffff",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const HeroSection: React.FC = () => {
  const handleScroll = (): void => {
    // const hero = document.querySelector<HTMLElement>(".background");
    // if (hero) {
    //   const offset = window.scrollY;
    //   hero.style.transform = `translateY(${offset * 0.5}px)`;
    // }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeroContainer>
      <OverlayContent>
        <Container>
          <Typography variant="h2" gutterBottom>
            Compete to win money and unlock opportunities
          </Typography>
          <Typography variant="subtitle1">
            Take a look at our competitions and see what opportunities are
            available right now!
          </Typography>
          <Box p={2}>
            <Button variant="contained">View our current competitions</Button>
          </Box>
        </Container>
      </OverlayContent>
      <svg viewBox="0 0 500 200">
        <path
          d="M 0 50 C 150 150 300 0 500 80 L 500 0 L 0 0"
          fill="rgb(57, 27, 112)"
        ></path>
        <path
          d="M 0 50 C 150 150 330 -30 500 50 L 500 0 L 0 0"
          fill="#0E7452"
          opacity="0.8"
        ></path>
        <path
          d="M 0 50 C 215 150 250 0 500 100 L 500 0 L 0 0"
          fill="#0E7452"
          opacity="0.5"
        ></path>
      </svg>
      <BalloonExplosion />
    </HeroContainer>
  );
};

export default HeroSection;
