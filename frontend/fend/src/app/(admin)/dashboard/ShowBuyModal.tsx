"use client";

import React, { useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import { BuyTicket } from "./BuyTicket";
import { TicketSummary } from "./TicketSummary";
import { Lottery } from "@/types";
import { useUser } from "@/contracts/contractUtils/useUser";
import { toast } from "react-toastify";

interface props {
  lottery: Lottery;
  activeLottery: number;
}

type TaxType = {
  lotteryType: string;
  lottery: number[];
};

export const ShowBuyModal = ({ lottery, activeLottery }: props) => {
  const [isNextStep, setIsNextStep] = useState(false);

  const [totalTickets, setTotalTickets] = useState<number[][]>([]);
  const [showNum, setShowNum] = useState<number | "">("");
  const { user } = useUser();

  const [tax, setTax] = useState<TaxType[]>([]);

  const handleTicket = () => {
    // console.log("usdt ", user?.usdT);
    // console.log("lottery ", lottery.price);
    // console.log("totalTickets ", totalTickets.length);
    if (user?.usdT < lottery.price * (totalTickets.length + 1)) {
      toast.error(" Opps!! you don not enough usdt");
      return;
    }
    const ticketsNumber: number[] = [];
    const isUnique = new Map();

    for (let i = 0; i < 6; i++) {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * 99 + 1);
      } while (isUnique.has(randomNum));
      isUnique.set(randomNum, true);
      ticketsNumber.push(randomNum);
    }

    if (ticketsNumber.length > 0) {
      const lastTicketNumber = ticketsNumber.at(-1) ?? "";
      setShowNum(lastTicketNumber);
    }

    setTotalTickets((prevTickets) => [...prevTickets, ticketsNumber]);

    // Add a new entry to the tax array
    const lotteryType = lottery.lotteryType.toLowerCase();
    setTax((prevTax) => [
      ...prevTax,
      {
        lotteryType,
        lottery: ticketsNumber,
      },
    ]);
  };

  // const handleTicket = () => {
  //   const ticketsNumber: number[] = [];
  //   const isUnique = new Map();

  //   for (let i = 0; i < 6; i++) {
  //     let randomNum;
  //     do {
  //       randomNum = Math.floor(Math.random() * 99 + 1);
  //     } while (isUnique.has(randomNum));
  //     isUnique.set(randomNum, true);
  //     ticketsNumber.push(randomNum);
  //   }

  //   if (ticketsNumber.length > 0) {
  //     const lastTicketNumber = ticketsNumber.at(-1) ?? "";
  //     setShowNum(lastTicketNumber);
  //   }

  //   setTotalTickets((prevTickets) => [...prevTickets, ticketsNumber]);
  //   console.log(ticketsNumber)
  // };

  const deleteTickets = (index: number) => {
    setTotalTickets((prevTickets) => {
      const updatedTickets = prevTickets.filter((_, i) => i !== index);
      setTax((prevTax) => {
        const updatedTax = prevTax.filter((_, i) => i !== index);
        return updatedTax;
      });

      if (updatedTickets.length > 0) {
        // setShowNum(updatedTickets.at(-1).at(-1));

        setShowNum(updatedTickets.at(-1)?.at(-1) ?? "");
      } else {
        setShowNum("");
      }
      return updatedTickets;
    });
  };

  return (
    <Dialog>
      {!isNextStep ? (
        <BuyTicket
          setIsNextStep={setIsNextStep}
          handleTicket={handleTicket}
          showNum={showNum}
          lottery={lottery}
          totalTickets={totalTickets}
          deleteTickets={deleteTickets}
          activeLottery={activeLottery}
        />
      ) : (
        <TicketSummary
          setIsNextStep={setIsNextStep}
          handleTicket={handleTicket}
          showNum={showNum}
          lottery={lottery}
          totalTickets={totalTickets}
          deleteTickets={deleteTickets}
          setTotalTickets={setTotalTickets}
          tax={tax}
        />
      )}
    </Dialog>
  );
};
