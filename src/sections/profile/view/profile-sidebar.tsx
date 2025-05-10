import Grid from "@mui/material/Grid2";
import { Box, cardClasses, Tab, Tabs } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { RouterLink } from "@/routes/components";
import { CompetitionDeadlineReminders } from "../profile-competition-deadline-reminders";
import { CompetitionRecentSubmissions } from "../profile-competition-recentSubmissions";
import { CoursesReminder, MyRecentSubmissions } from "@/_mock/data";

// ----------------------------------------------------------------------

export function ProfileSidebar() {
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
        px: { xs: 2, sm: 3, xl: 5 },
        pt: { lg: 2, xl: 2 },
        pb: { xs: 8, xl: 10 },
        flexShrink: { lg: 0 },
        gap: { xs: 2, lg: 2, xl: 2 },
        maxWidth: { lg: 320, xl: 360 },
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
        <Tabs value={selectedTab} variant="standard">
          <Tab
            component={RouterLink}
            key="deadline"
            value=""
            label="Deadlines"
            href={createRedirectPath(pathname, "")}
            sx={{
              typography: "caption",
              minHeight: 48,
            }}
          />
          <Tab
            component={RouterLink}
            key="submissions"
            value="submissions"
            label="Submissions"
            href={createRedirectPath(pathname, "submissions")}
            sx={{
              typography: "caption",
              minHeight: 48,
            }}
          />
        </Tabs>
      </Box>

      <Grid size={12}>
        {selectedTab === "" && (
          <CompetitionDeadlineReminders
            title="Upcoming Deadlines"
            list={CoursesReminder}
          />
        )}
        {selectedTab === "submissions" && (
          <CompetitionRecentSubmissions
            title="Upcoming Deadlines"
            list={MyRecentSubmissions}
          />
        )}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------
