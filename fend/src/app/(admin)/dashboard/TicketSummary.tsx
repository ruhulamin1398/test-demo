"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, Trash2, User } from "lucide-react";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction, readContract } from '@wagmi/core'
import { wagmiConfig } from "@/config";
import { solidityPackedKeccak256 } from "ethers";
import { toast } from "react-toastify";
import { ethers } from 'ethers';

import { DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import BallLists from "@/components/shared/BallLists";
import { Lottery } from "@/types";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { blockChainConfig } from "@/contracts/const";
import { useGetSingleUserDetailsQuery } from "@/redux/api/all-api/users";
import { useCreatePurchaseMutation } from "@/redux/api/all-api/lottery";
import { BigNumber } from "ethers";
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
  const [runningPurhase, setRunningPurchase] = useState<Boolean>(false)


  const ticketPrice = lottery.price;
  const ticketHashes: string[] = [];
  const stringArrayOfTickets: string[] = [];

  const axiosSecure = useAxiosSecure();
  const account = useAccount();

  const [createPurchase, { isLoading: purchaseLoading }] = useCreatePurchaseMutation();

  const { data, isLoading } = useGetSingleUserDetailsQuery({ address: account.address });

  totalTickets.forEach((ticket) => {
    const formattedTicket: string = ticket.map((num) => num.toString().padStart(2, "0")).join("");

    stringArrayOfTickets.push(formattedTicket);

    const ticketBytes = solidityPackedKeccak256(
      ["uint", "uint", "uint", "uint", "uint", "uint"],
      ticket,
    );

    ticketHashes.push(ticketBytes);
  });




  const SendToDb = async () => {



    toast.dismiss();
    toast.success("Ticket purchased successfully", {
      position: "top-left", theme: "colored"
    });
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




      setIsNextStep(false);
      // console.log("ticket send to DB successfull");
      dialogRef.current?.click();
      totalTickets = [];
      setTotalTickets([]);


      window.location.reload();

    } else {

      // toast.dismiss();
      // toast.success("Ticket purchased successfully", {
      //   position: "top-left",theme: "colored"
      // });
    }
  };






  const waitForApprovalCustom = async (txHash: string) => {
    let receipt = null;
    while (!receipt) {

      const provider = new ethers.JsonRpcProvider(blockChainConfig.ProviderUrl);
      receipt = await provider.getTransactionReceipt(txHash);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
    }
    return receipt;
  };



  const purchaseTicket = async (type: number) => {


    if (account?.address && account?.isConnected) {




      try {
        // Step 1: Approve USDT 
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Step 2: Calculate the amount to approve
        const amount = Number(lottery.price) * 1000000 * totalTickets.length;

        // Step 3: Check Allowance
        const usdtContract = new ethers.Contract(
          blockChainConfig.USDTaddress,
          blockChainConfig.erc20ABI,
          signer
        );

        const allowedAmount = await usdtContract.allowance(
          account.address,
          blockChainConfig.contractAddress
        );

        if (allowedAmount < amount) {

          // Approve the contract to spend USDT
          const approveTx = await usdtContract.approve(
            blockChainConfig.contractAddress,
            amount
          );
          toast.loading("Aproving ... ")

          // Wait for approval to be mined
          const approveReceipt = await approveTx.wait();
          toast.warn("approve  wait")
          if (!approveReceipt.status) {
            toast.dismiss()
            toast.error("Approval transaction failed.");
          }
          else {
            toast.dismiss();
            toast.success(" Approve successFull ")
          }

        }

toast.warn("approve successull ..................... ")
        // Step 4: Purchase Tickets
        const lotteryContract = new ethers.Contract(
          blockChainConfig.contractAddress,
          blockChainConfig.lotteryABI,
          signer
        );

        const purchaseTx = await lotteryContract.purchaseTicket(
          lottery.lotteryId,
          totalTickets.length,
          data?.originalUser?.referredBy?.address || "0x0000000000000000000000000000000000000000",
          stringArrayOfTickets,
          0,
        );
        toast.loading(" Purchasing ... ");

        const purchaseReceipt = await purchaseTx.wait();
        if (!purchaseReceipt.status) {
          toast.error(" Purchase failed .")
        } else {

          await SendToDb();
        }

      } catch (err) {
        console.log("error is " , err)
        toast.dismiss();
        toast.error("Something went wrong.")
      }
    }



  };



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
              <p className="text-lg">Checkout </p>
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
