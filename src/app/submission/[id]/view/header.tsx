"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { varFade, AnimateText, animateTextClasses } from "@/components/animate";
type Props = { title?: string; subtitle?: string };

const PageHeader = (props: Props) => {
  return (
    <Box
      sx={{
        bottom: { md: 80 },
        position: { md: "absolute" },
        textAlign: { xs: "center", md: "unset" },
      }}
    >
      <AnimateText
        component="h1"
        variant="h1"
        textContent={["Winter Photography Competition", "Round 1"]}
        variants={varFade("inUp", { distance: 24 })}
        sx={{
          color: "common.white",
          [`& .${animateTextClasses.line}[data-index="0"]`]: {
            [`& .${animateTextClasses.word}[data-index="0"]`]: {
              color: "primary.main",
            },
          },
        }}
      />
    </Box>
  );
};

export default PageHeader;
