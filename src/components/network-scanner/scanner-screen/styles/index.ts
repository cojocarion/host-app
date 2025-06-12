import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    padding: 16,
    paddingBottom: Platform.OS === "android" ? 100 : 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 4,
  },
  errorContainer: {
    gap: 8,
    marginBottom: 16,
  },
  statsContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  statCard: {
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    minWidth: "45%",
  },
  statCardGreen: {
    backgroundColor: "#dcfce7",
  },
  statCardPurple: {
    backgroundColor: "#f3e8ff",
  },
  statCardGray: {
    backgroundColor: "#f9fafb",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
  },
  statNumberGreen: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16a34a",
  },
  statNumberPurple: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9333ea",
  },
  statNumberGray: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6b7280",
  },
  statLabel: {
    fontSize: 12,
    color: "#2563eb",
  },
  statLabelGreen: {
    fontSize: 12,
    color: "#16a34a",
  },
  statLabelPurple: {
    fontSize: 12,
    color: "#9333ea",
  },
  statLabelGray: {
    fontSize: 12,
    color: "#6b7280",
  },
  emptyState: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyHint: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
});
