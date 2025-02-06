"use client";
import { SrbijaFont } from "@/fonts";
import { LevelTable } from "./LevelTable";
import React from "react";
import { useGetSingleUserDetailsQuery } from "@/redux/api/all-api/users";
import { useAccount } from "wagmi";
import { useReferralData } from "@/contracts/contractUtils/useReferralData";
import { useUser } from "@/contracts/contractUtils/useUser";
import { blockChainConfig } from "@/contracts/const";

const Generation = () => {
  const { address } = useAccount();
  const { referralInfo, isError } = useReferralData();
  const { data, isLoading } = useGetSingleUserDetailsQuery({ address });

  const { user, ownerTaxAmount } = useUser();

  if (isLoading) return;

  return (
    <div>
      <h1 className="my-6 text-xl font-normal">Generation</h1>
      <div className="min-h-36 rounded-md bg-[#1a1d46] px-4 pt-5">
        <div className="mt-4 grid grid-cols-3 items-center justify-start gap-x-5 bg-[#1a1d46] text-start">
          <p
            className={`flex flex-col items-center text-center font-normal leading-8 sm:text-sm lg:text-lg xl:text-xl ${SrbijaFont.className} `}
          >
            <span>All User</span> <span>{data?.totalUsers ? data?.totalUsers : 0}</span>
          </p>
          <p
            className={`flex flex-col items-center text-center font-normal leading-8 sm:text-sm md:text-base lg:text-lg xl:text-xl ${SrbijaFont.className} `}
          >
            <span>Total Ticket</span> <span>{user?.refTickets}</span>
          </p>
          <p
            className={`flex flex-col items-center font-normal leading-8 sm:text-sm md:text-base lg:text-lg xl:text-xl ${SrbijaFont.className} `}
          >
            <span className="sm:hidden"> All Com.</span>
            <span className="hidden sm:inline"> All Commission</span>
            <span> ${user?.availeableRefTax.toFixed(2)} </span>
          </p>
        </div>
      </div>

      <LevelTable levelDetails={data?.levelDetails} />
    </div>
  );
};

export default Generation;
