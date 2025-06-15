import type { IUserTableFilters } from "src/types/user";
import type { UseSetStateReturn } from "minimal-shared/hooks";
import { ChangeEvent, useCallback } from "react";
import { usePopover } from "minimal-shared/hooks";

import {
  Box,
  MenuItem,
  TextField,
  InputAdornment,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";

import { Iconify } from "src/components/iconify";
import { Field } from "@/components/hook-form";
import { RoleEnum } from "@/interfaces";
import { GetUsersQueryVariables } from "@/graphql-client/user";

// ----------------------------------------------------------------------

type Props = {
  onResetPage: () => void;
  filters: UseSetStateReturn<GetUsersQueryVariables["filter"]>;
};

export function UserTableToolbar({ filters, onResetPage }: Props) {
  const menuActions = usePopover();

  const { state: currentFilters, setState: updateFilters } = filters;

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ name: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterRole = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newValue = event.target.value;

      onResetPage();
      updateFilters({ role: newValue });
    },
    [onResetPage, updateFilters]
  );

  return (
    <>
      <Box
        sx={{
          p: 2.5,
          gap: 2,
          display: "flex",
          pr: { xs: 2.5, md: 1 },
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-end", md: "center" },
        }}
      >
        <FormControl sx={{ minWidth: 120, flexShrink: 0 }} size="small">
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            value={currentFilters.role}
            onChange={handleFilterRole}
            size="small"
            label="Role"
          >
            {Object.values(RoleEnum).map((userRole) => (
              <MenuItem key={userRole} value={userRole}>
                {userRole}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Name, Email or Phone"
          size="small"
          fullWidth
          value={currentFilters.name}
          onChange={handleFilterName}
        />
      </Box>
    </>
  );
}
