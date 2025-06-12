import { useCallback } from "react";
import { AdvancedDevice } from "./useAdvancedNetworkScanner";

export const useUPnPDiscovery = () => {
  // UPnP device discovery
  const tryUPnPDiscovery = useCallback(async (ip: string) => {
    const upnpPorts = [1900, 49152, 49153, 49154, 8080];

    for (const port of upnpPorts) {
      try {
        const response = await fetch(`http://${ip}:${port}/description.xml`, {
          method: "GET",
          signal: AbortSignal.timeout(1500),
        });

        if (response.ok) {
          const xml = await response.text();
          return parseUPnPDescription(xml);
        }
      } catch {
        continue;
      }
    }
    return null;
  }, []);

  // Parse UPnP device description
  const parseUPnPDescription = (xml: string) => {
    try {
      const friendlyName =
        xml.match(/<friendlyName>([^<]+)<\/friendlyName>/)?.[1] ||
        "Unknown Device";
      const manufacturer =
        xml.match(/<manufacturer>([^<]+)<\/manufacturer>/)?.[1] || "Unknown";
      const modelName =
        xml.match(/<modelName>([^<]+)<\/modelName>/)?.[1] || "Unknown Model";
      const serialNumber = xml.match(
        /<serialNumber>([^<]+)<\/serialNumber>/
      )?.[1];

      return {
        friendlyName,
        manufacturer,
        modelName,
        serialNumber,
      };
    } catch {
      return null;
    }
  };

  // Determine device type from UPnP info
  const determineDeviceType = useCallback(
    (upnpInfo: any): AdvancedDevice["deviceType"] => {
      const name = upnpInfo.friendlyName.toLowerCase();
      const manufacturer = upnpInfo.manufacturer.toLowerCase();

      if (
        name.includes("tv") ||
        name.includes("chromecast") ||
        manufacturer.includes("samsung") ||
        manufacturer.includes("lg")
      ) {
        return "smart-tv";
      }
      if (
        name.includes("router") ||
        name.includes("gateway") ||
        manufacturer.includes("cisco") ||
        manufacturer.includes("netgear")
      ) {
        return "router";
      }
      if (
        name.includes("printer") ||
        manufacturer.includes("hp") ||
        manufacturer.includes("canon")
      ) {
        return "printer";
      }
      if (
        name.includes("phone") ||
        name.includes("iphone") ||
        name.includes("android")
      ) {
        return "mobile";
      }

      return "unknown";
    },
    []
  );

  return {
    tryUPnPDiscovery,
    determineDeviceType,
  };
};
