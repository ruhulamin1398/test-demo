import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";
import { varAlpha } from "minimal-shared/utils";

import { Iconify } from "@/components/iconify";
import { IPrizesAndRewards } from "@/interfaces";
import { Typography, Box, CardHeader } from "@mui/material";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  prizes: IPrizesAndRewards[];
};

export function PrizeList({ title, prizes, sx, ...other }: Props) {
  return (
    <Box sx={sx} {...other}>
      <CardHeader sx={{ my: 0.5, py: 0.5 }} title={title} />
      <Box
        sx={{
          p: 1,
          px: 3,
          gap: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {prizes.map((item, index) => (
          <Item key={item.id} item={item} index={index} />
        ))}
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  index: number;
  item: IPrizesAndRewards;
};

function Item({ item, index, sx, ...other }: ItemProps) {
  return (
    <Box
      sx={[
        { gap: 2, display: "flex", alignItems: "center" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* Winner Icon */}
      <Box
        sx={[
          (theme) => ({
            width: 40,
            height: 40,
            display: "flex",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
            ...(index === 1 && {
              color: "info.main",
              bgcolor: varAlpha(theme.vars.palette.info.mainChannel, 0.08),
            }),
            ...(index === 2 && {
              color: "error.main",
              bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
            }),
          }),
        ]}
      >
        <Iconify width={24} icon="solar:cup-star-bold" />
      </Box>

      <Box flexGrow={1}>
        <Typography variant="subtitle2">{item.title}</Typography>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {item.rewards}
        </Typography>
      </Box>
    </Box>
  );
}
