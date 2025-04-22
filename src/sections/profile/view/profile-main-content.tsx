import Box from "@mui/material/Box";
import { _coursesContinue, _coursesFeatured, _tours } from "@/_mock";
import { RunningCompetitions } from "../running-competitions";
import { CompletedCompetitions } from "../completed-competitions";
import { CourseFeatured } from "../course-featured";

// ----------------------------------------------------------------------

export function ProfileMainContent() {
  return (
    <>
      <Box>
        {/* <Box
          sx={{
            gap: 3,
            display: "grid",
            alignItems: "flex-start",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
            },
          }}
        > */}
        <RunningCompetitions
          title="Enrolled Competitions"
          list={_coursesContinue}
        />
        <CompletedCompetitions
          title="Completed Competitions"
          list={_coursesContinue}
        />
        {/* </Box> */}
        <CourseFeatured
          title="Competitions You May Enroll"
          list={_coursesFeatured}
        />
      </Box>
    </>
  );
}
