import { OSDetectionResult } from "@/src/typings/os-detection";
import { useState } from "react";

export const useOSDetectionState = () => {
  const [detectionResults, setDetectionResults] = useState<
    Map<string, OSDetectionResult>
  >(new Map());
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionProgress, setDetectionProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startDetection = () => {
    setIsDetecting(true);
    setDetectionProgress(0);
    setError(null);
  };

  const updateProgress = (progress: number) => {
    setDetectionProgress(progress);
  };

  const setErrorState = (errorMessage: string) => {
    setError(errorMessage);
  };

  const finishDetection = () => {
    setIsDetecting(false);
    setDetectionProgress(100);
  };

  const updateDetectionResult = (ip: string, result: OSDetectionResult) => {
    setDetectionResults((prev) => new Map(prev.set(ip, result)));
  };

  const getDetectionResult = (ip: string): OSDetectionResult | undefined => {
    return detectionResults.get(ip);
  };

  const clearResults = () => {
    setDetectionResults(new Map());
    setDetectionProgress(0);
    setError(null);
  };

  return {
    // State
    detectionResults: Array.from(detectionResults.values()),
    isDetecting,
    detectionProgress,
    error,

    // Actions
    startDetection,
    updateProgress,
    setErrorState,
    finishDetection,
    updateDetectionResult,
    getDetectionResult,
    clearResults,
  };
};
