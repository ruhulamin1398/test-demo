"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};
