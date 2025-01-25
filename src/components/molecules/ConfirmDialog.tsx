import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface ConfirmDialogProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = forwardRef((props: ConfirmDialogProps, ref) => {
  const { onClose, onConfirm } = props;
  const [open, setOpen] = useState(false);

  // Expose open and close methods using `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true); // Show the dialog
    },
    closeDialog() {
      setOpen(false); // Close the dialog
    },
  }));

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to proceed?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default ConfirmDialog;
