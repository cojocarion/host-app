import React from "react";
import { View } from "react-native";
import { styles } from "../styles";
import { ProgressBar } from "./progress-bar";

interface IndividualProgressProps {
  networkProgress: number;
  serviceProgress: number;
  osProgress: number;
  isNetworkScanning: boolean;
  isServiceScanning: boolean;
  isOSDetecting: boolean;
}

export const IndividualProgress: React.FC<IndividualProgressProps> = ({
  networkProgress,
  serviceProgress,
  osProgress,
  isNetworkScanning,
  isServiceScanning,
  isOSDetecting,
}) => {
  return (
    <View style={styles.individualProgress}>
      <ProgressBar
        progress={networkProgress}
        color="#3b82f6"
        label="Network Discovery"
        isActive={isNetworkScanning}
      />
      <ProgressBar
        progress={serviceProgress}
        color="#8b5cf6"
        label="Service Detection"
        isActive={isServiceScanning}
      />
      <ProgressBar
        progress={osProgress}
        color="#f59e0b"
        label="OS Detection"
        isActive={isOSDetecting}
      />
    </View>
  );
};
