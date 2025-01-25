import { FormControl, FormLabel, TextField } from "@mui/material";
import { FieldProps } from "formik";

interface CustomTextFieldProps extends FieldProps {
  label: string;
}

export const CustomOutlinedTextField = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  type = "text",
  select = false,
  children = null,
  ...props
}: any) => {
  return (
    <FormControl fullWidth>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        variant="outlined"
        error={Boolean(error)}
        helperText={helperText}
        type={type}
        select={select}
        {...props}
      >
        {children}
      </TextField>
    </FormControl>
  );
};
