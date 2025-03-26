import React, { useState, useCallback, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  FormLabel,
  FormControl,
  FormHelperText,
  autocompleteClasses,
} from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { GET_USERS_QUERY } from "@/graphql-client/user";
import { IUser } from "@/interfaces";
import { top100Films } from "./TestAutoComplete";
import { FieldProps, getIn } from "formik";

interface IOption {
  label: string;
  id: string;
  avatarUrl: string | null | undefined;
}

interface CustomAutocompleteProps extends FieldProps {
  label: string;
}

export const JudgesSelector: React.FC<CustomAutocompleteProps> = ({
  field,
  form: { touched, errors, setFieldValue },
  label,
  ...props
}) => {
  const [options, setOptions] = useState<IOption[]>([]);
  // GraphQL Query for searching users
  const [searchUsers, { data, loading }] = useLazyQuery(GET_USERS_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      page: { limit: 10, page: 1 }, // Pagination settings
    },
  });

  // Custom debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced search handler
  const handleSearch = (value: string) => {
    if (value.length > 2) {
      searchUsers({ variables: { filter: { name: value } } });
    }
  };

  // Create a debounced version of handleSearch
  const debouncedSearch = useCallback(debounce(handleSearch, 500), []); // 500ms debounce delay

  const handleSearchChange = (event: React.ChangeEvent<{}>, value: string) => {
    debouncedSearch(value); // Call debounced search
  };

  useEffect(() => {
    if (data?.getUsers?.users) {
      const formattedOptions: IOption[] = data.getUsers.users.map(
        ({ id, firstName, lastName }: IUser) => ({
          id,
          label: `${firstName} ${lastName}`,
        })
      );
      setOptions(formattedOptions); // Update the options state after data is fetched
    }
  }, [data]);

  const { name, value } = field;

  const handleChange = (event: any, newValue: unknown) => {
    setFieldValue(name, (newValue as IOption[]) || []); // Update form value with ids
  };
  const errorText =
    getIn(touched, name) && getIn(errors, name)
      ? String(getIn(errors, name))
      : undefined;

  return (
    <FormControl fullWidth error={!!errorText}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Autocomplete
        size="small"
        {...props}
        multiple
        freeSolo
        options={options}
        getOptionLabel={(option: unknown) => {
          return (option as IOption).label;
        }}
        value={value}
        onChange={handleChange}
        onInputChange={handleSearchChange}
        loading={loading}
        isOptionEqualToValue={(option: unknown, optionValue: unknown) => {
          return (option as IOption).id === (optionValue as IOption).id;
        }}
        disableCloseOnSelect
        filterOptions={(x) => x}
        autoComplete
        includeInputInList
        filterSelectedOptions
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              error={!!errorText}
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </>
        )}
        getOptionKey={(option: unknown) => (option as IOption).id}
      />
      {errorText ? <FormHelperText>{errorText}</FormHelperText> : null}
    </FormControl>
  );
};

export default JudgesSelector;
