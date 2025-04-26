import { Box, Container, Typography } from "@mui/material";
import {
  varFade,
  AnimateText,
  MotionContainer,
  animateTextClasses,
} from "@/components/animate";
import { Iconify } from "@/components/iconify";
type Props = {};

const Submission = (props: Props) => {
  return (
    <Container component={MotionContainer}>
      <Box
        sx={{
          bottom: { md: 80 },
          position: { md: "absolute" },
          textAlign: { xs: "center", md: "unset" },
        }}
      >
        <AnimateText
          component="h1"
          variant="h1"
          textContent={["Winter Photography Competition", "Round 1"]}
          variants={varFade("inUp", { distance: 24 })}
          sx={{
            color: "common.white",
            [`& .${animateTextClasses.line}[data-index="0"]`]: {
              [`& .${animateTextClasses.word}[data-index="0"]`]: {
                color: "primary.main",
              },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Submission;
