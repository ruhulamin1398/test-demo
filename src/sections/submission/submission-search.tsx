import type { Theme, SxProps } from "@mui/material/styles";

import { useState, useCallback } from "react";
import { useDebounce } from "minimal-shared/hooks";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link, { linkClasses } from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";

import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { SearchNotFound } from "@/components/search-not-found";
import { ISubmissionItem } from "@/types/submission";

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
  redirectPath: (title: string) => string;
};

export function SubmissionSearch({ redirectPath, sx }: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<ISubmissionItem | null>(
    null
  );

  const debouncedQuery = useDebounce(searchQuery);

  const handleChange = useCallback(
    (item: ISubmissionItem | null) => {
      setSelectedItem(item);
      if (item) {
        router.push(redirectPath(item.title));
      }
    },
    [redirectPath, router]
  );

  const paperStyles: SxProps<Theme> = {
    width: 320,
    [` .${autocompleteClasses.listbox}`]: {
      [` .${autocompleteClasses.option}`]: {
        p: 0,
        [` .${linkClasses.root}`]: {
          p: 0.75,
          gap: 1.5,
          width: 1,
          display: "flex",
          alignItems: "center",
        },
      },
    },
  };

  return (
    <Autocomplete
      autoHighlight
      popupIcon={null}
      loading={false}
      options={[]}
      value={selectedItem}
      onChange={(event, newValue) => handleChange(newValue)}
      onInputChange={(event, newValue) => setSearchQuery(newValue)}
      getOptionLabel={(option) => option.title}
      noOptionsText={<SearchNotFound query={debouncedQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{ paper: { sx: paperStyles } }}
      sx={[{ width: { xs: 1, sm: 260 } }, ...(Array.isArray(sx) ? sx : [sx])]}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ ml: 1, color: "text.disabled" }}
                  />
                </InputAdornment>
              ),
              endAdornment: <>{params.InputProps.endAdornment}</>,
            },
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        // const matches = match(post.title, inputValue);
        // const parts = parse(post.title, matches);

        return (
          <li {...props} key={post.id}>
            <Link
              component={RouterLink}
              href={redirectPath(post.title)}
              color="inherit"
              underline="none"
            >
              <Avatar
                key={post.id}
                alt={post.title}
                src={post.coverUrl}
                variant="rounded"
                sx={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  borderRadius: 1,
                }}
              />

              <div key={inputValue}>
                {/* {parts.map((part, index) => (
                  <Typography
                    key={index}
                    component="span"
                    color={part.highlight ? "primary" : "textPrimary"}
                    sx={{
                      typography: "body2",
                      fontWeight: part.highlight
                        ? "fontWeightSemiBold"
                        : "fontWeightMedium",
                    }}
                  >
                    {part.text}
                  </Typography>
                ))} */}
              </div>
            </Link>
          </li>
        );
      }}
    />
  );
}
