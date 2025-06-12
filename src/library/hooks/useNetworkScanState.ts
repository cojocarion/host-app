import { NetworkHost, NetworkInfo } from "@/src/typings/network";
import { useState } from "react";

export const useNetworkScanState = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [discoveredHosts, setDiscoveredHosts] = useState<NetworkHost[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startScanning = () => {
    setIsScanning(true);
    setScanProgress(0);
    setError(null);
    setDiscoveredHosts([]);
  };

  const updateProgress = (progress: number) => {
    setScanProgress(progress);
  };

  const updateDiscoveredHosts = (hosts: NetworkHost[]) => {
    setDiscoveredHosts(hosts);
  };

  const addDiscoveredHost = (host: NetworkHost) => {
    setDiscoveredHosts((prev) => [...prev, host]);
  };

  const setErrorState = (errorMessage: string) => {
    setError(errorMessage);
  };

  const clearError = () => {
    setError(null);
  };

  const finishScanning = () => {
    setIsScanning(false);
    setScanProgress(100);
  };

  const updateNetworkInfo = (info: NetworkInfo | null) => {
    setNetworkInfo(info);
  };

  return {
    // State
    networkInfo,
    discoveredHosts,
    isScanning,
    scanProgress,
    error,

    // Actions
    startScanning,
    updateProgress,
    updateDiscoveredHosts,
    addDiscoveredHost,
    setErrorState,
    clearError,
    finishScanning,
    updateNetworkInfo,
  };
};
