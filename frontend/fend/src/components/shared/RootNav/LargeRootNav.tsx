import React from "react";
import { LogoFull } from "../Logo";
import { cn } from "@/utils";
import Link from "next/link";
import { ConnectBtn } from "../ConnectBtn";
import DashboardLink from "./DashboardLink";

interface Props extends React.ComponentProps<"div"> {
  routs: {
    name: string;
    path: string;
  }[];
}

export const LargeRootNav = ({ className, routs, ...props }: Props) => {
  return (
    <div {...props} className={cn("w-full items-center justify-between py-3", className)}>
      <LogoFull />
      <div className="flex items-center gap-x-4">
        <DashboardLink device="large" />
        {routs.map((item) => {
          return (
            <Link href={item.path} key={item.name} className="text-lg capitalize">
              {item.name}
            </Link>
          );
        })}
      </div>
      <ConnectBtn />
    </div>
  );
};
