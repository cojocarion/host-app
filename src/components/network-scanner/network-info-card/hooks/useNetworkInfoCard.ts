import { NetworkInfo } from "@/src/typings/network";
import { useMemo } from "react";

export interface UseNetworkInfoCardProps {
  networkInfo: NetworkInfo | null;
  isConnected: boolean;
}

export const useNetworkInfoCard = ({
  networkInfo,
  isConnected,
}: UseNetworkInfoCardProps) => {
  const hasValidNetwork = useMemo(() => {
    return isConnected && networkInfo;
  }, [isConnected, networkInfo]);

  const networkDetails = useMemo(() => {
    if (!networkInfo) return null;

    return {
      localIP: networkInfo.localIP,
      gateway: networkInfo.gateway || "Unknown",
      subnet: networkInfo.subnet,
      isConnected: isConnected,
    };
  }, [networkInfo, isConnected]);

  return {
    hasValidNetwork,
    networkDetails,
  };
};
