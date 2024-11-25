"use client";

import { useUser } from "@/contracts/contractUtils/useUser";
import Link from "next/link";
import React from "react";

const DashboardLink = ({ device }: { device: string }) => {
  const { user } = useUser();

  if (user) {
    return (
      <div>
        <Link
          href="/dashboard"
          className={` ${device === "medium" && "text-2xl font-medium"} capitalize`}
        >
          dashboard
        </Link>
      </div>
    );
  }
};

export default DashboardLink;
