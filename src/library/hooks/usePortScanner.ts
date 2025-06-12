import { useCallback } from "react";
import { AdvancedDevice } from "./useAdvancedNetworkScanner";

export const usePortScanner = () => {
  // Scan common ports for device identification
  const scanCommonPorts = useCallback(async (ip: string) => {
    const portMap = {
      22: { service: "SSH", deviceType: "computer" as const },
      23: { service: "Telnet", deviceType: "router" as const },
      80: { service: "HTTP", deviceType: "unknown" as const },
      443: { service: "HTTPS", deviceType: "unknown" as const },
      631: { service: "IPP", deviceType: "printer" as const },
      1900: { service: "UPnP", deviceType: "smart-tv" as const },
      3389: { service: "RDP", deviceType: "computer" as const },
      5000: { service: "AirPlay", deviceType: "mobile" as const },
      8080: { service: "Alt-HTTP", deviceType: "iot" as const },
    };

    let active = false;
    let deviceType: AdvancedDevice["deviceType"] = "unknown";
    const services: string[] = [];

    for (const [port, info] of Object.entries(portMap)) {
      try {
        await fetch(`http://${ip}:${port}`, {
          method: "HEAD",
          signal: AbortSignal.timeout(800),
        });

        active = true;
        services.push(info.service);
        if (deviceType === "unknown") {
          deviceType = info.deviceType;
        }
      } catch {
        continue;
      }
    }

    return { active, deviceType, services };
  }, []);

  return {
    scanCommonPorts,
  };
};
