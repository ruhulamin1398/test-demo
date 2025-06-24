import { m } from "framer-motion";
import { varFade } from "@/components/animate";
import { Iconify } from "@/components/iconify";
import { Box, BoxProps, Typography } from "@mui/material";

type CompetitionHeroCardProps = BoxProps & {
  title: string;
  value: string;
  icon: string;
};

const CompetitionHeroCard = ({
  title,
  value,
  icon,
  sx,
  ...other
}: CompetitionHeroCardProps) => {
  return (
    <li key={"Prize"}>
      <m.div variants={varFade("inUp", { distance: 24 })}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          {/* First Column: Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
              width: 48,
            }}
          >
            <Iconify icon={icon} width={36} sx={{ color: "primary.main" }} />
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </m.div>
    </li>
  );
};

export default CompetitionHeroCard;
