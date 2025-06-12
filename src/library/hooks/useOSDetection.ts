import { OSDetectionResult } from "@/src/typings/os-detection";
import { useCallback } from "react";
import { useOSAnalysis } from "./useOSAnalysis";
import { useOSDetectionState } from "./useOSDetectionState";

export const useOSDetection = () => {
  const {
    detectionResults,
    isDetecting,
    detectionProgress,
    error,
    startDetection,
    updateProgress,
    setErrorState,
    finishDetection,
    updateDetectionResult,
    getDetectionResult,
    clearResults,
  } = useOSDetectionState();

  const { detectOS } = useOSAnalysis();

  // Detect OS for a single host
  const detectHostOS = useCallback(
    async (
      ip: string,
      openPorts: number[] = []
    ): Promise<OSDetectionResult> => {
      // Update detecting state
      updateDetectionResult(ip, {
        ip,
        osInfo: null,
        isDetecting: true,
      });

      try {
        const osInfo = await detectOS(ip, openPorts);

        const result: OSDetectionResult = {
          ip,
          osInfo,
          isDetecting: false,
        };

        updateDetectionResult(ip, result);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "OS detection failed";
        const result: OSDetectionResult = {
          ip,
          osInfo: null,
          isDetecting: false,
          error: errorMessage,
        };

        updateDetectionResult(ip, result);
        return result;
      }
    },
    [detectOS, updateDetectionResult]
  );

  // Detect OS for multiple hosts
  const detectMultipleHosts = useCallback(
    async (hosts: { ip: string; openPorts?: number[] }[]) => {
      startDetection();

      try {
        const totalHosts = hosts.length;

        for (let i = 0; i < hosts.length; i++) {
          const { ip, openPorts = [] } = hosts[i];
          await detectHostOS(ip, openPorts);

          // Update progress
          const progress = ((i + 1) / totalHosts) * 100;
          updateProgress(progress);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "OS detection failed";
        setErrorState(errorMessage);
      } finally {
        finishDetection();
      }
    },
    [
      detectHostOS,
      startDetection,
      updateProgress,
      setErrorState,
      finishDetection,
    ]
  );

  return {
    detectionResults,
    isDetecting,
    detectionProgress,
    error,
    detectHostOS,
    detectMultipleHosts,
    getDetectionResult,
    clearResults,
  };
};
