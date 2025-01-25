"use client";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { adminTheme } from "@/theme/adminTheme";
import { Toolbar, useMediaQuery, useTheme } from "@mui/material";
import AdminNavigator from "@/components/organisms/AdminNavigator";
import AdminHeader from "../organisms/AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 256;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={{ dark: adminTheme, light: adminTheme }}>
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Box
            component="nav"
            sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
          >
            {isSmUp ? null : (
              <AdminNavigator
                PaperProps={{ style: { width: DRAWER_WIDTH } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            )}
            <AdminNavigator
              PaperProps={{ style: { width: DRAWER_WIDTH } }}
              sx={{ display: { sm: "block", xs: "none" } }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <AdminHeader onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
              Bojoyee admin footer copyright
            </Box>
          </Box>
        </Box>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          draggable
        />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default AdminLayout;
