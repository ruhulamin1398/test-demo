import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { m } from "framer-motion";
import { Iconify } from "@/components/iconify";
import { Container } from "@mui/material";
import { varFade, MotionViewport } from "@/components/animate";

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: "Find a Contest",
    description: "Browse through our wide selection of creative competitions.",
    icon: "solar:magnifer-linear",
  },
  {
    title: "Submit Your Entry",
    description: "Upload your work and showcase your creativity to the world.",
    icon: "solar:upload-linear",
  },
  {
    title: "Vote & Win",
    description: "Get votes from the community and win amazing prizes.",
    icon: "solar:cup-star-linear",
  },
];

// ----------------------------------------------------------------------

export function HomeHowItWorks() {
  return (
    <Container component={MotionViewport} sx={{ py: 2, textAlign: "center" }}>
      <Box
        sx={{
          alignItems: "center",
          gap: 5,
          mb: {
            xs: 2,
            md: 4,
          },
          px: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <m.div variants={varFade("inDown")}>
          <Typography variant="overline" sx={{ color: "text.disabled" }}>
            How It Works
          </Typography>
        </m.div>

        <m.div variants={varFade("inUp")}>
          <Typography variant="h2" sx={{ my: 3 }}>
            Empower Your Creativity
          </Typography>
        </m.div>

        <m.div variants={varFade("inUp")}>
          <Typography
            sx={{ mx: "auto", maxWidth: 640, color: "text.secondary" }}
          >
            Join our platform to showcase your talent, participate in exciting
            contests, and connect with a community of like-minded creators. Let
            your creativity shine and achieve recognition like never before.
          </Typography>
        </m.div>
      </Box>

      <Box
        sx={{
          gap: 5,
          my: 10,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
        }}
      >
        {SUMMARY.map((item) => (
          <m.div key={item.title} variants={varFade("inUp")}>
            <Box key={item.title} sx={{ textAlign: "center", px: 5 }}>
              <Iconify
                icon={item.icon}
                width={32}
                sx={{ color: "primary.main" }}
              />

              <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
                {item.title}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.description}
              </Typography>
            </Box>
          </m.div>
        ))}
      </Box>
    </Container>
  );
}
