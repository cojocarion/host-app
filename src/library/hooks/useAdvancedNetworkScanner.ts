import { NetworkHost } from "@/src/typings/network";
import React, { useCallback } from "react";
import { useDeviceDetection } from "./useDeviceDetection";
import { useNetworkScanState } from "./useNetworkScanState";
import { useRealTimeMonitoring } from "./useRealTimeMonitoring";

export interface AdvancedDevice extends NetworkHost {
  deviceType?:
    | "router"
    | "smart-tv"
    | "printer"
    | "mobile"
    | "computer"
    | "iot"
    | "unknown";
  manufacturer?: string;
  model?: string;
  services?: string[];
  upnpInfo?: {
    friendlyName: string;
    manufacturer: string;
    modelName: string;
    serialNumber?: string;
  };
  websocketSupport?: boolean;
  lastHeartbeat?: Date;
}

export const useAdvancedNetworkScanner = () => {
  const {
    discoveredHosts,
    isScanning,
    scanProgress,
    error,
    startScanning,
    updateProgress,
    updateDiscoveredHosts,
    setErrorState,
    finishScanning,
  } = useNetworkScanState();

  const devices: AdvancedDevice[] = discoveredHosts as AdvancedDevice[];

  const setDevices = useCallback(
    (value: React.SetStateAction<AdvancedDevice[]>) => {
      if (typeof value === "function") {
        const updatedDevices = value(devices);
        updateDiscoveredHosts(updatedDevices as NetworkHost[]);
      } else {
        updateDiscoveredHosts(value as NetworkHost[]);
      }
    },
    [devices, updateDiscoveredHosts]
  );

  const { detectDeviceAdvanced } = useDeviceDetection();
  const { startRealTimeMonitoring } = useRealTimeMonitoring();

  const scanWithMultipleProtocols = useCallback(
    async (baseIP: string): Promise<AdvancedDevice[]> => {
      startScanning();
      const foundDevices: AdvancedDevice[] = [];

      try {
        const ipParts = baseIP.split(".");
        const subnet = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}`;

        for (let i = 1; i <= 254; i++) {
          const ip = `${subnet}.${i}`;
          updateProgress((i / 254) * 100);

          const device = await detectDeviceAdvanced(ip);
          if (device) {
            foundDevices.push(device);
          }
        }

        setDevices(foundDevices);
        return foundDevices;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Advanced scan failed";
        setErrorState(errorMessage);
        return [];
      } finally {
        finishScanning();
      }
    },
    [
      startScanning,
      updateProgress,
      detectDeviceAdvanced,
      setDevices,
      setErrorState,
      finishScanning,
    ]
  );

  const handleStartRealTimeMonitoring = useCallback(() => {
    startRealTimeMonitoring(devices, setDevices);
  }, [devices, setDevices, startRealTimeMonitoring]);

  return {
    devices,
    isScanning,
    scanProgress,
    error,
    scanWithMultipleProtocols,
    startRealTimeMonitoring: handleStartRealTimeMonitoring,
  };
};
