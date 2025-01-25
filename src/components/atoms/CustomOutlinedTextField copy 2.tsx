import {
  FormControl,
  FormLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FieldProps } from "formik";

type CustomTextFieldProps = FieldProps & TextFieldProps;
export const CustomOutlinedTextField: React.FC<CustomTextFieldProps> = ({
  field: { name, value, onChange },
  form: { touched, errors, setFieldValue },
  label,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <TextField
        label={label}
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
