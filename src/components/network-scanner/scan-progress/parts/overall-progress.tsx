import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

interface OverallProgressProps {
  overallProgress: number;
  currentPhase: string;
}

export const OverallProgress: React.FC<OverallProgressProps> = ({
  overallProgress,
  currentPhase,
}) => {
  return (
    <View style={styles.overallSection}>
      <View style={styles.overallHeader}>
        <Text style={styles.overallTitle}>Overall Progress</Text>
        <Text style={styles.overallPercent}>
          {Math.round(overallProgress)}%
        </Text>
      </View>
      <View style={styles.overallBarBackground}>
        <View
          style={[styles.overallBarFill, { width: `${overallProgress}%` }]}
        />
      </View>
      <Text style={styles.phaseText}>{currentPhase}</Text>
    </View>
  );
};
