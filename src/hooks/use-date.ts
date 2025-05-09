import dayjs from "dayjs";

export const useDate = () => {
  const isValidDate = (date: any): boolean => {
    return date && !isNaN(new Date(Number(date)).getTime());
  };

  const formatDate = (date: any, locale: string = "en-US"): string => {
    return isValidDate(date)
      ? new Date(Number(date)).toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Date not available";
  };

  const HumanTimeDifferent = (endTime: Number) => {
    const deadline = dayjs(Number(endTime));
    return dayjs().to(deadline);
  };

  return { isValidDate, formatDate, HumanTimeDifferent };
};
