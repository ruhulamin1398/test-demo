"use client";
import React from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { lightBlue, orange } from "@mui/material/colors";
import { East } from "@mui/icons-material";

interface CardProps {
  title: string;
  description: string;
  isLastItem?: boolean;
}

const TimelineItem: React.FC<CardProps> = ({
  title,
  description,
  isLastItem = false,
}) => {
  return (
    <Box display="flex">
      <Box
        sx={{
          width: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "12px",
            height: "12px",
            bgcolor: "primary.main",
            borderRadius: 2,
          }}
        />
        {!isLastItem ? (
          <Box sx={{ width: "1px", flexGrow: 1, bgcolor: "primary.main" }} />
        ) : null}
      </Box>
      <Box pb={4}>
        <Box display={"flex"} alignItems={"center"} gap={1} pb={2}>
          <Box
            component={"span"}
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            <Box
              component={"span"}
              sx={{
                bgcolor: lightBlue[500],
                fontWeight: 900,
                width: "24px",
                height: "24px",
                lineHeight: "16px",
                padding: 0.5,
              }}
            >
              29
            </Box>
            <Box component={"span"} sx={{ px: 1, bgcolor: lightBlue[200] }}>
              <Typography variant="subtitle2" sx={{ lineHeight: "24px" }}>
                Jan 2025
              </Typography>
            </Box>
          </Box>
          <East />
          <Box
            component={"span"}
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            <Box
              component={"span"}
              sx={{
                bgcolor: orange[500],
                fontWeight: 900,
                width: "24px",
                height: "24px",
                lineHeight: "16px",
                padding: 0.5,
              }}
            >
              29
            </Box>
            <Box component={"span"} sx={{ px: 1, bgcolor: orange[200] }}>
              <Typography variant="subtitle2" sx={{ lineHeight: "24px" }}>
                Jan 2025
              </Typography>
            </Box>
          </Box>
        </Box>
        <Card>
          <CardContent>
            <Typography component={"h6"} variant="subtitle1">
              {title}
            </Typography>
            <Typography component={"p"} variant="body2">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TimelineItem;
