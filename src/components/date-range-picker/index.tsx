// components/DateRangePickerController.tsx
import React from "react";
import { Controller } from "react-hook-form";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { TextField, Box } from "@mui/material";
import { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";

type Props = {
  name: string;
  control: any;
  label?: string;
};

export const DateRangePickerController: React.FC<Props> = ({
  name,
  control,
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <DateRangePicker
            value={field.value || [null, null]}
            onChange={(newValue: DateRange<Dayjs>) => field.onChange(newValue)}
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
                error: Boolean(fieldState.error),
                helperText: fieldState.error?.message,
                label: label,
              },
            }}
          />
        </>
      )}
    />
  );
};
