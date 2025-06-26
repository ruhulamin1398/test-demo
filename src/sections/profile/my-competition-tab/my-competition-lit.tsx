import { m } from "framer-motion";
import type { CardProps } from "@mui/material/Card";

import {
  Button,
  LinearProgress,
  linearProgressClasses,
  Pagination,
  SxProps,
  Theme,
  Typography,
  Card,
  Avatar,
  Box,
  Link,
  CardHeader,
} from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import { RouterLink } from "@/routes/components";
import { Iconify } from "@/components/iconify";
import { ICompetition } from "@/interfaces";

import { paths } from "@/routes/paths";
import { varFade } from "@/components/animate";

// ----------------------------------------------------------------------

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: "column",
};

type Props = CardProps & {
  title?: string;
  list: ICompetition[];
  isPaginate?: Boolean;
  isViewMore?: Boolean;
};

const MyCompetitionList = ({
  title,
  list,
  isPaginate = false,
  isViewMore = false,
  sx,
  ...other
}: Props) => {
  return (
    <>
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
          pt: 0,
          gap: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {list.slice(0, 3).map((item) => (
          <Item key={item.id} item={item} />
        ))}

        {isPaginate && (
          <Pagination
            shape="rounded"
            count={10}
            variant="outlined"
            sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
          />
        )}
      </Box>
    </>
  );
};

// ----------------------------------------------------------------------

type ItemProps = CardProps & {
  item: ICompetition;
};

function Item({ item, sx, ...other }: ItemProps) {
  const percent = 20;

  return (
    <m.div variants={varFade("in")}>
      <Card
        sx={[
          {
            gap: 1,
            display: "flex",
            alignItems: "center",
            p: { xs: 1, lg: 3 },
          },
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
            href={paths.competition.details(item.id)}
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
                  bgcolor: varAlpha(
                    theme.vars.palette.grey["500Channel"],
                    0.16
                  ),
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
      </Card>
    </m.div>
  );
}

export default MyCompetitionList;
