import React from "react";
import { Text, View } from "react-native";
import { ScanStats } from "../hooks/useScanProgress";
import { styles } from "../styles";

interface ScanStatsProps {
  scanStats: ScanStats;
}

export const ScanStatsComponent: React.FC<ScanStatsProps> = ({ scanStats }) => {
  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>Live Results</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Hosts Found</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValueActive}>{scanStats.activeHosts}</Text>
            <Text style={styles.statValueTotal}>/ {scanStats.totalHosts}</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Services</Text>
          <Text style={styles.statValueServices}>
            {scanStats.servicesFound}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>OS Detected</Text>
          <Text style={styles.statValueOS}>{scanStats.osDetected}</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Scanned</Text>
          <Text style={styles.statValueGray}>{scanStats.totalHosts}</Text>
        </View>
      </View>
    </View>
  );
};
