import type { TextFieldProps } from "@mui/material/TextField";

import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import { formatPatterns } from "@/utils/format-time";
import {
  DatePicker,
  DatePickerProps,
  MobileDateTimePicker,
  MobileDateTimePickerProps,
} from "@/lib/daterange-picker";

// ----------------------------------------------------------------------

type RHFDatePickerProps = DatePickerProps & {
  name: string;
};

export function RHFDatePicker({
  name,
  slotProps,
  ...other
}: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={dayjs(field.value)}
          onChange={(newValue) => field.onChange(dayjs(newValue).format())}
          format={formatPatterns.split.date}
          slotProps={{
            ...slotProps,
            textField: {
              fullWidth: true,
              error: !!error,
              helperText:
                error?.message ??
                (slotProps?.textField as TextFieldProps)?.helperText,
              ...slotProps?.textField,
            },
          }}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMobileDateTimePickerProps = MobileDateTimePickerProps & {
  name: string;
};

export function RHFMobileDateTimePicker({
  name,
  slotProps,
  ...other
}: RHFMobileDateTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileDateTimePicker
          {...field}
          value={dayjs(field.value)}
          onChange={(newValue) => field.onChange(dayjs(newValue).format())}
          format={formatPatterns.split.dateTime}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText:
                error?.message ??
                (slotProps?.textField as TextFieldProps)?.helperText,
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}
