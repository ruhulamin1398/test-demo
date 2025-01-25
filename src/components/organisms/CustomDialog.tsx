"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface CustomModalOptions {
  dialogProps: {
    title?: string;
    children?: React.ReactNode; // The content of the dialog should be passed as children
    [key: string]: unknown; // To support additional Dialog props
  };
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * CustomModal Function
 * @param options - Options to customize the modal.
 * @returns A promise that resolves to true if confirmed, false if cancelled.
 */
export const CustomModal = (options: CustomModalOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = ReactDOM.createRoot(container);

    const ModalComponent: React.FC = () => {
      const [open, setOpen] = useState(true);

      const handleConfirm = () => {
        if (options.onConfirm) options.onConfirm();
        setOpen(false);
        resolve(true);
        cleanup();
      };

      const handleCancel = () => {
        if (options.onCancel) options.onCancel();
        setOpen(false);
        resolve(false);
        cleanup();
      };

      const cleanup = () => {
        root.unmount();
        document.body.removeChild(container);
      };

      return (
        <Dialog {...options.dialogProps} open={open} onClose={handleCancel}>
          {options.dialogProps.title && (
            <DialogTitle>{options.dialogProps.title}</DialogTitle>
          )}
          <DialogContent>{options.dialogProps.children}</DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      );
    };

    root.render(<ModalComponent />);
  });
};
