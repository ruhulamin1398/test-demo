import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Iconify } from "@/components/iconify";
import { Card, CardProps } from "@mui/material";
import { ICompetition, IRound, RoundDetails } from "@/interfaces";
import { Label } from "@/components/label";
import { Markdown } from "@/components/markdown";

// ----------------------------------------------------------------------
type ContestDetailsContentProps = {
  competition: ICompetition;
};

export function ContestDetailsContent({
  competition,
}: ContestDetailsContentProps) {
  const renderHead = () => (
    <>
      <Box sx={{ mt: 3, mb: 2, display: "flex" }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {competition.title}
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
        {competition?.eligibility}
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
      <Markdown children={competition.description} />
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
          {competition.rounds.map((round) => (
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
  round: IRound;
};

export function RoundDetailsCard({ sx, round, ...other }: Props) {
  const renderLabels = () => (
    <Box
      sx={{
        gap: 1,
        top: 10,
        zIndex: 9,
        right: 15,
        display: "flex",
        position: "absolute",
        alignItems: "center",
      }}
    >
      <Label
        variant="filled"
        color={round.status === "Ongoing" ? "primary" : "default"}
      >
        {round.status}
      </Label>
    </Box>
  );

  return (
    <Card
      sx={[{ py: 3, pl: 3, pr: 2.5 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Box
        sx={{
          flexGrow: 1,
          ...(round?.status !== "Ongoing" && { opacity: 0.5 }), // Apply opacity conditionally
        }}
      >
        {renderLabels()}
        <Box sx={{ mt: 2 }}>
          <Link
            variant="h5"
            color="inherit"
            underline="none"
            href="competition/rounds/1"
          >
            {round.title}
          </Link>
        </Box>

        <Typography
          variant="body2"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {round?.description
            ? round.description.split(" ").slice(0, 20).join(" ") +
              (round.description.split(" ").length > 20 ? "..." : "")
            : ""}
        </Typography>
      </Box>
    </Card>
  );
}
