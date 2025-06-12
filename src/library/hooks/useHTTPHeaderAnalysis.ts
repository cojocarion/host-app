import { OSInfo } from "@/src/typings/os-detection";
import { useCallback } from "react";

// OS detection patterns based on HTTP headers and behavior
const OS_SIGNATURES = {
  Server: {
    "Microsoft-IIS": { os: "Windows", confidence: 0.8 },
    Apache: { os: "Linux/Unix", confidence: 0.6 },
    nginx: { os: "Linux/Unix", confidence: 0.6 },
    lighttpd: { os: "Linux/Unix", confidence: 0.6 },
  },
  "X-Powered-By": {
    "ASP.NET": { os: "Windows", confidence: 0.9 },
    PHP: { os: "Linux/Unix", confidence: 0.6 },
  },
  "X-AspNet-Version": {
    pattern: /\d+\.\d+/,
    os: "Windows",
    confidence: 0.9,
  },
};

export const useHTTPHeaderAnalysis = () => {
  // Extract OS info from HTTP headers
  const analyzeHttpHeaders = useCallback(
    (headers: Headers): Partial<OSInfo> => {
      let bestMatch: Partial<OSInfo> = { confidence: 0 };

      // Check Server header
      const serverHeader = headers.get("server");
      if (serverHeader) {
        for (const [pattern, info] of Object.entries(OS_SIGNATURES.Server)) {
          if (serverHeader.toLowerCase().includes(pattern.toLowerCase())) {
            if (info.confidence > bestMatch.confidence!) {
              bestMatch = {
                os: info.os,
                confidence: info.confidence,
                fingerprint: serverHeader,
                detectionMethod: "HTTP Server Header",
              };
            }
          }
        }
      }

      // Check X-Powered-By header
      const poweredBy = headers.get("x-powered-by");
      if (poweredBy) {
        for (const [pattern, info] of Object.entries(
          OS_SIGNATURES["X-Powered-By"]
        )) {
          if (poweredBy.toLowerCase().includes(pattern.toLowerCase())) {
            if (info.confidence > bestMatch.confidence!) {
              bestMatch = {
                os: info.os,
                confidence: info.confidence,
                fingerprint: poweredBy,
                detectionMethod: "HTTP X-Powered-By Header",
              };
            }
          }
        }
      }

      // Check ASP.NET version
      const aspNetVersion = headers.get("x-aspnet-version");
      if (aspNetVersion) {
        bestMatch = {
          os: "Windows",
          version: aspNetVersion,
          confidence: 0.9,
          fingerprint: aspNetVersion,
          detectionMethod: "ASP.NET Version Header",
        };
      }

      return bestMatch;
    },
    []
  );

  // Analyze HTTP/HTTPS responses from a host
  const analyzeHostHeaders = useCallback(
    async (ip: string): Promise<Partial<OSInfo> | null> => {
      // Method 1: HTTP header analysis
      try {
        const response = await fetch(`http://${ip}:80`, {
          method: "GET",
          signal: AbortSignal.timeout(5000),
        });

        const httpInfo = analyzeHttpHeaders(response.headers);
        if (httpInfo.confidence && httpInfo.confidence > 0) {
          return httpInfo;
        }
      } catch {
        // Try HTTPS
        try {
          const response = await fetch(`https://${ip}:443`, {
            method: "GET",
            signal: AbortSignal.timeout(5000),
          });

          const httpsInfo = analyzeHttpHeaders(response.headers);
          if (httpsInfo.confidence && httpsInfo.confidence > 0) {
            return httpsInfo;
          }
        } catch {
          // HTTP(S) detection failed
        }
      }

      return null;
    },
    [analyzeHttpHeaders]
  );

  return {
    analyzeHttpHeaders,
    analyzeHostHeaders,
  };
};
