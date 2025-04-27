"use-client";
import { forwardRef, ReactElement, Ref } from "react";
import {
  DialogTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
  Box,
  Container,
  Divider,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { CompetitionSubmissionForm } from "./competition-submission-form";
import { ICompetition } from "@/interfaces";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
    onAgree: () => void;
    onDisagree: () => void;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type CompetitionSubmissionDialogProps = {
  open: boolean;
  competition: ICompetition;
  dismissDialog: () => void;
};

export const CompetitionSubmissionDialog = ({
  open,
  competition,
  dismissDialog,
}: CompetitionSubmissionDialogProps) => {
  const renderHeader = () => (
    <Box
      sx={{
        mt: 2.5,
        gap: 0.5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component="span"
        sx={{
          flexGrow: 1,
          typography: "subtitle1",
        }}
      >
        Submit Your Work
      </Box>

      <Button
        color="warning"
        variant="outlined"
        size="small"
        onClick={dismissDialog}
      >
        X
      </Button>
    </Box>
  );

  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <Container sx={{ py: 2 }}> {renderHeader()}</Container>
      <Divider sx={{ mb: 3 }} />

      <DialogContent>
        <CompetitionSubmissionForm competition={competition} />
      </DialogContent>
    </Dialog>
  );
};

export default CompetitionSubmissionDialog;
