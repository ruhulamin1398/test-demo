import * as React from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { ICompetition, IRound, RoundJudgementCriteriaEnum } from "@/interfaces";
import {
  CompetitionUiModeEnum,
  setUiControlsRounds,
} from "@/store/slices/competitionSlice";
import { red } from "@mui/material/colors";
import {
  TableEmptyRows,
  TableHeadCellProps,
  TableHeadCustom,
  TableNoData,
} from "../table";
import RoundsTableRow from "@/app/admin/competition/details/[id]/RoundsTableRow";
import { useEffect, useState } from "react";
import { ConfirmDialog } from "../custom-dialog";
import { useMutation } from "@apollo/client";
import { DELETE_ROUND } from "@/graphql-client/competition-round";
import { toast } from "sonner";
import { handleGraphQLError } from "@/utils/errorHandling";

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: "sl", label: "#SL" },
  { id: "title", label: "Title" },
  { id: "startDate", label: "Start Date" },
  { id: "endDate", label: "endDate" },
  { id: "judgementCriteria", label: "Judge by" },
  { id: "action-buttons", label: "Actions", width: 88 },
];

const CompetitionRounds: React.FC = () => {
  const [deleteRound, { loading, data, error }] = useMutation(DELETE_ROUND);
  const [showDeleteConfirmationFor, setShowDeleteConfirmationFor] =
    useState<string>();
  const competition = useSelector(
    (state: RootState) => state.competition.competition as ICompetition
  );
  const dispatch = useDispatch();

  const handleEnablingEditMode = (item: IRound) => {
    dispatch(
      setUiControlsRounds({
        mode: CompetitionUiModeEnum.UPDATE,
        recordToModify: item,
      })
    );
  };

  const handleDeleteRound = (round: IRound) => {
    setShowDeleteConfirmationFor(round.id);
  };
  const handleDeleteRoundConfirmation = async () => {
    await deleteRound({
      variables: { id: showDeleteConfirmationFor },
    });
    toast.success("Delete success!");
    setShowDeleteConfirmationFor(undefined);
  };
  const handleDeleteRoundCancel = () => {
    setShowDeleteConfirmationFor(undefined);
  };

  useEffect(() => {
    if (!loading && data && data.deleteRound) {
      toast.success("Delete success!");
    }
    if (!loading && error) {
      toast.error(handleGraphQLError(error));
    }
  }, [data, error, loading]);

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 960 }}>
          <TableHeadCustom headCells={TABLE_HEAD} />
          <TableBody>
            {competition.rounds.map((row: IRound, i: number) => (
              <RoundsTableRow
                key={row.id}
                row={row}
                onDeleteRound={handleDeleteRound}
                onEditRound={handleEnablingEditMode}
                index={i}
              />
            ))}
            {competition.rounds.length > 0 && (
              <TableEmptyRows
                height={56}
                emptyRows={
                  competition.rounds.length < 7
                    ? 7 - competition.rounds.length
                    : 0
                }
              />
            )}

            <TableNoData notFound={competition.rounds.length === 0} />
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={showDeleteConfirmationFor !== undefined}
        onClose={handleDeleteRoundCancel}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            disabled={!!loading}
            variant="contained"
            color="error"
            onClick={handleDeleteRoundConfirmation}
          >
            Delete
          </Button>
        }
      />
    </Box>
  );
};

export default CompetitionRounds;
