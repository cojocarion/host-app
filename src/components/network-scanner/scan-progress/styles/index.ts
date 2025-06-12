import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  scanningIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  pulsingDot: {
    width: 8,
    height: 8,
    backgroundColor: "#3b82f6",
    borderRadius: 4,
    marginRight: 8,
  },
  scanningText: {
    fontSize: 14,
    color: "#3b82f6",
  },
  overallSection: {
    marginBottom: 16,
  },
  overallHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  overallTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  overallPercent: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3b82f6",
  },
  overallBarBackground: {
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
    height: 12,
  },
  overallBarFill: {
    height: 12,
    backgroundColor: "#3b82f6",
    borderRadius: 6,
  },
  phaseText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
  },
  individualProgress: {
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  progressLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressIcon: {
    marginRight: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  progressPercent: {
    fontSize: 14,
    color: "#6b7280",
  },
  progressBarBackground: {
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    height: 8,
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  statsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "48%",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  statValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statValueActive: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3b82f6",
    marginRight: 4,
  },
  statValueTotal: {
    fontSize: 12,
    color: "#9ca3af",
  },
  statValueServices: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10b981",
  },
  statValueOS: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8b5cf6",
  },
  statValueGray: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6b7280",
  },
});
