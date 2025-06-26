import Box from "@mui/material/Box";
import { competitions } from "@/_mock/contest";
import MyCompetitionList from "./my-competition-lit";
import MyEndedCompetitionList from "./my-ended-competition-list";
// ----------------------------------------------------------------------

const MyCompetitionMainContent = () => {
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
          isPaginate={true}
        />
        <MyEndedCompetitionList
          title="My Recent competitions"
          list={competitions}
        />
      </Box>
    </>
  );
};
export default MyCompetitionMainContent;
