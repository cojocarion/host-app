import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

interface HeaderProps {
  isScanning: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isScanning }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Scan Progress</Text>
      {isScanning && (
        <View style={styles.scanningIndicator}>
          <View style={styles.pulsingDot} />
          <Text style={styles.scanningText}>Scanning</Text>
        </View>
      )}
    </View>
  );
};
