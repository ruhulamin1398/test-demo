"use client";
import React from "react";
import Slider from "react-slick";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Contest Data
const contests = [
  {
    id: 1,
    title: "Nature Photography 2025",
    description: "Capture the beauty of nature in its purest form.",
    prize: "$5,000 Prize",
    status: "Ongoing",
    image: "/banner-back.jpg",
  },
  {
    id: 2,
    title: "Digital Art Challenge",
    description: "Create the future through digital artistry.",
    prize: "$3,000 Prize",
    status: "Upcoming",
    image: "/banner-back.jpg",
  },
  {
    id: 3,
    title: "Creative Writing",
    description: "Tell your story to the world.",
    prize: "$2,000 Prize",
    status: "Ongoing",
    image: "/banner-back.jpg",
  },
  {
    id: 4,
    title: "Music Composition",
    description: "Compose a masterpiece and showcase.",
    prize: "$4,000 Prize",
    status: "Upcoming",
    image: "/banner-back.jpg",
  },
  {
    id: 5,
    title: "Filmmaking Contest",
    description: "Create a short film that captivates the audience.",
    prize: "$6,000 Prize",
    status: "Ongoing",
    image: "/banner-back.jpg",
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
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const FeaturedContests: React.FC = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ marginBottom: 4 }}
      >
        Featured Contests
      </Typography>

      <Box position="relative">
        <Slider {...settings}>
          {contests.map((contest) => (
            <Box key={contest.id} px={2}>
              <Card sx={{ borderRadius: 3, transition: "all 0.3s ease-in-out", "&:hover": { transform: "scale(1.02)" } }}>
                <CardMedia component="img" height={180} image={contest.image} alt={contest.title} />
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box
                      bgcolor={contest.status === "Ongoing" ? "#D4EDDA" : "#FFF3CD"}
                      color={contest.status === "Ongoing" ? "#155724" : "#856404"}
                      px={1.5}
                      py={0.5}
                      borderRadius={10}
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {contest.status}
                    </Box>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {contest.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {contest.description}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight="bold" color="#4F46E5">
                      {contest.prize}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#4F46E5",
                        color: "#ffffff",
                        borderRadius: 10,
                      }}
                    >
                      Join Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* View All Contests Button */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Link href="/submission" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4F46E5",
              color: "#ffffff",
              borderRadius: 10,
              padding: "10px 20px",
            }}
          >
            View All Contests
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default FeaturedContests;
