import { Typography } from "@mui/material";
import { title } from "process";
import React from "react";

type Props = { title?: string; subtitle?: string };

const PageHeader = (props: Props) => {
  return (
    <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
      {title}
    </Typography>
  );
};

export default PageHeader;
