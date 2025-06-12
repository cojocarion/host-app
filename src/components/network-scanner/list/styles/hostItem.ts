import { theme } from "@/src/library/constants/theme";
import { StyleSheet } from "react-native";

export const hostItemStyles = StyleSheet.create({
  // Host card styles
  hostCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
  },
  hostHeader: {
    padding: theme.spacing.md,
  },
  hostMainInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  hostStatusDot: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.sm,
  },
  hostIcon: {
    marginRight: theme.spacing.sm,
  },
  hostTextInfo: {
    flex: 1,
  },
  hostIP: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  hostSecondaryIP: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  hostMetadata: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.xs,
    flexWrap: "wrap",
  },
  hostResponseTime: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  hostOS: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  hostServices: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.success,
  },

  // Expanded content - Tree structure
  expandedContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  treeBranch: {
    flexDirection: "row",
    marginBottom: theme.spacing.md,
  },
  branchConnector: {
    width: 24,
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  branchLine: {
    width: 2,
    height: 16,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.xs,
  },
  branchIcon: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.round,
    padding: 2,
  },
  branchContent: {
    flex: 1,
  },
  branchTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  // Host details styles
  hostDetailsContent: {
    gap: theme.spacing.xs,
  },
  hostDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hostDetailLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  hostDetailValue: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
});
