"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "@/graphql-client/auth";
import { useDispatch } from "react-redux";
import { setCompetitionInfo, setUser } from "@/store/slices/authSlice";

import { MainLayout } from "@/layouts/main";
import { AuthSplitLayout } from "@/layouts/auth-split";
import { DashboardLayout } from "@/layouts/dashboard";

interface LayoutRendererProps {
  children: React.ReactNode;
}

const LayoutRenderer: React.FC<LayoutRendererProps> = ({ children }) => {
  const path = usePathname();
  // @TODO get user data from next auth
  const dispatch = useDispatch();
  const { data, loading } = useQuery(ME_QUERY);

  useEffect(() => {
    if (!loading && data) {
      console.log("me data is ", data);
      dispatch(setUser(data.me));
      dispatch(
        setCompetitionInfo({
          enrollIds: data.me.enrollIds || [],
          submissions: data.me.submissions || [],
        })
      );
    }
  }, [data, loading, dispatch]);

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
