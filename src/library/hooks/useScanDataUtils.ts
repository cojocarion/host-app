import { useCallback } from "react";
import { ScanHistory, ScanSession } from "../../typings/scan";

export const useScanDataUtils = (scanHistory: ScanHistory) => {
  // Export scan data as JSON
  const exportScanData = useCallback(
    async (sessionId?: string): Promise<string | null> => {
      try {
        if (sessionId) {
          const session = scanHistory.sessions.find((s) => s.id === sessionId);
          if (session) {
            return JSON.stringify(session, null, 2);
          }
          return null;
        } else {
          return JSON.stringify(scanHistory, null, 2);
        }
      } catch (err) {
        // Failed to export scan data
        return null;
      }
    },
    [scanHistory]
  );

  // Get scan statistics
  const getScanStatistics = useCallback(() => {
    const { sessions } = scanHistory;
    if (sessions.length === 0) {
      return {
        totalScans: 0,
        totalHosts: 0,
        averageHosts: 0,
        mostRecentScan: null,
        averageScanDuration: 0,
      };
    }

    const totalHosts = sessions.reduce(
      (sum, session) => sum + session.totalHosts,
      0
    );
    const scansWithDuration = sessions.filter((s) => s.scanDuration);
    const averageDuration =
      scansWithDuration.length > 0
        ? scansWithDuration.reduce(
            (sum, session) => sum + (session.scanDuration || 0),
            0
          ) / scansWithDuration.length
        : 0;

    return {
      totalScans: sessions.length,
      totalHosts,
      averageHosts: Math.round(totalHosts / sessions.length),
      mostRecentScan: sessions[0]?.timestamp || null,
      averageScanDuration: Math.round(averageDuration),
    };
  }, [scanHistory]);

  // Find sessions by date range
  const getSessionsByDateRange = useCallback(
    (startDate: Date, endDate: Date): ScanSession[] => {
      return scanHistory.sessions.filter(
        (session) =>
          session.timestamp >= startDate && session.timestamp <= endDate
      );
    },
    [scanHistory]
  );

  // Find sessions by network subnet
  const getSessionsBySubnet = useCallback(
    (subnet: string): ScanSession[] => {
      return scanHistory.sessions.filter(
        (session) => session.networkInfo.subnet === subnet
      );
    },
    [scanHistory]
  );

  // Get unique subnets from history
  const getUniqueSubnets = useCallback((): string[] => {
    const subnets = new Set(
      scanHistory.sessions.map((session) => session.networkInfo.subnet)
    );
    return Array.from(subnets);
  }, [scanHistory]);

  return {
    exportScanData,
    getScanStatistics,
    getSessionsByDateRange,
    getSessionsBySubnet,
    getUniqueSubnets,
  };
};
