"use client";

import { cn } from "@/utils";
import React, { useState } from "react";
import { LogoFull } from "../Logo";
import { AlignJustify } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { navData } from "@/data";
import { TriangleDown } from "../../icons";
import Link from "next/link";
import { ConnectBtn } from "../ConnectBtn";

interface Props extends React.ComponentProps<"div"> {}

export const MobileNav = ({ className, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div {...props} className={cn("flex items-center justify-between", className)}>
      <LogoFull />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger onClick={() => setIsOpen(!isOpen)}>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent className="w-full bg-midnight-100 text-gray-100">
          <SheetTitle />

          <div className="mt-10 flex flex-1 flex-col items-center gap-x-28 gap-y-5 text-start text-xl font-black">
            {navData.map((item) => (
              <div key={item.title}>
                {!(Array.isArray(item?.submenu) && item?.submenu?.length) ? (
                  <Link
                    className="flex items-center justify-center gap-x-1"
                    href={item.href}
                    onClick={handleClose}
                  >
                    <item.icon className="size-5" />
                    <span className="text-xl font-black uppercase">{item.title}</span>
                  </Link>
                ) : (
                  <Popover>
                    <PopoverTrigger className="flex items-center justify-center gap-x-1">
                      <item.icon className="size-5" />
                      <span className="text-xl font-black uppercase">{item.title}</span>
                      {item?.submenu && item?.submenu?.length > 0 && (
                        <TriangleDown className="ml-2 size-3" />
                      )}
                    </PopoverTrigger>
                    {item?.submenu && item?.submenu?.length > 0 && (
                      <PopoverContent className="w-40 space-y-4 bg-[#1A1D46] py-2 text-white">
                        {item.submenu.map((subItem) => (
                          <Link
                            href={subItem.href}
                            key={subItem.title}
                            className="flex items-center gap-x-2"
                            onClick={handleClose}
                          >
                            <span className="text-lg font-bold">{subItem.title}</span>
                          </Link>
                        ))}
                      </PopoverContent>
                    )}
                  </Popover>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-x-28">
            <div onClick={handleClose}>
              <ConnectBtn />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
