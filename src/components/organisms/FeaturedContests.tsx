"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

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
];

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
      <Grid container spacing={3} justifyContent="center">
        {contests.map((contest) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={contest.id}
            sx={{ transition: "all 0.3s ease-in-out", '&:hover':{transform:'scale(1.02)'} }}
          >
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height={180}
                image={contest.image}
                alt={contest.title}
              />
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Box
                    bgcolor={
                      contest.status === "Ongoing" ? "#D4EDDA" : "#FFF3CD"
                    }
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
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
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
          </Grid>
        ))}
        {/* <button>
          <a href="/submission">View All Contests</a>
        </button> */}

        <Link href="/submission" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4F46E5",
              color: "#ffffff",
              borderRadius: 10,
            }}
          >
            View All Contests
          </Button>
        </Link>
        
      </Grid>
    </Container>
  );
};

export default FeaturedContests;
