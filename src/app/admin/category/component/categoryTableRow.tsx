import React from "react";
import { Iconify } from "src/components/iconify";

import { ICategory } from "@/interfaces/category";
import { Box, Button, TableCell, TableRow } from "@mui/material";

export type ActionTypes = "create" | "update" | "delete";

// ----------------------------------------------------------------------

type Props = {
  index?: number;
  row: ICategory;
  onDeleteCategory: (item: ICategory, action: ActionTypes) => void;
  onEditCategory: (item: ICategory, action: ActionTypes) => void;
};

export const CategoryTableRow = ({
  row,
  onDeleteCategory,
  onEditCategory,
  index,
}: Props) => {
  return (
    <>
      <TableRow hover tabIndex={-1}>
        {index !== undefined && (
          <TableCell sx={{ whiteSpace: "nowrap" }}>{index + 1}</TableCell>
        )}
        <TableCell sx={{ whiteSpace: "nowrap" }}>{row.name}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{row.description}</TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:pen-bold" />}
              onClick={() => onEditCategory(row, "update")}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => onDeleteCategory(row, "delete")}
              sx={{ color: "error.main" }}
            >
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};
