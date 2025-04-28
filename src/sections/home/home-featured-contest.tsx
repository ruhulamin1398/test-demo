import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { _mock } from "@/_mock";
import { Button, Container, Link } from "@mui/material";
import { Iconify } from "@/components/iconify";

import { RouterLink } from "@/routes/components";

import {
  GET_COMPETITIONS_QUERY,
  GetCompetitionsQueryResponse,
  GetCompetitionsQueryVariables,
} from "@/graphql-client/competition";

import { HomeFeaturedContestCarousel } from "./featured-contest-carousel";
import { ICompetition } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { EmptyContent } from "@/components/empty-content";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function HomeFeaturedContest() {
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const { data, loading, error } = useQuery<
    GetCompetitionsQueryResponse,
    GetCompetitionsQueryVariables
  >(GET_COMPETITIONS_QUERY, {
    variables: {
      page: { ...pagination }, // Pagination settings
    },
  });

  useEffect(() => {
    if (!loading && data?.getCompetitions?.competitions) {
      setCompetitions(data.getCompetitions.competitions);
      console.log(data);
    }
    if (error) {
      console.log("FETCH _ERROR", error);
    }
  }, [data, loading, error]);

  const noCompetition = useMemo(() => {
    return !loading && data?.getCompetitions?.competitions.length === 0;
  }, [data, loading]);

  const renderNotFound = () => <EmptyContent filled sx={{ py: 10 }} />;
  return (
    <Container sx={{ py: 6 }}>
      <Box
        sx={{
          gap: 5,
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
            mb: 1,
            px: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Typography variant="h5">Featured Contest</Typography>
          <Link
            component={RouterLink}
            href="competition"
            color="inherit"
            underline="none"
          >
            <Button
              color="primary"
              variant="outlined"
              endIcon={<Iconify icon="ic:round-arrow-forward" />}
            >
              View All
            </Button>
          </Link>
        </Box>
        {noCompetition && renderNotFound()}
        <HomeFeaturedContestCarousel
          title="Competitions You May Enroll"
          list={competitions}
          loading={loading}
        />
      </Box>
    </Container>
  );
}
