import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";
import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

import { fShortenNumber } from "src/utils/format-number";

import { Iconify } from "src/components/iconify";
import { CONFIG } from "@/global-config";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  list: {
    id: string;
    name: string;
    amount: string;
  }[];
};

export function PrizeList({ title, list, sx, ...other }: Props) {
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
        {list.map((item, index) => (
          <Item key={item.id} item={item} index={index} />
        ))}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  index: number;
  item: Props["list"][number];
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

      {/* Winner Name */}
      <Box flexGrow={1}>
        <Box sx={{ typography: "h5", color: "text.secondary" }}>
          {item.name}
        </Box>
      </Box>

      {/* Prize Money */}
      <Box
        sx={{
          typography: "h5", // Make the prize money prominent
          color: "primary",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Iconify icon="mdi:currency-usd-circle" width={24} />
        {fShortenNumber(item.amount)}
      </Box>
    </Box>
  );
}
