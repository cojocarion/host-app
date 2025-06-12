export const theme = {
  colors: {
    // Primary colors
    primary: "#3b82f6",
    primaryDark: "#2563eb",
    primaryLight: "#60a5fa",

    // Background colors
    background: "#ffffff",
    backgroundSecondary: "#f9fafb",
    backgroundTertiary: "#f3f4f6",

    // Surface colors
    surface: "#ffffff",
    surfaceElevated: "#ffffff",

    // Text colors
    text: "#111827",
    textSecondary: "#6b7280",
    textTertiary: "#9ca3af",
    textInverse: "#ffffff",

    // Border colors
    border: "#e5e7eb",
    borderSecondary: "#d1d5db",
    borderAccent: "#3b82f6",

    // Status colors
    success: "#10b981",
    successLight: "#d1fae5",
    warning: "#f59e0b",
    warningLight: "#fef3c7",
    error: "#ef4444",
    errorLight: "#fee2e2",
    info: "#3b82f6",
    infoLight: "#dbeafe",

    // Tab bar colors
    tabBar: {
      background: "#374151",
      border: "#4b5563",
      active: "#ffffff",
      inactive: "#9ca3af",
    },

    // Network scanner specific colors
    scanner: {
      hostBackground: "#ffffff",
      hostBorder: "#e5e7eb",
      serviceBackground: "#f8fafc",
      serviceText: "#475569",
      progressBackground: "#f1f5f9",
      progressFill: "#3b82f6",
    },

    // Shadow colors
    shadow: "#000000",
  },

  // Shadow presets
  shadows: {
    small: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },

  // Border radius
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
    round: 9999,
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Font weights
  fontWeight: {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
};

export type Theme = typeof theme;
