import { useMemo } from "react";

export type ErrorType = "network" | "service" | "os" | "storage" | "general";

export interface ErrorConfig {
  icon: string;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export const useErrorConfig = (type: ErrorType): ErrorConfig => {
  return useMemo(() => {
    switch (type) {
      case "network":
        return {
          icon: "wifi-outline",
          title: "Network Error",
          color: "#ef4444",
          bgColor: "#fef2f2",
          borderColor: "#fecaca",
          textColor: "#991b1b",
        };
      case "service":
        return {
          icon: "server-outline",
          title: "Service Scan Error",
          color: "#f59e0b",
          bgColor: "#fffbeb",
          borderColor: "#fed7aa",
          textColor: "#92400e",
        };
      case "os":
        return {
          icon: "desktop-outline",
          title: "OS Detection Error",
          color: "#8b5cf6",
          bgColor: "#faf5ff",
          borderColor: "#d8b4fe",
          textColor: "#6b21a8",
        };
      case "storage":
        return {
          icon: "save-outline",
          title: "Storage Error",
          color: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
          textColor: "#374151",
        };
      default:
        return {
          icon: "alert-circle-outline",
          title: "Error",
          color: "#ef4444",
          bgColor: "#fef2f2",
          borderColor: "#fecaca",
          textColor: "#991b1b",
        };
    }
  }, [type]);
};
