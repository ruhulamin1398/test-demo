export const toOrdinal = (n: number) => {
  const ones = n % 10;
  const tens = Math.floor(n / 10) % 10;

  if (tens === 1) {
    return `${n}th`;
  }

  switch (ones) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
};
