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
  Typography,
} from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import { RouterLink } from "@/routes/components";
import { Iconify } from "@/components/iconify";
import { ICompetition } from "@/interfaces";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  list: ICompetition[];
  isPaginate?: Boolean;
  isViewMore?: Boolean;
};

const MyEndedCompetitionList = ({
  title,
  list,
  isPaginate = false,
  isViewMore = false,
  sx,
  ...other
}: Props) => {
  return (
    <Card sx={sx} {...other}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mt: 3,
          px: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Typography variant="h5"> {title}</Typography>

        {isViewMore && (
          <Link
            component={RouterLink}
            href="/profile?profile-tab=my-competitions"
            color="inherit"
            underline="none"
          >
            <Button
              color="primary"
              variant="outlined"
              endIcon={<Iconify icon="ic:round-arrow-forward" />}
            >
              View All
            </Button>
          </Link>
        )}
      </Box>

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
        <Pagination
          shape="rounded"
          count={10}
          variant="outlined"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        />
      </Box>
    </Card>
  );
};

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
        <Link color="inherit" noWrap sx={{ mb: 0.5, typography: "subtitle2" }}>
          {item.title}
        </Link>
        {/* <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            my: 1,
          }}
        >
          {item.description}
        </Typography> */}

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
          {"Ended at 17 jan 2023"}
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
        ></Box>
      </Box>
    </Box>
  );
}

export default MyEndedCompetitionList;
