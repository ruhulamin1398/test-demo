"use client";
import type { FabProps } from "@mui/material/Fab";
import type { UseBackToTopReturn } from "minimal-shared/hooks";
import { useBackToTop } from "minimal-shared/hooks";
import Fab from "@mui/material/Fab";
import SvgIcon from "@mui/material/SvgIcon";
import {
  ScrollProgress,
  useScrollProgress,
} from "@/components/animate/scroll-progress";
import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { ProfilePageHero } from "../profile-page-hero";
import { _userAbout } from "@/_mock";
import { useMockedUser } from "@/auth/hooks";
import { Iconify } from "@/components/iconify";
import { usePathname, useSearchParams } from "next/navigation";
import { RouterLink } from "@/routes/components";
import { ProfileHomeTab } from "./profile-home-tab";
import { ProfileAccountTab } from "./profile-account-tab";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CONFIG } from "@/global-config";
import { MyCompetitionsTab } from "./my-competitions-tab";

// ----------------------------------------------------------------------

const NAV_ITEMS = [
  {
    value: "",
    label: "DashBoard",
    icon: <Iconify width={24} icon="solar:user-id-bold" />,
  },

  {
    value: "my-competitions",
    label: "My Competitions",
    icon: <Iconify width={24} icon="solar:book-bold" />,
  },
  {
    value: "account",
    label: "Account settings",
    icon: <Iconify width={24} icon="solar:user-bold" />,
  },
];

const createRedirectPath = (currentPath: string, query: string) => {
  const queryString = new URLSearchParams({ [TAB_PARAM]: query }).toString();
  return query ? `${currentPath}?${queryString}` : currentPath;
};

const TAB_PARAM = "profile-tab";

export function ProfileView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get(TAB_PARAM) ?? "";
  const pageProgress = useScrollProgress();
  const user = useSelector((state: RootState) => state.auth.user);

  const { onBackToTop, isVisible } = useBackToTop("90%");

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[
          (theme) => ({ position: "fixed", zIndex: theme.zIndex.appBar + 1 }),
        ]}
      />

      <BackToTopButton isVisible={isVisible} onClick={onBackToTop} />

      <Container sx={{ my: 5 }}>
        <Card sx={{ mb: 3, height: 290 }}>
          <ProfilePageHero
            role={user?.role || " "}
            name={`${user?.firstName} ${user?.lastName}`}
            avatarUrl={
              user?.profilePicture ??
              `${CONFIG.assetsDir}/assets/images/mock/avatar/avatar-2.webp`
            }
            coverUrl={_userAbout.coverUrl}
          />

          <Box
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              px: { md: 3 },
              display: "flex",
              position: "absolute",
              bgcolor: "background.paper",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <Tabs value={selectedTab}>
              {NAV_ITEMS.map((tab) => (
                <Tab
                  component={RouterLink}
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.label}
                  href={createRedirectPath(pathname, tab.value)}
                />
              ))}
            </Tabs>
          </Box>
        </Card>

        {selectedTab === "" && <ProfileHomeTab />}
        {selectedTab === "account" && <ProfileAccountTab />}
        {selectedTab === "submissions" && <ProfileAccountTab />}
        {selectedTab === "my-competitions" && <MyCompetitionsTab />}
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

type BackToTopProps = FabProps & {
  isVisible: UseBackToTopReturn["isVisible"];
};

function BackToTopButton({ isVisible, sx, ...other }: BackToTopProps) {
  return (
    <Fab
      aria-label="Back to top"
      sx={[
        (theme) => ({
          width: 48,
          height: 48,
          position: "fixed",
          transform: "scale(0)",
          right: { xs: 24, md: 32 },
          bottom: { xs: 24, md: 32 },
          zIndex: theme.zIndex.speedDial,
          transition: theme.transitions.create(["transform"]),
          ...(isVisible && { transform: "scale(1)" }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <SvgIcon>
        {/* https://icon-sets.iconify.design/solar/double-alt-arrow-up-bold-duotone/ */}
        <path
          fill="currentColor"
          d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z"
          opacity="0.5"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057"
          clipRule="evenodd"
        />
      </SvgIcon>
    </Fab>
  );
}
