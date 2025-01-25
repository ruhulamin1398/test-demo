import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const NoData: React.FC = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Image
        src="/no-result.svg" // Path to your SVG in the public folder
        alt="Example SVG"
        width={200} // Width of the image
        height={200} // Height of the image
      />
      <Typography variant="subtitle1">No Data</Typography>
      <Typography variant="caption">
        There is no data to show you right now.
      </Typography>
    </Box>
  );
};

export default NoData;
