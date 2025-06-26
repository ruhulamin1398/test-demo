import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";

import { m } from "framer-motion";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";
import { varFade } from "@/components/animate";
import { ISubmissionData } from "@/_mock/data";
import { useDate } from "@/hooks/use-date";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  list: ISubmissionData[];
};

export function CompetitionRecentSubmissions({
  title,
  list,
  sx,
  ...other
}: Props) {
  return (
    <Card sx={{ px: 2 }}>
      {/* <Typography variant="h6" sx={{ mb: 3 }}>
          {title}
        </Typography> */}

      <Box
        sx={{
          gap: 3,
          display: "flex",
          flexDirection: "column",
          mx: { xs: 2, sm: 3, xl: 5 },
        }}
      >
        {list.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            sx={[
              (theme) => ({
                color: [
                  theme.vars.palette.info.main,
                  theme.vars.palette.error.main,
                  theme.vars.palette.secondary.main,
                  theme.vars.palette.success.main,
                ][index],
              }),
            ]}
          />
        ))}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CourseItemProps = BoxProps & {
  item: Props["list"][number];
};

function Item({ item, sx, ...other }: CourseItemProps) {
  const { HumanTimeDifferent } = useDate();
  return (
    <m.div variants={varFade("inUp")}>
      <Box
        sx={[{ gap: 1.5, display: "flex" }, ...(Array.isArray(sx) ? sx : [sx])]}
        {...other}
      >
        <Box
          sx={{
            width: 6,
            my: "3px",
            height: 32,
            flexShrink: 0,
            opacity: 0.24,
            borderRadius: 1,
            bgcolor: "currentColor",
          }}
        />

        <Box
          sx={{
            gap: 1,
            minWidth: 0,
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
          }}
        >
          <Link
            variant="subtitle2"
            color="inherit"
            noWrap
            sx={{ color: "text.primary" }}
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
            <Box
              sx={{
                width: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box component="span">
                <Typography variant="caption" color="text.secondary" noWrap>
                  {HumanTimeDifferent(Number(item.createdAt))}
                </Typography>
              </Box>

              <Box
                component="span"
                sx={{
                  typography: "caption",
                  color: "text.secondary",
                  fontWeight: "fontWeightMedium",
                }}
              >
                <Link
                  component={RouterLink}
                  href={paths.profile.root}
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {"View"}
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </m.div>
  );
}
