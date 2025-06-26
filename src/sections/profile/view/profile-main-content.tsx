import { Box } from "@mui/material";
import { competitions } from "@/_mock/contest";
import ProfilePageCompetition from "../profile-page-competitions";
import MyCompetitionList from "../my-competition-tab/my-competition-lit";
// ----------------------------------------------------------------------

const ProfileMainContent = () => {
  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MyCompetitionList
          title="My running competitions"
          list={competitions}
          isViewMore={true}
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
};

export default ProfileMainContent;
