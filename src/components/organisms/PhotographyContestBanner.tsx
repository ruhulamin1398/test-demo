import React from "react";
import { Box, Button, Typography, Container, Stack } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const PhotographyContestBanner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "400px", md: "500px" },
        backgroundImage: "url('/contest.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        color: "white",
        textAlign: "left",
        px: { xs: 2, md: 0 },
        "&::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={2} textAlign={{ xs: "center", md: "left" }}>
          <Typography
            variant="caption"
            sx={{
              padding: "4px 8px",
              borderRadius: "4px",
              color: "white",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Photography Contest
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            fontSize={{ xs: "h5.fontSize", md: "h4.fontSize" }}
          >
            Global Photography Awards 2025
          </Typography>
          <Typography
            variant="body1"
            fontSize={{ xs: "body2.fontSize", md: "body1.fontSize" }}
          >
            Showcase your best shots and compete with photographers worldwide
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            <Button variant="contained" color="primary" size="large">
              Join Contest →
            </Button>
            <Stack direction="row" spacing={1} alignItems="center" py={1}>
              <PeopleIcon />
              <Typography
                fontSize={{ xs: "body2.fontSize", md: "body1.fontSize" }}
              >
                2,456 Participants
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" py={1}>
              <AccessTimeIcon />
              <Typography
                fontSize={{ xs: "body2.fontSize", md: "body1.fontSize" }}
              >
                45 Days Left
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default PhotographyContestBanner;
