import { IRound } from "@/interfaces";

import { Label } from "@/components/label";
import { Box, Card, CardProps, Typography } from "@mui/material";

type Props = CardProps & {
  round: IRound;
  handlePopUp: (round: IRound) => void;
};
const RoundDetailsCard = ({ sx, round, handlePopUp, ...other }: Props) => {
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
          <Typography
            color="inherit"
            variant="subtitle2"
            sx={(theme) => ({
              ...theme.mixins.maxLine({
                line: 2,
                persistent: theme.typography.subtitle2,
              }),
              cursor: "pointer",
            })}
            onClick={(e) => {
              e.preventDefault();
              handlePopUp(round);
            }}
          >
            {round.title}
          </Typography>
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
};

export default RoundDetailsCard;
