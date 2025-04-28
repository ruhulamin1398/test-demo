import type { CardProps } from "@mui/material/Card";

import { m } from "framer-motion";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CONFIG } from "@/global-config";
import { PaletteColorKey } from "@/theme";
import { Typography } from "@mui/material";
import { SvgColor } from "@/components/svg-color";
import { fNumber } from "@/utils/format-number";
import { varFade } from "@/components/animate";

// ----------------------------------------------------------------------

export function ProfileSummaryOverview() {
  return (
    <m.div variants={varFade("inUp")}>
      <Card>
        <Box
          sx={{
            gap: 3,
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
            bgcolor: "transparent",
          }}
        >
          <ProfileWidgetSummary
            title="Active Contests"
            total={50}
            icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
          />

          <ProfileWidgetSummary
            title="Total Submissions"
            total={50}
            color="success"
            icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-completed.svg`}
          />

          <ProfileWidgetSummary
            title="Contest Wins"
            total={100}
            color="secondary"
            icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg`}
          />
        </Box>
      </Card>
    </m.div>
  );
}

// ----------------------------------------------------------------------

type Props = CardProps & {
  icon: string;
  title: string;
  total: number;
  color?: PaletteColorKey;
};

export function ProfileWidgetSummary({
  sx,
  icon,
  title,
  total,
  color = "warning",
  ...other
}: Props) {
  return (
    <Card
      sx={[{ py: 3, pl: 3, pr: 2.5 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ typography: "h3" }}>{fNumber(total)}</Box>

        <Typography
          noWrap
          variant="subtitle2"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {title}
        </Typography>
      </Box>

      <SvgColor
        src={icon}
        sx={(theme) => ({
          top: 24,
          right: 20,
          width: 36,
          height: 36,
          position: "absolute",
          background: `linear-gradient(135deg, ${theme.vars.palette[color].main} 0%, ${theme.vars.palette[color].dark} 100%)`,
        })}
      />

      <Box
        sx={(theme) => ({
          top: -44,
          width: 160,
          zIndex: -1,
          height: 160,
          right: -104,
          opacity: 0.12,
          borderRadius: 3,
          position: "absolute",
          transform: "rotate(40deg)",
          background: `linear-gradient(to right, ${theme.vars.palette[color].main}, transparent)`,
        })}
      />
    </Card>
  );
}
