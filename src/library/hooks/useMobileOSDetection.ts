import { OSInfo } from "@/src/typings/os-detection";
import { useCallback } from "react";

export const useMobileOSDetection = () => {
  // Enhanced mobile device detection
  const detectMobileOS = useCallback(
    async (
      ip: string,
      openPorts: number[] = []
    ): Promise<Partial<OSInfo> | null> => {
      // iOS-specific detection
      const iosIndicators = [62078, 3689, 5000, 515];
      const iosMatches = openPorts.filter((port) =>
        iosIndicators.includes(port)
      );

      if (iosMatches.length > 0) {
        return {
          os: "iOS",
          confidence: Math.min(0.8 + iosMatches.length * 0.1, 0.95),
          detectionMethod: "iOS-specific Ports",
          openPorts: iosMatches,
        };
      }

      // Android-specific detection
      const androidIndicators = [5555, 8888, 9999];
      const androidMatches = openPorts.filter((port) =>
        androidIndicators.includes(port)
      );

      if (androidMatches.length > 0) {
        return {
          os: "Android",
          confidence: Math.min(0.8 + androidMatches.length * 0.1, 0.95),
          detectionMethod: "Android-specific Ports",
          openPorts: androidMatches,
        };
      }

      // Generic mobile detection via UPnP and common mobile ports
      const mobileIndicators = [1900, 8009, 8080];
      const mobileMatches = openPorts.filter((port) =>
        mobileIndicators.includes(port)
      );

      if (mobileMatches.length > 0) {
        // Try to distinguish by testing specific endpoints
        try {
          // Test for iOS-specific endpoints
          const iosTest = await fetch(
            `http://${ip}:${mobileMatches[0]}/library`,
            {
              method: "HEAD",
              signal: AbortSignal.timeout(1000),
            }
          );

          return {
            os: "iOS",
            confidence: 0.6,
            detectionMethod: "Mobile Device Pattern (iOS)",
            openPorts: mobileMatches,
          };
        } catch {
          // Try Android patterns
          try {
            const androidTest = await fetch(
              `http://${ip}:${mobileMatches[0]}/`,
              {
                method: "HEAD",
                signal: AbortSignal.timeout(1000),
              }
            );

            return {
              os: "Android",
              confidence: 0.6,
              detectionMethod: "Mobile Device Pattern (Android)",
              openPorts: mobileMatches,
            };
          } catch {
            // Generic mobile device
            return {
              os: "Mobile Device",
              confidence: 0.4,
              detectionMethod: "Generic Mobile Pattern",
              openPorts: mobileMatches,
            };
          }
        }
      }

      return null;
    },
    []
  );

  // Check if host appears to be a mobile device based on patterns
  const isMobileDevice = useCallback((openPorts: number[]): boolean => {
    const mobileIndicators = [
      62078, 3689, 5000, 515, 5555, 8888, 9999, 1900, 8009,
    ];
    return openPorts.some((port) => mobileIndicators.includes(port));
  }, []);

  // Get mobile-specific confidence boost
  const getMobileConfidenceBoost = useCallback(
    (openPorts: number[]): number => {
      const iosIndicators = [62078, 3689, 5000, 515];
      const androidIndicators = [5555, 8888, 9999];

      const iosMatches = openPorts.filter((port) =>
        iosIndicators.includes(port)
      ).length;
      const androidMatches = openPorts.filter((port) =>
        androidIndicators.includes(port)
      ).length;

      return Math.max(iosMatches, androidMatches) * 0.1;
    },
    []
  );

  return {
    detectMobileOS,
    isMobileDevice,
    getMobileConfidenceBoost,
  };
};
