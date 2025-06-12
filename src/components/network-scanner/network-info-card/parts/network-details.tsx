import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

interface NetworkDetailsProps {
  localIP: string;
  gateway: string;
  subnet: string;
}

export const NetworkDetails: React.FC<NetworkDetailsProps> = ({
  localIP,
  gateway,
  subnet,
}) => {
  return (
    <View style={styles.infoSection}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Local IP</Text>
        <Text style={styles.infoValue}>{localIP}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Gateway</Text>
        <Text style={styles.infoValue}>{gateway}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Subnet Mask</Text>
        <Text style={styles.infoValue}>{subnet}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Connection Status</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusIndicator} />
          <Text style={styles.statusText}>Connected</Text>
        </View>
      </View>
    </View>
  );
};
