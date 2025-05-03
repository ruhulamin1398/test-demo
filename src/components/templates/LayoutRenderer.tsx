"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";

import { MainLayout } from "@/layouts/main";
import { AuthSplitLayout } from "@/layouts/auth-split";
import { DashboardLayout } from "@/layouts/dashboard";
import { IUser } from "@/interfaces";

interface LayoutRendererProps {
  children: React.ReactNode;
  user: IUser | null;
}

const LayoutRenderer: React.FC<LayoutRendererProps> = ({ children, user }) => {
  const path = usePathname();
  // @TODO get user data from next auth
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  return (
    <>
      {path.startsWith("/auth") ? (
        <AuthSplitLayout>{children}</AuthSplitLayout>
      ) : path.startsWith("/admin") ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  );
};

export default LayoutRenderer;
