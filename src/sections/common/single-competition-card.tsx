import Card, { CardProps } from "@mui/material/Card";

import { fShortenNumber } from "@/utils/format-number";

import { Image } from "@/components/image";
import { Iconify } from "@/components/iconify";
import { Label, labelClasses } from "@/components/label";

import { Box, Button, IconButton, Link } from "@mui/material";
import { ICompetition } from "@/interfaces";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type CardItemProps = CardProps & {
  item: ICompetition;
  handleEnrollment: (competitionId: string) => void;
};

export function SingleCompetitionCard({
  item,
  handleEnrollment,
  sx,
  ...other
}: CardItemProps) {
  const renderImage = () => (
    <Box sx={{ px: 1, pt: 1 }}>
      <Image
        alt={item.title}
        src={item.mediaUrl}
        ratio="5/4"
        sx={{ borderRadius: 1.5 }}
      />
    </Box>
  );

  const renderBodyLabels = () => (
    <Box
      sx={{
        gap: 1,
        mb: 1.5,
        display: "flex",
        flexWrap: "wrap",
        [`& .${labelClasses.root}`]: {
          typography: "caption",
          color: "text.secondary",
        },
      }}
    >
      <Box sx={{ flexGrow: 1, gap: 0.5, display: "flex" }}>
        <Label
          startIcon={<Iconify width={12} icon="solar:clock-circle-outline" />}
        >
          1h 40m
        </Label>

        <Label
          startIcon={
            <Iconify width={12} icon="solar:users-group-rounded-bold" />
          }
        >
          {fShortenNumber(100)}
        </Label>
      </Box>

      <IconButton>
        <Iconify width={12} icon="solar:share-bold" />
      </IconButton>
    </Box>
  );

  const renderFooter = () => (
    <Box
      sx={{
        mt: 2.5,
        gap: 0.5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component="span"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center", // Align icon and text inline
          gap: 1, // Space between the icon and text
          typography: "subtitle1",
        }}
      >
        <Iconify
          icon="mdi:trophy-outline" // Trophy icon
          width={16}
          sx={{ color: "#FFD700" }} // Golden color
        />
        ${item.totalPrizeMoney || 10000}
      </Box>

      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={() => handleEnrollment(item.id)}
      >
        Join
      </Button>
    </Box>
  );

  const renderLabels = () => (
    <Box
      sx={{
        gap: 1,
        top: 16,
        zIndex: 9,
        right: 40,
        display: "flex",
        position: "absolute",
        alignItems: "center",
      }}
    >
      <Label
        variant="filled"
        color={
          item.status === "Active"
            ? "primary"
            : item.status === "Finished"
            ? "info"
            : item.status === "Draft"
            ? "warning"
            : "default"
        }
      >
        {item.status}
      </Label>
    </Box>
  );

  return (
    <>
      <Card sx={[{ width: 1 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
        {renderLabels()}
        {renderImage()}

        <Box sx={{ px: 2, py: 2.5 }}>
          {renderBodyLabels()}

          <Link
            variant="subtitle2"
            color="inherit"
            underline="none"
            href={item.detailsHref || "competition/no-link-found"}
            sx={(theme) => ({
              ...theme.mixins.maxLine({
                line: 2,
                persistent: theme.typography.subtitle2,
              }),
            })}
          >
            {item.title}
          </Link>

          {renderFooter()}
        </Box>
      </Card>
    </>
  );
}
