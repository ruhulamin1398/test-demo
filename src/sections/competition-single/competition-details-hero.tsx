import type { BoxProps } from "@mui/material/Box";

import { varAlpha } from "minimal-shared/utils";
import { Typography, Container, Box, Button } from "@mui/material";

import { CONFIG } from "@/global-config";

import {
  varFade,
  AnimateText,
  MotionContainer,
  animateTextClasses,
} from "@/components/animate";
import { ICompetition } from "@/interfaces";
import { useDate } from "@/hooks/use-date";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CompetitionHeroInlineCard from "./competition-hero-inline-card";
import { SubmissionTypeIconLabel } from "@/utils/constants";
import { ShareOutlined } from "@mui/icons-material";
import EnrollSubmissionButton from "./enroll-submission-button";
// ------------------------------------./competition-hero-inline-card-------

type CompetitionDetailsHeroProps = BoxProps & {
  competition: ICompetition;
};

const CompetitionDetailsHero = ({
  competition,
  sx,
  ...other
}: CompetitionDetailsHeroProps) => {
  const { enrollIds } = useSelector(
    (state: RootState) => state.auth.competitionInfo
  );
  const isEnroled = enrollIds.includes(competition.id);

  const { HumanTimeDifferent } = useDate();

  const renderCompetitionSummaryList = () => {
    return (
      <Box
        component="ul"
        sx={{
          mt: 3,
          display: "flex",
          color: "common.white",
          mr: { xs: 4, md: 6 },
          columnGap: { xs: 2, md: 3 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CompetitionHeroInlineCard
          value={` Ends ${HumanTimeDifferent(
            Number(competition?.enrollmentDeadline.endDate)
          )}`}
          icon="solar:clock-circle-outline"
        />
        <CompetitionHeroInlineCard
          value={`${competition?.enroledUserCount} Participants`}
          icon="solar:users-group-rounded-bold"
        />

        <CompetitionHeroInlineCard
          value={SubmissionTypeIconLabel[competition?.submissionType]?.label}
          icon={SubmissionTypeIconLabel[competition?.submissionType]?.icon}
        />
      </Box>
    );
  };
  const renderBadges = () => (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 2,
        }}
      >
        <Button
          color="primary"
          variant="soft"
          sx={{ height: { xs: 40, md: 48 }, color: "primary.main" }}
        >
          {competition?.category?.name || "UnCategorized"}
        </Button>

        <Button
          color="warning"
          variant="soft"
          sx={{ height: { xs: 40, md: 48 }, color: "warning.main" }}
        >
          {competition?.status}
        </Button>

        <Button
          color="secondary"
          variant="soft"
          sx={{ height: { xs: 40, md: 48 }, color: "secondary.main" }}
        >
          {competition?.price === 0 ? "Free " : "Paid"}
        </Button>
      </Box>
    </>
  );
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
          height: { xs: "auto", md: "auto" },
          position: "relative",
          py: { xs: 10, md: 10 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionContainer}>
        {renderBadges()}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "3fr 2fr" },
            gap: 2,
          }}
        >
          <Box
            sx={
              {
                // position: { md: "absolute" },
              }
            }
          >
            <AnimateText
              component="h1"
              variant="h2"
              textContent={competition.title}
              variants={varFade("inUp", { distance: 24 })}
              sx={{
                // fontSize: { xs: "2.5rem", md: "3.5rem" },
                color: "common.white",
                textTransform: "capitalize",
                [`& .${animateTextClasses.line}[data-index="0"]`]: {
                  [`& .${animateTextClasses.word}[data-index="0"]`]: {
                    color: "primary.main",
                  },
                },
              }}
            />

            {renderCompetitionSummaryList()}
          </Box>

          <Box
            sx={{
              // textAlign: { xs: "left", md: "unset" },
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: { xs: 2, md: 2 },
            }}
          >
            <EnrollSubmissionButton competition={competition} />

            <Button
              color="primary"
              startIcon={<ShareOutlined />}
              variant="contained"
              disableElevation
              sx={{ height: { xs: 40, md: 48 } }}
            >
              Share
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CompetitionDetailsHero;
// -----------------------------------------------------------------
