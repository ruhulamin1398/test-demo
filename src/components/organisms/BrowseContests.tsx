"use client";
import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Dropdown from "../common/DropDown";

const contests = [
  {
    id: 1,
    title: "Street Photography",
    description: "Capture urban life in its most authentic form.",
    prize: "$1,500 Prize",
    status: "Ongoing",
    timeLeft: "Ends in 5 days",
    bgColor: "#FBE9E7",
    badgeColor: "#A5D6A7",
  },
  {
    id: 2,
    title: "Logo Design Challenge",
    description: "Design the next big brand identity.",
    prize: "$2,500 Prize",
    status: "Upcoming",
    timeLeft: "Starts in 2 days",
    bgColor: "#E0F7FA",
    badgeColor: "#FFEB3B",
  },
  {
    id: 3,
    title: "Logo Design Challenge",
    description: "Design the next big brand identity.",
    prize: "$2,500 Prize",
    status: "Upcoming",
    timeLeft: "Starts in 2 days",
    bgColor: "#E0F7FA",
    badgeColor: "#FFEB3B",
  },
  {
    id: 4,
    title: "Street Photography",
    description: "Capture urban life in its most authentic form.",
    prize: "$1,500 Prize",
    status: "Ongoing",
    timeLeft: "Ends in 5 days",
    bgColor: "#FBE9E7",
    badgeColor: "#A5D6A7",
  },
  
];

const BrowseContests: React.FC = () => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [prizeRange, setPrizeRange] = useState("");

  const handleBrowseMore = () => {
    console.log("Browse more contests clicked.");
  };

  const fetchCategoryOptions = async () => {
    return ["All Categories", "Photography", "Design"];
  };

  const fetchStatusOptions = async () => {
    return ["All Status", "Ongoing", "Upcoming"];
  };

  const fetchPrizeRangeOptions = async () => {
    return ["All Prizes", "Below $1,000", "$1,000 - $2,500"];
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Browse All Contests
      </Typography>
      <Grid container spacing={3} py={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box p={3} borderRadius={3} bgcolor="#ffffff" width={{ xs: "100%", md: "250px" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Filters
            </Typography>

            <Dropdown
              label="Category"
              value={category}
              onChange={(_, newValue) => setCategory(newValue || "")}
              options={[]}
              fetchOptions={fetchCategoryOptions}
            />

            <div style={{ marginTop: "20px" }}>
              <Dropdown
                label="Status"
                value={status}
                onChange={(_, newValue) => setStatus(newValue || "")}
                options={[]} 
                fetchOptions={fetchStatusOptions}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <Dropdown
                label="Prize Range"
                value={prizeRange}
                onChange={(_, newValue) => setPrizeRange(newValue || "")}
                options={[]}
                fetchOptions={fetchPrizeRangeOptions}
              />
            </div>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Grid container spacing={3}>
            {contests.map((contest) => (
              <Grid
                size={{ xs: 12, md: 6 }}
                key={contest.id}
                sx={{
                  transition: "all 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <Box p={3} borderRadius={3} bgcolor={contest.bgColor} boxShadow={1}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Box
                      bgcolor={contest.badgeColor}
                      px={1.5}
                      py={0.5}
                      borderRadius={10}
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {contest.status}
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {contest.timeLeft}
                    </Typography>
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
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Browse More Button */}
          <Box
            textAlign="right"
            mt={4}
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.01)" },
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBrowseMore}
              sx={{ borderRadius: 10, fontWeight: "bold" }}
            >
              Browse More Contests
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BrowseContests;
