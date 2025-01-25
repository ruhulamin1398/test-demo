"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  CardContent,
  CardMedia,
  Card as MuiCard,
  CardActions,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Beenhere,
  CalendarMonthOutlined,
  PeopleOutline,
  ShareOutlined,
} from "@mui/icons-material";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface CardData {
  id: number;
  title: string;
  description: string;
}

const CardSlider: React.FC = () => {
  const cards: CardData[] = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Card ${i + 1}`,
    description: "This is a sample card description.",
  }));

  const sliderConfig = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Container>
      <Box py={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Explore</Typography>
          <Button variant="text">See All</Button>
        </Box>
        <div className="slider-container">
          <Slider {...sliderConfig}>
            {cards.map((card) => (
              <div key={card.id}>
                <MuiCard sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="/competition-event.jpg"
                    alt="Live from space album cover"
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        Live From Space
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.secondary" }}
                      >
                        Mac Miller
                      </Typography>
                    </CardContent>
                  </Box>
                </MuiCard>
              </div>
            ))}
          </Slider>
        </div>
      </Box>
      <Box py={2}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <MuiCard>
              <CardMedia
                sx={{ height: 140 }}
                image="/competition/competition.jpg"
                title="green iguana"
              />
              <CardContent>
                <List>
                  <ListItem disableGutters alignItems="flex-start">
                    <ListItemAvatar>
                      <Box>
                        <Typography>25</Typography>
                        <Typography>JUN</Typography>
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Box
                  flex={1}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box py={1} display={"flex"} alignItems={"center"} gap={1}>
                    <PeopleOutline />
                    <Typography>100 Joined</Typography>
                  </Box>
                  <Button size="small" startIcon={<ShareOutlined />}>
                    Share
                  </Button>
                </Box>
              </CardActions>
            </MuiCard>
          </Grid>
          <Grid size={4}>
            <MuiCard>
              <CardMedia
                sx={{ height: 140 }}
                image="/competition/farmer.jpg"
                title="green iguana"
              />
              <CardContent>
                <List>
                  <ListItem disableGutters alignItems="flex-start">
                    <ListItemAvatar>
                      <Box>
                        <Typography>25</Typography>
                        <Typography>JUN</Typography>
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Box
                  flex={1}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box py={1} display={"flex"} alignItems={"center"} gap={1}>
                    <PeopleOutline />
                    <Typography>100 Joined</Typography>
                  </Box>
                  <Button size="small" startIcon={<ShareOutlined />}>
                    Share
                  </Button>
                </Box>
              </CardActions>
            </MuiCard>
          </Grid>
          <Grid size={4}>
            <MuiCard>
              <CardMedia
                sx={{ height: 140 }}
                image="/competition/nature.jpg"
                title="green iguana"
              />
              <CardContent>
                <List>
                  <ListItem disableGutters alignItems="flex-start">
                    <ListItemAvatar>
                      <Box>
                        <Typography>25</Typography>
                        <Typography>JUN</Typography>
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Box
                  flex={1}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box py={1} display={"flex"} alignItems={"center"} gap={1}>
                    <PeopleOutline />
                    <Typography>100 Joined</Typography>
                  </Box>
                  <Button size="small" startIcon={<ShareOutlined />}>
                    Share
                  </Button>
                </Box>
              </CardActions>
            </MuiCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CardSlider;
