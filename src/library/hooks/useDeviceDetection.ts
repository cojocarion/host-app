import { useCallback } from "react";
import { AdvancedDevice } from "./useAdvancedNetworkScanner";
import { useHTTPServiceDetection } from "./useHTTPServiceDetection";
import { usePortScanner } from "./usePortScanner";
import { useUPnPDiscovery } from "./useUPnPDiscovery";
import { useWebSocketProbe } from "./useWebSocketProbe";

export const useDeviceDetection = () => {
  const { tryUPnPDiscovery, determineDeviceType } = useUPnPDiscovery();
  const { probeWebSocket } = useWebSocketProbe();
  const { detectHTTPServices } = useHTTPServiceDetection();
  const { scanCommonPorts } = usePortScanner();

  const detectDeviceAdvanced = useCallback(
    async (ip: string): Promise<AdvancedDevice | null> => {
      const startTime = Date.now();
      let deviceInfo: Partial<AdvancedDevice> = {
        ip,
        isActive: false,
        lastSeen: new Date(),
      };

      try {
        const upnpInfo = await tryUPnPDiscovery(ip);
        if (upnpInfo) {
          deviceInfo.isActive = true;
          deviceInfo.upnpInfo = upnpInfo;
          deviceInfo.hostname = upnpInfo.friendlyName;
          deviceInfo.deviceType = determineDeviceType(upnpInfo);
          deviceInfo.manufacturer = upnpInfo.manufacturer;
        }

        const wsSupport = await probeWebSocket(ip);
        if (wsSupport.supported) {
          deviceInfo.isActive = true;
          deviceInfo.websocketSupport = true;
          deviceInfo.services = wsSupport.services;
          deviceInfo.deviceType = deviceInfo.deviceType || "iot";
        }

        const httpInfo = await detectHTTPServices(ip);
        if (httpInfo.active) {
          deviceInfo.isActive = true;
          deviceInfo.hostname = deviceInfo.hostname || httpInfo.hostname;
          deviceInfo.deviceType = deviceInfo.deviceType || httpInfo.deviceType;
          deviceInfo.services = [
            ...(deviceInfo.services || []),
            ...(httpInfo.services || []),
          ];
        }

        const portInfo = await scanCommonPorts(ip);
        if (portInfo.active) {
          deviceInfo.isActive = true;
          deviceInfo.deviceType = deviceInfo.deviceType || portInfo.deviceType;
          deviceInfo.services = [
            ...(deviceInfo.services || []),
            ...(portInfo.services || []),
          ];
        }

        if (deviceInfo.isActive) {
          deviceInfo.responseTime = Date.now() - startTime;
          return deviceInfo as AdvancedDevice;
        }

        return null;
      } catch {
        return null;
      }
    },
    [
      tryUPnPDiscovery,
      determineDeviceType,
      probeWebSocket,
      detectHTTPServices,
      scanCommonPorts,
    ]
  );

  return {
    detectDeviceAdvanced,
  };
};
