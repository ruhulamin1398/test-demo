import { useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";

import { paths } from "@/routes/paths";
import { usePathname } from "@/routes/hooks";

import { Logo } from "@/components/logo";
import { Scrollbar } from "@/components/scrollbar";

import { Nav, NavUl } from "../components";
import { NavList } from "./nav-mobile-list";
import { SignInButton } from "../../../components/sign-in-button";

import type { NavMainProps } from "../types";
import { AccountDrawer } from "@/layouts/components/account-drawer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// ----------------------------------------------------------------------

export type NavMobileProps = NavMainProps & {
  open: boolean;
  onClose: () => void;
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function NavMobile({ data, open, onClose, slots, sx }: NavMobileProps) {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: [
          {
            display: "flex",
            flexDirection: "column",
            width: "var(--layout-nav-mobile-width)",
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ],
      }}
    >
      {slots?.topArea ?? (
        <Box
          sx={{
            display: "flex",
            pt: 3,
            pb: 2,
            pl: 2.5,
          }}
        >
          <Logo />
        </Box>
      )}

      <Scrollbar fillContent>
        <Nav
          sx={{
            pb: 3,
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
          }}
        >
          <NavUl>
            {data.map((list) => (
              <NavList key={list.title} data={list} />
            ))}
          </NavUl>
        </Nav>
      </Scrollbar>

      {slots?.bottomArea ?? (
        <Box
          sx={{
            py: 3,
            px: 2.5,
            gap: 1.5,
            display: "flex",
          }}
        >
          <SignInButton fullWidth />
          {user ? (
            <AccountDrawer fullWidth />
          ) : (
            <>
              <SignInButton fullWidth />
            </>
          )}
        </Box>
      )}
    </Drawer>
  );
}
