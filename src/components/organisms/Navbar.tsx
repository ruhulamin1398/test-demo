"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { DarkMode } from "@mui/icons-material";
import useThemeToggle from "@/app/hooks/useTheme";
import AccountMenu from "../atoms/AccountMenu";
import BottomAppBarWithJustifiedMenus from "./AppbarMobile";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const { toggleTheme, mode } = useThemeToggle();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile devices
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("scroll", function () {});
    }
    if (typeof document !== "undefined") {
      const handleScroll = () => {
        const scrollPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
        setScrolled(scrollPosition > 50);
      };

      document.body.addEventListener("scroll", handleScroll);

      return () => {
        document.body.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar
        component="nav"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled
            ? theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#ffffff"
            : "transparent",
          color: scrolled
            ? theme.palette.mode === "dark"
              ? "#ffffff"
              : "#000000"
            : theme.palette.text.primary,
          backdropFilter: scrolled ? "blur(10px)" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          transition: "background-color 0.3s, box-shadow 0.3s, color 0.3s",
          height: "64px",
          width: "100%",
        }}
      >
        <Container>
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link
                href={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="h6">BeeJoyi</Typography>
              </Link>
            </Typography>
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link href={"/"}>
                  <Typography px={3}>Home</Typography>
                </Link>
                <Link href={"/contest"}>
                  <Typography px={3}>Contests</Typography>
                </Link>
                <Link href={"/"}>
                  <Typography px={3}>How It Works</Typography>
                </Link>

                {user ? (
                  <AccountMenu user={user} />
                ) : (
                  <Link
                    href={"/auth/login"}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography px={3}>
                      {/* <LoginOutlined fontSize="small" /> */}
                      Sign In
                    </Typography>
                  </Link>
                )}
                <Link href={"/auth/register"}>
                  <Typography px={2}>Sign Up</Typography>
                </Link>
                {/* <IconButton onClick={toggleTheme} sx={{ marginLeft: "20px" }}>
                  <DarkMode />
                </IconButton> */}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* {isMobile && (
        <DrawerMenu
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          navItems={navItems}
        />
      )} */}
      {isMobile && <BottomAppBarWithJustifiedMenus />}
    </>
  );
};

export default Navbar;
