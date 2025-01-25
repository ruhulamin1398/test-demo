import React from "react";
import { TableRow, TableCell, Skeleton } from "@mui/material";

interface SkeletonRowsProps {
  rows: number; // Number of skeleton rows to display
  columns: number; // Column names (fields)
  rowHeight: number; // Height of each row
}

const SkeletonLoadingOverlay: React.FC<SkeletonRowsProps> = ({
  rows,
  columns,
  rowHeight,
}) => {
  const skeletonRows = Array.from({ length: rows }).map((_, rowIndex) => (
    <TableRow key={`skeleton-row-${rowIndex}`}>
      {[...Array(columns)].map((_column, colIndex) => (
        <TableCell
          key={`skeleton-cell-${rowIndex}-${colIndex}`}
          style={{ padding: 0 }}
        >
          <Skeleton variant="rectangular" width="100%" height={rowHeight} />
        </TableCell>
      ))}
    </TableRow>
  ));

  return (
    <div
      style={{
        position: "absolute",
        top: 0, // Start from below the TableHead
        left: 0,
        right: 0,
        bottom: 0, // Stop just above the TableFooter
        zIndex: 1, // Ensure the overlay is above the table body
        display: "flex",
        flexDirection: "column",
        pointerEvents: "none", // Prevent interaction with the overlay
      }}
    >
      {skeletonRows}
    </div>
  );
};

export default SkeletonLoadingOverlay;
