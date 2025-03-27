"use client";
import { clearUser } from "@/store/slices/authSlice";
import { LOGOUT_MUTATION } from "@/graphql-client/auth";
import { IUser, RoleEnum } from "@/interfaces";
import { useMutation } from "@apollo/client";
import {
  Dashboard,
  Logout,
  PublishOutlined,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, MouseEvent, Fragment } from "react";
import { useDispatch } from "react-redux";
import NextLinkMenuItem from "./NextLinkMenuItem";

interface AccountMenuProps {
  user: IUser;
}

interface LogoutResponse {
  logout: {
    success: boolean;
  };
}

const AccountMenu: React.FC<AccountMenuProps> = ({ user }) => {
  const [logout] = useMutation<LogoutResponse>(LOGOUT_MUTATION);
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
      handleClose();
    }
  };
  return (
    <Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          disableRipple
        >
          <Typography variant="body2" sx={{ mr: 1 }}>
            {user.firstName}
          </Typography>
          <Avatar sx={{ width: 32, height: 32 }}>
            {user.firstName?.charAt(0)}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        {user.role === RoleEnum.ADMIN ? (
          <NextLinkMenuItem href="/dashboard">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            Dashboard
          </NextLinkMenuItem>
        ) : null}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PublishOutlined fontSize="small" />
          </ListItemIcon>
          My Submission
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default AccountMenu;
