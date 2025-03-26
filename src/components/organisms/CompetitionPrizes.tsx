import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  TableFooter,
} from "@mui/material";
import { DeleteForeverOutlined, EditNoteOutlined } from "@mui/icons-material";
import { ICompetition, IPrizesAndRewards } from "@/interfaces";
import {
  CompetitionUiModeEnum,
  setUiControlsPrizes,
} from "@/store/slices/competitionSlice";
import { CustomModal } from "./CustomDialog";
import CustomPagination from "../atoms/CustomPagination";
import NoData from "../atoms/NoData";

const CompetitionPrizess: React.FC = () => {
  const competition = useSelector(
    (state: RootState) => state.competition.competition as ICompetition
  );
  const dispatch = useDispatch();

  const handleEnablingEditMode = (item: IPrizesAndRewards) => {
    dispatch(
      setUiControlsPrizes({
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

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Total Awards</TableCell>
              <TableCell align="right">Rewards</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {competition.prizes.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell align="right">{item.position}</TableCell>
                <TableCell align="right">{item.totalAwardws}</TableCell>
                <TableCell align="right">{item.rewards}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" gap={1} justifyContent={"flex-end"}>
                    <Button
                      onClick={() => handleEnablingEditMode(item)}
                      aria-label="settings"
                      size="small"
                      startIcon={<EditNoteOutlined />}
                      variant="contained"
                    >
                      Edit
                    </Button>
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
            {competition.prizes.length === 0 ? (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={5}>
                  <NoData />
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompetitionPrizess;
// Account:gl56315810 Password:dahk3anb5t
// Account:fb21468211 Password:xxnphmhd5y
