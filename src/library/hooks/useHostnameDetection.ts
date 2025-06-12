import { useCallback } from "react";

export const useHostnameDetection = () => {
  // Enhanced mobile OS detection by connection patterns
  const detectMobileOSByPattern = useCallback(
    async (ip: string): Promise<string> => {
      try {
        // Test iOS-specific patterns
        const iosTests = [
          { port: 62078, weight: 10 }, // iTunes/iOS sync
          { port: 5000, weight: 8 }, // AirPlay
          { port: 3689, weight: 7 }, // iTunes DAAP
          { port: 515, weight: 6 }, // AirPrint
        ];

        // Test Android-specific patterns
        const androidTests = [
          { port: 5555, weight: 10 }, // ADB
          { port: 8888, weight: 7 }, // Common Android HTTP
          { port: 9999, weight: 6 }, // Android dev servers
        ];

        let iosScore = 0;
        let androidScore = 0;

        // Test iOS patterns
        for (const test of iosTests) {
          try {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 500);

            await fetch(`http://${ip}:${test.port}`, {
              method: "HEAD",
              signal: controller.signal,
              mode: "no-cors",
            });

            iosScore += test.weight;
          } catch (error) {
            // Don't count errors as positive indicators
            continue;
          }
        }

        // Test Android patterns
        for (const test of androidTests) {
          try {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 500);

            await fetch(`http://${ip}:${test.port}`, {
              method: "HEAD",
              signal: controller.signal,
              mode: "no-cors",
            });

            androidScore += test.weight;
          } catch (error) {
            // Don't count errors as positive indicators
            continue;
          }
        }

        // Determine OS based on scores
        if (iosScore > androidScore && iosScore > 3) {
          return "iPhone/iOS Device";
        } else if (androidScore > iosScore && androidScore > 3) {
          return "Android Device";
        } else if (iosScore > 0 || androidScore > 0) {
          return "Mobile Device (iOS/Android)";
        }

        return "Mobile/Laptop Device";
      } catch {
        return "Mobile Device";
      }
    },
    []
  );

  // Try to detect hostname/device name
  const detectHostname = useCallback(
    async (ip: string): Promise<string | undefined> => {
      try {
        // Method 1: Try to get server info from HTTP response
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500); // Faster timeout

        try {
          const response = await fetch(`http://${ip}`, {
            method: "HEAD", // Use HEAD instead of GET for faster response
            signal: controller.signal,
            mode: "no-cors",
          });

          clearTimeout(timeoutId);

          // Try to extract useful info from headers
          const serverHeader = response.headers.get("server");
          if (serverHeader) {
            if (serverHeader.includes("Apache")) return "Apache Web Server";
            if (serverHeader.includes("nginx")) return "Nginx Web Server";
            if (serverHeader.includes("IIS")) return "Windows IIS Server";
            if (serverHeader.includes("lighttpd")) return "Lighttpd Server";
          }
        } catch (error) {
          clearTimeout(timeoutId);
          // Log error for debugging
          console.debug(`HTTP detection failed for ${ip}:`, error);
        }

        // Method 2: Enhanced mobile device detection patterns
        const lastOctet = parseInt(ip.split(".")[3]);

        // Common router/gateway IPs
        if (lastOctet === 1) return "Router/Gateway";
        if (lastOctet === 254) return "Network Device";

        // Method 3: Mobile-specific port detection with better identification
        const mobileServices = [
          // iOS specific
          { port: 62078, name: "iPhone Device" },
          { port: 5000, name: "iOS AirPlay Device" },
          { port: 3689, name: "iOS iTunes Device" },
          { port: 515, name: "iOS AirPrint Device" },

          // Android specific
          { port: 5555, name: "Android Device (ADB)" },
          { port: 8888, name: "Android Device (HTTP)" },
          { port: 9999, name: "Android Device (Dev)" },

          // General mobile
          { port: 1900, name: "UPnP Mobile Device" },
          { port: 8009, name: "Mobile Streaming Device" },
          { port: 8080, name: "Mobile Web Server" },

          // Desktop/Server services
          { port: 22, name: "SSH Server (Linux/Mac)" },
          { port: 3389, name: "Windows RDP Server" },
          { port: 631, name: "CUPS Print Server" },
          { port: 548, name: "AFP Server (Mac)" },
          { port: 445, name: "Windows SMB Server" },
          { port: 139, name: "Windows NetBIOS" },
        ];

        for (const service of mobileServices) {
          try {
            const serviceController = new AbortController();
            const serviceTimeoutId = setTimeout(
              () => serviceController.abort(),
              600 // Faster service detection
            );

            await fetch(`http://${ip}:${service.port}`, {
              method: "HEAD",
              signal: serviceController.signal,
              mode: "no-cors",
            });

            clearTimeout(serviceTimeoutId);
            return service.name;
          } catch (error) {
            // Don't count connection errors as positive indicators
            continue;
          }
        }

        // Method 4: DHCP range-based detection with mobile hints
        if (lastOctet >= 100 && lastOctet <= 150) {
          // This range often used for mobile devices
          // Try to detect via connection patterns
          return await detectMobileOSByPattern(ip);
        }

        if (lastOctet >= 151 && lastOctet <= 199) return "Mobile/Laptop Device";
        if (lastOctet >= 200 && lastOctet <= 253) return "Wireless Device";

        return undefined;
      } catch {
        return undefined;
      }
    },
    [detectMobileOSByPattern]
  );

  return {
    detectHostname,
    detectMobileOSByPattern,
  };
};
