import { theme } from "@/src/library/constants/theme";
import { useState } from "react";
import { NetworkHost } from "../../../../typings/network";
import { OSDetectionResult } from "../../../../typings/os-detection";
import { ServiceScanResult } from "../../../../typings/service";

export const useHostItemLogic = (
  host: NetworkHost,
  services: ServiceScanResult | undefined,
  osInfo: OSDetectionResult | undefined,
  isScanning: boolean
) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasServices =
    services && services.services.filter((s: any) => s.isOpen).length > 0;
  const hasOSInfo = osInfo && osInfo.osInfo;
  const hasDetails = hasServices || hasOSInfo;

  const getHostIcon = () => {
    const osName = osInfo?.osInfo?.os.toLowerCase() || "";
    const hostname = host.hostname?.toLowerCase() || "";

    // Check OS detection first
    if (osName.includes("windows")) return "desktop-outline";
    if (osName.includes("linux")) return "terminal-outline";
    if (osName.includes("macos")) return "laptop-outline";
    if (osName.includes("ios") || osName.includes("iphone"))
      return "phone-portrait-outline";
    if (osName.includes("android")) return "logo-android";

    // Check hostname patterns
    if (hostname.includes("iphone") || hostname.includes("ios"))
      return "phone-portrait-outline";
    if (hostname.includes("android")) return "logo-android";
    if (hostname.includes("mobile")) return "phone-portrait-outline";
    if (hostname.includes("router") || hostname.includes("gateway"))
      return "wifi-outline";
    if (hostname.includes("server") || hostname.includes("web"))
      return "server-outline";
    if (hostname.includes("printer") || hostname.includes("print"))
      return "print-outline";

    return "hardware-chip-outline";
  };

  const getStatusColor = () => {
    if (!host.isActive) return theme.colors.error;
    if (isScanning) return theme.colors.warning;
    return theme.colors.success;
  };

  const toggleExpanded = () => {
    if (hasDetails) {
      setIsExpanded(!isExpanded);
    }
  };

  return {
    isExpanded,
    hasServices,
    hasOSInfo,
    hasDetails,
    getHostIcon,
    getStatusColor,
    toggleExpanded,
  };
};
