import { ThemeOptions, createTheme, responsiveFontSizes } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { darkThemePalette, lightThemePalette } from "./palette";

const customOverrides: ThemeOptions = {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
};

export const lightTheme = responsiveFontSizes(
  createTheme(deepmerge(lightThemePalette, customOverrides))
);
export const darkTheme = responsiveFontSizes(
  createTheme(deepmerge(darkThemePalette, customOverrides))
);
