import { useEffect, useState } from "react";
import { Avatar, Chip, CircularProgress } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Control, Controller } from "react-hook-form";
import { GET_USERS_QUERY } from "@/graphql-client/auth";
import { useLazyQuery } from "@apollo/client";
import { DateRangePickerProps } from "@/lib/daterange-picker";
import { IUser } from "@/interfaces";

export interface IJudge {
  id: string;
  label: string;
  profilePicture?: string;
}
// Define the props
interface JudgeAutocompleteProps
  extends Partial<AutocompleteProps<IJudge, true, false, false>> {
  name: string;
  control: Control<any>;
}

export function JudgeAutocomplete({
  control,
  name,
  ...autocompleteProps
}: JudgeAutocompleteProps) {
  const [options, setOptions] = useState<IJudge[]>([]);
  const [inputValue, setInputValue] = useState("");
  // GraphQL Query for searching users
  const [searchUsers, { data, loading }] = useLazyQuery(GET_USERS_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      page: { limit: 10, page: 1 },
    },
  });

  useEffect(() => {
    if (data?.getUsers?.users) {
      const formattedOptions: IJudge[] = data.getUsers.users.map(
        ({ id, firstName, lastName, profilePicture }: IUser) => ({
          id,
          label: `${firstName} ${lastName}`,
          profilePicture,
        })
      );
      setOptions(formattedOptions); // Update the options state after data is fetched
    }
  }, [data]);

  useEffect(() => {
    if (inputValue === "") return;
    const debounce = setTimeout(() => {
      searchUsers({ variables: { filter: { name: inputValue } } });
    }, 300);
    return () => clearTimeout(debounce);
  }, [inputValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <Autocomplete
          multiple
          options={options}
          loading={loading}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onInputChange={(e, value) => setInputValue(value)}
          value={field.value}
          onChange={(_, newValue) => field.onChange(newValue)}
          renderOption={(props, judge) => (
            <li {...props} key={judge.id}>
              <Avatar
                alt={judge.label}
                src={judge.profilePicture}
                sx={{ mr: 1, width: 24, height: 24, flexShrink: 0 }}
              />
              {judge.label}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((judge, index) => (
              <Chip
                {...getTagProps({ index })}
                key={judge.id}
                size="small"
                variant="soft"
                label={judge.label}
                avatar={<Avatar alt={judge.label} src={judge.profilePicture} />}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="+ Tour Guides"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={18} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          {...autocompleteProps}
        />
      )}
    />
  );
}
