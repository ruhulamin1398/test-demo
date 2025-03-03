"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  FormControl,
  Card,
  CardMedia,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Dropdown from "../common/DropDown";
import Link from "next/link";

const contests = [
  {
    id: 1,
    title: "Logo Design Championship",
    description:
      "Create innovative logos for tech startups and win amazing prizes!",
    prize: "$2,000",
    participants: 234,
    status: "Open",
    timeLeft: "Ends in 5 days",
    location: "Worldwide",
    image: "banner.png", // Path to image
  },
  {
    id: 2,
    title: "Mobile App UI Challenge",
    description: "Design the next-gen mobile banking app simply interface.",
    prize: "$5,000",
    participants: 89,
    status: "Upcoming",
    timeLeft: "Starts in 2 days",
    location: "United States",
    image: "banner.png", // Path to image
  },
  {
    id: 3,
    title: "Creative Writing Contest",
    description:
      "Write a compelling short story and win a publication opportunity.",
    prize: "$1,000",
    participants: 156,
    status: "Open",
    timeLeft: "Ends in 12 days",
    location: "Worldwide",
    image: "banner.png", // Path to image
  },
];

const CategoryBrowserContest: React.FC = () => {
  const [category, setCategory] = useState("");
  const [prizeRange, setPrizeRange] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleBrowseMore = () => {
    console.log("Browse more contests clicked.");
  };

  return (
    <Container sx={{ py: 6 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <div style={{ width: isMobile ? "100%" : "180px" }}>
          <Dropdown
            label="Category"
            value={category}
            onChange={(_, newValue) => setCategory(newValue || "")}
            options={["All Categories", "Design", "Writing", "Tech"]}
            fetchOptions={async () => [
              "All Categories",
              "Design",
              "Writing",
              "Tech",
            ]}
          />
        </div>

        <div style={{ width: isMobile ? "100%" : "180px" }}>
          <Dropdown
            label="Prize Range"
            value={prizeRange}
            onChange={(_, newValue) => setPrizeRange(newValue || "")}
            options={["All Prizes", "Below $1,000", "$1,000 - $5,000"]}
            fetchOptions={async () => [
              "All Prizes",
              "Below $1,000",
              "$1,000 - $5,000",
            ]}
          />
        </div>

        <div style={{ width: isMobile ? "100%" : "180px" }}>
          <Dropdown
            label="Location"
            value={location}
            onChange={(_, newValue) => setLocation(newValue || "")}
            options={["All Locations", "Worldwide", "United States", "Europe"]}
            fetchOptions={async () => [
              "All Locations",
              "Worldwide",
              "United States",
              "Europe",
            ]}
          />
        </div>

        <div></div>
        <div></div>

        <FormControl sx={{ minWidth: 250 }} size="small">
          <Dropdown
            label="Sort By"
            value={sortBy}
            onChange={(_, newValue) => setSortBy(newValue || "")}
            options={["Newest", "Prize", "Participants"]}
            fetchOptions={async () => ["Newest", "Prize", "Participants"]}
          />
        </FormControl>
      </Box>

      <Grid container spacing={3} py={3}>
        {contests.map((contest) => (
          <Grid key={contest.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                borderRadius: 3,
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                component="img"
                height={180}
                image={contest.image} // Image path for the contest
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
                    bgcolor={contest.status === "Open" ? "#D4EDDA" : "#FFF3CD"}
                    color={contest.status === "Open" ? "#155724" : "#856404"}
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
                  
                  <Link href={`/contest/${contest.id}`} passHref>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#4F46E5",
                        color: "#ffffff",
                        borderRadius: 10,
                      }}
                    >
                      {contest.status === "Open"
                        ? "Join Contest"
                        : "Get Notified"}
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Button
          variant="outlined"
          onClick={handleBrowseMore}
          sx={{ borderRadius: 10, fontWeight: "bold" }}
        >
          Load More Contests
        </Button>
      </Box>
    </Container>
  );
};

export default CategoryBrowserContest;
