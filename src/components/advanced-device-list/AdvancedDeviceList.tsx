import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../library/constants/theme";
import { AdvancedDevice } from "../../library/hooks/useAdvancedNetworkScanner";

interface AdvancedDeviceListProps {
  devices: AdvancedDevice[];
}

const AdvancedDeviceList: React.FC<AdvancedDeviceListProps> = ({ devices }) => {
  const getDeviceIcon = (deviceType?: AdvancedDevice["deviceType"]) => {
    switch (deviceType) {
      case "router":
        return "wifi";
      case "smart-tv":
        return "tv";
      case "printer":
        return "print";
      case "mobile":
        return "phone-portrait";
      case "computer":
        return "desktop";
      case "iot":
        return "hardware-chip";
      default:
        return "help-circle";
    }
  };

  const getDeviceTypeColor = (deviceType?: AdvancedDevice["deviceType"]) => {
    switch (deviceType) {
      case "router":
        return "#10b981";
      case "smart-tv":
        return "#8b5cf6";
      case "printer":
        return "#f59e0b";
      case "mobile":
        return "#3b82f6";
      case "computer":
        return "#6b7280";
      case "iot":
        return "#ef4444";
      default:
        return "#9ca3af";
    }
  };

  if (devices.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search" size={48} color={theme.colors.textSecondary} />
        <Text style={styles.emptyTitle}>No Devices Found</Text>
        <Text style={styles.emptySubtitle}>
          Try scanning again or check your network connection
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Advanced Scan Results</Text>
        <Text style={styles.subtitle}>
          Found {devices.length} device{devices.length !== 1 ? "s" : ""} with
          enhanced detection
        </Text>
      </View>

      <ScrollView style={styles.deviceList} nestedScrollEnabled={true}>
        {devices.map((device, index) => (
          <View key={`${device.ip}-${index}`} style={styles.deviceCard}>
            <View style={styles.deviceHeader}>
              <View style={styles.deviceIcon}>
                <Ionicons
                  name={getDeviceIcon(device.deviceType) as any}
                  size={24}
                  color={getDeviceTypeColor(device.deviceType)}
                />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>
                  {device.upnpInfo?.friendlyName ||
                    device.hostname ||
                    "Unknown Device"}
                </Text>
                <Text style={styles.deviceIP}>{device.ip}</Text>
              </View>
              <View style={styles.deviceStatus}>
                {device.websocketSupport && (
                  <View style={styles.badge}>
                    <Ionicons name="flash" size={12} color="white" />
                    <Text style={styles.badgeText}>WS</Text>
                  </View>
                )}
                {device.lastHeartbeat && (
                  <View style={[styles.badge, styles.liveBadge]}>
                    <Ionicons name="pulse" size={12} color="white" />
                    <Text style={styles.badgeText}>LIVE</Text>
                  </View>
                )}
              </View>
            </View>

            {/* UPnP Information */}
            {device.upnpInfo && (
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>UPnP Information</Text>
                <View style={styles.infoGrid}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Manufacturer</Text>
                    <Text style={styles.infoValue}>
                      {device.upnpInfo.manufacturer}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Model</Text>
                    <Text style={styles.infoValue}>
                      {device.upnpInfo.modelName}
                    </Text>
                  </View>
                  {device.upnpInfo.serialNumber && (
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Serial</Text>
                      <Text style={styles.infoValue}>
                        {device.upnpInfo.serialNumber}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Services */}
            {device.services && device.services.length > 0 && (
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Detected Services</Text>
                <View style={styles.servicesList}>
                  {device.services.map((service, idx) => (
                    <View key={idx} style={styles.serviceTag}>
                      <Text style={styles.serviceText}>{service}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Device Stats */}
            <View style={styles.statsSection}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Response Time</Text>
                <Text style={styles.statValue}>
                  {device.responseTime ? `${device.responseTime}ms` : "N/A"}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Last Seen</Text>
                <Text style={styles.statValue}>
                  {device.lastSeen.toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Type</Text>
                <Text
                  style={[
                    styles.statValue,
                    { color: getDeviceTypeColor(device.deviceType) },
                  ]}
                >
                  {device.deviceType?.toUpperCase() || "UNKNOWN"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.md,
    ...theme.shadows.medium,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  deviceList: {
    maxHeight: 600,
  },
  deviceCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  deviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  deviceIP: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  deviceStatus: {
    flexDirection: "row",
    gap: theme.spacing.xs,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.small,
    gap: 2,
  },
  liveBadge: {
    backgroundColor: theme.colors.success,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
  },
  infoSection: {
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  infoItem: {
    flex: 1,
    minWidth: 100,
  },
  infoLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  servicesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.xs,
  },
  serviceTag: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.small,
  },
  serviceText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
  },
  emptyContainer: {
    alignItems: "center",
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    marginVertical: theme.spacing.md,
  },
  emptyTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  emptySubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});

export default AdvancedDeviceList;
