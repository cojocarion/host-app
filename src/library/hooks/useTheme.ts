import { theme, Theme } from "@/src/library/constants/theme";

export const useTheme = (): Theme => {
  return theme;
};

export const useThemeColors = () => {
  return theme.colors;
};
