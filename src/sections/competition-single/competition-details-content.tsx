import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Iconify } from "@/components/iconify";
import { _tours, TOUR_SERVICE_OPTIONS } from "@/_mock";
import { Markdown } from "@/components/markdown";
import { Card, CardProps } from "@mui/material";
import { RoundDetailsCardData } from "@/_mock/contest";
import { RoundDetails } from "@/interfaces";

// ----------------------------------------------------------------------

export function ContestDetailsContent() {
  const currentTour = _tours.find(
    (tour) => tour.id === "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1"
  );
  const renderHead = () => (
    <>
      <Box sx={{ mt: 3, mb: 2, display: "flex" }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Winter Photography Competition
        </Typography>

        <IconButton>
          <Iconify icon="solar:share-bold" />
        </IconButton>

        <Checkbox
          defaultChecked
          color="error"
          icon={<Iconify icon="solar:heart-outline" />}
          checkedIcon={<Iconify icon="solar:heart-bold" />}
          inputProps={{
            id: "favorite-checkbox",
            "aria-label": "Favorite checkbox",
          }}
        />
      </Box>
      <Box
        sx={{
          mb: 2,
          gap: 0.5,
          display: "flex",
          alignItems: "center",
          typography: "subtitle2",
        }}
      >
        <Iconify icon="mdi:account-group-outline" sx={{ color: "primary" }} />
        <Box
          component="span"
          sx={{ typography: "body2", color: "text.primary" }}
        >
          Eligibility :
        </Box>
        Anyone can join
      </Box>

      <Box
        sx={{
          gap: 3,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            gap: 0.5,
            display: "flex",
            alignItems: "center",
            typography: "body2",
          }}
        >
          <Iconify icon="eva:star-fill" sx={{ color: "warning.main" }} />
          <Box component="span" sx={{ typography: "subtitle2" }}>
            50
          </Box>

          <Link sx={{ color: "text.secondary" }}>(234 reviews)</Link>
        </Box>

        <Box
          sx={{
            gap: 0.5,
            display: "flex",
            alignItems: "center",
            typography: "body2",
          }}
        >
          <Iconify icon="mingcute:location-fill" sx={{ color: "error.main" }} />
          online
        </Box>

        <Box
          sx={{
            gap: 0.5,
            display: "flex",
            alignItems: "center",
            typography: "subtitle2",
          }}
        >
          <Iconify icon="solar:flag-bold" sx={{ color: "info.main" }} />
          <Box
            component="span"
            sx={{ typography: "body2", color: "text.secondary" }}
          >
            Organized by
          </Box>
          BIJOYEE
        </Box>
      </Box>
    </>
  );

  const renderContent = () => (
    <>
      <Markdown children={currentTour?.content} />

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Services
        </Typography>

        <Box
          sx={{
            rowGap: 2,
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
          }}
        >
          {TOUR_SERVICE_OPTIONS.map((service) => (
            <Box
              key={service.label}
              sx={{
                gap: 1,
                display: "flex",
                alignItems: "center",
                ...(currentTour?.services.includes(service.label) && {
                  color: "text.disabled",
                }),
              }}
            >
              <Iconify
                icon="eva:checkmark-circle-2-outline"
                sx={{
                  color: "primary.main",
                  ...(currentTour?.services.includes(service.label) && {
                    color: "text.disabled",
                  }),
                }}
              />
              {service.label}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );

  const renderRoundDetails = () => (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Round Details
        </Typography>

        <Box
          sx={{
            rowGap: 2,
            columnGap: 2,
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
          }}
        >
          {RoundDetailsCardData.map((round) => (
            <RoundDetailsCard round={round} key={round.id} />
          ))}
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Box>
        {renderHead()}

        <Divider sx={{ borderStyle: "dashed", mt: 5, mb: 2 }} />
        {renderRoundDetails()}
        <Divider sx={{ borderStyle: "dashed", mt: 5, mb: 2 }} />

        {renderContent()}
      </Box>
    </>
  );
}

type Props = CardProps & {
  round: RoundDetails;
};

export function RoundDetailsCard({ sx, round, ...other }: Props) {
  return (
    <Card
      sx={[{ py: 3, pl: 3, pr: 2.5 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Box
        sx={{
          flexGrow: 1,
          ...(round?.status !== "running" && { opacity: 0.5 }), // Apply opacity conditionally
        }}
      >
        <Box sx={{ typography: "h6" }}>{round?.title}</Box>

        <Typography
          variant="body2"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {round?.description}
        </Typography>
      </Box>
    </Card>
  );
}
