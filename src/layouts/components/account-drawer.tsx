"use client";

import type { IconButtonProps } from "@mui/material/IconButton";
import { useBoolean } from "minimal-shared/hooks";
import { Box, Avatar, Drawer, Typography, IconButton } from "@mui/material";
import { Iconify } from "@/components/iconify";
import { Scrollbar } from "@/components/scrollbar";
import { AnimateBorder } from "@/components/animate";
import { AccountButton } from "./account-button";
import { SignOutButton } from "./sign-out-button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// ----------------------------------------------------------------------

export function AccountDrawer({ sx, ...other }: IconButtonProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const renderAvatar = () => (
    <AnimateBorder
      sx={{ mb: 2, p: "6px", width: 96, height: 96, borderRadius: "50%" }}
      slotProps={{
        primaryBorder: { size: 120, sx: { color: "primary.main" } },
      }}
    >
      <Avatar
        src={user?.profilePicture}
        alt={user?.name}
        sx={{ width: 1, height: 1 }}
      >
        {user?.name?.charAt(0).toUpperCase()}
      </Avatar>
    </AnimateBorder>
  );
  return (
    <>
      {user && (
        <>
          <AccountButton
            onClick={onOpen}
            photoURL={user?.profilePicture}
            displayName={user?.name || ""}
            sx={sx}
            {...other}
          />
          <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
            slotProps={{ backdrop: { invisible: true } }}
            PaperProps={{ sx: { width: 320 } }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                top: 12,
                left: 12,
                zIndex: 9,
                position: "absolute",
              }}
            >
              <Iconify icon="mingcute:close-line" />
            </IconButton>

            <Scrollbar>
              <Box
                sx={{
                  pt: 8,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {renderAvatar()}

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 0.5 }}
                  noWrap
                >
                  {user.id}
                </Typography>

                <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
                  {user.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 0.5 }}
                  noWrap
                >
                  {user.email}
                </Typography>
              </Box>
            </Scrollbar>

            <Box sx={{ p: 2.5 }}>
              <SignOutButton onClose={onClose} />
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
}
