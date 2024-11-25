"use client";

import { navData } from "@/data";
import React, { useState } from "react";
import { LogoFull } from "../Logo";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Button } from "../../ui";

import { ChevronUp, WalletMinimal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils";
import { ConnectBtn } from "../ConnectBtn"

interface Props extends React.ComponentProps<"div"> {}

export const LargeDeviceNav = ({ className, ...props }: Props) => {
  return (
    <div {...props} className={cn(`flex items-center justify-between gap-x-14`, className)}>
      <LogoFull />

      <div className="flex flex-1 items-start gap-x-5">
        {navData.map((item) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div key={item.title}>
              {!(Array.isArray(item?.submenu) && item?.submenu?.length) ? (
                <Link className="flex items-center justify-center gap-x-1" href={item.href}>
                  <item.icon className="size-4" />
                  <span className="text-xs uppercase xl:text-sm 2xl:text-lg">{item.title}</span>
                </Link>
              ) : (
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger className="flex items-center justify-center gap-x-1">
                    <item.icon className="size-4" />
                    <span className="text-xs uppercase xl:text-sm 2xl:text-lg">{item.title}</span>
                    {item?.submenu && item?.submenu?.length > 0 && (
                      <ChevronUp className="size-3 rotate-180" />
                    )}
                  </PopoverTrigger>
                  {item?.submenu && item?.submenu?.length > 0 && (
                    <PopoverContent
                      className="w-36 space-y-3 border-gray-300/50 bg-[#1A1D46] py-3 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.submenu.map((item) => {
                        return (
                          <Link
                            href={item.href}
                            key={item.title}
                            className="flex items-center gap-x-2"
                          >
                            <span className="text-sm font-normal text-[#f4eeff]">{item.title}</span>
                          </Link>
                        );
                      })}
                    </PopoverContent>
                  )}
                </Popover>
              )}
            </div>
          );
        })}
      </div>

      <ConnectBtn/>
    </div>
  );
};
