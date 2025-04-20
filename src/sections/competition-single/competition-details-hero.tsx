import type { BoxProps } from "@mui/material/Box";

import { m } from "framer-motion";
import { varAlpha } from "minimal-shared/utils";

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
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function CompetitionDetailsHero({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(
                theme.vars.palette.grey["900Channel"],
                0.8
              )}, ${varAlpha(theme.vars.palette.grey["900Channel"], 0.8)})`,
              `url(${CONFIG.assetsDir}/assets/images/contact/hero.webp)`,
            ],
          }),
          overflow: "hidden",
          height: { md: 560 },
          position: "relative",
          py: { xs: 10, md: 0 },
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

          <Box
            component="ul"
            sx={{
              mt: 5,
              display: "grid",
              color: "common.white",
              rowGap: { xs: 5, md: 0 },
              columnGap: { xs: 2, md: 5 },
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
            }}
          >
            {CompetitionSummaryList.map((data) => (
              <li key={data.title}>
                <m.div variants={varFade("inUp", { distance: 24 })}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2, // Space between columns
                      mb: 2,
                    }}
                  >
                    {/* First Column: Icon */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 48, // Fixed width for the icon column
                      }}
                    >
                      {data.icon}
                    </Box>

                    {/* Second Column: Title and Value */}
                    <Box>
                      <Typography variant="h6" sx={{ mb: 0.5 }}>
                        {data.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {data.value}
                      </Typography>
                    </Box>
                  </Box>
                </m.div>
              </li>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

const CompetitionSummaryList = [
  {
    title: "PRIZE MONEY",
    value: "TK 500000",
    icon: (
      <Iconify
        icon="mdi:currency-usd-circle"
        width={36}
        sx={{ color: "primary.main" }}
      />
    ),
  },
  {
    title: "TIMELINE",
    value: "Jan 9, 2014 - Jan 31, 2014",
    icon: (
      <Iconify
        icon="solar:calendar-date-bold"
        width={36}
        sx={{ color: "primary.main" }}
      />
    ),
  },
  {
    title: "ENROLMENT OPEN FROM",
    value: "Jan 9, 2014",
    icon: (
      <Iconify
        icon="solar:clock-circle-bold"
        width={36}
        sx={{ color: "primary.main" }}
      />
    ),
  },
  {
    title: "ENROLMENT ENDS AT",
    value: "Jan 31, 2014",
    icon: (
      <Iconify
        icon="solar:clock-circle-bold"
        width={36}
        sx={{ color: "primary.main" }}
      />
    ),
  },
];
