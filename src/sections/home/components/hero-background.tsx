import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

export function HeroBackground({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  return (
    <Box
      sx={[
        {
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: "absolute",
          backgroundImage: "url(/contest.png)", // Set your image here
          backgroundSize: "cover", // Make sure the image covers the entire area
          backgroundPosition: "center", // Position the image in the center
          zIndex: -1,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}
