import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { fabClasses } from "@mui/material/Fab";

import { RouterLink } from "@/routes/components";

import { fCurrency } from "@/utils/format-number";

import { Label } from "@/components/label";
import { Image } from "@/components/image";
import { CompetitionStatusEnum, ICompetition } from "@/interfaces";

// ----------------------------------------------------------------------

type Props = {
  competition: ICompetition;
  detailsHref?: string;
};

export function CompetitionItem({ detailsHref, competition }: Props) {
  const status = "Active";

  const renderLabels = () => (
    <Box
      sx={{
        gap: 1,
        top: 16,
        zIndex: 9,
        right: 16,
        display: "flex",
        position: "absolute",
        alignItems: "center",
      }}
    >
      <Label variant="filled" color="info">
        {status}
      </Label>
    </Box>
  );

  const renderImage = () => (
    <Box sx={{ position: "relative", p: 1 }}>
      <Image
        alt={competition.title}
        src={competition.mediaUrl}
        ratio="16/9"
        sx={{
          borderRadius: 1.5,
          ...(competition.status === CompetitionStatusEnum.FINISHED && {
            opacity: 0.48,
            filter: "grayscale(1)",
          }),
        }}
      />
    </Box>
  );

  const renderContent = () => (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link
        component={RouterLink}
        href={detailsHref || "#"}
        color="inherit"
        variant="subtitle2"
        noWrap
      >
        This is competition title
      </Link>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ gap: 0.5, display: "flex", typography: "subtitle1" }}>
          <Box component="span">{fCurrency(0)}</Box>
        </Box>
      </Box>
    </Stack>
  );

  return (
    <Card
      sx={{
        "&:hover": {
          [`& .${fabClasses.root}`]: { opacity: 1, transform: "scale(1)" },
        },
      }}
    >
      {renderLabels()}
      {renderImage()}
      {renderContent()}
    </Card>
  );
}
