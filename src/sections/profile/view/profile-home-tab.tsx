import { _coursesContinue, _coursesFeatured, _tours } from "@/_mock";
import Grid from "@mui/material/Grid2";
import { ProfileSummaryOverview } from "../OverView";
import { CompetitionSidebar } from "./competition-sidebar";
import { ProfileMainContent } from "./profile-main-content";

// ----------------------------------------------------------------------

export function ProfileHomeTab() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          {/* //left side  */}
          <Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ mb: 3 }}>
              <ProfileSummaryOverview />
            </Grid>
            <ProfileMainContent />
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
