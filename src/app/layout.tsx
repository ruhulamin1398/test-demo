// src/app/layout.tsx
import React from "react";
import { Metadata } from "next";
import { Provider } from "@/graphql-client/Provider";
import { ReduxProvider } from "@/app/store/ReduxProvider";
import LayoutRenderer from "@/components/templates/LayoutRenderer";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "A modern app with MUI and Next.js",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ReduxProvider>
            <LayoutRenderer>{children}</LayoutRenderer>
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
