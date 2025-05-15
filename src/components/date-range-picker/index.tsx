// components/DateRangePickerController.tsx
import React from "react";
import { Controller } from "react-hook-form";
import { DateRangePicker, DateRangePickerProps } from "@/lib/daterange-picker";
import { Dayjs } from "dayjs";
import { DateRange } from "@/lib/daterange-picker";

type Props = {
  control: any;
  name: string;
} & DateRangePickerProps;

export const DateRangePickerController: React.FC<Props> = ({
  name,
  control,
  label,
  ...dateRangePickerProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <>
            <DateRangePicker
              value={field.value || [null, null]}
              onChange={(newValue: DateRange<Dayjs>) =>
                field.onChange(newValue)
              }
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: true,
                  error: Boolean(fieldState.error),
                  helperText: fieldState.error?.message,
                  label: label,
                },
              }}
              {...dateRangePickerProps}
            />
          </>
        );
      }}
    />
  );
};
