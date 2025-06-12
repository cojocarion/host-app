import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

interface HeaderProps {
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh }) => {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Ionicons name="wifi" size={24} color="#10b981" style={styles.icon} />
        <Text style={styles.title}>Network Information</Text>
      </View>
      <TouchableOpacity onPress={onRefresh} style={styles.refreshButtonNormal}>
        <Ionicons name="refresh" size={16} color="#6b7280" />
      </TouchableOpacity>
    </View>
  );
};
