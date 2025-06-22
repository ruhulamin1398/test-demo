"use client";

import type { TableHeadCellProps } from "src/components/table";

import { useState, useCallback, useEffect } from "react";
import { varAlpha } from "minimal-shared/utils";
import { useBoolean, useSetState } from "minimal-shared/hooks";

import { Box, Tab, Tabs, Card, Table, Button, TableBody } from "@mui/material";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

import { DashboardContent } from "src/layouts/dashboard";

import { Label } from "src/components/label";
import { toast } from "src/components/snackbar";
import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { ConfirmDialog } from "src/components/custom-dialog";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from "src/components/table";
import { UserTableToolbar } from "./UserTableToolbar";
import { UserTableFiltersResult } from "./UserTableFiltersResult";
import { UserTableRow } from "./UserTableRow";
import {
  GET_USERS_QUERY,
  GetUsersQueryResponse,
  GetUsersQueryVariables,
} from "@/graphql-client/user";
import { useQuery } from "@apollo/client";
import { IUser, RoleEnum } from "@/interfaces";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
];

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: "name", label: "Name" },
  { id: "phoneNumber", label: "Phone number", width: 180 },
  { id: "email", label: "Email", width: 220 },
  { id: "role", label: "Role", width: 180 },
  { id: "status", label: "Status", width: 100 },
  { id: "", width: 88 },
];

// ----------------------------------------------------------------------

export function UserListView() {
  const table = useTable();
  const confirmDialog = useBoolean();
  const [tableData, setTableData] = useState<IUser[]>([]);
  const [filters, setFilters] = useState<GetUsersQueryVariables["filter"]>({});
  const { data, loading, error } = useQuery<
    GetUsersQueryResponse,
    GetUsersQueryVariables
  >(GET_USERS_QUERY, {
    variables: {
      page: { page: table.page, limit: table.rowsPerPage }, // Pagination settings
      filter: { ...filters }, // Optional filter
    },
  });
  useEffect(() => {
    if (!loading && data) {
      setTableData(data?.getUsers.users || []);
    }
    if (error) {
      console.log("FETCH _ERROR", error);
    }
  }, [data, loading, error]);

  const canReset = Object.keys(filters).length > 0;

  const notFound =
    !loading && ((!tableData.length && canReset) || !tableData.length);

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success("Delete success!");

      setTableData(deleteRow);
    },
    [tableData]
  );

  const handleDeleteRows = () => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    );
    toast.success("Delete success!");

    setTableData(deleteRows);
  };

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      if (newValue === "all" && filters.isActive !== undefined) {
        const { isActive, ...restFilters } = filters;
        setFilters({
          ...restFilters,
        });
      } else {
        setFilters({
          isActive: Boolean(Number(newValue)),
        });
      }
      table.onResetPage();
    },
    [table]
  );

  const handleUpdateFilters = (
    newFilters: GetUsersQueryVariables["filter"]
  ) => {
    setFilters(() => ({
      ...newFilters,
    }));
  };

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {table.selected.length} </strong>{" "}
          items?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
            confirmDialog.onFalse();
          }}
        >
          Delete
        </Button>
      }
    />
  );
  console.log(filters);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "User", href: paths.dashboard.user.root },
            { name: "List" },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={
              filters.isActive === undefined
                ? "all"
                : filters.isActive
                ? "1"
                : "0"
            }
            onChange={handleFilterStatus}
            sx={[
              (theme) => ({
                px: 2.5,
                boxShadow: `inset 0 -2px 0 0 ${varAlpha(
                  theme.vars.palette.grey["500Channel"],
                  0.08
                )}`,
              }),
            ]}
          >
            <Tab
              iconPosition="end"
              value={"all"}
              label={"All"}
              icon={
                <Label variant={"filled"} color={"default"}>
                  {/* {["1", "0"].includes(tab.value.toString())
                      ? tableData.filter((user) => user.isActive === tab.value)
                          .length
                      : tableData.length} */}
                </Label>
              }
            />
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={"filled"}
                    color={tab.value === "1" ? "success" : "error"}
                  >
                    {/* {["1", "0"].includes(tab.value.toString())
                      ? tableData.filter((user) => user.isActive === tab.value)
                          .length
                      : tableData.length} */}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <UserTableToolbar
            handleUpdateFilters={handleUpdateFilters}
            filters={filters}
            onResetPage={table.onResetPage}
          />

          {canReset && (
            <UserTableFiltersResult
              updateFilters={handleUpdateFilters}
              filters={filters}
              totalResults={tableData.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: "relative" }}>
            <Scrollbar>
              <Table
                size={table.dense ? "small" : "medium"}
                sx={{ minWidth: 960 }}
              >
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                />
                <TableBody>
                  {tableData.map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      editHref={paths.dashboard.user.edit(row.id)}
                    />
                  ))}

                  {tableData.length > 0 && (
                    <TableEmptyRows
                      height={table.dense ? 52 : 72}
                      emptyRows={emptyRows(
                        table.page,
                        table.rowsPerPage,
                        tableData.length
                      )}
                    />
                  )}

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={tableData.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      {renderConfirmDialog()}
    </>
  );
}
