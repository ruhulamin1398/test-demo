"use client";
import React, { useEffect, useState } from "react";
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
  ListItemText,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PeopleOutline, ShareOutlined } from "@mui/icons-material";
import { GET_COMPETITIONS_QUERY } from "@/graphql-client/competition";
import { useQuery } from "@apollo/client";
import { ICompetition } from "@/interfaces";

interface CardData {
  id: number;
  title: string;
  description: string;
}

const CompetitionGrid: React.FC = () => {
  const [competitions, setCompetitions] = useState([]);

  const { data, loading } = useQuery(GET_COMPETITIONS_QUERY, {
    variables: { page: { limit: 10, page: 1 } },
  });

  useEffect(() => {
    if (!loading && data?.getCompetitions) {
      setCompetitions(data.getCompetitions.competitions);
    }
  }, [data]);

  const _cards: CardData[] = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Card ${i + 1}`,
    description: "This is a sample card description.",
  }));
  return (
    <Container>
      <Box py={2}>
        <Box py={4}>
          <Typography variant="h4">Explore Competitions</Typography>
        </Box>
        <Box py={2} display={"flex"} justifyContent={"center"}>
          {loading ? (
            <Box p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {competitions.map((competition: ICompetition) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={competition.id}>
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
                            primary={competition.title}
                            secondary={competition.description}
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
                        <Box
                          py={1}
                          display={"flex"}
                          alignItems={"center"}
                          gap={1}
                        >
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
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CompetitionGrid;
