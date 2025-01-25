"use client";
import React from "react";
import { Box } from "@mui/material";
const ProfileHeroSection: React.FC = () => {
  return (
    <div>
      <Box
        id="profile-page-hero"
        sx={(theme) => ({
          position: "relative",
          height: "60vh",
          width: "100vw",
          overflow: "hidden",
          background: "url(/banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          [theme.breakpoints.down("md")]: {
            height: "25vh",
          },
        })}
      />
    </div>
  );
};

export default ProfileHeroSection;
