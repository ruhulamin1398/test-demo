"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Pagination,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FavoriteIcon from "@mui/icons-material/Favorite";

const entries = [
  {
    title: "Mountain Sunset",
    category: "Photography",
    image: "/banner-back.jpg",
    likes: 234,
    author: "Sarah Parker",
    description: "Capture the beauty of nature in its purest form.",
    isVote: true,
  },
  {
    title: "City Lights",
    description: "Capture the beauty of nature in its purest form.",
    category: "Video",
    image: "/banner-back.jpg",
    likes: 189,
    author: "Mike Chen",
    isVote: false,
  },
  {
    title: "Colors of Life",
    description: "Capture the beauty of nature in its purest form.",
    category: "Story",
    image: "/banner-back.jpg",
    likes: 156,
    author: "Emma Wilson",
    isVote: false,
  },
  {
    title: "Colors of Life",
    description: "Capture the beauty of nature in its purest form.",
    category: "Story",
    image: "/banner-back.jpg",
    likes: 156,
    author: "Emma Wilson",
    isVote: false,
  },
  {
    title: "Colors of Life",
    description: "Capture the beauty of nature in its purest form.",
    category: "Story",
    image: "/banner-back.jpg",
    likes: 156,
    author: "Emma Wilson",
    isVote: false,
  },
  {
    title: "Colors of Life",
    description: "Capture the beauty of nature in its purest form.",
    category: "Story",
    image: "/banner-back.jpg",
    likes: 156,
    author: "Emma Wilson",
    isVote: false,
  },
  {
    title: "Colors of Life",
    description: "Capture the beauty of nature in its purest form.",
    category: "Story",
    image: "/banner-back.jpg",
    likes: 156,
    author: "Emma Wilson",
    isVote: false,
  },
];

const ITEMS_PER_PAGE = 6;

const ContestGallery = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [voteStatus, setVoteStatus] = useState(
    entries.reduce((acc, entry, index) => {
      acc[index] = entry.isVote || false;
      return acc;
    }, {})
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleVoteToggle = (index) => {
    setVoteStatus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter ? entry.category === filter : true)
  );

  const paginatedEntries = filteredEntries.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
          px: 2, // Add padding for spacing
        }}
      >
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search submissions..."
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            flexGrow: 1,
            maxWidth: 350,
            bgcolor: "white",
            borderRadius: "6px",
            height: 40,
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              height: 40,
            },
          }}
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  pr: 1,
                  display: "flex",
                  alignItems: "center",
                  color: "gray",
                }}
              >
                🔍 {/* Simple search icon */}
              </Box>
            ),
          }}
        />

        {/* Filter Options */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {["All Contest", "All Categories", "Most Recent"].map(
            (label, idx) => (
              <FormControl
                key={idx}
                variant="outlined"
                sx={{
                  minWidth: 160,
                  bgcolor: "white",
                  borderRadius: "6px",
                  height: 40,
                  "& .MuiOutlinedInput-root": {
                    height: 40,
                    borderRadius: "6px",
                  },
                  "& .MuiInputBase-input": {
                    height: 40, 
                    padding: "8px 14px",
                  },
                }}
              >
                <InputLabel sx={{ lineHeight: "1" }}>{label}</InputLabel>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  label={label}
                  sx={{
                    height: 40,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MenuItem value="">{label}</MenuItem>
                  {label === "All Categories" && (
                    <>
                      <MenuItem value="Photography">Photography</MenuItem>
                      <MenuItem value="Video">Video</MenuItem>
                      <MenuItem value="Story">Story</MenuItem>
                    </>
                  )}
                  {label === "Most Recent" && (
                    <>
                      <MenuItem value="Oldest">Oldest</MenuItem>
                      <MenuItem value="Most Liked">Most Liked</MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
            )
          )}
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {paginatedEntries.map((entry, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                maxWidth: "auto",
                mx: "auto",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={entry.image}
                  alt={entry.title}
                  sx={{ borderRadius: "12px 12px 0 0" }}
                />
                <Chip
                  label={entry.category}
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <CardContent sx={{ padding: 2, textAlign: "left" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "red",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" color="#EA580C" gutterBottom>
                    Contest Name
                  </Typography>
                  <Box
                    sx={{
                      width: "auto",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FavoriteIcon fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {entry.likes}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {entry.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {entry.description || "No description available"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {entry.author}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: voteStatus[index]
                        ? "#EA8D0C"
                        : "#2563EB",
                      color: "white",
                    }}
                    onClick={() => handleVoteToggle(index)}
                  >
                    {voteStatus[index] ? "unvote" : "Vote"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredEntries.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChange}
        sx={{ mt: 3 }}
      />
    </Box>
  );
};

export default ContestGallery;
