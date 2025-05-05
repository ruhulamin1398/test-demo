import React from "react";
import { Iconify } from "src/components/iconify";

import { IRound } from "@/interfaces/round";
import { Box, Button, TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";

export type ActionTypes = "create" | "update" | "delete";

// ----------------------------------------------------------------------

type Props = {
  index?: number;
  row: IRound;
  onDeleteRound: (item: IRound, action: ActionTypes) => void;
  onEditRound: (item: IRound, action: ActionTypes) => void;
};

export const RoundsTableRow = ({
  row,
  onDeleteRound,
  onEditRound,
  index,
}: Props) => {
  return (
    <>
      <TableRow hover tabIndex={-1}>
        {index !== undefined && (
          <TableCell sx={{ whiteSpace: "nowrap" }}>{index + 1}</TableCell>
        )}
        <TableCell sx={{ whiteSpace: "nowrap" }}>{row.title}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {dayjs(row.startDate).format("D M YY")}
        </TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {dayjs(row.endDate).format("D M YY")}
        </TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {row.judgementCriteria}
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:pen-bold" />}
              onClick={() => onEditRound(row, "update")}
              size="small"
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => onDeleteRound(row, "delete")}
              sx={{ color: "error.main" }}
              size="small"
            >
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RoundsTableRow;
