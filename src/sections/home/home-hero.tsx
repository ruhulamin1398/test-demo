import type { BoxProps } from "@mui/material/Box";

import { m } from "framer-motion";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { CONFIG } from "@/global-config";

import {
  varFade,
  AnimateText,
  MotionContainer,
  animateTextClasses,
} from "@/components/animate";
import { Button } from "@mui/material";

// ----------------------------------------------------------------------

export function HomeHero({ sx, ...other }: BoxProps) {
  const renderActions = () => (
    <Box sx={{ gap: 2, display: "flex", mt: 3 }}>
      <Button
        color="success"
        variant="contained"
        size="large"
        sx={{ whiteSpace: "nowrap" }}
      >
        Explore Contests
      </Button>

      <Button
        color="info"
        variant="contained"
        size="large"
        sx={{ whiteSpace: "nowrap" }}
      >
        Submit Entry
      </Button>
    </Box>
  );

  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `url(${CONFIG.assetsDir}/assets/background/overlay.svg)`,
              `url(${CONFIG.assetsDir}/contest.png)`,
            ],
          }),
          height: { md: 560 },
          py: { xs: 10, md: 0 },
          overflow: "hidden",
          position: "relative",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionContainer}>
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
            textContent={["Showcase Your Talent", "& Win Big!"]}
            variants={varFade("inRight", { distance: 24 })}
            sx={{
              color: "common.white",
              [`& .${animateTextClasses.line}[data-index="0"]`]: {
                [`& .${animateTextClasses.word}[data-index="0"]`]: {
                  color: "primary.main",
                },
              },
            }}
          />

          <m.div variants={varFade("inUp", { distance: 24 })}>
            <Typography
              variant="h5"
              sx={{
                mt: 3,
                color: "common.white",
                fontWeight: "fontWeightSemiBold",
              }}
            >
              Join top competitions, win prizes, and gain recognition in our
              global creative community.
            </Typography>
          </m.div>

          <m.div variants={varFade("inUp", { distance: 24 })}>
            {renderActions()}
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
