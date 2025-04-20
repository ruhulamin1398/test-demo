"use client";

import { useState } from "react";
import { orderBy } from "es-toolkit";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { paths } from "@/routes/paths";

import { POST_SORT_OPTIONS } from "@/_mock";

import { SubmissionList } from "../submission-list";
import { PostSort } from "../post-sort";
import { SubmissionSearch } from "../submission-search";
import { ISubmissionItem } from "@/types/submission";

// ----------------------------------------------------------------------

type Props = {
  entries: ISubmissionItem[];
};

export function SubmissionHomeView({ entries }: Props) {
  const [sortBy, setSortBy] = useState("latest");

  // const dataFiltered = applyFilter({ inputData: entries, sortBy });

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
          redirectPath={(title: string) => paths.post.details(title)}
        />

        <PostSort
          sort={sortBy}
          onSort={(newValue: string) => setSortBy(newValue)}
          sortOptions={POST_SORT_OPTIONS}
        />
      </Box>

      <SubmissionList data={entries} />
    </Container>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: ISubmissionItem[];
  sortBy: string;
};

function applyFilter({ inputData, sortBy }: ApplyFilterProps) {
  if (sortBy === "latest") {
    return orderBy(inputData, ["likes"], ["desc"]);
  }

  if (sortBy === "oldest") {
    return orderBy(inputData, ["likes"], ["asc"]);
  }

  if (sortBy === "popular") {
    return orderBy(inputData, ["likes"], ["desc"]);
  }

  return inputData;
}
