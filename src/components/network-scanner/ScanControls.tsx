import { theme } from "@/src/library/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppSettings } from "../../library/hooks/useDataPersistence";

export interface ScanControlsProps {
  onStartScan: () => void;
  onStartAdvancedScan?: () => void;
  isScanning: boolean;
  isNetworkAvailable: boolean;
  settings: AppSettings;
  onNavigateToSettings?: () => void;
}

const ScanControls: React.FC<ScanControlsProps> = ({
  onStartScan,
  onStartAdvancedScan,
  isScanning,
  isNetworkAvailable,
  settings,
  onNavigateToSettings,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan Controls</Text>
        {onNavigateToSettings && (
          <TouchableOpacity
            onPress={onNavigateToSettings}
            style={styles.settingsButton}
          >
            <Ionicons name="settings-outline" size={16} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.scanSection}>
        <Text style={styles.title}>Network Scanner</Text>
        <Text style={styles.subtitle}>
          Discover devices and services on your local network
        </Text>

        <View style={styles.buttonRow}>
          {/* Standard Scan Button */}
          <TouchableOpacity
            style={[
              styles.scanButton,
              !isNetworkAvailable && styles.scanButtonDisabled,
              {
                flex: onStartAdvancedScan ? 1 : undefined,
                marginRight: onStartAdvancedScan ? 8 : 0,
              },
            ]}
            onPress={onStartScan}
            disabled={!isNetworkAvailable || isScanning}
          >
            <Ionicons
              name={isScanning ? "refresh" : "search"}
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.scanButtonText}>
              {isScanning ? "Scanning..." : "Quick Scan"}
            </Text>
          </TouchableOpacity>

          {/* Advanced Scan Button */}
          {onStartAdvancedScan && (
            <TouchableOpacity
              style={[
                styles.advancedButton,
                !isNetworkAvailable && styles.scanButtonDisabled,
                { flex: 1, marginLeft: 8 },
              ]}
              onPress={onStartAdvancedScan}
              disabled={!isNetworkAvailable || isScanning}
            >
              <Ionicons
                name="analytics"
                size={20}
                color={theme.colors.primary}
                style={styles.buttonIcon}
              />
              <Text style={styles.advancedButtonText}>
                {isScanning ? "Scanning..." : "Advanced"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {!isNetworkAvailable && (
          <View style={styles.warningContainer}>
            <Ionicons
              name="warning"
              size={16}
              color={theme.colors.warning}
              style={styles.warningIcon}
            />
            <Text style={styles.warningText}>
              Connect to a WiFi network to start scanning
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Scan timeout: {(settings.scanTimeout / 1000).toFixed(1)}s per host
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  settingsButton: {
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
  },
  scanSection: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scanButton: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  advancedButton: {
    backgroundColor: "#f3f4f6",
    borderWidth: 2,
    borderColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
  },
  scanButtonDisabled: {
    backgroundColor: "#d1d5db",
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  scanButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  advancedButtonText: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 18,
  },
  warningContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#fffbeb",
    borderWidth: 1,
    borderColor: "#fde68a",
    borderRadius: 12,
  },
  warningIcon: {
    marginRight: 8,
  },
  warningText: {
    color: "#92400e",
    fontSize: 14,
  },
  settingsSection: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
  },
  settingsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 8,
  },
  settingLabel: {
    color: "#374151",
  },
  settingDescription: {
    color: "#9ca3af",
  },
  toggle: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 40,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#2563eb",
  },
  toggleText: {
    color: "#374151",
  },
  settingsIcon: {
    marginRight: 8,
  },
  settingsButtonText: {
    color: "#6b7280",
  },
  footer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  footerText: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
});

export default ScanControls;
