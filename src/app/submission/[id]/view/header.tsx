"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { varFade, AnimateText, animateTextClasses } from "@/components/animate";
type Props = { title?: string; subtitle?: string };

const PageHeader = (props: Props) => {
  return (
    <Box py={4}>
      <AnimateText
        component="h1"
        variant="h4"
        textContent={["Winter Photography Competition", "Round 1"]}
        variants={varFade("inUp", { distance: 24 })}
        sx={{
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
