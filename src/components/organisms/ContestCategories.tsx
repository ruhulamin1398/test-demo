"use client";
import React from "react";
import Slider from "react-slick";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CreateIcon from "@mui/icons-material/Create";
import PaletteIcon from "@mui/icons-material/Palette";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Contest Data
const contestData = [
  {
    id: 1,
    icon: <EmojiEventsIcon fontSize="large" color="primary" />,
    title: "Coding Challenges",
    description: "Test your coding skills",
    count: "85 Contests",
  },
  {
    id: 2,
    icon: <CreateIcon fontSize="large" color="secondary" />,
    title: "Writing Contests",
    description: "Show your creativity",
    count: "95 Contests",
  },
  {
    id: 3,
    icon: <PaletteIcon fontSize="large" color="success" />,
    title: "Design Competitions",
    description: "Let your art shine",
    count: "80 Contests",
  },
  {
    id: 4,
    icon: <EmojiEventsIcon fontSize="large" color="primary" />,
    title: "Math Contests",
    description: "Challenge your logic",
    count: "70 Contests",
  },
  {
    id: 5,
    icon: <CreateIcon fontSize="large" color="secondary" />,
    title: "Poetry Slams",
    description: "Express through poetry",
    count: "60 Contests",
  },
];

// Custom Arrow Components
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: -10,
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      zIndex: 2,
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: -10,
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      zIndex: 2,
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

// Slick Carousel Settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const ContestCategories: React.FC = () => {
  return (
    <Container>
      <Box textAlign="center" py={8} position="relative">
        <Slider {...settings}>
          {contestData.map((contest) => (
            <Box key={contest.id} px={2}>
              <Card sx={{ textAlign: "center", p: 4, borderRadius: 3 }}>
                <Box display="flex" justifyContent="center" pb={2}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 1,
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {contest.icon}
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {contest.title}
                  </Typography>
                  <Typography color="textSecondary" pb={1}>
                    {contest.description}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {contest.count}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default ContestCategories;
