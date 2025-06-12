import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

interface EmptyStateProps {
  isScanning: boolean;
  hasHosts: boolean;
  isConnected: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isScanning,
  hasHosts,
  isConnected,
}) => {
  if (isScanning || hasHosts || !isConnected) return null;

  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No Hosts Discovered</Text>
      <Text style={styles.emptySubtitle}>
        Start a network scan to discover devices on your network
      </Text>
      <Text style={styles.emptyHint}>
        Make sure you are connected to a WiFi network
      </Text>
    </View>
  );
};
