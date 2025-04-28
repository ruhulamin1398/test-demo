import { _coursesContinue, _coursesFeatured, _tours } from "@/_mock";
import Grid from "@mui/material/Grid2";
import { CompetitionSidebar } from "./competition-sidebar";
import { MyCompetitionMainContent } from "../my-competiton-tab/my-competition-main-content";

// ----------------------------------------------------------------------

export function MyCompetitionsTab() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          {/* //left side  */}
          <Grid>
            <MyCompetitionMainContent />
          </Grid>
        </Grid>

        <Grid container spacing={3} size={{ xs: 12, md: 6, lg: 4 }}>
          {/* // right side */}
          <CompetitionSidebar />
        </Grid>
      </Grid>
    </>
  );
}
