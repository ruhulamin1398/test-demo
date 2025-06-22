import { useBoolean, usePopover } from "minimal-shared/hooks";
import {
  Box,
  Link,
  Stack,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";

import { RouterLink } from "src/routes/components";

import { Label } from "src/components/label";
import { Iconify } from "src/components/iconify";
import { ConfirmDialog } from "src/components/custom-dialog";
import { CustomPopover } from "src/components/custom-popover";
import { IUser } from "@/interfaces";

// ----------------------------------------------------------------------

type Props = {
  row: IUser;
  editHref: string;
  onDeleteRow: () => void;
};

export function UserTableRow({ row, editHref, onDeleteRow }: Props) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();
  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: "right-top" } }}
    >
      <MenuList>
        <li>
          <MenuItem
            component={RouterLink}
            href={editHref}
            onClick={() => menuActions.onClose()}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </li>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>
          <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
            <Avatar alt={row.name} src={row.profilePicture} />

            <Stack
              sx={{
                typography: "body2",
                flex: "1 1 auto",
                alignItems: "flex-start",
              }}
            >
              <Link
                component={RouterLink}
                href={editHref}
                color="inherit"
                sx={{ cursor: "pointer" }}
              >
                {row.name}
              </Link>
              <Box component="span" sx={{ color: "text.disabled" }}>
                {row.email}
              </Box>
            </Stack>
          </Box>
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {row.phoneNumber?.number}
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{row.email}</TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{row.role}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.isActive && "success") ||
              (!row.isActive && "error") ||
              "default"
            }
          >
            {row.isActive ? "Active" : " Inactive"}
          </Label>
        </TableCell>

        <TableCell>
          <IconButton
            color={menuActions.open ? "inherit" : "default"}
            onClick={menuActions.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
