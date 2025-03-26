"use client";
import GenericTable, { Column } from "@/components/organisms/GenericTable";
// import UsersTable from "@/components/organisms/UsersTable";
import {
  GET_USERS_QUERY,
  GetUsersQueryResponse,
  GetUsersQueryVariables,
} from "@/graphql-client/user";
import { IUser } from "@/interfaces";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [filter, _setFilter] = useState<GetUsersQueryVariables["filter"]>({
    isActive: true, // For example, fetch only active users
  });

  const { data, loading, error } = useQuery<
    GetUsersQueryResponse,
    GetUsersQueryVariables
  >(GET_USERS_QUERY, {
    variables: {
      page: { limit: 10, page: 1 }, // Pagination settings
      filter, // Optional filter
    },
  });
  useEffect(() => {
    if (!loading && data) {
      console.log(data);
    }
    if (error) {
      console.log("FETCH _ERROR", error);
    }
  }, [data, loading, error]);

  const columns: Column<IUser>[] = [
    {
      id: "name" as keyof IUser,
      label: "Name",
      filterInput: { type: "text" },
    },
    {
      id: "email" as keyof IUser,
      label: "Email",
      filterInput: { type: "text" },
    },
    {
      id: "role" as keyof IUser,
      label: "Role",
      filterInput: {
        type: "select",
      },
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
        { label: "Modarator", value: "modarator" },
      ],
    },
  ];

  return (
    <div>
      <Box>
        <GenericTable
          onFilterChange={(v: unknown) => {
            console.log("FILTER VALUE CHANGED", v);
          }}
          columns={columns}
          data={data?.getUsers.users || []}
        />
      </Box>
      {/* <UsersTable loading={loading} data={data?.getUsers.users || []} />
      <Box py={2}>
        <Pagination count={data?.getUsers.totalCount} />
      </Box> */}
    </div>
  );
};

export default Dashboard;
