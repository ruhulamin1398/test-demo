// RoundForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { Dayjs } from "dayjs";
import { DateRangePickerController } from "@/components/date-range-picker";
import { LocalizationProvider } from "@/locales";

const roundSchema = z.object({
  dateRange: z
    .tuple([
      z
        .custom<Dayjs>()
        .refine((d) => d?.isValid?.(), { message: "Start date is required" }),
      z
        .custom<Dayjs>()
        .refine((d) => d?.isValid?.(), { message: "End date is required" }),
    ])
    .refine(([start, end]) => start && end && start.isBefore(end), {
      message: "Start date must be before end date",
    }),
});

type RoundFormValues = {
  dateRange: [Dayjs | null, Dayjs | null];
  // other fields...
};

export const RoundForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RoundFormValues>({
    resolver: zodResolver(roundSchema),
    defaultValues: {
      dateRange: [null, null],
    },
  });

  const onSubmit = (data: RoundFormValues) => {
    console.log("Submitted data:", data);
  };

  return (
    <LocalizationProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DateRangePickerController
          name="dateRange"
          control={control}
          label="Round"
        />
        {errors.dateRange && (
          <p style={{ color: "red" }}>{errors.dateRange.message as string}</p>
        )}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
};
