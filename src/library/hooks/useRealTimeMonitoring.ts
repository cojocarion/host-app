import { useCallback } from "react";
import { AdvancedDevice } from "./useAdvancedNetworkScanner";

export const useRealTimeMonitoring = () => {
  // Real-time monitoring for WebSocket-enabled devices
  const startRealTimeMonitoring = useCallback(
    (
      devices: AdvancedDevice[],
      setDevices: React.Dispatch<React.SetStateAction<AdvancedDevice[]>>
    ) => {
      const wsDevices = devices.filter((device) => device.websocketSupport);

      wsDevices.forEach((device) => {
        // Connect to each WebSocket-enabled device for real-time updates
        try {
          const ws = new WebSocket(`ws://${device.ip}:8080`);

          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              // Update device info based on WebSocket messages
              setDevices((prev) =>
                prev.map((d) =>
                  d.ip === device.ip
                    ? { ...d, lastHeartbeat: new Date(), ...data }
                    : d
                )
              );
            } catch {
              // Invalid JSON, ignore
            }
          };

          ws.onerror = () => {
            // WebSocket connection lost
          };
        } catch {
          // WebSocket connection failed
        }
      });
    },
    []
  );

  return {
    startRealTimeMonitoring,
  };
};
