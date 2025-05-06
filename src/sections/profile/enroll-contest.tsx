import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { Beenhere } from "@mui/icons-material";
import { Iconify } from "@/components/iconify";
import { Label, labelClasses } from "@/components/label";

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title?: string;
  price?: string;
  description?: string;
};

export function EnrolmentCard({
  price,
  title,
  description,
  sx,
  ...other
}: Props) {
  return (
    <Box
      sx={[
        (theme) => ({
          p: 5,
          borderRadius: 2,
          position: "relative",
          color: "common.white",
          backgroundImage: `linear-gradient(135deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.primary.dark})`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ whiteSpace: "pre-line", typography: "h6" }}>{title}</Box>

      <Box sx={{ typography: "h2" }}>{price}</Box>
      <Box
        sx={{
          gap: 1,
          my: 2,
          display: "flex",
          flexWrap: "wrap",
          [`& .${labelClasses.root}`]: {
            typography: "body2",
            color: "common.white",
            bgcolor: "primary.main",
          },
        }}
      >
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
          500
        </Label>
      </Box>

      <Button
        fullWidth
        size="large"
        startIcon={<Beenhere />}
        color="primary"
        variant="contained"
      >
        ENROLL NOW
      </Button>
    </Box>
  );
}
