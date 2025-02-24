"use client";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
// import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../organisms/Navbar";
import { ThemeProvider } from "@/app/context/ThemeContext";
import Footer from "../organisms/Footer";
import { lightTheme, darkTheme } from "@/theme";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={{ dark: darkTheme, light: lightTheme }}>
        {/* <CssBaseline /> */}
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />
            {children}
          </Box>
          <Footer />
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

export default AppLayout;
