import { useEffect } from "react";
import { useAppSettingsPersistence } from "./useAppSettingsPersistence";
import { useScanDataUtils } from "./useScanDataUtils";
import { useScanHistoryPersistence } from "./useScanHistoryPersistence";
import { useStorageState } from "./useStorageState";

export { AppSettings } from "./useAppSettingsPersistence";

export const useDataPersistence = () => {
  const { isLoading, error, setLoadingState, setErrorState } =
    useStorageState();

  const { appSettings, loadAppSettings, saveAppSettings } =
    useAppSettingsPersistence(setErrorState);

  const {
    scanHistory,
    loadScanHistory,
    saveScanSession,
    deleteScanSession,
    clearScanHistory,
    getScanSession,
  } = useScanHistoryPersistence(setErrorState, appSettings.maxHistoryItems);

  const {
    exportScanData,
    getScanStatistics,
    getSessionsByDateRange,
    getSessionsBySubnet,
    getUniqueSubnets,
  } = useScanDataUtils(scanHistory);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      setLoadingState(true);
      try {
        await Promise.all([loadScanHistory(), loadAppSettings()]);
      } catch (err) {
        setErrorState("Failed to initialize application data");
      } finally {
        setLoadingState(false);
      }
    };

    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // Data
    scanHistory,
    appSettings,
    isLoading,
    error,

    saveScanSession,
    deleteScanSession,
    getScanSession,
    clearScanHistory,

    // Settings methods
    saveAppSettings,

    // Utility methods
    exportScanData,
    getScanStatistics,
    getSessionsByDateRange,
    getSessionsBySubnet,
    getUniqueSubnets,

    // Manual data loading (for refresh)
    loadScanHistory,
    loadAppSettings,
  };
};
