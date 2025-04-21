import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    title: string;
    coverUrl: string;
    totalLesson: number;
    currentLesson: number;
  }[];
};

export function CompletedCompetitions({
  title,
  subheader,
  list,
  sx,
  ...other
}: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

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
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: Props["list"][number];
};

function Item({ item, sx, ...other }: ItemProps) {
  const percent = (item.currentLesson / item.totalLesson) * 100;

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
        src={item.coverUrl}
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
        <Link color="inherit" noWrap sx={{ mb: 0.5, typography: "subtitle2" }}>
          {item.title}
        </Link>

        <Box
          sx={{
            width: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 50,
            }}
          >
            <Typography variant="caption" color="text.secondary" noWrap>
              2 Days Ago
            </Typography>
          </Box>

          <Box
            component="span"
            sx={{
              width: 50,
              typography: "caption",
              color: "text.secondary",
              fontWeight: "fontWeightMedium",
            }}
          >
            <Link component={RouterLink} href={paths.profile.root}>
              Result
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
