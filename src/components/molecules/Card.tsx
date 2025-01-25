"use client";
import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string; // Optional prop for the card's image
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <MuiCard
      sx={{
        marginRight: 2,
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height="150"
          image={imageUrl}
          alt={title}
          sx={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
