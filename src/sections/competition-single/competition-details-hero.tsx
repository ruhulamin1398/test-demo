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
import { ICompetition } from "@/interfaces";
import { useDate } from "@/hooks/use-date";

// ----------------------------------------------------------------------

type CompetitionDetailsHeroProps = BoxProps & {
  competition: ICompetition;
};

export function CompetitionDetailsHero({
  competition,
  sx,
  ...other
}: CompetitionDetailsHeroProps) {
  const { formatDate } = useDate();
  const renderCompetitionSummaryList = () => {
    return (
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
        <CompetitionHeroCard
          title="PRIZE MONEY"
          value={`TK 5000`}
          icon="mdi:currency-usd-circle"
        />

        <CompetitionHeroCard
          title="TimeLine"
          value={`${formatDate(competition.startDate)} - ${formatDate(
            competition.endDate
          )}`}
          icon="mdi:currency-usd-circle"
        />
        <CompetitionHeroCard
          title="Enrollment Start At"
          value={formatDate(competition.enrollmentDeadline.startDate)}
          icon="mdi:currency-usd-circle"
        />
        <CompetitionHeroCard
          title="Enrollment Ends At"
          value={formatDate(competition.enrollmentDeadline.endDate)}
          icon="mdi:currency-usd-circle"
        />
      </Box>
    );
  };
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
              `url(${CONFIG.assetsDir}${competition.mediaUrl})`,
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
            textContent={competition.title}
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
          {renderCompetitionSummaryList()}
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
type CompetitionHeroCardProps = BoxProps & {
  title: string;
  value: string;
  icon: string;
};

function CompetitionHeroCard({
  title,
  value,
  icon,
  sx,
  ...other
}: CompetitionHeroCardProps) {
  return (
    <li key={"Prize"}>
      <m.div variants={varFade("inUp", { distance: 24 })}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          {/* First Column: Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 48,
            }}
          >
            <Iconify icon={icon} width={36} sx={{ color: "primary.main" }} />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </m.div>
    </li>
  );
}
