"use client";
import MuiPagination, { PaginationProps } from "@mui/material/Pagination";
import TablePagination, {
  TablePaginationProps,
} from "@mui/material/TablePagination";

function Pagination({
  page,
  onPageChange,
  className,
  count,
  showFirstButton,
  showLastButton,
}: Pick<
  TablePaginationProps,
  | "page"
  | "onPageChange"
  | "className"
  | "count"
  | "showFirstButton"
  | "showLastButton"
>) {
  return (
    <MuiPagination
      color="primary"
      className={className}
      count={count}
      page={page}
      onChange={(event, newPage) => {
        alert(newPage);
        onPageChange(event as React.MouseEvent<HTMLButtonElement>, newPage);
      }}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
    />
  );
}

export const CustomPagination: React.FC<
  TablePaginationProps & { paginationProps?: PaginationProps }
> = (props) => {
  const { paginationProps, ...tablePaginationProps } = props;
  return (
    <TablePagination
      ActionsComponent={(actionProps) => {
        return (
          <Pagination
            {...actionProps}
            count={Math.ceil(
              actionProps.count / tablePaginationProps.rowsPerPage
            )}
            {...paginationProps}
            page={tablePaginationProps.page}
          />
        );
      }}
      {...tablePaginationProps}
      page={tablePaginationProps.page - 1}
    />
  );
};

export default CustomPagination;
