import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import {
  Button,
  LinearProgress,
  linearProgressClasses,
  Pagination,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import { RouterLink } from "@/routes/components";
import { Iconify } from "@/components/iconify";
import { ICompetition } from "@/interfaces";
import { ComponentBox } from "@/layouts/component-box";

// ----------------------------------------------------------------------

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: "column",
};

type Props = CardProps & {
  title?: string;
  list: ICompetition[];
};

export function MyCompetitionList({ title, list, sx, ...other }: Props) {
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
        {list.map((item) => (
          <Item key={item.id} item={item} />
        ))}

        {/* <ComponentBox sx={componentBoxStyles}> */}
        <Pagination
          shape="rounded"
          count={10}
          variant="outlined"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        />
        {/* </ComponentBox> */}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: ICompetition;
};

function Item({ item, sx, ...other }: ItemProps) {
  const percent = 20;

  return (
    <Box
      sx={[
        { gap: 2, display: "flex", alignItems: "center" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Avatar
        alt={item.title}
        src={item.mediaUrl}
        variant="rounded"
        sx={{ width: 56, height: 56 }}
      />

      <Box
        sx={{
          minWidth: 0,
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
        }}
      >
        <Link
          color="inherit"
          href={item.detailsHref}
          noWrap
          sx={{ mb: 0.5, typography: "subtitle2" }}
        >
          {item.title}
        </Link>
        <Box
          sx={{
            gap: 0.5,
            display: "flex",
            alignItems: "center",
            typography: "caption",
            color: "text.secondary",
          }}
        >
          <Iconify width={16} icon="solar:calendar-date-bold" />
          {"Ends in 2 days"}
        </Box>
        {/* <Box
          component="span"
          sx={{ color: "text.secondary", typography: "caption" }}
        >
          Task: 5/3
        </Box> */}

        <Box
          sx={{
            width: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            my: 1,
          }}
        >
          <LinearProgress
            color="warning"
            variant="determinate"
            value={percent}
            sx={[
              (theme) => ({
                width: 1,
                height: 6,
                bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.16),
                [` .${linearProgressClasses.bar}`]: { opacity: 0.8 },
              }),
            ]}
          />
          {/* <Box
            component="span"
            sx={{
              width: 40,
              typography: "caption",
              color: "text.secondary",
              fontWeight: "fontWeightMedium",
            }}
          >
            {fPercent(percent)}
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
