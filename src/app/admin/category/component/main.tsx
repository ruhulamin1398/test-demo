"use client";
import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableContainer } from "@mui/material";
import {
  TableEmptyRows,
  TableHeadCellProps,
  TableHeadCustom,
  TableNoData,
} from "@/components/table";
import { ICategory } from "@/interfaces/category";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
} from "@/graphql-client/category";
import { ConfirmDialog } from "@/components/custom-dialog";
import { ActionTypes, CategoryTableRow } from "./categoryTableRow";
import PageContainer from "./container";
import CategoryForm from "./categoryForm";

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "action-buttons", label: "Actions", width: 88 },
];

type Props = {};

const MainContent = (props: Props) => {
  const [
    createCategory,
    { data: createdData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_CATEGORY);
  const [
    updateCategory,
    { data: updatedData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_CATEGORY);
  const [
    deleteCategory,
    { data: deletedData, loading: deleteLoading, error: deleteError },
  ] = useMutation(UPDATE_CATEGORY);
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedRow, setSelectedRow] = useState<{
    data?: ICategory;
    action: ActionTypes;
  }>();
  useEffect(() => {
    if (data && !loading && !error) {
      setCategories(data.categories);
    }
  }, [data, loading, error]);

  const handleActions = (
    category: ICategory | undefined,
    action: ActionTypes
  ) => {
    setSelectedRow({ data: category, action });
  };

  const handleResetActions = () => {
    setSelectedRow(undefined);
  };

  const handConfirmDelete = () => {
    if (selectedRow?.data) {
      // Call the delete mutation here
      // After successful deletion, update the categories state
      setCategories((prev) =>
        prev.filter((category) => category.id !== selectedRow.data?.id)
      );
      handleResetActions();
    }
  };

  return (
    <PageContainer onCreateCategory={handleActions}>
      <TableContainer component={Paper} elevation={1}>
        <Table size={"small"} sx={{ minWidth: 960 }}>
          <TableHeadCustom headCells={TABLE_HEAD} />

          <TableBody>
            {categories.map((row, i) => (
              <CategoryTableRow
                key={row.id}
                row={row}
                onDeleteCategory={() => handleActions(row, "delete")}
                onEditCategory={() => handleActions(row, "update")}
                index={i}
              />
            ))}
            {categories.length > 0 && (
              <TableEmptyRows
                height={56}
                emptyRows={categories.length < 10 ? 10 - categories.length : 0}
              />
            )}

            <TableNoData notFound={categories.length === 0} />
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={!!selectedRow?.data && selectedRow.action === "delete"}
        onClose={handleResetActions}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            disabled={!!deleteLoading}
            variant="contained"
            color="error"
            onClick={handConfirmDelete}
          >
            Delete
          </Button>
        }
      />
      <CategoryForm
        open={!!selectedRow?.data && selectedRow.action === "update"}
        onClose={handleResetActions}
        category={selectedRow?.data}
        onSubmit={(category) => {
          if (selectedRow?.action === "update") {
            updateCategory({
              variables: { id: selectedRow.data?.id, ...category },
            });
          } else {
            createCategory({ variables: { ...category } });
          }
          handleResetActions();
        }}
        loading={!!createLoading || !!updateLoading}
        error={!!createError || !!updateError}
        success={!!createdData || !!updatedData}
        successMessage={
          !!createdData
            ? "Category created successfully"
            : "Category updated successfully"
        }
        errorMessage={
          !!createError ? "Error creating category" : "Error updating category"
        }
      />
    </PageContainer>
  );
};

export default MainContent;
