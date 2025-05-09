import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";

import { m } from "framer-motion";

import { Card, Link, Box, Typography } from "@mui/material";
import { RouterLink } from "@/routes/components";
import { varFade } from "@/components/animate";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useDate } from "@/hooks/use-date";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  competitionId: string;
};

export function CompetitionPageSubmissions({
  title,
  competitionId,
  sx,
  ...other
}: Props) {
  const { submissions } = useSelector(
    (state: RootState) => state.auth.competitionInfo
  );

  return (
    <Card sx={{ px: 2, mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <Box
        sx={{
          gap: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {submissions.map((item, index) => (
          <Item
            key={item.roundId}
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
  item: {
    enrolId: string;
    roundId: string;
    score: number;
    submittedContent: string;
    createdAt: string;
  };
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
            justifyContent: "space-between",
          }}
        >
          <Link
            variant="subtitle2"
            color="inherit"
            noWrap
            sx={{ color: "text.primary" }}
          >
            Round1
          </Link>

          <Link
            component={RouterLink}
            href={item.submittedContent}
            sx={{
              whiteSpace: "nowrap",
              typography: "body2",
            }}
          >
            {HumanTimeDifferent(Number(item.createdAt))}
          </Link>
        </Box>
      </Box>
    </m.div>
  );
}
