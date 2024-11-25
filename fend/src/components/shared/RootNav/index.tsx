import React from "react";
import { LargeRootNav } from "./LargeRootNav";
import { MobileRootNav } from "./MobileRootNav";
interface Props extends React.ComponentProps<"div"> {}

export const RootNav = ({ ...props }: Props) => {
  const routs = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "about",
      path: "/about",
    },
    {
      name: "prize",
      path: "/prize",
    },
    {
      name: "winners",
      path: "/winners",
    },
    {
      name: "contact",
      path: "/contact",
    },
  ];

  return (
    <nav {...props} className="border-b border-gray-400/50 bg-[#1A1D46] px-10 py-3 text-white">
      <MobileRootNav className="lg:hidden" routs={routs} />
      <LargeRootNav className="hidden lg:flex" routs={routs} />
    </nav>
  );
};
