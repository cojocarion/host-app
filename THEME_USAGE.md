# Theme Usage Guide

## Overview
The app uses a centralized theme system that provides consistent colors, spacing, typography, and other design tokens throughout the application.

## Basic Usage

### Importing the Theme
```typescript
import { theme } from '@/constants/theme';
// Or use the hook
import { useTheme, useThemeColors } from '@/hooks/useTheme';
```

### Using Theme in StyleSheet
```typescript
import { StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.medium,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
});
```

### Using Theme with Hooks
```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme, useThemeColors } from '@/hooks/useTheme';

export const MyComponent = () => {
  const theme = useTheme();
  const colors = useThemeColors();
  
  return (
    <View style={{ 
      backgroundColor: colors.surface,
      padding: theme.spacing.lg 
    }}>
      <Text style={{ 
        color: colors.text,
        fontSize: theme.fontSize.lg 
      }}>
        Hello World
      </Text>
    </View>
  );
};
```

## Available Theme Properties

### Colors
- **Primary**: `primary`, `primaryDark`, `primaryLight`
- **Backgrounds**: `background`, `backgroundSecondary`, `backgroundTertiary`
- **Surfaces**: `surface`, `surfaceElevated`
- **Text**: `text`, `textSecondary`, `textTertiary`, `textInverse`
- **Borders**: `border`, `borderSecondary`, `borderAccent`
- **Status**: `success`, `warning`, `error`, `info` (+ light versions)
- **Tab Bar**: `tabBar.background`, `tabBar.border`, `tabBar.active`, `tabBar.inactive`
- **Scanner Specific**: `scanner.hostBackground`, `scanner.serviceBackground`, etc.

### Spacing
- `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `xxl` (48px)

### Typography
- **Font Sizes**: `xs` (12px) to `xxxl` (32px)
- **Font Weights**: `normal`, `medium`, `semibold`, `bold`

### Border Radius
- `small` (4px), `medium` (8px), `large` (12px), `xl` (16px), `round` (9999px)

### Shadows
- `small`, `medium`, `large` - Pre-configured shadow objects

## Examples

### Card Component
```typescript
const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.md,
    margin: theme.spacing.sm,
    ...theme.shadows.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
```

### Button Component
```typescript
const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
  },
  primaryText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
});
```

### Status Indicators
```typescript
const statusStyles = StyleSheet.create({
  success: {
    backgroundColor: theme.colors.successLight,
    borderColor: theme.colors.success,
    borderWidth: 1,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.sm,
  },
  error: {
    backgroundColor: theme.colors.errorLight,
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.sm,
  },
});
```

## Best Practices

1. **Always use theme colors** instead of hardcoded hex values
2. **Use semantic color names** (e.g., `textSecondary` instead of `gray`)
3. **Leverage spacing tokens** for consistent layouts
4. **Use pre-defined shadows** for consistent elevation
5. **Follow typography scale** for text sizing
6. **Use the hooks** when you need reactive theme access

## Color Palette

### Primary Colors
- Primary Blue: `#3b82f6`
- Primary Dark: `#2563eb`
- Primary Light: `#60a5fa`

### Neutral Colors
- White: `#ffffff`
- Light Gray: `#f9fafb`
- Medium Gray: `#6b7280`
- Dark Gray: `#374151`
- Black: `#111827`

### Status Colors
- Success Green: `#10b981`
- Warning Orange: `#f59e0b`
- Error Red: `#ef4444`
- Info Blue: `#3b82f6`

This centralized theme system ensures consistency across the entire application and makes it easy to update the visual design from a single location. 