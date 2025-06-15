"use client";

import type { TableHeadCellProps } from "src/components/table";

import { useState, useCallback, useEffect } from "react";
import { varAlpha } from "minimal-shared/utils";
import { useBoolean, useSetState } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";

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
import { IUser } from "@/interfaces";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
];

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: "name", label: "Name" },
  { id: "phoneNumber", label: "Phone number", width: 180 },
  { id: "company", label: "Company", width: 220 },
  { id: "role", label: "Role", width: 180 },
  { id: "status", label: "Status", width: 100 },
  { id: "", width: 88 },
];

// ----------------------------------------------------------------------

export function UserListView() {
  const table = useTable();
  const confirmDialog = useBoolean();
  const [tableData, setTableData] = useState<IUser[]>([]);
  const filters = useSetState<GetUsersQueryVariables["filter"]>({
    name: "",
    role: "",
    isActive: "all",
  });
  const { state: currentFilters, setState: updateFilters } = filters;
  const { data, loading, error } = useQuery<
    GetUsersQueryResponse,
    GetUsersQueryVariables
  >(GET_USERS_QUERY, {
    variables: {
      page: { page: table.page, limit: table.rowsPerPage }, // Pagination settings
      filter: { ...currentFilters }, // Optional filter
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

  const canReset =
    !!currentFilters.name ||
    currentFilters?.role?.length > 0 ||
    currentFilters?.isActive !== "all";

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
      table.onResetPage();
      updateFilters({
        isActive: newValue === "all" ? newValue : Boolean(newValue),
      });
    },
    [updateFilters, table]
  );

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
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.user.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New user
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={currentFilters.isActive || "all"}
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
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === "all" ||
                        tab.value === currentFilters.isActive) &&
                        "filled") ||
                      "soft"
                    }
                    color={
                      (tab.value === "active" && "success") ||
                      (tab.value === "pending" && "warning") ||
                      (tab.value === "banned" && "error") ||
                      "default"
                    }
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

          <UserTableToolbar filters={filters} onResetPage={table.onResetPage} />

          {canReset && (
            <UserTableFiltersResult
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

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      tableData.length
                    )}
                  />

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
