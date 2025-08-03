/* eslint-disable react/jsx-no-comment-textnodes */

import { cn } from "@/utils";
import React, { useState } from "react";
import { LogoFull } from "../Logo";
import { AlignJustify } from "lucide-react";
import { ConnectBtn } from "../ConnectBtn";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import DashboardLink from "./DashboardLink";

interface Props extends React.ComponentProps<"div"> {
  routs: {
    name: string;
    path: string;
  }[];
}

export const MobileRootNav = ({ className, routs, ...props }: Props) => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleConnectClick = () => {
    setSheetOpen(false);
  };

  return (
    <div {...props} className={cn("flex items-center justify-between", className)}>
      <LogoFull />

      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger onClick={() => setSheetOpen(true)}>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent className="w-full bg-midnight-100 text-gray-200">
          <SheetHeader>
            <SheetTitle className="text-white">
              <LogoFull />
            </SheetTitle>

            <div className="space-y-4 pt-8">
              <div className="flex flex-col gap-y-6">
                <DashboardLink device="medium" />
                {routs.map((item) => (
                  <Link href={item.path} key={item.name} className="text-2xl capitalize">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </SheetHeader>
          <SheetClose asChild>
            <div onClick={handleConnectClick} className="mt-6 flex w-full justify-center">
              <ConnectBtn />
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};
