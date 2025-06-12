import { useCallback } from "react";

export const useHostDetection = () => {
  const imagePreloadPing = useCallback(async (ip: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        resolve(false);
      }, 1200);

      let hasResponded = false;

      img.onload = () => {
        if (!hasResponded) {
          hasResponded = true;
          clearTimeout(timeout);
          resolve(true);
        }
      };

      img.onerror = (event) => {
        if (!hasResponded) {
          hasResponded = true;
          clearTimeout(timeout);

          const responseTime = Date.now() - startTime;

          if (responseTime < 600) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      };

      const startTime = Date.now();

      img.src = `http://${ip}/favicon.ico?t=${Date.now()}`;
    });
  }, []);

  const httpPing = useCallback(async (ip: string): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600);

      try {
        const response = await fetch(`http://${ip}`, {
          method: "HEAD",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        return response.status >= 200 && response.status < 600;
      } catch (error: any) {
        clearTimeout(timeoutId);

        if (error.name === "AbortError") {
          return false;
        }

        return false;
      }
    } catch {
      return false;
    }
  }, []);

  const checkCommonPorts = useCallback(async (ip: string): Promise<boolean> => {
    const commonPorts = [22, 80, 443, 8080, 1900, 5000];

    for (const port of commonPorts) {
      try {
        const portController = new AbortController();
        const portTimeout = setTimeout(() => portController.abort(), 500);

        const response = await fetch(`http://${ip}:${port}`, {
          method: "HEAD",
          signal: portController.signal,
        });

        clearTimeout(portTimeout);

        if (response.status >= 200 && response.status < 600) {
          return true;
        }
      } catch {
        continue;
      }
    }

    return false;
  }, []);

  return {
    imagePreloadPing,
    httpPing,
    checkCommonPorts,
  };
};
