import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Grid2 as Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
  TextFieldProps,
  SelectProps,
  AutocompleteProps,
  OutlinedInputProps,
  SelectChangeEvent,
  FormLabel,
  Paper,
  OutlinedInput,
  TableFooter,
} from "@mui/material";
import CustomPagination from "../atoms/CustomPagination";
import { EnhancedTableToolbar } from "../atoms/EnhancedTableToolbar";

// Column definition for each table column
export interface Column<T> {
  id: keyof T; // Ensure `id` is one of the keys of T
  label: string;
  filterInput?: {
    type:
      | "text"
      | "number"
      | "date"
      | "select"
      | "autocomplete"
      | "outlinedInput";
    inputFieldProps?: unknown; // Input props specific to the input type (dynamically typed below)
  };
  options?: { label: string; value: string }[];
}

interface FilterForm {
  [key: string]: unknown; // Use values from T to allow proper indexing
}

interface GenericTableProps<T> {
  data: T[]; // Data to be displayed in the table
  columns: Column<T>[]; // Columns with filtering input configurations
  pagination?: {
    page: number;
    rowsPerPage: number;
    total: number;
  };
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void; // Callback to change page
  onRowsPerPageChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // Callback to change rows per page
  onFilterChange?: (filters: FilterForm) => void; // Callback to notify parent about filter changes
}

// Type for dynamic inputFieldProps based on component type
type InputFieldPropsMap = {
  text: TextFieldProps;
  number: TextFieldProps;
  date: TextFieldProps;
  select: SelectProps;
  autocomplete: AutocompleteProps<unknown, boolean, boolean, boolean>; // Adjusted to support any type of autocomplete
  outlinedInput: OutlinedInputProps;
};

function GenericTable<T>({
  data,
  columns,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  onFilterChange,
}: GenericTableProps<T>) {
  const [filterValues, setFilterValues] = useState<FilterForm>({});
  // Handle filter field changes
  const handleFilterChange = (
    field: keyof T, // field should be one of the keys of T
    value: string | number | Date | null // Value can be string, number, Date, or null
  ) => {
    const newFilterValues = { ...filterValues, [field]: value };
    setFilterValues(newFilterValues);
    onFilterChange?.(newFilterValues); // Call the callback with updated filters
  };

  // A helper function to extract the value from the event based on the input type
  const extractValue = (
    event: unknown,
    inputType:
      | "text"
      | "number"
      | "date"
      | "select"
      | "autocomplete"
      | "outlinedInput"
  ): string | number | Date | null => {
    switch (inputType) {
      case "text":
      case "number":
      case "date":
      case "outlinedInput":
        return (event as ChangeEvent<HTMLInputElement>).target.value;
      case "select":
        return (event as SelectChangeEvent).target.value as string;
      case "autocomplete":
        return (event as ChangeEvent<HTMLInputElement>).target.value;
      default:
        return null;
    }
  };

  // Separate render functions for different input types
  const renderTextField = (
    column: Column<T>,
    fieldId: keyof T,
    value: string | number | Date | null
  ) => {
    const { label, filterInput } = column;
    const { ...inputFieldProps } =
      (filterInput as InputFieldPropsMap["text"]) || {};

    return (
      <Grid size={3} key={String(fieldId)}>
        <FormControl fullWidth>
          <FormLabel htmlFor="email">{label}</FormLabel>
          <TextField
            type="text"
            fullWidth
            variant="outlined"
            value={value ?? ""}
            onChange={(e) =>
              handleFilterChange(fieldId, extractValue(e, "text"))
            }
            {...(inputFieldProps as InputFieldPropsMap["text"])} // Dynamically apply the input props
          />
        </FormControl>
      </Grid>
    );
  };

  const renderSelectField = (
    column: Column<T>,
    fieldId: keyof T,
    value: string | number | Date | null
  ) => {
    const { label, filterInput, options } = column;
    const { ...inputFieldProps } = filterInput as InputFieldPropsMap["select"];
    const handleSelectChange = (
      e: SelectChangeEvent<unknown>,
      _child: React.ReactNode
    ) => {
      handleFilterChange(fieldId, e.target.value as string);
    };
    console.log(
      "OPTIONS",
      options,
      column,
      value ? value : "NO VALUE",
      String(value) || "NOS"
    );

    return (
      <Grid size={3} key={String(fieldId)}>
        <FormControl fullWidth variant="outlined">
          <InputLabel
            sx={{
              position: "static", // Ensures the label stays above the input
              fontWeight: 400, // Normal weight for Bootstrap-like appearance
              transform: "unset",
            }}
            htmlFor={`select-${String(fieldId)}`}
            shrink
          >
            {label}
          </InputLabel>
          <Select
            labelId={`select-${String(fieldId)}`}
            id={`select-${String(fieldId)}`}
            value={value && value !== "null" ? value : "-1"}
            onChange={handleSelectChange}
            input={<OutlinedInput label="" />}
            {...inputFieldProps}
          >
            <MenuItem value={"-1"}>All</MenuItem>
            {options!.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  const renderAutocompleteField = (
    column: Column<T>,
    fieldId: keyof T,
    value: string | null
  ) => {
    const { label, filterInput } = column;
    const { inputFieldProps } = filterInput || {};

    return (
      <Grid size={3} key={String(fieldId)}>
        <Autocomplete
          value={value ?? null}
          onChange={(_e: SyntheticEvent, newValue: unknown) =>
            handleFilterChange(fieldId, (newValue as string) || null)
          }
          getOptionLabel={(option) => option as string}
          renderInput={(params) => (
            <TextField {...params} label={`Filter by ${label}`} />
          )}
          {...(inputFieldProps as Omit<
            InputFieldPropsMap["autocomplete"],
            "renderInput"
          >)} // Dynamically apply the input props
        />
      </Grid>
    );
  };

  // Render dynamic filter fields based on input type
  const renderFilterFields = () => {
    return columns.map((column) => {
      const { filterInput } = column;
      if (!filterInput) return null; // Skip if no filter input is specified

      const { type } = filterInput;
      const fieldId = column.id; // `column.id` is correctly typed as `keyof T`
      const value = (filterValues as T)[fieldId] ?? null;

      // Render based on type
      switch (type) {
        case "text":
        case "number":
        case "date":
          return renderTextField(column, fieldId, value ? String(value) : "");
        case "select":
          return renderSelectField(column, fieldId, String(value));
        case "autocomplete":
          return renderAutocompleteField(column, fieldId, String(value));
        default:
          return null;
      }
    });
  };

  // Ensure renderable data (string, number, or date)
  const renderCellData = (column: Column<T>, row: T) => {
    const value = row[column.id];
    return String(value) || "";
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <EnhancedTableToolbar>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            {renderFilterFields()}
          </Grid>
        </Box>
      </EnhancedTableToolbar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.id)}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow hover key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={String(column.id)}>
                    {renderCellData(column, row)}{" "}
                    {/* Render the cell data safely */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <CustomPagination
                onRowsPerPageChange={onRowsPerPageChange}
                rowsPerPage={10}
                onPageChange={
                  onPageChange ? onPageChange : (_e: unknown, p: number) => p
                }
                count={pagination?.total || 0}
                page={pagination?.page || 0}
                showFirstButton
                showLastButton
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GenericTable;
