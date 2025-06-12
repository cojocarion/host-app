import { useCallback } from "react";

export const useWebSocketProbe = () => {
  // WebSocket probing for modern IoT devices
  const probeWebSocket = useCallback(async (ip: string) => {
    const commonWSPorts = [80, 81, 443, 8080, 8081, 8443, 9001, 9002];
    const services: string[] = [];
    let supported = false;

    for (const port of commonWSPorts) {
      try {
        // Try WebSocket connection
        const ws = new WebSocket(`ws://${ip}:${port}`);

        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            ws.close();
            reject(new Error("timeout"));
          }, 1000);

          ws.onopen = () => {
            clearTimeout(timeout);
            supported = true;
            services.push(`WebSocket:${port}`);
            ws.close();
            resolve(true);
          };

          ws.onerror = () => {
            clearTimeout(timeout);
            ws.close();
            reject(new Error("connection failed"));
          };
        });
      } catch {
        continue;
      }
    }

    return { supported, services };
  }, []);

  return {
    probeWebSocket,
  };
};
