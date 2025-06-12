import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

interface ErrorStateProps {
  onRefresh: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRefresh }) => {
  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorContent}>
        <Ionicons
          name="wifi-outline"
          size={24}
          color="#ef4444"
          style={styles.errorIcon}
        />
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorTitle}>No Network Connection</Text>
          <Text style={styles.errorSubtitle}>
            Please connect to a WiFi network to scan for devices
          </Text>
        </View>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Ionicons name="refresh" size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
