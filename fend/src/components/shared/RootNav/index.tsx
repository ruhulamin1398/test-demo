import React, { useEffect } from "react";
import { LargeRootNav } from "./LargeRootNav";
import { MobileRootNav } from "./MobileRootNav";
import { useCreatePurchaseMutation } from "@/redux/api/all-api/lottery";
interface Props extends React.ComponentProps<"div"> {}

export const RootNav = ({ ...props }: Props) => {

  const [createPurchase] = useCreatePurchaseMutation();

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
    <nav {...props} className="border-b border-gray-400/50 bg-[#1A1D46] px-10 py-3 text-white">
      <MobileRootNav className="lg:hidden" routs={routs} />
      <LargeRootNav className="hidden lg:flex" routs={routs} />
    </nav>
  );
};
