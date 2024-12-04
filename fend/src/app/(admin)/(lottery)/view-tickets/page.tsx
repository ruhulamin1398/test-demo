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

  const { data, isLoading, error } = useGetSingleUserLotteryDetailsQuery({ address, page, limit });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data.</div>;
  }

  return (
    <section>
      <h1 className="mb-1 mt-0 text-md md:text-xl text-bold py-4" >View Tickets</h1>
      <LotteryTable data={data} />

      {/* Pagination component*/}
      {/* <PaginationComponent
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
        limit={limit}
        onLimitChange={handleLimitChange}
      /> */}
    </section>
  );
};

export default ViewTickets;