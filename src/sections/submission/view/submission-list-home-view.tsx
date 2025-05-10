"use client";

import { useState } from "react";
import { orderBy } from "es-toolkit";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { paths } from "@/routes/paths";
import { SubmissionList } from "../submission-list";
import { SubmissionSort } from "../submission-sort";
import { SubmissionSearch } from "../submission-search";
import {
  ISubmissions,
  SUBMISSION_FILTER_CATEGORY_OPTIONS,
  SUBMISSION_FILTER_CONTEST_OPTIONS,
  SUBMISSION_SORT_TIME_OPTIONS,
} from "@/_mock/data";

// ----------------------------------------------------------------------

type Props = {
  submissions: ISubmissions[];
};

export function SubmissionHomeView({ submissions }: Props) {
  const [filterByCategory, setFilterByCategory] = useState("All Categories");
  const [filterByContest, setFilterByContest] = useState("All Contest");
  const [sortByTime, setSortByTime] = useState("latest");

  return (
    <Container>
      <Typography variant="h4" sx={[{ my: { xs: 3, md: 5 } }]}>
        Submissions
      </Typography>

      <Box
        sx={[
          () => ({
            gap: 3,
            display: "flex",
            mb: { xs: 3, md: 5 },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-end", sm: "center" },
          }),
        ]}
      >
        <SubmissionSearch
          sx={{ flexGrow: 1 }}
          redirectPath={(title: string) => paths.post.details(title)}
        />

        <SubmissionSort
          sort={filterByContest}
          onSort={(newValue: string) => setFilterByContest(newValue)}
          sortOptions={SUBMISSION_FILTER_CONTEST_OPTIONS}
        />
        <SubmissionSort
          sort={filterByCategory}
          onSort={(newValue: string) => setFilterByCategory(newValue)}
          sortOptions={SUBMISSION_FILTER_CATEGORY_OPTIONS}
        />
        <SubmissionSort
          sort={sortByTime}
          onSort={(newValue: string) => setSortByTime(newValue)}
          sortOptions={SUBMISSION_SORT_TIME_OPTIONS}
        />
      </Box>

      <SubmissionList data={submissions} />
    </Container>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: ISubmissions[];
  sortBy: string;
};

function applyFilter({ inputData, sortBy }: ApplyFilterProps) {
  if (sortBy === "latest") {
    return orderBy(inputData, ["vote"], ["desc"]);
  }

  if (sortBy === "oldest") {
    return orderBy(inputData, ["vote"], ["asc"]);
  }

  if (sortBy === "popular") {
    return orderBy(inputData, ["vote"], ["desc"]);
  }

  return inputData;
}
