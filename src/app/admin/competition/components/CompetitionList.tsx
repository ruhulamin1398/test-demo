import { useDispatch } from "react-redux";

import Table from "@mui/material/Table";
import {
  Button,
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  TableFooter,
  Typography,
  Backdrop,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";

import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "@/components/table";

import { DeleteForeverOutlined } from "@mui/icons-material";
import { CompetitionStatusEnum, ICompetition } from "@/interfaces";
import {
  CompetitionUiModeEnum,
  setUiControlsBasicInfo,
} from "@/store/slices/competitionSlice";
import { CustomModal } from "@/components/organisms/CustomDialog";
import CustomPagination from "@/components/atoms/CustomPagination";
import { useQuery } from "@apollo/client";
import {
  GET_COMPETITIONS_QUERY,
  GetCompetitionsQueryResponse,
  GetCompetitionsQueryVariables,
} from "@/graphql-client/competition";
import { ChangeEvent, useEffect, useState } from "react";
import { formatDateToHumanReadableDate } from "@/utils/date";
import NoData from "@/components/atoms/NoData";
import Link from "next/link";
import { GET_USERS_QUERY } from "@/graphql-client/auth";

const CompetitionList: React.FC = () => {
  const table = useTable();

  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const { data, loading, error } = useQuery<
    GetCompetitionsQueryResponse,
    GetCompetitionsQueryVariables
  >(GET_USERS_QUERY, {
    variables: {
      page: { ...pagination }, // Pagination settings
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
  const dispatch = useDispatch();
  // Enable edit more for competition
  const handleEnablingEditMode = (item: ICompetition) => {
    dispatch(
      setUiControlsBasicInfo({
        mode: CompetitionUiModeEnum.UPDATE,
        recordToModify: item,
      })
    );
  };
  const handleDelete = async () => {
    const isConfirmed = await CustomModal({
      dialogProps: {
        title: "Confirmation",
        children: <p>Are you sure you want to proceed?</p>,
      },
      onConfirm: () => console.log("Confirmed!"),
      onCancel: () => console.log("Cancelled!"),
    });

    console.log("User response:", isConfirmed);
  };

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

  const handleChangeStatus = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isConfirmed = await CustomModal({
      dialogProps: {
        title: "Confirmation",
        children: (
          <Typography variant="body1">
            Are you sure, you want to change the status to{" "}
            <Typography component={"span"} color={"error.main"}>
              {event.target.value}
            </Typography>
            ?
          </Typography>
        ),
      },
      onConfirm: () => console.log("Confirmed!"),
      onCancel: () => console.log("Cancelled!"),
    });

    console.log("User response:", isConfirmed);
  };

  return (
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
        <Table
          stickyHeader
          size={table.dense ? "small" : "medium"}
          sx={{ minWidth: 960 }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getCompetitions.competitions.map((item) => (
              <TableRow hover tabIndex={-1} key={item.id}>
                <TableCell>
                  <Link href={`/admin/competition/details/${item.id}`}>
                    <Typography>{item.title}</Typography>
                  </Link>
                </TableCell>

                <TableCell>{item.description}</TableCell>
                <TableCell align="right">
                  {formatDateToHumanReadableDate(
                    item.competitionDeadline.startDate
                  )}
                </TableCell>
                <TableCell align="right">
                  {formatDateToHumanReadableDate(
                    item.competitionDeadline.endDate
                  )}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    fullWidth
                    select
                    value={item.status}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        border: 0,
                        padding: 0,
                        "& .MuiSelect-outlined": {
                          padding: 0,
                          paddingRight: 24,
                          textAlign: "left",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: 0,
                        paddingRight: "12px",
                      },
                    }}
                    color="success"
                    size="small"
                    onChange={handleChangeStatus}
                  >
                    {Object.values(CompetitionStatusEnum).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" gap={1} justifyContent={"flex-end"}>
                    <Button
                      onClick={() => handleDelete()}
                      aria-label="settings"
                      size="small"
                      startIcon={<DeleteForeverOutlined />}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {data?.getCompetitions.competitions.length === 0 || loading ? (
              <TableRow>
                <TableCell sx={{ minHeight: 400 }} colSpan={5}>
                  {data?.getCompetitions.competitions.length === 0 ? (
                    <NoData />
                  ) : null}
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
                count={data?.getCompetitions.totalCount || 0}
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
  );
};

export default CompetitionList;
