"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from "wagmi";
import { solidityPackedKeccak256 } from "ethers";
import { toast } from "react-toastify";

import { DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import BallLists from "@/components/shared/BallLists";
import { Lottery } from "@/types";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { blockChainConfig } from "@/contracts/const";
import { useGetSingleUserDetailsQuery } from "@/redux/api/all-api/users";
import { useCreatePurchaseMutation } from "@/redux/api/all-api/lottery";
import { parseGwei } from "viem";

type TaxType = {
  lotteryType: string;
  lottery: number[];
};

interface Props extends React.ComponentProps<"div"> {
  setIsNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  handleTicket: () => void;
  showNum: number | "";
  totalTickets: number[][];
  deleteTickets: (index: number) => void;
  setTotalTickets: (tickets: number[][]) => void;
  lottery: Lottery;
  tax: TaxType[];
}

export const TicketSummary = ({
  setIsNextStep,
  totalTickets,
  deleteTickets,
  setTotalTickets,
  lottery,
  tax,
  ...props
}: Props) => {
  const dialogRef = useRef<HTMLButtonElement | null>(null);
  const [runningPurhase,setRunningPurchase] = useState<Boolean>(false)


  const ticketPrice = lottery.price;
  const ticketHashes: string[] = [];
  const stringArrayOfTickets: string[] = [];

  const axiosSecure = useAxiosSecure();
  const account = useAccount();

  const [createPurchase, { isLoading: purchaseLoading }] = useCreatePurchaseMutation();

  const { data, isLoading } = useGetSingleUserDetailsQuery({ address: account.address });

  const {
    data: usdtApprovalHash,
    writeContract: approveUSDT,
    error: usdtApprovalErr,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: usdtApprovalHash,
  });

  const {
    data: ticketPurchaseHash,
    writeContract: buyTicket,
    error: buyTicketsErr,
  } = useWriteContract();
  const { isLoading: isPurchasing, isSuccess: isPurchased } = useWaitForTransactionReceipt({
    hash: ticketPurchaseHash,
  });

  totalTickets.forEach((ticket) => {
    const formattedTicket: string = ticket.map((num) => num.toString().padStart(2, "0")).join("");

    stringArrayOfTickets.push(formattedTicket);

    const ticketBytes = solidityPackedKeccak256(
      ["uint", "uint", "uint", "uint", "uint", "uint"],
      ticket,
    );

    ticketHashes.push(ticketBytes);
  });





  const completePurchase = async (type: number) => {
    // console.log(" stringArrayOfTickets", stringArrayOfTickets);
    if (type == 1 || isConfirmed) {
      if (isConfirmed) {
        


        try {
          buyTicket({
            abi: blockChainConfig.lotteryABI,
            address: blockChainConfig.contractAddress as `0x${string}`,
            functionName: "purchaseTicket",
            args: [
              lottery.lotteryId,
              totalTickets.length,
              data?.originalUser?.referredBy?.address,
              stringArrayOfTickets,
              0,
            ],
          });
        } catch (err) {
          toast.dismiss(); 
          toast.error("Purchase failed", {
            position: "top-left",theme: "colored"
          });
 
        }
      } 
      
    }
  };

  const SendToDb = async () => {
    // console.log("called                       .......................... db");
    const dbData = {
      _id: lottery._id,
      buyer: account.address,
      amount: totalTickets.length,
      referral: data?.originalUser?.referredBy?.address,
      price: lottery.price,
      lotteryType: lottery.lotteryType.toLowerCase(),
      tax,
    };

    const response = await createPurchase(dbData).unwrap();

    if (response.message === "Ticket purchased successfully") {
      setRunningPurchase(false);

      localStorage.removeItem("purchaseStatus");
      localStorage.removeItem("dbData");

      toast.dismiss();
      toast.success("Ticket purchased successfully", {
        position: "top-left",theme: "colored"
      });
      setIsNextStep(false);
      // console.log("ticket send to DB successfull");
      dialogRef.current?.click();
      totalTickets = [];
      setTotalTickets([]);

    }else{

      toast.dismiss();
      // toast.success("Ticket purchased successfully", {
      //   position: "top-left",theme: "colored"
      // });
    } 
  };

  useEffect(() => {
    if (ticketPurchaseHash && isPurchased) {

      localStorage.setItem("purchaseStatus" , "1");
   
      const dbData = {
        _id: lottery._id,
        buyer: account.address,
        amount: totalTickets.length,
        referral: '0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59',
        price: lottery.price,
        lotteryType: lottery.lotteryType.toLowerCase(),
        tax,
      };
  
      localStorage.setItem("purchaseStatus" , "1");
      localStorage.setItem("dbData" , JSON.stringify(dbData));

 
      SendToDb();
    }
  }, [isPurchased]);


  useEffect(()=>{
    if(buyTicketsErr){
      toast.dismiss();
     
      toast.error("Purchase failed", {
        position: "top-left",theme: "colored"
      });
    }

  },[buyTicketsErr])

  const purchaseTicket = (type: number) => {
    toast.loading(" Please wait ...", {
      position: "top-left",theme: "colored"
    })
 
    if (account.address && account.isConnected) {
      const amount = Number(lottery.price) * 1000000 * totalTickets.length;
      try {
        approveUSDT({
          abi: blockChainConfig.erc20ABI,
          address: blockChainConfig.USDTaddress as `0x${string}`,
          functionName: "approve",
          args: [blockChainConfig.contractAddress as `0x${string}`, amount],
          gas: 2172500n, 
        });
      } catch (err) {
        toast.dismiss();
        toast.error("failed to approve USDT", {
          position: "top-left",theme: "colored"
        });
        console.log("error", err);
      }
    }
  };

  useEffect(() => {
    if (usdtApprovalHash && !ticketPurchaseHash && isConfirmed) {
      completePurchase(0);
    }
  }, [isConfirmed]);
  useEffect(()=>{
    if(usdtApprovalErr){
      toast.dismiss();
      toast.error("failed to approve USDT", {
        position: "top-left",theme: "colored"
      }); 
    }

  },[usdtApprovalErr])

  // console.log("usdtApprovalHash: ", usdtApprovalHash, "error: ", usdtApprovalErr)
  // console.log("LotteverseHash: ", ticketPurchaseHash, "error: ", buyTicketsErr)

  if (isLoading) return;

  return (
    <div {...props}>
      <div className="mt-4 flex items-center justify-center">
        <DialogTrigger className="btn-gradient-purple">Ticket Summary </DialogTrigger>
      </div>

      <DialogContent className="main-bg-gradient h-screen border-gray-300/50 px-0 pt-8 md:h-[80vh]">
        <DialogTitle className="text-center">Ticket Summary</DialogTitle>
        <ChevronLeft
          className="absolute left-4 top-8 size-5 cursor-pointer"
          onClick={() => setIsNextStep(false)}
        />

        <div className="flex h-full flex-col justify-between">
          <div className="mt-4 h-full flex-1 justify-end">
            <div className="mx-auto flex w-full -translate-x-1 items-center justify-center gap-x-2 rounded-lg px-4 py-4 shadow-md md:px-8">
              <BallLists
                totalTickets={totalTickets}
                deleteTickets={deleteTickets}
                ballClassName="bg-[#7239EA]"
              />
            </div>
          </div>

          <div className="font-black">
            <div className="px-4">
              <p className="text-xl">Checkout </p>
              <div className="flex items-center justify-between">
                <p className="text-[#67696F]">Ticket</p>
                <p>{totalTickets?.length}X</p>
              </div>
              <hr className="my-2" />

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[#67696F]">Total Price</p>
                  <p>
                    {totalTickets?.length * ticketPrice} <span className="usdt">USDT</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center px-5">
              {/* <button className="btn-gradient-purple mt-3 font-black" onClick={() => completePurchase(1)}>Buy With Reward </button> */}
              <button
                disabled={purchaseLoading}
                onClick={() => purchaseTicket(0)}
                className="btn-gradient-purple mt-3 px-6 py-4 font-black"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
        <DialogClose ref={dialogRef} className="hidden">
          Close
        </DialogClose>
      </DialogContent>
    </div>
  );
};
