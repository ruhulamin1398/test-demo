"use client";
import CustomPagination from "@/components/atoms/CustomPagination";
import NoData from "@/components/atoms/NoData";
import GenericTable, { Column } from "@/components/organisms/GenericTable";
// import UsersTable from "@/components/organisms/UsersTable";
import {
  GET_USERS_QUERY,
  GetUsersQueryResponse,
  GetUsersQueryVariables,
} from "@/graphql-client/user";
import { IUser } from "@/interfaces";
import { useQuery } from "@apollo/client";
import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [filter, _setFilter] = useState<GetUsersQueryVariables["filter"]>({
    isActive: true, // For example, fetch only active users
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const { data, loading, error } = useQuery<
    GetUsersQueryResponse,
    GetUsersQueryVariables
  >(GET_USERS_QUERY, {
    variables: {
      page: { ...pagination }, // Pagination settings
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

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPagination(({ limit }) => ({ limit, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination(({ page }) => ({
      page,
      limit: parseInt(event.target.value, 10),
    }));
  };

  return (
    <div>
      <Box>
        <TableContainer
          component={Paper}
          sx={{
            position: "relative",
            height: "calc(100vh - 200px)",
            maxHeight: 630,
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Table stickyHeader size={"medium"} sx={{ minWidth: 960 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.getUsers.users.map((item) => (
                <TableRow hover tabIndex={-1} key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell align="right">{item.role}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
              {data?.getUsers.users.length === 0 || loading ? (
                <TableRow>
                  <TableCell sx={{ minHeight: 400 }} colSpan={4}>
                    {data?.getUsers.users.length === 0 ? <NoData /> : null}
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
            <TableFooter
              sx={{ position: "sticky", bottom: 0, backgroundColor: "white" }}
            >
              <TableRow>
                <CustomPagination
                  page={pagination.page}
                  rowsPerPage={pagination.limit}
                  count={data?.getUsers.totalCount || 0}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  showFirstButton
                  showLastButton
                />
              </TableRow>
            </TableFooter>
          </Table>
          <Backdrop
            sx={(theme) => ({
              color: "#fff",
              zIndex: theme.zIndex.drawer + 1,
              top: 57,
              bottom: 52,
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            })}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </TableContainer>
      </Box>
    </div>
  );
};

export default UserList;
