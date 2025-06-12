import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/src/components/haptic-tab";
import { theme } from "@/src/library/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tabBar.active,
        tabBarInactiveTintColor: theme.colors.tabBar.inactive,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.tabBar.border,
          paddingBottom:
            Platform.OS === "ios"
              ? insets.bottom
              : Math.max(insets.bottom, theme.spacing.md), // Better padding for Android
          paddingTop: theme.spacing.sm,
          height:
            Platform.OS === "ios"
              ? 70 + insets.bottom
              : 70 + Math.max(insets.bottom, theme.spacing.md), // Taller for Android
          ...theme.shadows.large,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSize.xs,
          fontWeight: theme.fontWeight.semibold,
          marginTop: Platform.OS === "android" ? 2 : 4, // Better spacing for Android
          marginBottom: Platform.OS === "android" ? 2 : 0,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === "android" ? 2 : 4, // Better spacing for Android
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="wifi"
              size={24}
              color={
                focused
                  ? theme.colors.tabBar.active
                  : theme.colors.tabBar.inactive
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="information-circle"
              size={24}
              color={
                focused
                  ? theme.colors.tabBar.active
                  : theme.colors.tabBar.inactive
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
