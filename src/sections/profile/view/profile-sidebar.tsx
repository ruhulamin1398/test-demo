import Grid from "@mui/material/Grid2";
import { Box, cardClasses, Tab, Tabs } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { RouterLink } from "@/routes/components";
import { CompetitionDeadlineReminders } from "../profile-competition-deadline-reminders";
import { CompetitionRecentSubmissions } from "../profile-competition-recentSubmissions";
import { mockCoursesReminder, mockMyRecentSubmissions } from "@/_mock/data";

// ----------------------------------------------------------------------

const ProfileSidebar = () => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("tab") ?? "";

  const createRedirectPath = (currentPath: string, query: string) => {
    const queryString = new URLSearchParams({ ["tab"]: query }).toString();
    return query ? `${currentPath}?${queryString}` : currentPath;
  };

  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "column",
        // px: { xs: 2, sm: 3, xl: 5 },
        // pt: { lg: 2, xl: 2 },
        pb: { xs: 8, xl: 10 },
        flexShrink: { lg: 0 },
        gap: { xs: 2, lg: 2, xl: 2 },

        bgcolor: { lg: "background.neutral" },
        [`& .${cardClasses.root}`]: {
          p: { xs: 3, lg: 0 },
          boxShadow: { lg: "none" },
          bgcolor: { lg: "transparent" },
        },
      }}
    >
      <Box
        sx={{
          width: 1,
          zIndex: 9,
          display: "flex",
          bgcolor: "background.paper",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={selectedTab}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            width: "100%",
            borderRadius: 0,
            boxShadow: 1,
            minHeight: 48,
            bgcolor: "background.default",
            ".MuiTab-root": {
              fontWeight: 600,
              fontSize: 15,
              color: "text.secondary",
              transition: "color 0.2s",
              "&.Mui-selected": {
                color: "primary.main",
                bgcolor: "action.selected",
                borderRadius: 0,
              },
            },
            ".MuiTabs-indicator": {
              height: 3,
              borderRadius: 0,
              backgroundColor: "primary.main", // Change the color here
            },
          }}
        >
          <Tab
            component={RouterLink}
            key="deadline"
            value=""
            label="Deadlines"
            href={createRedirectPath(pathname, "")}
          />
          <Tab
            component={RouterLink}
            key="submissions"
            value="submissions"
            label="Submissions"
            href={createRedirectPath(pathname, "submissions")}
          />
        </Tabs>
      </Box>

      <Grid size={12}>
        {selectedTab === "" && (
          <CompetitionDeadlineReminders
            title="Upcoming Deadlines"
            list={mockCoursesReminder}
          />
        )}
        {selectedTab === "submissions" && (
          <CompetitionRecentSubmissions
            title="Upcoming Deadlines"
            list={mockMyRecentSubmissions}
          />
        )}
      </Grid>
    </Box>
  );
};
export default ProfileSidebar;
// ----------------------------------------------------------------------
