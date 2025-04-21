"use client";

import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { EmptyContent } from "src/components/empty-content";
import { CompetitionSort } from "./components/competition-sort";
import { CompetitionList } from "./components/CompetitionList";
import { useQuery } from "@apollo/client";
import {
  GET_COMPETITIONS_QUERY,
  GetCompetitionsQueryResponse,
  GetCompetitionsQueryVariables,
} from "@/graphql-client/competition";
import { ICompetition } from "@/interfaces";

// ----------------------------------------------------------------------

export default function CompetitionListView() {
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
  const [sortBy, setSortBy] = useState("featured");

  const noCompetition = useMemo(() => {
    return !loading && data?.getCompetitions?.competitions.length === 0;
  }, [data, loading]);

  const renderFilters = () => (
    <Box
      sx={{
        gap: 3,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-end", sm: "center" },
      }}
    >
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Competitions
      </Typography>

      <Box sx={{ gap: 1, flexShrink: 0, display: "flex" }}>
        <CompetitionSort
          sort={sortBy}
          onSort={(newValue: string) => setSortBy(newValue)}
        />
      </Box>
    </Box>
  );

  const renderNotFound = () => <EmptyContent filled sx={{ py: 10 }} />;

  return (
    <Container sx={{ mb: 15 }}>
      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters()}
      </Stack>

      {noCompetition && renderNotFound()}

      <CompetitionList competitions={competitions} loading={loading} />
    </Container>
  );
}

// ----------------------------------------------------------------------
