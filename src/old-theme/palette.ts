import {
  PaletteOptions,
  ThemeOptions,
  createTheme,
} from "@mui/material/styles";

const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#3F51B5", // Indigo
    light: "#7986CB",
    dark: "#303F9F",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#FF5722", // Deep Orange
    light: "#FF8A65",
    dark: "#D84315",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#FAFAFA", // Light gray
    paper: "#FFFFFF", // White paper background
  },
  text: {
    primary: "#212121", // Almost black
    secondary: "#757575", // Medium gray
  },
  success: {
    main: "#4CAF50", // Green
  },
  error: {
    main: "#F44336", // Red
  },
  warning: {
    main: "#FFC107", // Amber
  },
  info: {
    main: "#2196F3", // Blue
  },
  divider: "#E0E0E0", // Light gray for dividers
};

const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#3F51B5", // Indigo
    light: "#7986CB",
    dark: "#303F9F",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#FF5722", // Deep Orange
    light: "#FF8A65",
    dark: "#D84315",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#121212", // Dark background
    paper: "#1E1E1E", // Slightly lighter dark background
  },
  text: {
    primary: "#E0E0E0", // Light gray text
    secondary: "#B0B0B0", // Medium gray text
  },
  success: {
    main: "#4CAF50", // Green
  },
  error: {
    main: "#F44336", // Red
  },
  warning: {
    main: "#FFC107", // Amber
  },
  info: {
    main: "#2196F3", // Blue
  },
  divider: "#757575", // Medium gray for dividers
};

const gradients = {
  gradientPrimary: "linear-gradient(135deg, #3F51B5, #2196F3)", // Indigo to Blue
  gradientSecondary: "linear-gradient(135deg, #FF5722, #FF9800)", // Deep Orange to Orange
  gradientSuccess: "linear-gradient(135deg, #4CAF50, #81C784)", // Green to Light Green
  gradientError: "linear-gradient(135deg, #F44336, #E57373)", // Red to Light Red
};

// Extend the theme with custom properties
interface CustomTheme extends ThemeOptions {
  customGradients?: typeof gradients;
}

export const lightThemePalette: CustomTheme = {
  palette: lightPalette,
  customGradients: gradients,
};

export const darkThemePalette: CustomTheme = {
  palette: darkPalette,
  customGradients: gradients,
};
