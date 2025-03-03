"use client";
import React from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid2";


const testimonials = [
  {
    id: 1,
    name: "John Doe",
    review: "I never thought I could win, but this platform made it possible!",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    review: "Participating here was an amazing experience!",
    rating: 5,
  },
  {
    id: 3,
    name: "Alex Johnson",
    review: "Thanks to the platform, I discovered my talent!",
    rating: 5,
  },
];

const SuccessStories: React.FC = () => {
  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Success Stories
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Check out what our winners have to say
      </Typography>
      <Grid container spacing={3} justifyContent="center" mt={4}>
        {testimonials.map((testimonial) => (
          <Grid size={{xs:12, md:4, sm:6}} key={testimonial.id}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "#ccc",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography fontWeight="bold">{testimonial.name}</Typography>
                  <Box display="flex" ml="auto" color="gold">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} fontSize="small" />
                    ))}
                  </Box>
                </Box>
                <Typography>{testimonial.review}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SuccessStories;
