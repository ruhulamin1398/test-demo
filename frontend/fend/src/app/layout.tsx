import type { Metadata } from "next";
import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { SrbijaFont } from "@/fonts";
import ContextProvider from "@/context";
import Providers from "./libs/Providers";

export const metadata: Metadata = {
  title: "lottaverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get("cookie");

  return (
    <html lang="en">
      <body
        className={`main-bg-gradient font-normal text-gray-100 antialiased ${SrbijaFont.className}`}
      >
        <Providers>
          <ContextProvider cookies={cookies}>{children}</ContextProvider>
          <ToastContainer position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
