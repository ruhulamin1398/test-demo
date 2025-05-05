"use client";
import React, { use, useEffect, useState } from "react";
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
  DELETE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
} from "@/graphql-client/category";
import { ConfirmDialog } from "@/components/custom-dialog";
import { ActionTypes, CategoryTableRow } from "./categoryTableRow";
import PageContainer from "./container";
import CategoryForm, { CategorySchemaType } from "./categoryForm";
import { handleGraphQLError } from "@/utils/errorHandling";
import { toast } from "sonner";

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: "sl", label: "#SL" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "action-buttons", label: "Actions", width: 88 },
];

type Props = {};

const MainContent = (props: Props) => {
  const [createOrUpdateError, setCreateOrUpdateError] = useState<string>();
  const [
    createCategory,
    { data: createdData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true, // ensures query finishes before continuing
  });
  const [
    updateCategory,
    { data: updatedData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true, // ensures query finishes before continuing
  });
  const [
    deleteCategory,
    { data: deletedData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true, // ensures query finishes before continuing
  });
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedRow, setSelectedRow] = useState<{
    data?: ICategory;
    action: ActionTypes;
  }>();
  useEffect(() => {
    if (data?.categories && !loading && !error) {
      console.log(data, "data");
      setCategories([...data.categories]);
    }
  }, [data, loading, error]);

  const handleActions = (
    category: ICategory | undefined,
    action: ActionTypes
  ) => {
    console.log({ data: category, action }, "selectedRow;");
    setSelectedRow({ data: category, action });
  };

  const handleResetActions = () => {
    setSelectedRow(undefined);
  };

  const handConfirmDelete = async () => {
    if (selectedRow?.data) {
      await deleteCategory({
        variables: { id: selectedRow.data?.id },
      });
      toast.success("Delete success!");
      handleResetActions();
    }
  };

  const handleSaveCategory = async ({
    name,
    description,
  }: CategorySchemaType) => {
    if (selectedRow?.action === "update" && selectedRow?.data) {
      await updateCategory({
        variables: { input: { id: selectedRow.data?.id, name, description } },
      });
      toast.success("Category created!");
    } else {
      await createCategory({ variables: { input: { name, description } } });
      toast.success("Category updated!");
    }
    handleResetActions();
  };

  useEffect(() => {
    if (createError) {
      const message = handleGraphQLError(createError);
      setCreateOrUpdateError(message);
      console.log(message, createError, "createError");
    }
  }, [createdData, createError, createLoading]);

  useEffect(() => {
    if (updatedData) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === updatedData.updateCategory.id
            ? updatedData.updateCategory
            : category
        )
      );
    }
  }, [updatedData]);
  useEffect(() => {
    if (deletedData) {
      setCategories((prev) =>
        prev.filter((category) => category.id !== deletedData.deleteCategory.id)
      );
    }
  }, [deletedData]);

  return (
    <PageContainer onCreateCategory={handleActions}>
      <TableContainer component={Paper} elevation={1}>
        <Table sx={{ minWidth: 960 }}>
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
                emptyRows={categories.length < 7 ? 7 - categories.length : 0}
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
        open={
          selectedRow?.action
            ? ["create", "update"].includes(selectedRow?.action)
            : false
        }
        onClose={handleResetActions}
        currentCategory={selectedRow?.data}
        onSubmit={handleSaveCategory}
        loading={!!createLoading || !!updateLoading}
        error={createOrUpdateError}
      />
    </PageContainer>
  );
};

export default MainContent;
