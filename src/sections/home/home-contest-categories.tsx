import type { BoxProps } from "@mui/material/Box";
import { m } from "framer-motion";
import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { MotivationIllustration } from "@/assets/illustrations";

import { CONFIG } from "@/global-config";

import { Iconify } from "@/components/iconify";
import { varFade, MotionViewport } from "@/components/animate";
import { Featurecategories } from "@/_mock/contest";
import { Button } from "@mui/material";

// ----------------------------------------------------------------------

export function HomeContestCategories({ sx, ...other }: BoxProps) {
  const renderDescription = () => (
    <Box
      sx={{ maxWidth: { md: 360 }, textAlign: { xs: "center", md: "unset" } }}
    >
      <m.div variants={varFade("inUp")}>
        <Typography variant="h2" sx={{ my: 3, color: "common.white" }}>
          Contest <br />
          Categories
        </Typography>
      </m.div>

      <m.div variants={varFade("inUp")}>
        <Typography sx={{ color: "common.white" }}>
          Our goal is to create a product and service that you’re satisfied with
          and use it every day. This is why we’re constantly working on our
          services to make it better every day and really listen to what our
          users has to say.
        </Typography>
      </m.div>
    </Box>
  );

  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.hideScrollY,
          py: { md: 10 },
          height: { md: 1 },
          overflowY: { xs: "unset", md: "auto" },
        }),
      ]}
    >
      <Masonry spacing={3} columns={{ xs: 1, md: 2 }} sx={{ ml: 0 }}>
        {Featurecategories.map((item) => (
          <m.div key={item.id} variants={varFade("inUp")}>
            {/* <CategoryItem data={item} /> */}

            <Grid size={{ xs: 12, md: 12 }}>
              <CateGoryItemCard
                title={item.title}
                description={item.description}
                img={<MotivationIllustration hideBackground />}
                contestCount={item.count}
                participants={item.participants}
              />
            </Grid>
          </m.div>
        ))}
      </Masonry>
    </Box>
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
                0.9
              )}, ${varAlpha(theme.vars.palette.grey["900Channel"], 0.9)})`,
              `url(${CONFIG.assetsDir}/assets/images/about/testimonials.webp)`,
            ],
          }),
          overflow: "hidden",
          height: { md: 840 },
          py: { xs: 10, md: 0 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container
        component={MotionViewport}
        sx={{ position: "relative", height: 1 }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            height: 1,
            alignItems: "center",
            justifyContent: { xs: "center", md: "space-between" },
          }}
        >
          <Grid size={{ xs: 10, md: 4 }}>{renderDescription()}</Grid>

          <Grid
            size={{ xs: 12, md: 8, lg: 8 }}
            sx={{ height: 1, alignItems: "center" }}
          >
            {renderContent()}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type WProps = BoxProps & {
  title?: string;
  description?: string;
  contestCount?: string;
  participants?: string;
  img?: React.ReactNode;
  action?: React.ReactNode;
};

export function CateGoryItemCard({
  title,
  description,
  contestCount,
  participants,
  action,
  img,
  sx,
  ...other
}: WProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(to right, ${
                theme.vars.palette.grey[900]
              } 25%, ${varAlpha(
                theme.vars.palette.primary.darkerChannel,
                0.88
              )})`,
              `url(${CONFIG.assetsDir}/assets/background/background-6.webp)`,
            ],
          }),
          pt: 5,
          pb: 5,
          pr: 3,
          gap: 5,
          borderRadius: 2,
          display: "flex",
          height: { md: 1 },
          position: "relative",
          pl: { xs: 3, md: 5 },
          alignItems: "center",
          color: "common.white",
          textAlign: { xs: "center", md: "left" },
          flexDirection: { xs: "column", md: "row" },
          border: `solid 1px ${theme.vars.palette.grey[800]}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box>
        <Typography variant="h4" sx={{ whiteSpace: "pre-line", mb: 1 }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ opacity: 0.64, maxWidth: 360, mb: 1 }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            rowGap: 1,
            columnGap: 2,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            typography: "body2",
            color: "text.secondary",
            mb: 1,
          }}
        >
          <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
            <Iconify
              width={16}
              icon="solar:calendar-date-bold"
              sx={{ flexShrink: 0 }}
            />
            {contestCount}
          </Box>

          <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
            <Iconify
              width={16}
              icon="solar:users-group-rounded-bold"
              sx={{ flexShrink: 0 }}
            />
            {participants}
          </Box>
        </Box>
        {action && action}
      </Box>
    </Box>
  );
}
