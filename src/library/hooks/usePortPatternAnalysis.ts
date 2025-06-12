import { OSInfo } from "@/src/typings/os-detection";
import { useCallback } from "react";

// Port-based OS detection patterns
const PORT_PATTERNS = {
  windows: [135, 139, 445, 3389, 1433, 5985],
  linux: [22, 111, 2049],
  macos: [22, 548, 631],
  cisco: [23, 161, 514],
  ios: [62078, 3689, 5000, 515, 8080], // iTunes, DAAP, AirPlay, AirPrint, HTTP
  android: [5555, 8888, 9999, 8080], // ADB, HTTP servers, development
};

// TTL-based OS detection (though limited in modern networks due to NAT)
const TTL_SIGNATURES: Record<number, { os: string; confidence: number }> = {
  64: { os: "Linux/Unix", confidence: 0.4 },
  128: { os: "Windows", confidence: 0.4 },
  255: { os: "Cisco/Network Device", confidence: 0.5 },
  30: { os: "macOS", confidence: 0.4 },
};

export const usePortPatternAnalysis = () => {
  // Analyze open ports for OS patterns
  const analyzePortPattern = useCallback(
    (openPorts: number[]): Partial<OSInfo> => {
      let bestMatch: Partial<OSInfo> = { confidence: 0 };

      for (const [osType, ports] of Object.entries(PORT_PATTERNS)) {
        const matchingPorts = openPorts.filter((port) => ports.includes(port));
        const confidence = matchingPorts.length / ports.length;

        if (confidence > bestMatch.confidence! && confidence > 0.2) {
          let osName = osType;
          let confidenceMultiplier = 0.7;

          if (osType === "linux") osName = "Linux/Unix";
          else if (osType === "macos") osName = "macOS";
          else if (osType === "windows") osName = "Windows";
          else if (osType === "cisco") osName = "Cisco/Network Device";
          else if (osType === "ios") {
            osName = "iOS";
            confidenceMultiplier = 0.9; // Higher confidence for mobile-specific ports
          } else if (osType === "android") {
            osName = "Android";
            confidenceMultiplier = 0.9; // Higher confidence for mobile-specific ports
          }

          bestMatch = {
            os: osName,
            confidence: Math.min(confidence * confidenceMultiplier, 0.95),
            detectionMethod: "Port Pattern Analysis",
            openPorts: matchingPorts,
          };
        }
      }

      return bestMatch;
    },
    []
  );

  // Try to get TTL from ping-like operation (simplified)
  const estimateTTL = useCallback(
    async (ip: string): Promise<number | null> => {
      try {
        const startTime = Date.now();
        const responseTime = Date.now() - startTime;

        // Very rough heuristic based on response patterns
        if (responseTime < 10) return 64; // Local network, likely Linux
        if (responseTime < 50) return 128; // Local network, likely Windows
        return null; // Unable to determine
      } catch {
        return null;
      }
    },
    []
  );

  // Analyze TTL for OS detection
  const analyzeTTL = useCallback(
    async (ip: string): Promise<Partial<OSInfo> | null> => {
      const ttl = await estimateTTL(ip);
      if (ttl && TTL_SIGNATURES[ttl]) {
        const ttlInfo = TTL_SIGNATURES[ttl];
        return {
          os: ttlInfo.os,
          confidence: ttlInfo.confidence,
          ttl,
          detectionMethod: "TTL Analysis",
        };
      }
      return null;
    },
    [estimateTTL]
  );

  return {
    analyzePortPattern,
    analyzeTTL,
    estimateTTL,
  };
};
