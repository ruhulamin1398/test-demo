import Box from "@mui/material/Box";
import { competitions } from "@/_mock/contest";
import { MyCompetitionList } from "./my-competition-lit";
import { MyEndedCompetitionList } from "./my-ended-competition-list";
// ----------------------------------------------------------------------

export function MyCompetitionMainContent() {
  return (
    <>
      <Box>
        <Box
          sx={{
            gap: 3,
            display: "grid",
            alignItems: "flex-start",
          }}
        >
          {/* <ProfilePageCompetition title="Active Contests" list={competitions} /> */}
          <MyCompetitionList
            title="My running competitions"
            list={competitions}
          />
          <MyEndedCompetitionList
            title="My ended competitions"
            list={competitions}
          />
        </Box>
      </Box>
    </>
  );
}
