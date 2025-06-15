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
  filters: UseSetStateReturn<GetUsersQueryVariables["filter"]>;
};

export function UserTableFiltersResult({
  filters,
  onResetPage,
  totalResults,
  sx,
}: Props) {
  const {
    state: currentFilters,
    setState: updateFilters,
    resetState: resetFilters,
  } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ name: "" });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ isActive: true });
  }, [onResetPage, updateFilters]);

  const handleRemoveRole = useCallback(() => {
    onResetPage();
    updateFilters({ role: "" });
  }, [onResetPage, updateFilters, currentFilters.role]);

  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Status:" isShow={true}>
        <Chip
          {...chipProps}
          label={currentFilters.isActive}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: "capitalize" }}
        />
      </FiltersBlock>

      <FiltersBlock label="Role:" isShow={!!currentFilters.role.length}>
        <Chip
          {...chipProps}
          key={"user-role-" + currentFilters.role}
          label={currentFilters.role}
          onDelete={() => handleRemoveRole()}
        />
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!currentFilters.name}>
        <Chip
          {...chipProps}
          label={currentFilters.name}
          onDelete={handleRemoveKeyword}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}

// GRAPHQL_API_URL https://www.beejoyi.com/api/graphql
// MONGO_ATLAS_URL mongodb+srv://raceproduction:Race987_(shjdskg@cluster0.lz6meb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
