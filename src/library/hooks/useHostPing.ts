import { NetworkHost } from "@/src/typings/network";
import { useCallback } from "react";
import { useHostDetection } from "./useHostDetection";
import { useHostnameDetection } from "./useHostnameDetection";

export const useHostPing = () => {
  const { imagePreloadPing, httpPing, checkCommonPorts } = useHostDetection();
  const { detectHostname } = useHostnameDetection();

  // Fast and strict host ping - SIMPLIFIED
  const pingHost = useCallback(
    async (ip: string): Promise<NetworkHost> => {
      const startTime = Date.now();

      // Method 1: Fast image loading test (most reliable)
      try {
        const imageResult = await imagePreloadPing(ip);
        if (imageResult) {
          const responseTime = Date.now() - startTime;
          const hostname = await detectHostname(ip);

          return {
            ip,
            isActive: true,
            responseTime,
            lastSeen: new Date(),
            hostname: hostname || "Network Device",
          };
        }
      } catch {
        // Image test failed, try HTTP
      }

      // Method 2: Fast HTTP ping as backup
      try {
        const httpResult = await httpPing(ip);
        if (httpResult) {
          const responseTime = Date.now() - startTime;
          const hostname = await detectHostname(ip);

          return {
            ip,
            isActive: true,
            responseTime,
            lastSeen: new Date(),
            hostname: hostname || "Network Device",
          };
        }
      } catch {
        // HTTP ping failed
      }

      // Method 3: Quick port check for common devices
      try {
        const portResult = await checkCommonPorts(ip);
        if (portResult) {
          const responseTime = Date.now() - startTime;
          const hostname = await detectHostname(ip);

          return {
            ip,
            isActive: true,
            responseTime,
            lastSeen: new Date(),
            hostname: hostname || "Network Device",
          };
        }
      } catch {
        // Port check failed
      }

      // Host is not reachable
      return {
        ip,
        isActive: false,
        lastSeen: new Date(),
      };
    },
    [imagePreloadPing, httpPing, checkCommonPorts, detectHostname]
  );

  return {
    pingHost,
  };
};
