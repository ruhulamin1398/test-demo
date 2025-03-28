import type { UseSetStateReturn } from "minimal-shared/hooks";

import { useCallback } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Iconify } from "@/components/iconify";
import { Scrollbar } from "@/components/scrollbar";
import { IProductFilters } from "@/types/product";

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  canReset: boolean;
  onOpen: () => void;
  onClose: () => void;
  filters: UseSetStateReturn<IProductFilters>;
  options: {
    colors: string[];
    ratings: string[];
    categories: string[];
    genders: { value: string; label: string }[];
  };
};

export function ProductFiltersDrawer({
  open,
  onOpen,
  onClose,
  canReset,
  filters,
}: Props) {
  const {
    state: currentFilters,
    setState: updateFilters,
    resetState: resetFilters,
  } = filters;

  const renderHead = () => (
    <>
      <Box
        sx={{
          py: 2,
          pr: 1,
          pl: 2.5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Filters
        </Typography>

        <Tooltip title="Reset">
          <IconButton onClick={() => resetFilters()}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>
        </Tooltip>

        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />
    </>
  );

  const location = [
    { value: "all", label: "All Locations" },
    { value: "worldwide", label: "Worldwide" },
    { value: "united-states", label: "United States" },
    { value: "europe", label: "Europe" },
  ];

  const priceRange = [
    { value: "all", label: "All Prizes" },
    { value: "below-1000", label: "Below $1,000" },
    { value: "1000-5000", label: "$1,000 - $5,000" },
  ];

  const category = [
    { value: "all", label: "All Categories" },
    { value: "design", label: "Design" },
    { value: "writing", label: "Writing" },
    { value: "tech", label: "Tech" },
  ];

  const handleFilterLocation = useCallback(
    (location: string) => {
      const checked = currentFilters.gender.includes(location)
        ? currentFilters.gender.filter((value) => value !== location)
        : [...currentFilters.gender, location];

      updateFilters({ gender: checked });
    },
    [updateFilters, currentFilters.gender]
  );

  const handleFilterCategory = useCallback(
    (newValue: string) => {
      updateFilters({ category: newValue });
    },
    [updateFilters]
  );

  const handleFilterPriceRange = useCallback(
    (event: Event, newValue: number | number[]) => {
      updateFilters({ priceRange: newValue as number[] });
    },
    [updateFilters]
  );

  const renderLocation = () => (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Location
      </Typography>
      {location.map((option) => (
        <FormControlLabel
          key={option.value}
          label={option.label}
          control={
            <Checkbox
              checked={currentFilters.gender.includes(option.label)}
              onClick={() => handleFilterLocation(option.label)}
              inputProps={{ id: `${option.value}-checkbox` }}
            />
          }
        />
      ))}
    </Box>
  );
  const renderPrice = () => (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Location
      </Typography>
      {priceRange.map((option) => (
        <FormControlLabel
          key={option.value}
          label={option.label}
          control={
            <Checkbox
              checked={currentFilters.gender.includes(option.label)}
              onClick={() => handleFilterPriceRange(option.label)}
              inputProps={{ id: `${option.value}-checkbox` }}
            />
          }
        />
      ))}
    </Box>
  );

  const renderCategory = () => (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Location
      </Typography>
      {category.map((option) => (
        <FormControlLabel
          key={option.value}
          label={option.label}
          control={
            <Checkbox
              checked={currentFilters.gender.includes(option.label)}
              onClick={() => handleFilterCategory(option.label)}
              inputProps={{ id: `${option.value}-checkbox` }}
            />
          }
        />
      ))}
    </Box>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        {renderHead()}

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderLocation()}
            {renderCategory()}
            {renderPrice()}
            <Divider />
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
