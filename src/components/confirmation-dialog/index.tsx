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
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

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

export type EnrollmentConfirmationDialogProps = {
  onAgree: () => void;
  onDisagree: () => void;
  open: boolean;
};

export const EnrollmentConfirmationDialog = ({
  onAgree,
  onDisagree,
  open,
}: EnrollmentConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      onClose={onDisagree}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDisagree}>Disagree</Button>
        <Button onClick={onAgree}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnrollmentConfirmationDialog;
