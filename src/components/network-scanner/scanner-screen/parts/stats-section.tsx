import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

interface StatsSectionProps {
  scanStats: {
    totalHosts: number;
    activeHosts: number;
    servicesFound: number;
    osDetected: number;
  };
  isScanning: boolean;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  scanStats,
  isScanning,
}) => {
  if (isScanning || scanStats.totalHosts === 0) return null;

  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsTitle}>Scan Results</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{scanStats.activeHosts}</Text>
          <Text style={styles.statLabel}>Active Hosts</Text>
        </View>
        <View style={[styles.statCard, styles.statCardGreen]}>
          <Text style={styles.statNumberGreen}>{scanStats.servicesFound}</Text>
          <Text style={styles.statLabelGreen}>Services Found</Text>
        </View>
        <View style={[styles.statCard, styles.statCardPurple]}>
          <Text style={styles.statNumberPurple}>{scanStats.osDetected}</Text>
          <Text style={styles.statLabelPurple}>OS Detected</Text>
        </View>
        <View style={[styles.statCard, styles.statCardGray]}>
          <Text style={styles.statNumberGray}>{scanStats.totalHosts}</Text>
          <Text style={styles.statLabelGray}>Total Hosts</Text>
        </View>
      </View>
    </View>
  );
};
