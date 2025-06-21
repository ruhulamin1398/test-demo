import type { IUserTableFilters } from "src/types/user";
import type { UseSetStateReturn } from "minimal-shared/hooks";
import type { FiltersResultProps } from "src/components/filters-result";

import { useCallback } from "react";

import Chip from "@mui/material/Chip";

import {
  chipProps,
  FiltersBlock,
  FiltersResult,
} from "src/components/filters-result";
import { GetUsersQueryVariables } from "@/graphql-client/user";

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  onResetPage: () => void;
  filters: GetUsersQueryVariables["filter"];
  updateFilters: (newValues: GetUsersQueryVariables["filter"]) => void;
};

export function UserTableFiltersResult({
  updateFilters,
  filters,
  onResetPage,
  totalResults,
  sx,
}: Props) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    const { name, ...restFilters } = filters;
    updateFilters(restFilters);
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({});
  }, [onResetPage, updateFilters]);

  const handleRemoveRole = useCallback(() => {
    onResetPage();
    const { role, ...restFilters } = filters;
    updateFilters({ ...restFilters });
  }, [onResetPage, updateFilters, filters.role]);

  const handleReset = useCallback(() => {
    onResetPage();
    updateFilters({});
  }, [onResetPage, updateFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Status:" isShow={filters.isActive !== undefined}>
        <Chip
          {...chipProps}
          label={filters.isActive ? "Active" : "Inactive"}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: "capitalize" }}
        />
      </FiltersBlock>

      <FiltersBlock label="Role:" isShow={!!filters.role}>
        <Chip
          {...chipProps}
          key={"user-role-" + filters.role}
          label={filters.role}
          onDelete={() => handleRemoveRole()}
        />
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!filters.name}>
        <Chip
          {...chipProps}
          label={filters.name}
          onDelete={handleRemoveKeyword}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}

// GRAPHQL_API_URL https://www.beejoyi.com/api/graphql
// MONGO_ATLAS_URL
