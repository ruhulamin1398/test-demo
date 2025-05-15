import dayjs from "dayjs";

export const formatDateToHumanReadableDate = (
  date: Date | string | number | null | undefined
): string => {
  if (date === null || date === undefined) return "";

  // If date is a Unix timestamp string (e.g., "1734451200000"), convert it to a number
  if (typeof date === "string" && !isNaN(Number(date))) {
    date = Number(date); // Convert string to a number
  }

  // If it's a Date object, convert it to an ISO string
  if (date instanceof Date) {
    date = date.toISOString();
  }

  // Parse the date with dayjs, which can handle string, Date, and Unix timestamps
  const parsedDate = dayjs(date);

  // If the parsed date is valid, return the JavaScript Date object
  return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : "";
};

export const formatDateForDatePicker = (
  date: Date | string | number | null | undefined
) => {
  if (date === null || date === undefined) return dayjs();

  // If date is a Unix timestamp string (e.g., "1734451200000"), convert it to a number
  if (typeof date === "string" && !isNaN(Number(date))) {
    date = Number(date); // Convert string to a number
  }

  // If it's a Date object, convert it to an ISO string
  if (date instanceof Date) {
    date = date.toISOString();
  }

  // Parse the date with dayjs, which can handle string, Date, and Unix timestamps
  const parsedDate = dayjs(date);

  // If the parsed date is valid, return the JavaScript Date object
  return parsedDate.isValid() ? parsedDate : dayjs();
};

type ValidateDateRangeOptions = {
  start: dayjs.Dayjs | null;
  end: dayjs.Dayjs | null;
  min: dayjs.Dayjs;
  max: dayjs.Dayjs;
  label?: string;
};

export const validateDateRangeWithin = ({
  start,
  end,
  min,
  max,
  label = "Date",
}: ValidateDateRangeOptions): boolean => {
  const errors: string[] = [];

  if (!dayjs.isDayjs(start) || !start.isValid()) {
    errors.push(`${label} start is invalid`);
  }
  if (!dayjs.isDayjs(end) || !end.isValid()) {
    errors.push(`${label} end is invalid`);
  }

  if (
    dayjs.isDayjs(start) &&
    dayjs.isDayjs(end) &&
    start.isValid() &&
    end.isValid()
  ) {
    if (!start.isBetween(min, max, "day", "[]")) {
      errors.push(
        `${label} start must be between ${min.format(
          "YYYY-MM-DD"
        )} and ${max.format("YYYY-MM-DD")}`
      );
    }
    if (!end.isBetween(start, max, "day", "[]")) {
      errors.push(
        `${label} end must be after start and within ${max.format(
          "YYYY-MM-DD"
        )}`
      );
    }
  }

  return errors.length > 0;
};
