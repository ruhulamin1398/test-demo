import type { BoxProps } from "@mui/material/Box";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

// ----------------------------------------------------------------------

const CompetitionDetailsSkeleton = ({ sx, ...other }: BoxProps) => {
  return (
    <Box sx={sx} {...other}>
      <Skeleton variant="rectangular" sx={{ height: 480 }} />

      <Box sx={{ width: 1, maxWidth: 720, mx: "auto" }}>
        <Box
          sx={{
            my: 8,
            gap: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton height={10} />
          <Skeleton height={10} sx={{ width: 0.9 }} />
          <Skeleton height={10} sx={{ width: 0.8 }} />
        </Box>
        <Skeleton sx={{ height: 720, mb: 8 }} />
      </Box>
    </Box>
  );
};
export default CompetitionDetailsSkeleton;
