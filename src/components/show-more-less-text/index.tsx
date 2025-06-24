import { Box, BoxProps, Typography } from "@mui/material";
import { useState } from "react";

type Props = BoxProps & {
  text: string;
  maxLength?: number;
};

const ShowMoreLessText = ({ text, maxLength = 200, ...boxProps }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const isLongText = text.length > maxLength;
  const displayText =
    !isLongText || expanded ? text : text.slice(0, maxLength) + "...";

  return (
    <Box {...boxProps}>
      <Typography
        variant="body2"
        sx={{
          flexGrow: 1,
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "none" : 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {displayText}
      </Typography>
      {isLongText && (
        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            cursor: "pointer",
            mt: 1,
            fontWeight: 500,
            display: "inline-block",
          }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Show more"}
        </Typography>
      )}
    </Box>
  );
};

export default ShowMoreLessText;
