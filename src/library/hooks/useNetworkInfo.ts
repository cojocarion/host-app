import { NetworkInfo } from "@/src/typings/network";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useCallback } from "react";

export const useNetworkInfo = () => {
  // Get current network information
  const getCurrentNetworkInfo =
    useCallback(async (): Promise<NetworkInfo | null> => {
      try {
        // Add timeout for Android stability
        const netInfoPromise = NetInfo.fetch();
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Network info timeout")), 5000)
        );

        const netInfo: NetInfoState = await Promise.race([
          netInfoPromise,
          timeoutPromise,
        ]);

        if (!netInfo.isConnected || netInfo.type !== "wifi") {
          throw new Error("WiFi connection required for network scanning");
        }

        const details = netInfo.details as any;
        const localIP = details?.ipAddress;
        const subnet = details?.subnet;
        const gateway = details?.gateway;

        if (!localIP) {
          throw new Error("Unable to determine local IP address");
        }

        const networkInfo: NetworkInfo = {
          subnet: subnet || "255.255.255.0",
          gateway: gateway || "",
          localIP,
          isConnected: true,
        };

        console.log("Network info obtained:", networkInfo);
        return networkInfo;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown network error";
        console.error("Failed to get network info:", err);
        throw new Error(errorMessage);
      }
    }, []);

  // Generate IP range for scanning
  const generateIPRange = useCallback(
    (localIP: string, subnet: string): string[] => {
      const ipParts = localIP.split(".").map(Number);

      // For simplicity, assume /24 subnet (255.255.255.0)
      const baseIP = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}`;
      const ips: string[] = [];

      for (let i = 1; i <= 254; i++) {
        if (i !== ipParts[3]) {
          // Skip own IP
          ips.push(`${baseIP}.${i}`);
        }
      }

      return ips;
    },
    []
  );

  return {
    getCurrentNetworkInfo,
    generateIPRange,
  };
};
