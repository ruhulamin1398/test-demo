"use client";
import { MenuItem } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface NextLinkMenuItemProps {
  href: string;
  children: ReactNode;
}

const NextLinkMenuItem: React.FC<NextLinkMenuItemProps> = ({
  href,
  children,
}) => {
  return (
    <MenuItem sx={{ padding: 0 }}>
      <Link
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          padding: "6px 16px",
        }}
        href={href}
      >
        {children}
      </Link>
    </MenuItem>
  );
};

export default NextLinkMenuItem;
