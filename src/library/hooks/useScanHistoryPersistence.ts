import { NetworkHost } from "@/src/typings/network";
import { OSDetectionResult } from "@/src/typings/os-detection";
import { ServiceScanResult } from "@/src/typings/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { ScanHistory, ScanSession } from "../../typings/scan";

const STORAGE_KEYS = {
  SCAN_HISTORY: "@network_scanner_history",
} as const;

export const useScanHistoryPersistence = (
  setErrorState: (error: string | null) => void,
  maxHistoryItems: number
) => {
  const [scanHistory, setScanHistory] = useState<ScanHistory>({
    sessions: [],
    totalScans: 0,
  });

  // Load scan history from storage
  const loadScanHistory = useCallback(async (): Promise<ScanHistory> => {
    try {
      const historyData = await AsyncStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
      if (historyData) {
        const parsedHistory = JSON.parse(historyData);
        // Convert timestamp strings back to Date objects
        const processedHistory: ScanHistory = {
          ...parsedHistory,
          sessions: parsedHistory.sessions.map((session: any) => ({
            ...session,
            timestamp: new Date(session.timestamp),
            hosts: session.hosts.map((host: any) => ({
              ...host,
              lastSeen: new Date(host.lastSeen),
            })),
            services: session.services.map((service: any) => ({
              ...service,
              scanTime: new Date(service.scanTime),
            })),
            osDetection: session.osDetection.map((detection: any) => ({
              ...detection,
              osInfo: detection.osInfo
                ? {
                    ...detection.osInfo,
                    detectionTime: new Date(detection.osInfo.detectionTime),
                  }
                : null,
            })),
          })),
          lastScanDate: parsedHistory.lastScanDate
            ? new Date(parsedHistory.lastScanDate)
            : undefined,
        };
        setScanHistory(processedHistory);
        return processedHistory;
      }
      const emptyHistory = { sessions: [], totalScans: 0 };
      setScanHistory(emptyHistory);
      return emptyHistory;
    } catch (err) {
      setErrorState("Failed to load scan history");
      const emptyHistory = { sessions: [], totalScans: 0 };
      setScanHistory(emptyHistory);
      return emptyHistory;
    }
  }, [setErrorState]);

  // Save scan history to storage
  const saveScanHistory = useCallback(
    async (history: ScanHistory) => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.SCAN_HISTORY,
          JSON.stringify(history)
        );
        setScanHistory(history);
      } catch (err) {
        setErrorState("Failed to save scan history");
      }
    },
    [setErrorState]
  );

  // Save a new scan session
  const saveScanSession = useCallback(
    async (
      networkInfo: ScanSession["networkInfo"],
      hosts: NetworkHost[],
      services: ServiceScanResult[],
      osDetection: OSDetectionResult[],
      scanDuration?: number
    ) => {
      try {
        const newSession: ScanSession = {
          id: `scan_${Date.now()}`,
          timestamp: new Date(),
          networkInfo,
          hosts,
          services,
          osDetection,
          scanDuration,
          totalHosts: hosts.length,
          activeHosts: hosts.filter((host) => host.isActive).length,
        };

        // Get current history directly from storage instead of using loadScanHistory
        const historyData = await AsyncStorage.getItem(
          STORAGE_KEYS.SCAN_HISTORY
        );
        let currentHistory: ScanHistory = { sessions: [], totalScans: 0 };

        if (historyData) {
          const parsedHistory = JSON.parse(historyData);
          currentHistory = {
            ...parsedHistory,
            sessions: parsedHistory.sessions.map((session: any) => ({
              ...session,
              timestamp: new Date(session.timestamp),
              hosts: session.hosts.map((host: any) => ({
                ...host,
                lastSeen: new Date(host.lastSeen),
              })),
              services: session.services.map((service: any) => ({
                ...service,
                scanTime: new Date(service.scanTime),
              })),
              osDetection: session.osDetection.map((detection: any) => ({
                ...detection,
                osInfo: detection.osInfo
                  ? {
                      ...detection.osInfo,
                      detectionTime: new Date(detection.osInfo.detectionTime),
                    }
                  : null,
              })),
            })),
            lastScanDate: parsedHistory.lastScanDate
              ? new Date(parsedHistory.lastScanDate)
              : undefined,
          };
        }

        const updatedSessions = [newSession, ...currentHistory.sessions];
        // Apply max history limit
        const limitedSessions = updatedSessions.slice(0, maxHistoryItems);

        const updatedHistory: ScanHistory = {
          sessions: limitedSessions,
          totalScans: currentHistory.totalScans + 1,
          lastScanDate: new Date(),
        };

        await saveScanHistory(updatedHistory);
        return newSession;
      } catch (err) {
        setErrorState("Failed to save scan session");
        return null;
      }
    },
    [saveScanHistory, maxHistoryItems, setErrorState]
  );

  // Delete a scan session
  const deleteScanSession = useCallback(
    async (sessionId: string) => {
      try {
        // Use the current state instead of reloading
        const updatedSessions = scanHistory.sessions.filter(
          (session) => session.id !== sessionId
        );

        const updatedHistory: ScanHistory = {
          ...scanHistory,
          sessions: updatedSessions,
        };

        await saveScanHistory(updatedHistory);
      } catch (err) {
        setErrorState("Failed to delete scan session");
      }
    },
    [scanHistory, saveScanHistory, setErrorState]
  );

  // Clear all scan history
  const clearScanHistory = useCallback(async () => {
    try {
      const emptyHistory: ScanHistory = { sessions: [], totalScans: 0 };
      await saveScanHistory(emptyHistory);
    } catch (err) {
      setErrorState("Failed to clear scan history");
    }
  }, [saveScanHistory, setErrorState]);

  // Get scan session by ID
  const getScanSession = useCallback(
    (sessionId: string): ScanSession | undefined => {
      return scanHistory.sessions.find((session) => session.id === sessionId);
    },
    [scanHistory]
  );

  return {
    scanHistory,
    loadScanHistory,
    saveScanHistory,
    saveScanSession,
    deleteScanSession,
    clearScanHistory,
    getScanSession,
  };
};
