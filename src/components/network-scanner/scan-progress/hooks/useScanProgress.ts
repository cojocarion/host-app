import { useMemo } from "react";

export interface ScanStats {
  totalHosts: number;
  activeHosts: number;
  servicesFound: number;
  osDetected: number;
}

export interface UseScanProgressProps {
  networkProgress: number;
  serviceProgress: number;
  osProgress: number;
  overallProgress: number;
  isNetworkScanning: boolean;
  isServiceScanning: boolean;
  isOSDetecting: boolean;
  scanStats: ScanStats;
}

export const useScanProgress = ({
  isNetworkScanning,
  isServiceScanning,
  isOSDetecting,
}: Pick<
  UseScanProgressProps,
  "isNetworkScanning" | "isServiceScanning" | "isOSDetecting"
>) => {
  const currentPhase = useMemo(() => {
    if (isNetworkScanning) return "Discovering network hosts...";
    if (isServiceScanning) return "Scanning services...";
    if (isOSDetecting) return "Detecting operating systems...";
    return "Scan completed";
  }, [isNetworkScanning, isServiceScanning, isOSDetecting]);

  const isScanning = useMemo(() => {
    return isNetworkScanning || isServiceScanning || isOSDetecting;
  }, [isNetworkScanning, isServiceScanning, isOSDetecting]);

  return {
    currentPhase,
    isScanning,
  };
};
