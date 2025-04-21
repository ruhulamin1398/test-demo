import Grid from "@mui/material/Grid2";
import { Box, cardClasses, Tab, Tabs } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { RouterLink } from "@/routes/components";
import { CompetitionDeadlineReminders } from "../user-competition-deadline-reminders";
import { CompetitionRecentSubmissions } from "../user-competition-recentSubmissions";

// ----------------------------------------------------------------------

export function CompetitionSidebar() {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("tab") ?? "";

  const _coursesReminder = [
    {
      id: 1,
      title: "Photo Competition  round 2",
      totalTask: 12,
      currentTask: 5,
      reminderAt: "2 Days Left",
    },
    {
      id: 2,
      title: "Art Competition  round 1",
      totalTask: 12,
      currentTask: 5,
      reminderAt: "2 Days Left",
    },
    {
      id: 3,
      title: "Photo Competition  round 2",
      totalTask: 6,
      currentTask: 5,
      reminderAt: "2 Days Left",
    },
    {
      id: 4,
      title: "Photo Competition  round 2",
      totalTask: 7,
      currentTask: 5,
      reminderAt: "2 Days Left",
    },
  ];

  const _recentSubmissions = [
    {
      id: 1,
      title: "Photo Competition  round 2",
      reminderAt: "50 minutes ago",
    },
    {
      id: 2,
      title: "Art Competition  round 1",
      reminderAt: "1 Days ago",
    },
    {
      id: 3,
      title: "Photo Competition  round 2",
      reminderAt: "2 Days ago",
    },
    {
      id: 4,
      title: "Photo Competition  round 2",
      reminderAt: "2 Days ago",
    },
    {
      id: 5,
      title: "Photo Competition  round 2",
      reminderAt: "2 Days ago",
    },
    {
      id: 6,
      title: "Photo Competition  round 2",
      reminderAt: "2 Days ago",
    },
    {
      id: 7,
      title: "Photo Competition  round 2",
      reminderAt: "2 Days ago",
    },
    {
      id: 8,
      title: "Photo Competition  round 2",
      reminderAt: "2 Days ago",
    },
  ];

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
            list={_coursesReminder}
          />
        )}
        {selectedTab === "submissions" && (
          <CompetitionRecentSubmissions
            title="Upcoming Deadlines"
            list={_recentSubmissions}
          />
        )}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------
