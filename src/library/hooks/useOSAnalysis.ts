import { OSInfo } from "@/src/typings/os-detection";
import { useCallback } from "react";
import { useHTTPHeaderAnalysis } from "./useHTTPHeaderAnalysis";
import { useMobileOSDetection } from "./useMobileOSDetection";
import { usePortPatternAnalysis } from "./usePortPatternAnalysis";

export const useOSAnalysis = () => {
  const { analyzeHostHeaders } = useHTTPHeaderAnalysis();
  const { analyzePortPattern, analyzeTTL } = usePortPatternAnalysis();
  const { detectMobileOS } = useMobileOSDetection();

  // Perform comprehensive OS detection
  const detectOS = useCallback(
    async (ip: string, openPorts: number[] = []): Promise<OSInfo | null> => {
      const detectionMethods: Partial<OSInfo>[] = [];

      try {
        // Method 0: Mobile-specific detection (high priority)
        const mobileInfo = await detectMobileOS(ip, openPorts);
        if (
          mobileInfo &&
          mobileInfo.confidence &&
          mobileInfo.confidence > 0.5
        ) {
          detectionMethods.push(mobileInfo);
        }

        // Method 1: HTTP header analysis
        const httpInfo = await analyzeHostHeaders(ip);
        if (httpInfo && httpInfo.confidence && httpInfo.confidence > 0) {
          detectionMethods.push(httpInfo);
        }

        // Method 2: Port pattern analysis
        if (openPorts.length > 0) {
          const portInfo = analyzePortPattern(openPorts);
          if (portInfo.confidence && portInfo.confidence > 0) {
            detectionMethods.push(portInfo);
          }
        }

        // Method 3: TTL analysis (limited effectiveness)
        const ttlInfo = await analyzeTTL(ip);
        if (ttlInfo && ttlInfo.confidence && ttlInfo.confidence > 0) {
          detectionMethods.push(ttlInfo);
        }

        // Choose the best detection result
        if (detectionMethods.length === 0) {
          return null;
        }

        // Sort by confidence and pick the best one
        const bestDetection = detectionMethods.reduce((best, current) => {
          return (current.confidence || 0) > (best.confidence || 0)
            ? current
            : best;
        });

        // Combine information from multiple methods if they agree
        const osInfo: OSInfo = {
          ip,
          os: bestDetection.os || "Unknown",
          version: bestDetection.version,
          confidence: bestDetection.confidence || 0,
          fingerprint: bestDetection.fingerprint,
          ttl: bestDetection.ttl,
          openPorts,
          detectionMethod: bestDetection.detectionMethod || "Multiple Methods",
          detectionTime: new Date(),
        };

        // Boost confidence if multiple methods agree
        const agreeingMethods = detectionMethods.filter(
          (method) => method.os === bestDetection.os
        );
        if (agreeingMethods.length > 1) {
          osInfo.confidence = Math.min(osInfo.confidence * 1.2, 1.0);
          osInfo.detectionMethod = `${agreeingMethods.length} Methods`;
        }

        return osInfo;
      } catch (err) {
        // OS detection failed
        return null;
      }
    },
    [analyzeHostHeaders, analyzePortPattern, analyzeTTL, detectMobileOS]
  );

  // Quick confidence check for detection quality
  const getDetectionQuality = useCallback(
    (osInfo: OSInfo | null): "high" | "medium" | "low" | "none" => {
      if (!osInfo) return "none";

      if (osInfo.confidence >= 0.8) return "high";
      if (osInfo.confidence >= 0.5) return "medium";
      if (osInfo.confidence >= 0.2) return "low";
      return "none";
    },
    []
  );

  return {
    detectOS,
    getDetectionQuality,
  };
};
