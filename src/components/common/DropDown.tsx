"use client";
import React, { useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface DropdownProps {
  label: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<unknown>,
    newValue: string | null
  ) => void;
  options: string[] | number[]; // Accept both string and number types for options
  fetchOptions: () => Promise<string[] | number[]>; // Function to fetch options asynchronously
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  fetchOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [asyncOptions, setAsyncOptions] = useState<string[] | number[]>([]);

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const fetchedOptions = await fetchOptions();
      setAsyncOptions(fetchedOptions);
    } catch (error) {
      console.error("Error fetching options", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAsyncOptions([]);
  };

  return (
    <Autocomplete
      size="small"
      value={value}
      onChange={onChange}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      options={
        asyncOptions.length > 0
          ? asyncOptions
          : (options as readonly (string | number)[])
      }
      getOptionLabel={(option) => String(option)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...restProps } = props;
        return (
          <li key={key} {...restProps} style={{ padding: "8px 16px" }}>
            {String(option)}
          </li>
        );
      }}
      isOptionEqualToValue={(option, value) => String(option) === String(value)}
      disableClearable
      freeSolo
    />
  );
};

export default Dropdown;
