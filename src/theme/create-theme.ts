// src/theme/create-theme.ts
 
'use client';
 
import type { ThemeOptions } from './types';
import type { Theme } from '@mui/material/styles';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import { mixins } from './core/mixins';
import { shadows } from './core/shadows';
import { palette } from './core/palette';
import { themeConfig } from './theme-config';
import { components } from './core/components';
import { typography } from './core/typography';
import { customShadows } from './core/custom-shadows';
 
export const baseTheme: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: palette.light,
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
    dark: {
      palette: palette.dark,
      shadows: shadows.dark,
      customShadows: customShadows.dark,
    },
  },
  mixins,
  components,
  typography,
  shape: { borderRadius: 8 },
  direction: themeConfig.direction,
  cssVariables: themeConfig.cssVariables,
  defaultColorScheme: themeConfig.defaultMode,
};
 
type CreateThemeProps = {
  themeOverrides?: ThemeOptions;
};
 
export function createTheme({ themeOverrides = {} }: CreateThemeProps = {}): Theme {
  const theme = createMuiTheme(baseTheme, themeOverrides);
 
  return theme;
}