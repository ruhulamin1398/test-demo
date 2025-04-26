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

  return { isValidDate, formatDate };
};
