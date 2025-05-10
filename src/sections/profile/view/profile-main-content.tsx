import Box from "@mui/material/Box";
import { competitions } from "@/_mock/contest";
import { ProfilePageCompetition } from "../profile-page-competitions";
import { MyCompetitionList } from "../my-competiton-tab/my-competition-lit";
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

        <MyCompetitionList
          title="My running competitions"
          list={competitions}
        />

        <ProfilePageCompetition title="Active Contests" list={competitions} />

        {/* <CompletedCompetitions
          title="Completed Competitions"
          list={_coursesContinue}
        /> */}
        {/* </Box> */}
        {/* <CourseFeatured
          title="Competitions You May Enroll"
          list={_coursesFeatured}
        /> */}
      </Box>
    </>
  );
}
