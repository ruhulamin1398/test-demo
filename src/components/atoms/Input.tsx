import { TextField, TextFieldProps } from "@mui/material";

interface InputProps extends Omit<TextFieldProps, "error"> {
  error?: string; // Custom error prop
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  ...props
}) => (
  <TextField
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    variant="outlined"
    fullWidth
    error={!!error}
    helperText={error}
    {...props} // Spread the rest of the props
  />
);

export default Input;
