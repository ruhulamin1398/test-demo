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
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import {
  DarkMode,
  EmojiEventsOutlined,
  HomeOutlined,
  LoginOutlined,
} from "@mui/icons-material";
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
      console.log(window.addEventListener);
      window.addEventListener("scroll", function () {
        console.log("Window is being scrolled!");
      });
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
            ? theme.palette.primary.main
            : "transparent",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          transition: "background-color 0.3s, box-shadow 0.3s",
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
              BIJOYEE
            </Typography>
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link href={"/"}>
                  <Button sx={{ color: "#fff" }} startIcon={<HomeOutlined />}>
                    Home
                  </Button>
                </Link>
                <Link href={"/competition"}>
                  <Button
                    sx={{ color: "#fff" }}
                    startIcon={<EmojiEventsOutlined />}
                  >
                    Competition
                  </Button>
                </Link>
                <IconButton onClick={toggleTheme}>
                  <DarkMode />
                </IconButton>

                {user ? (
                  <AccountMenu user={user} />
                ) : (
                  <Link href={"/auth/login"}>
                    <Button
                      sx={{ color: "#fff" }}
                      startIcon={<LoginOutlined />}
                    >
                      Login
                    </Button>
                  </Link>
                )}
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
