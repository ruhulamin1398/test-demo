"use client";

import type { BoxProps } from "@mui/material/Box";

import type { Breakpoint } from "@mui/material/styles";
import { m } from "framer-motion";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import { CONFIG } from "src/global-config";

import {
  varFade,
  AnimateText,
  MotionContainer,
  animateTextClasses,
} from "src/components/animate";
import { Button, Stack } from "@mui/material";
import { paths } from "src/routes/paths";

// ----------------------------------------------------------------------

export function HomeHero({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  const smKey: Breakpoint = "sm";
  const mdKey: Breakpoint = "md";
  const lgKey: Breakpoint = "lg";

  const renderHeading = () => (
    <m.div>
      <Box
        component="h3"
        sx={[
          {
            my: 0,
            textAlign: "left",
            maxWidth: 680,
            display: "flex",
            flexWrap: "wrap",
            typography: "h3",
            justifyContent: "center",
            fontWeight: 700,
            color: "white",
            fontFamily: theme.typography.fontSecondaryFamily,
            [theme.breakpoints.up(lgKey)]: {
              fontSize: theme.typography.pxToRem(28),
              lineHeight: "10px",
            },
          },
        ]}
      >
        <Box component="span" sx={{ width: 1, opacity: 1 }}>
          Showcase Your Talent & Win Big!
        </Box>
      </Box>
    </m.div>
  );

  const renderText = () => (
    <m.div>
      <Typography
        variant="body2"
        sx={{
          mx: "auto",
          color: "white",
          [theme.breakpoints.up(smKey)]: { whiteSpace: "pre" },
          [theme.breakpoints.up(lgKey)]: { fontSize: 16, lineHeight: "10px" },
        }}
      >
        {`TJoin top competitions, win prizes, and gain recognition in our global creative community.`}
      </Typography>
    </m.div>
  );

  const renderButtons = () => (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "left",
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <m.div>
        <Button
          color="inherit"
          size="small"
          variant="outlined"
          target="_blank"
          rel="noopener"
          href={paths.figmaUrl}
          sx={{
            borderColor: "white",
            color: "white",
            borderRadius: "50px",
            padding: "10px 20px",
            fontWeight: 600,
          }}
        >
          Explore Contests
        </Button>
      </m.div>

      <m.div>
        <Button
          color="inherit"
          size="small"
          variant="outlined"
          target="_blank"
          rel="noopener"
          href={paths.figmaUrl}
          sx={{
            borderColor: "white",
            color: "white",
            borderRadius: "50px",
            padding: "10px 20px",
            fontWeight: 600,
          }}
        >
          Submit Entry
        </Button>
      </m.div>
    </Box>
  );

  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              "linear-gradient(rgba(79, 70, 229, 0.7), rgba(79, 70, 229, 0.7))",
              `url(${CONFIG.assetsDir}/contest.png)`,
            ],
          }),
          height: "90vh",
          py: { xs: 10, md: 0 },
          overflow: "hidden",
          position: "relative",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container
        component={MotionContainer}
        sx={{
          display: "flex",
          alignItems: "center",
          height: { md: 560 }, // or 100vh or whatever height you need
          position: "relative",
        }}
      >
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: "absolute" },
            textAlign: { xs: "center", md: "unset" },
          }}
        >
          <Stack spacing={3} sx={{ textAlign: "left" }}>
            <m.div>{renderHeading()}</m.div>
            <m.div>{renderText()}</m.div>
            <m.div>{renderButtons()}</m.div>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
