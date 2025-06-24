import { m } from "framer-motion";
import { varFade } from "@/components/animate";
import { Iconify } from "@/components/iconify";
import { Box, BoxProps, Typography } from "@mui/material";

type CompetitionHeroInlineCardProps = BoxProps & {
  value: string;
  icon: string;
};

const CompetitionHeroInlineCard = ({
  value,
  icon,
  sx,
  ...other
}: CompetitionHeroInlineCardProps) => {
  return (
    <li key={"Prize"}>
      <m.div variants={varFade("inUp", { distance: 24 })}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            mb: 2,
          }}
        >
          {/* First Column: Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
              width: 36,
            }}
          >
            <Iconify icon={icon} width={24} sx={{ color: "primary.main" }} />
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </m.div>
    </li>
  );
};

export default CompetitionHeroInlineCard;
