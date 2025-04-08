"use client";
import React from "react";
import Slider from "react-slick";
import { Box, Button, Container, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContestItem from "../contest";
import { CompetitionStatusEnum, ICompetition } from "@/interfaces";

// Contest Data
const contests: Partial<ICompetition>[] = [
  {
    id: "1",
    mediaUrl: "/banner-back.jpg",
    title: "Photography Contest",
    description: "Capture the moment and win amazing prizes.",
    price: 1000,
    status: CompetitionStatusEnum.ACTIVE,
  },
  {
    id: "2",
    mediaUrl: "/banner-back.jpg",
    title: "Nature Photography 2025",
    description: "Capture the beauty of nature in its purest form.",
    price: 1000,
    status: CompetitionStatusEnum.ACTIVE,
  },
  {
    id: "3",
    title: "Digital Art Challenge",
    description: "Create the future through digital artistry.",
    price: 1000,
    status: CompetitionStatusEnum.ACTIVE,
    mediaUrl: "/banner-back.jpg",
  },
  {
    id: "4",
    title: "Creative Writing",
    description: "Tell your story to the world.",
    price: 1000,
    status: CompetitionStatusEnum.ACTIVE,
  },
  {
    id: "5",
    mediaUrl: "/banner-back.jpg",
    title: "Music Composition",
    description: "Compose a masterpiece and showcase.",
    price: 1000,
    status: CompetitionStatusEnum.ACTIVE,
  },
  {
    id: "6",
    mediaUrl:
      "https://api-dev-minimal-v630.pages.dev/assets/images/cover/cover-7.webp",
    title: "Music Composition",
    description: "Compose a masterpiece and showcase.",
    price: 1000,
    status: CompetitionStatusEnum.ACTIVE,
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
            <ContestItem key={contest.id} contest={contest} detailsHref={""} />
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
