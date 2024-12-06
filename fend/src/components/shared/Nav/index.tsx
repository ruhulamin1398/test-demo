"use client";

import { useCreatePurchaseMutation } from "@/redux/api/all-api/lottery";
import React, { useEffect } from "react";
import { LargeDeviceNav } from "./LargeDeviceNav";
import { MobileNav } from "./MobileNav";
import { InterFont } from "@/fonts";
import { toast } from "react-toastify";

interface Props extends React.ComponentProps<"nav"> { }

export const Nav = ({ ...props }: Props) => {

  const [createPurchase] = useCreatePurchaseMutation();


  useEffect(() => {

    const SendToDb = async () => {

      const dbData = localStorage.getItem("dbData");
      if(dbData){

        const response = await createPurchase(JSON.parse(dbData)).unwrap();
        
        if (response.message === "Ticket purchased successfully") {
          
          localStorage.removeItem("purchaseStatus");
          localStorage.removeItem("dbData");
          
          
          // toast.success("Ticket purchased successfully");
          
          
        } else {
          // toast.error("An error occurred during the purchase.");
        }
      }
    }
    const status = localStorage.getItem("dbData");

    if (status !== null) {
      SendToDb();
    }



  }, [])



  return (
    <nav
      {...props}
      className={`sticky top-0 z-50 w-full border-b border-gray-400/50 bg-[#1A1D46] px-10 py-4 font-semibold text-white lg:text-sm ${InterFont.className}`}
    >
      <MobileNav className="text-white lg:hidden" />
      <LargeDeviceNav className="hidden lg:flex" />
    </nav>
  );
};
