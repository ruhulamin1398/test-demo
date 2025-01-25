import { alpha, createTheme, Theme } from "@mui/material/styles";
import { brand, gray } from "./admin/themePrimitives";
import {
  outlinedInputClasses,
  toggleButtonClasses,
  toggleButtonGroupClasses,
} from "@mui/material";
import { Padding } from "@mui/icons-material";

// Default theme creation
const theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          boxSizing: "border-box",
          transition: "all 100ms ease-in",
          "&:focus-visible": {
            outline: `unset`,
            outlineOffset: "2px",
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          boxShadow: "none",
          borderRadius: theme.shape.borderRadius,
          textTransform: "none",
        }),
      },
      variants: [
        {
          props: { size: "small" },
          style: {
            height: "2.25rem",
            padding: "8px 12px",
          },
        },
        {
          props: { size: "medium" },
          style: {
            height: "2.5rem", // 40px
          },
        },
        {
          props: { color: "primary", variant: "contained" },
          style: ({ theme }: { theme: Theme }) => ({
            color: "white",
            backgroundColor: gray[900],
            backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
            boxShadow: `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
            border: `1px solid ${gray[700]}`,
            "&:hover": {
              backgroundImage: "none",
              backgroundColor: gray[700],
              boxShadow: "none",
            },
            "&:active": {
              backgroundColor: gray[800],
            },
            ...(theme.palette.mode === "dark" && {
              color: "black",
              backgroundColor: gray[50],
              backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
              boxShadow: "inset 0 -1px 0  hsl(220, 30%, 80%)",
              border: `1px solid ${gray[50]}`,
              "&:hover": {
                backgroundImage: "none",
                backgroundColor: gray[300],
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: gray[400],
              },
            }),
          }),
        },
        {
          props: { color: "secondary", variant: "contained" },
          style: {
            color: "white",
            backgroundColor: brand[300],
            backgroundImage: `linear-gradient(to bottom, ${alpha(
              brand[400],
              0.8
            )}, ${brand[500]})`,
            boxShadow: `inset 0 2px 0 ${alpha(
              brand[200],
              0.2
            )}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
            border: `1px solid ${brand[500]}`,
            "&:hover": {
              backgroundColor: brand[700],
              boxShadow: "none",
            },
            "&:active": {
              backgroundColor: brand[700],
              backgroundImage: "none",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: ({ theme }: { theme: Theme }) => ({
            color: theme.palette.text.primary,
            border: "1px solid",
            borderColor: gray[200],
            backgroundColor: alpha(gray[50], 0.3),
            "&:hover": {
              backgroundColor: gray[100],
              borderColor: gray[300],
            },
            "&:active": {
              backgroundColor: gray[200],
            },
            ...(theme.palette.mode === "dark" && {
              backgroundColor: gray[800],
              borderColor: gray[700],
              "&:hover": {
                backgroundColor: gray[900],
                borderColor: gray[600],
              },
              "&:active": {
                backgroundColor: gray[900],
              },
            }),
          }),
        },
        {
          props: { color: "secondary", variant: "outlined" },
          style: ({ theme }: { theme: Theme }) => ({
            color: brand[700],
            border: "1px solid",
            borderColor: brand[200],
            backgroundColor: brand[50],
            "&:hover": {
              backgroundColor: brand[100],
              borderColor: brand[400],
            },
            "&:active": {
              backgroundColor: alpha(brand[200], 0.7),
            },
            ...(theme.palette.mode === "dark" && {
              color: brand[50],
              border: "1px solid",
              borderColor: brand[900],
              backgroundColor: alpha(brand[900], 0.3),
              "&:hover": {
                borderColor: brand[700],
                backgroundColor: alpha(brand[900], 0.6),
              },
              "&:active": {
                backgroundColor: alpha(brand[900], 0.5),
              },
            }),
          }),
        },
        {
          props: { variant: "text" },
          style: ({ theme }: { theme: Theme }) => ({
            color: gray[600],
            "&:hover": {
              backgroundColor: gray[100],
            },
            "&:active": {
              backgroundColor: gray[200],
            },
            ...(theme.palette.mode === "dark" && {
              color: gray[50],
              "&:hover": {
                backgroundColor: gray[700],
              },
              "&:active": {
                backgroundColor: alpha(gray[700], 0.7),
              },
            }),
          }),
        },
        {
          props: { color: "secondary", variant: "text" },
          style: ({ theme }: { theme: Theme }) => ({
            color: brand[700],
            "&:hover": {
              backgroundColor: alpha(brand[100], 0.5),
            },
            "&:active": {
              backgroundColor: alpha(brand[200], 0.7),
            },
            ...(theme.palette.mode === "dark" && {
              color: brand[100],
              "&:hover": {
                backgroundColor: alpha(brand[900], 0.5),
              },
              "&:active": {
                backgroundColor: alpha(brand[900], 0.3),
              },
            }),
          }),
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          boxShadow: "none",
          borderRadius: theme.shape.borderRadius,
          textTransform: "none",
          fontWeight: theme.typography.fontWeightMedium,
          letterSpacing: 0,
          color: theme.palette.text.primary,
          border: "1px solid ",
          borderColor: gray[200],
          backgroundColor: alpha(gray[50], 0.3),
          "&:hover": {
            backgroundColor: gray[100],
            borderColor: gray[300],
          },
          "&:active": {
            backgroundColor: gray[200],
          },
          ...(theme.palette.mode === "dark" && {
            backgroundColor: gray[800],
            borderColor: gray[700],
            "&:hover": {
              backgroundColor: gray[900],
              borderColor: gray[600],
            },
            "&:active": {
              backgroundColor: gray[900],
            },
          }),
        }),
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: "10px",
          boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: brand[500],
          },
          ...(theme.palette.mode === "dark" && {
            [`& .${toggleButtonGroupClasses.selected}`]: {
              color: "#fff",
            },
            boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
          }),
        }),
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          padding: "12px 16px",
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: 500,
          ...(theme.palette.mode === "dark" && {
            color: gray[400],
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
            [`&.${toggleButtonClasses.selected}`]: {
              color: brand[300],
            },
          }),
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "none",
        },
        input: {
          "&::placeholder": {
            opacity: 0.7,
            color: gray[500],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: 0,
        },
        root: ({ theme }: { theme: Theme }) => ({
          padding: "8px 12px",
          color: theme.palette.text.primary,
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
          transition: "border 120ms ease-in",
          "&:hover": {
            borderColor: gray[400],
          },
          [`&.${outlinedInputClasses.focused}`]: {
            outline: `none`,
            borderColor: brand[400],
          },
          ...(theme.palette.mode === "dark" && {
            "&:hover": {
              borderColor: gray[500],
            },
          }),
          "&.Mui-error": {
            borderColor: theme.palette.error.main, // Change border color when error state is active
            "&:hover": {
              borderColor: theme.palette.error.dark, // Hover state when error
            },
          },
        }),
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.grey[500],
          ...(theme.palette.mode === "dark" && {
            color: theme.palette.grey[400],
          }),
          "& .MuiIconButton-root": {
            padding: 2, // Same padding if you want consistency
            margin: 0,
            svg: {
              width: "20px",
              height: "20px",
            },
            "&:hover": {
              borderColor: "inherit",
            },
          },
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          typography: theme.typography.caption,
          marginBottom: 8,
        }),
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

// Extend the default theme for admin-specific customizations
export const adminTheme: Theme = {
  ...theme,
  components: {
    ...theme.components,
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          fontWeight: 500,
          lineHeight: theme.typography.body2.lineHeight,
        }),
        secondary: ({ theme }) => ({
          fontSize: theme.typography.caption.fontSize,
          lineHeight: theme.typography.caption.lineHeight,
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
    MuiTableFooter: {
      styleOverrides: {
        root: {
          "& tr:last-child td": {
            borderBottom: "0px !important", // Remove the bottom border of the last row's td
          },
        },
      },
    },
  },
};
