import type { CardProps } from "@mui/material/Card";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Iconify } from "@/components/iconify";
import { AnimateBorder } from "@/components/animate";

import { useMockedUser } from "@/auth/hooks";
import { CardHeader, Link, Stack } from "@mui/material";
import { _userAbout } from "@/_mock";
import { IUserProfile } from "@/types/user";

// ----------------------------------------------------------------------

type CardProps = {
  userData: IUserProfile;
};
export function UserMyAccount({ userData, sx, ...other }: CardProps) {
  const { user } = useMockedUser();

  const renderAbout = () => (
    <Card>
      <Stack spacing={2} sx={{ typography: "body2" }}>
        <Box>{userData.quote}</Box>

        <Box sx={{ display: "flex" }}>
          <Iconify width={24} icon="mingcute:location-fill" sx={{ mr: 2 }} />
          Live at
          <Link variant="subtitle2" color="inherit">
            &nbsp;{userData.country}
          </Link>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Iconify width={24} icon="fluent:mail-24-filled" sx={{ mr: 2 }} />
          {userData.email}
        </Box>

        <Box sx={{ display: "flex" }}>
          <Iconify width={24} icon="ic:round-business-center" sx={{ mr: 2 }} />
          {userData.role} {`at `}
          <Link variant="subtitle2" color="inherit">
            &nbsp;{userData.company}
          </Link>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Iconify width={24} icon="ic:round-business-center" sx={{ mr: 2 }} />
          Studied at
          <Link variant="subtitle2" color="inherit">
            &nbsp;{userData.school}
          </Link>
        </Box>
      </Stack>
    </Card>
  );
  const renderAvatar = () => (
    <AnimateBorder
      sx={{ mb: 2, p: "6px", width: 96, height: 96, borderRadius: "50%" }}
      slotProps={{
        primaryBorder: { size: 120, sx: { color: "primary.main" } },
      }}
    >
      <Avatar
        src={user?.photoURL}
        alt={user?.displayName}
        sx={{ width: 1, height: 1 }}
      >
        {user?.displayName?.charAt(0).toUpperCase()}
      </Avatar>
    </AnimateBorder>
  );

  return (
    <Card sx={sx} {...other}>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        {renderAvatar()}

        <Typography variant="subtitle1" noWrap sx={{ mb: 0.5 }}>
          {user?.displayName}
        </Typography>

        <Box
          sx={{
            gap: 0.5,
            display: "flex",
            typography: "body2",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          ID: 123987
          <IconButton size="small">
            <Iconify width={18} icon="solar:copy-bold" />
          </IconButton>
        </Box>

        {renderAbout()}
      </Box>
    </Card>
  );
}
