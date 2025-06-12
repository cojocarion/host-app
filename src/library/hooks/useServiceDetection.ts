import { Service, ServiceScanResult } from "@/src/typings/service";
import { useCallback, useState } from "react";

// Common ports and services to scan
const COMMON_SERVICES = [
  { port: 21, name: "FTP", protocol: "tcp" },
  { port: 22, name: "SSH", protocol: "tcp" },
  { port: 23, name: "Telnet", protocol: "tcp" },
  { port: 25, name: "SMTP", protocol: "tcp" },
  { port: 53, name: "DNS", protocol: "tcp" },
  { port: 80, name: "HTTP", protocol: "tcp" },
  { port: 110, name: "POP3", protocol: "tcp" },
  { port: 143, name: "IMAP", protocol: "tcp" },
  { port: 443, name: "HTTPS", protocol: "tcp" },
  { port: 993, name: "IMAPS", protocol: "tcp" },
  { port: 995, name: "POP3S", protocol: "tcp" },
  { port: 3389, name: "RDP", protocol: "tcp" },
  { port: 5432, name: "PostgreSQL", protocol: "tcp" },
  { port: 3306, name: "MySQL", protocol: "tcp" },
  { port: 1433, name: "MSSQL", protocol: "tcp" },
  { port: 27017, name: "MongoDB", protocol: "tcp" },
  { port: 6379, name: "Redis", protocol: "tcp" },
  { port: 5672, name: "RabbitMQ", protocol: "tcp" },
];

export const useServiceDetection = () => {
  const [scanResults, setScanResults] = useState<
    Map<string, ServiceScanResult>
  >(new Map());
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Check if a port is open using fetch with timeout
  const checkPort = useCallback(
    async (ip: string, port: number, serviceName: string): Promise<Service> => {
      const startTime = Date.now();

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        let url: string;
        let protocol = "tcp";

        // Try different protocols based on port
        if (port === 80) {
          url = `http://${ip}:${port}`;
        } else if (port === 443) {
          url = `https://${ip}:${port}`;
        } else {
          // For other ports, try HTTP first
          url = `http://${ip}:${port}`;
        }

        const response = await fetch(url, {
          method: "HEAD",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const responseTime = Date.now() - startTime;

        // Try to extract server information from headers
        const serverHeader = response.headers.get("server");
        const banner = serverHeader || undefined;

        return {
          port,
          name: serviceName,
          protocol,
          isOpen: true,
          banner,
          responseTime,
        };
      } catch {
        // If HTTP fails, try to detect if port is open using other methods
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1500);

          // Try HTTPS for common secure ports
          if (port === 443 || port === 993 || port === 995) {
            const response = await fetch(`https://${ip}:${port}`, {
              method: "HEAD",
              signal: controller.signal,
            });

            clearTimeout(timeoutId);
            const responseTime = Date.now() - startTime;

            return {
              port,
              name: serviceName,
              protocol: "tcp",
              isOpen: true,
              responseTime,
            };
          }

          throw new Error("Port closed");
        } catch {
          return {
            port,
            name: serviceName,
            protocol: "tcp",
            isOpen: false,
          };
        }
      }
    },
    []
  );

  // Get service banner and version info
  const getServiceInfo = useCallback(
    async (ip: string, service: Service): Promise<Service> => {
      if (!service.isOpen) return service;

      try {
        if (service.port === 80 || service.port === 443) {
          const protocol = service.port === 443 ? "https" : "http";
          const response = await fetch(`${protocol}://${ip}:${service.port}`, {
            method: "GET",
            signal: AbortSignal.timeout(3000),
          });

          const serverHeader = response.headers.get("server");
          const poweredBy = response.headers.get("x-powered-by");

          let banner = serverHeader || "";
          if (poweredBy) {
            banner += ` (${poweredBy})`;
          }

          return {
            ...service,
            banner: banner || service.banner,
          };
        }

        return service;
      } catch {
        return service;
      }
    },
    []
  );

  // Scan services for a single host
  const scanHostServices = useCallback(
    async (ip: string): Promise<ServiceScanResult> => {
      const services: Service[] = [];

      // Update scanning state for this IP
      setScanResults(
        (prev) =>
          new Map(
            prev.set(ip, {
              ip,
              services: [],
              scanTime: new Date(),
              isScanning: true,
            })
          )
      );

      try {
        // Scan common services in batches
        const batchSize = 5;
        for (let i = 0; i < COMMON_SERVICES.length; i += batchSize) {
          const batch = COMMON_SERVICES.slice(i, i + batchSize);
          const batchPromises = batch.map(({ port, name }) =>
            checkPort(ip, port, name)
          );

          const batchResults = await Promise.allSettled(batchPromises);

          for (const result of batchResults) {
            if (result.status === "fulfilled") {
              const service = result.value;
              if (service.isOpen) {
                // Get additional service information
                const detailedService = await getServiceInfo(ip, service);
                services.push(detailedService);
              }
            }
          }

          // Update progress and results incrementally
          const currentResult: ServiceScanResult = {
            ip,
            services: [...services],
            scanTime: new Date(),
            isScanning: true,
          };

          setScanResults((prev) => new Map(prev.set(ip, currentResult)));

          // Small delay between batches
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        const finalResult: ServiceScanResult = {
          ip,
          services,
          scanTime: new Date(),
          isScanning: false,
        };

        setScanResults((prev) => new Map(prev.set(ip, finalResult)));
        return finalResult;
      } catch (err) {
        const errorResult: ServiceScanResult = {
          ip,
          services,
          scanTime: new Date(),
          isScanning: false,
        };

        setScanResults((prev) => new Map(prev.set(ip, errorResult)));
        return errorResult;
      }
    },
    [checkPort, getServiceInfo]
  );

  // Scan services for multiple hosts
  const scanMultipleHosts = useCallback(
    async (ips: string[]) => {
      setIsScanning(true);
      setScanProgress(0);
      setError(null);

      try {
        const totalHosts = ips.length;

        for (let i = 0; i < ips.length; i++) {
          await scanHostServices(ips[i]);

          // Update overall progress
          const progress = ((i + 1) / totalHosts) * 100;
          setScanProgress(progress);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Service scan failed";
        setError(errorMessage);
      } finally {
        setIsScanning(false);
        setScanProgress(100);
      }
    },
    [scanHostServices]
  );

  // Get scan result for specific IP
  const getScanResult = useCallback(
    (ip: string): ServiceScanResult | undefined => {
      return scanResults.get(ip);
    },
    [scanResults]
  );

  // Clear all scan results
  const clearResults = useCallback(() => {
    setScanResults(new Map());
    setScanProgress(0);
    setError(null);
  }, []);

  return {
    scanResults: Array.from(scanResults.values()),
    isScanning,
    scanProgress,
    error,
    scanHostServices,
    scanMultipleHosts,
    getScanResult,
    clearResults,
    commonServices: COMMON_SERVICES,
  };
};
