import type { FabProps } from "@mui/material/Fab";
import type { UseBackToTopReturn } from "minimal-shared/hooks";

import Grid from "@mui/material/Grid2";
import { ContestDateTimeLine } from "../contest-date-timeline";
import { EnrollmentCard } from "../enroll-contest";
import { PrizeList } from "../prize-list";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export function CompetitionSidebar() {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Grid size={12}>
          <EnrollmentCard
            price="TK 500"
            title={`Winter Photography Competition \n Round 1`}
            description="Praesent egestas tristique nibh. Duis lobortis massa imperdiet quam."
          />
        </Grid>
        <Grid size={12}>
          <PrizeList title="Prizes" list={constPrizeAmountList} />
        </Grid>
        <Grid size={12}>
          <ContestDateTimeLine
            title="Stages and timeLine "
            list={ContestTimeLineData}
          />
        </Grid>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
const constPrizeAmountList = [
  { id: 1, name: "First prize", amount: 500 },
  { id: 2, name: "Second Prize", amount: 500 },
  { id: 3, name: "Third Prize", amount: 500 },
];
export const ContestTimeLineData = [
  {
    id: 1,
    title: "Final Round",
    text: "Priliminary Round",
    date: "01 jan 2024  - 31 jan 2024",
  },
  {
    id: 2,
    title: "Round 3",
    text: "Priliminary Round",
    date: "01 jan 2024  - 31 jan 2024",
  },
  {
    id: 3,
    title: "Round 2",
    text: "Priliminary Round",
    date: "01 jan 2024  - 31 jan 2024",
  },
  {
    id: 4,
    title: "Round 1",
    text: "Priliminary Round",
    date: "01 jan 2024  - 31 jan 2024",
  },
  {
    id: 5,
    title: "Round 0",
    text: "Priliminary Round",
    date: "01 jan 2024  - 31 jan 2024",
  },
];

type BackToTopProps = FabProps & {
  isVisible: UseBackToTopReturn["isVisible"];
};
