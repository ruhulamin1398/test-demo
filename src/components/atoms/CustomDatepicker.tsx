import React, { useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, FormLabel } from "@mui/material";
import { FieldProps, getIn } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface CustomDatePickerProps extends FieldProps {
  label: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  field, // Formik Field Props
  form: { touched, errors, setFieldValue, validateField },
  label,
  ...props
}) => {
  const { name, value, ...others } = field;
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  // Handle Date Change
  const handleDateChange = (newValue: unknown) => {
    setFieldValue(name, newValue);
    validateField(name);
  };
  const errorText =
    getIn(touched, name) && getIn(errors, name)
      ? String(getIn(errors, name))
      : undefined;

  return (
    <FormControl fullWidth error={!!errorText}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value || null}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              name,
              variant: "outlined",
              fullWidth: true,
              error: Boolean(errorText),
              helperText: errorText,
              inputRef: textFieldRef,
              ...props,
              ...others,
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default CustomDatePicker;
