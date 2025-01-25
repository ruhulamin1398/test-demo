"use client";
import React, { useState } from "react";
import {
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { LOGOUT_MUTATION } from "@/graphql-client/auth";
import { LoginOutlined } from "@mui/icons-material";
import Link from "next/link";
import { IUser } from "@/interfaces";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearUser } from "@/app/store/slices/authSlice";

interface ProfileMenuProps {
  user: IUser;
}

interface LogoutResponse {
  logout: {
    success: boolean;
  };
}

const UserProfileMenu: React.FC<ProfileMenuProps> = ({ user }) => {
  const [logout] = useMutation<LogoutResponse>(LOGOUT_MUTATION);
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    console.log("LOGGING OUT");
    try {
      console.log("LOGGING OUT");
      const { data } = await logout({});
      if (data?.logout.success) {
        dispatch(clearUser());
        router.push("/");
      }
    } catch (err) {
      console.error("Error during authentication", err);
    } finally {
      handleMenuClose();
    }
  };

  return user ? (
    <div>
      <IconButton
        edge="end"
        onClick={handleMenuOpen}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        disableRipple
      >
        <Typography variant="body2" sx={{ mr: 1 }}>
          {user.firstName}
        </Typography>
        <Avatar>{user.firstName?.charAt(0)}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>My Account</MenuItem>
      </Menu>
    </div>
  ) : (
    <Link href="/auth/login">
      <Button sx={{ color: "#fff" }} startIcon={<LoginOutlined />}>
        Login
      </Button>
    </Link>
  );
};

export default UserProfileMenu;
