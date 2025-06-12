import { theme } from "@/src/library/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="search-outline"
        size={48}
        color={theme.colors.textTertiary}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>No devices discovered yet</Text>
      <Text style={styles.emptySubtitle}>
        Start a network scan to discover devices and build the network tree
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    paddingVertical: theme.spacing.xxl,
    alignItems: "center",
  },
  emptyIcon: {
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    textAlign: "center",
    lineHeight: 20,
  },
});

export { EmptyState };
