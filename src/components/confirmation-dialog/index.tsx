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
  CircularProgress,
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
  createLoading?: boolean;
};

export const EnrollmentConfirmationDialog = ({
  onAgree,
  onDisagree,
  open,
  createLoading,
}: EnrollmentConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      onClose={onDisagree}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Do you want to join the competition?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {/* <Typography variant="body2" color="text.primary" component="span">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima
            cupiditate beatae animi odit consequuntur qui voluptatum iusto earum
            culpa.
          </Typography> */}

          <FormControlLabel
            disabled
            label={
              <Typography variant="body2" color="text.primary" component="span">
                I agree to the{" "}
                <Link
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms and conditions
                </Link>
              </Typography>
            }
            control={
              <Checkbox
                size="medium"
                defaultChecked
                indeterminate
                color="error"
                inputProps={{ id: "color-disabled-indeterminate-checkbox" }}
              />
            }
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {createLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Button onClick={onDisagree}>Disagree</Button>
            <Button onClick={onAgree}>Agree</Button>{" "}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EnrollmentConfirmationDialog;
