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
