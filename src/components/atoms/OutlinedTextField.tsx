import {
  FormControl,
  FormLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FieldProps, getIn } from "formik";
import { ChangeEvent } from "react";

export const OutlinedTextField: React.FC<FieldProps & TextFieldProps> = ({
  field,
  form,
  children,
  label,
  onChange,
  ...props
}) => {
  const { value, name, onChange: onChangeField, ...others } = field;
  const { touched, errors } = form;
  const errorText =
    getIn(touched, name) && getIn(errors, name)
      ? String(getIn(errors, name))
      : undefined;
  return (
    <FormControl error={!!errorText} fullWidth>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <TextField
        fullWidth
        variant="outlined"
        error={Boolean(errorText)}
        helperText={errorText}
        name={name}
        value={value}
        onChange={(e: unknown) => {
          onChange?.(e as ChangeEvent<HTMLTextAreaElement | HTMLInputElement>);
          onChangeField(e);
        }}
        {...others}
        {...props}
      >
        {children}
      </TextField>
    </FormControl>
  );
};
