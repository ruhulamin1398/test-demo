"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, Trash2, User } from "lucide-react";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction, getConnections, readContract } from '@wagmi/core'
import { wagmiConfig, wagmiConfig2 } from "@/config";
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
import WalletConnectProvider from "@walletconnect/web3-provider";
import { writeContracts } from "viem/experimental";

import { polygon } from "wagmi/chains";
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


      // window.location.reload();
      toast.dismiss();
      toast.success("Ticket purchased successfully", {
        position: "top-left", theme: "colored"
      });
    } else {

      toast.dismiss();
      toast.success("Ticket purchased successfully", {
        position: "top-left", theme: "colored"
      });
    }
  };



  const toBytes12 = (str: string): string => {
    const bytes = ethers.toUtf8Bytes(str); // Convert string to bytes
    if (bytes.length > 12) {
      throw new Error(`String "${str}" exceeds 12 bytes and cannot fit into bytes12.`);
    }
    const padded = ethers.concat([bytes, new Uint8Array(12 - bytes.length)]); // Right-pad with zeros
    return ethers.hexlify(padded); // Convert to hex string
  };

  const waitForApproval = async (txHash: string) => {
    let receipt = null;
    while (!receipt) {
      receipt = await blockChainConfig.provider.getTransactionReceipt(txHash);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
    }
    return receipt;
  };



  const purchaseTicket = async (type: number) => {


    if (account?.address && account?.isConnected) {
      const amount = Number(lottery.price) * 1000000 * totalTickets.length;




      try {
        // Step 1: Approve USDT


        const provider = new ethers.JsonRpcProvider(blockChainConfig.ProviderUrl);

        const usdtContract = new ethers.Contract(
          blockChainConfig.USDTaddress,
          blockChainConfig.erc20ABI,
          provider
        );

        const allowance = await usdtContract.allowance(account.address, blockChainConfig.contractAddress);
        console.log("Allowance:", allowance.toString()); // Log allowance


        if (allowance<amount) {
          console.log("Allowance is less than required amount. Proceeding with approval...");
          const approveTx = await writeContract(wagmiConfig, {
            abi: blockChainConfig.erc20ABI,
            address: blockChainConfig.USDTaddress as `0x${string}`,
            functionName: "approve",
            args: [blockChainConfig.contractAddress as `0x${string}`, amount]
          });

          console.log("Approval transaction hash:", approveTx); 
          toast.loading("Approval in progress...", {
            position: "top-right",
            theme: "colored",
          });

          const approveReceipt = await waitForApproval(approveTx);
          console.log("Approval receipt:", approveReceipt);

          if (!approveReceipt || !approveReceipt.status) {
            toast.dismiss();
            toast.error("Approval transaction failed or not confirmed.");
            return;
          } else {
            toast.dismiss();
            toast.success("Approval successful.");
          }
        }
        ///////////////////////////////////////

        // Step 2: Purchase Tickets
        const purchaseTx = await writeContract(wagmiConfig, {
          abi: blockChainConfig.lotteryABI,
          address: blockChainConfig.contractAddress as `0x${string}`,
          functionName: "purchaseTicket",
          args: [
            lottery.lotteryId,
            totalTickets.length,
            data?.originalUser?.referredBy?.address || "0x0000000000000000000000000000000000000000",
            stringArrayOfTickets,
            0,
          ]
        });


        toast.loading("Ticket purchase in progress...", {
          position: "top-right",
          theme: "colored",
        });

        // Wait for the ticket purchase transaction to be mined

        const purchaseReceipt = await waitForApproval(purchaseTx);




        if (!purchaseReceipt || !purchaseReceipt.status) {
          toast.dismiss();
          toast.error("Purchase failed. ");
          return;
        }
        else {
          toast.dismiss();
          await SendToDb();
        }

      } catch (error: any) {
        console.error("Error during approval or ticket purchase:", error);

        toast.error(
          `Transaction failed: ${error.message || "Unknown error occurred"}`,
          {
            position: "top-right",
            theme: "colored",
          }
        );
      }

    }


  }

   

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
