import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import type { ConfirmDialogProps } from "./types";

// ----------------------------------------------------------------------

export function ConfirmDialog({
  open,
  title,
  action,
  closeText,
  content,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      {title && <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>}

      {content && (
        <DialogContent sx={{ typography: "body2" }}> {content} </DialogContent>
      )}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          {closeText ? closeText : "Cancel"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
