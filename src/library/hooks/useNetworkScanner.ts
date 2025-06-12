import { NetworkHost } from "@/src/typings/network";
import { useCallback, useEffect } from "react";
import { useHostPing } from "./useHostPing";
import { useNetworkInfo } from "./useNetworkInfo";
import { useNetworkScanState } from "./useNetworkScanState";

export const useNetworkScanner = () => {
  const {
    networkInfo,
    discoveredHosts,
    isScanning,
    scanProgress,
    error,
    startScanning,
    updateProgress,
    updateDiscoveredHosts,
    setErrorState,
    finishScanning,
    updateNetworkInfo,
  } = useNetworkScanState();

  const { getCurrentNetworkInfo, generateIPRange } = useNetworkInfo();
  const { pingHost } = useHostPing();

  // Wrapper method to get network info and update state
  const handleGetCurrentNetworkInfo = useCallback(async () => {
    try {
      const netInfo = await getCurrentNetworkInfo();
      updateNetworkInfo(netInfo);
      return netInfo;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown network error";
      setErrorState(errorMessage);
      return null;
    }
  }, [getCurrentNetworkInfo, updateNetworkInfo, setErrorState]);

  // Scan network for active hosts
  const scanNetwork = useCallback(async (): Promise<NetworkHost[]> => {
    startScanning();

    try {
      const netInfo = await handleGetCurrentNetworkInfo();
      if (!netInfo) {
        throw new Error("Unable to get network information");
      }

      const ipRange = generateIPRange(netInfo.localIP, netInfo.subnet);
      const batchSize = 15; // Balanced batches for better detection and speed
      const activeHosts: NetworkHost[] = [];

      for (let i = 0; i < ipRange.length; i += batchSize) {
        try {
          const batch = ipRange.slice(i, i + batchSize);
          const batchPromises = batch.map((ip) =>
            pingHost(ip).catch((error) => {
              // Log error but don't stop scanning
              console.warn(`Failed to ping ${ip}:`, error);
              return { ip, isActive: false, lastSeen: new Date() };
            })
          );

          const batchResults = await Promise.allSettled(batchPromises);

          batchResults.forEach((result, batchIndex) => {
            const ip = batch[batchIndex];
            if (result.status === "fulfilled" && result.value.isActive) {
              activeHosts.push(result.value);
            } else if (result.status === "rejected") {
              console.warn(`Promise rejected for ${ip}:`, result.reason);
            }
          });

          // Update progress
          const progress = Math.min(
            ((i + batchSize) / ipRange.length) * 100,
            100
          );
          updateProgress(progress);

          // Update hosts incrementally
          updateDiscoveredHosts([...activeHosts]);

          // Small delay for better detection
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (batchError) {
          console.warn(`Batch error at index ${i}:`, batchError);
          // Continue with next batch even if current batch fails
          continue;
        }
      }

      updateDiscoveredHosts(activeHosts);
      return activeHosts;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Scan failed";
      setErrorState(errorMessage);
      console.error("Network scan failed:", err);
      return [];
    } finally {
      finishScanning();
    }
  }, [
    handleGetCurrentNetworkInfo,
    generateIPRange,
    pingHost,
    startScanning,
    updateProgress,
    updateDiscoveredHosts,
    setErrorState,
    finishScanning,
  ]);

  // Initialize network info on mount
  useEffect(() => {
    handleGetCurrentNetworkInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return {
    networkInfo,
    discoveredHosts,
    isScanning,
    scanProgress,
    error,
    scanNetwork,
    getCurrentNetworkInfo: handleGetCurrentNetworkInfo,
  };
};
