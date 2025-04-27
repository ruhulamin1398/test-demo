import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";
import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

import { fShortenNumber } from "@/utils/format-number";

import { Iconify } from "@/components/iconify";
import { CONFIG } from "@/global-config";
import { IPrizesAndRewards } from "@/interfaces";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  prizes: IPrizesAndRewards[];
};

export function PrizeList({ title, prizes, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} />

      <Box
        sx={{
          p: 3,
          gap: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {prizes.map((item, index) => (
          <Item key={item.id} item={item} index={index} />
        ))}
      </Box>
    </Card>
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
        <Box sx={{ typography: "h5", color: "text.secondary" }}>
          {item.title}
        </Box>
        <Box
          sx={{
            typography: "body2",
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {item.rewards}
        </Box>
      </Box>
    </Box>
  );
}
