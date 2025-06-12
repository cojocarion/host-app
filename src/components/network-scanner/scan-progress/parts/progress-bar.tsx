import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

interface ProgressBarProps {
  progress: number;
  color: string;
  label: string;
  isActive: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  label,
  isActive,
}) => (
  <View style={styles.progressContainer}>
    <View style={styles.progressHeader}>
      <View style={styles.progressLabelContainer}>
        <Ionicons
          name={
            isActive
              ? "ellipse"
              : progress === 100
              ? "checkmark-circle"
              : "ellipse-outline"
          }
          size={16}
          color={isActive ? color : progress === 100 ? "#10b981" : "#6b7280"}
          style={styles.progressIcon}
        />
        <Text style={styles.progressLabel}>{label}</Text>
      </View>
      <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
    </View>
    <View style={styles.progressBarBackground}>
      <View
        style={[
          styles.progressBarFill,
          {
            width: `${progress}%`,
            backgroundColor: isActive
              ? color
              : progress === 100
              ? "#10b981"
              : "#6b7280",
          },
        ]}
      />
    </View>
  </View>
);
