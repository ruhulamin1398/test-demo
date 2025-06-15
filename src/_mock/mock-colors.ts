export const mockColors = [
  "info",
  "warning",
  "error",
  "success"
] as const;

export type MockColor = typeof mockColors[number];
