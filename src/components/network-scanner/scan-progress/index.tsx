import React from "react";
import { View } from "react-native";
import { ScanStats, useScanProgress } from "./hooks/useScanProgress";
import {
  Header,
  IndividualProgress,
  OverallProgress,
  ScanStatsComponent,
} from "./parts";
import { styles } from "./styles";

export interface ScanProgressProps {
  networkProgress: number;
  serviceProgress: number;
  osProgress: number;
  overallProgress: number;
  isNetworkScanning: boolean;
  isServiceScanning: boolean;
  isOSDetecting: boolean;
  scanStats: ScanStats;
}

const ScanProgress: React.FC<ScanProgressProps> = ({
  networkProgress,
  serviceProgress,
  osProgress,
  overallProgress,
  isNetworkScanning,
  isServiceScanning,
  isOSDetecting,
  scanStats,
}) => {
  const { currentPhase, isScanning } = useScanProgress({
    isNetworkScanning,
    isServiceScanning,
    isOSDetecting,
  });

  return (
    <View style={styles.container}>
      <Header isScanning={isScanning} />

      <OverallProgress
        overallProgress={overallProgress}
        currentPhase={currentPhase}
      />

      <IndividualProgress
        networkProgress={networkProgress}
        serviceProgress={serviceProgress}
        osProgress={osProgress}
        isNetworkScanning={isNetworkScanning}
        isServiceScanning={isServiceScanning}
        isOSDetecting={isOSDetecting}
      />

      <ScanStatsComponent scanStats={scanStats} />
    </View>
  );
};

export default ScanProgress;
export type { ScanStats };
