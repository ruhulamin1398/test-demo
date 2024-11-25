export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;  // Return empty string if input is empty
    return str.charAt(0).toUpperCase() + str.slice(1);
  };