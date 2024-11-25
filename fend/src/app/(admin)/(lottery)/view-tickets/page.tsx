"use client";

import { useAccount } from "wagmi";
import { LotteryTable } from "./LotteryTable";
import React, { useState } from "react";
import PaginationComponent from "./PaginationComponent";
import { useGetSingleUserLotteryDetailsQuery } from "@/redux/api/all-api/lottery";

const ViewTickets = () => {
  const { address } = useAccount();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const { data, isLoading } = useGetSingleUserLotteryDetailsQuery({ address, page, limit });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };


  if (isLoading) {
    return <div className="flex justify-center items-center h-40">Loading...</div>;
  }


  return (
    <section>
      <h1 className="mb-1 mt-0 text-xl font-black">View Tickets</h1>
      <LotteryTable data={data} />

      {
        data?.purchases?.length > 0 &&
        <PaginationComponent
          currentPage={page}
          totalPages={data?.meta?.totalPages}
          onPageChange={handlePageChange}
          limit={limit}
          onLimitChange={handleLimitChange}
        />
      }
    </section>
  );
};

export default ViewTickets;
