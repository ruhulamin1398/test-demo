import type { IUserTableFilters } from "src/types/user";
import type { UseSetStateReturn } from "minimal-shared/hooks";
import { useCallback } from "react";
import { usePopover } from "minimal-shared/hooks";

import {
  Box,
  MenuItem,
  TextField,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { RoleEnum } from "@/interfaces";
import { GetUsersQueryVariables } from "@/graphql-client/user";

// ----------------------------------------------------------------------

type Props = {
  onResetPage: () => void;
  filters: GetUsersQueryVariables["filter"];
  handleUpdateFilters: (newFilters: GetUsersQueryVariables["filter"]) => void;
};

export function UserTableToolbar({
  filters,
  onResetPage,
  handleUpdateFilters,
}: Props) {
  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      const { name, ...restFilters } = filters;
      if (event.target.value === "") {
        handleUpdateFilters(restFilters);
        return;
      } else {
        handleUpdateFilters({ name: event.target.value, ...restFilters });
      }
    },
    [onResetPage, handleUpdateFilters]
  );

  const handleFilterRole = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newValue = event.target.value;
      if (newValue === "all") {
        const { role, ...restFilters } = filters;
        handleUpdateFilters({ ...restFilters });
      } else {
        handleUpdateFilters({ ...filters, role: newValue });
      }
      onResetPage();
    },
    [onResetPage, handleUpdateFilters]
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
            value={filters.role || "all"}
            onChange={handleFilterRole}
            size="small"
            label="Role"
          >
            <MenuItem value={"all"}>All</MenuItem>
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
          value={filters.name || ""}
          onChange={handleFilterName}
        />
      </Box>
    </>
  );
}
