import { useCallback } from "react";
import { AdvancedDevice } from "./useAdvancedNetworkScanner";

export const useHTTPServiceDetection = () => {
  // HTTP service detection with device identification
  const detectHTTPServices = useCallback(async (ip: string) => {
    const ports = [80, 443, 8080, 8000, 3000, 5000];
    let active = false;
    let hostname: string | undefined;
    let deviceType: AdvancedDevice["deviceType"] = "unknown";
    const services: string[] = [];

    for (const port of ports) {
      try {
        const response = await fetch(`http://${ip}:${port}`, {
          method: "HEAD",
          signal: AbortSignal.timeout(1000),
        });

        if (response.ok) {
          active = true;
          services.push(`HTTP:${port}`);

          // Analyze headers for device type
          const server = response.headers.get("server")?.toLowerCase() || "";
          if (server.includes("apache") || server.includes("nginx")) {
            deviceType = "computer";
          } else if (server.includes("iot") || server.includes("esp")) {
            deviceType = "iot";
          }
        }
      } catch {
        continue;
      }
    }

    return { active, hostname, deviceType, services };
  }, []);

  return {
    detectHTTPServices,
  };
};
