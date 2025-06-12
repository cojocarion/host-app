import { useMemo, useState } from "react";
import { Alert } from "react-native";
import { useDataPersistence } from "../../../../library/hooks/useDataPersistence";
import { useNetworkScanner } from "../../../../library/hooks/useNetworkScanner";
import { useOSDetection } from "../../../../library/hooks/useOSDetection";
import { useServiceDetection } from "../../../../library/hooks/useServiceDetection";

export const useScannerLogic = () => {
  const [isFullScanRunning, setIsFullScanRunning] = useState(false);
  const [scanStartTime, setScanStartTime] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {
    networkInfo,
    discoveredHosts,
    isScanning: isNetworkScanning,
    scanProgress: networkProgress,
    error: networkError,
    scanNetwork,
    getCurrentNetworkInfo,
  } = useNetworkScanner();

  const {
    scanResults: serviceResults,
    isScanning: isServiceScanning,
    scanProgress: serviceProgress,
    error: serviceError,
    scanMultipleHosts,
    clearResults: clearServiceResults,
  } = useServiceDetection();

  const {
    detectionResults: osResults,
    isDetecting: isOSDetecting,
    detectionProgress: osProgress,
    error: osError,
    detectMultipleHosts,
    clearResults: clearOSResults,
  } = useOSDetection();

  const {
    appSettings,
    saveScanSession,
    error: persistenceError,
  } = useDataPersistence();

  const overallProgress = useMemo(() => {
    return isFullScanRunning
      ? Math.round(
          networkProgress * 0.4 + serviceProgress * 0.3 + osProgress * 0.3
        )
      : networkProgress;
  }, [isFullScanRunning, networkProgress, serviceProgress, osProgress]);

  const hasAnyError = useMemo(() => {
    return networkError || serviceError || osError || persistenceError;
  }, [networkError, serviceError, osError, persistenceError]);

  const isAnyScanning = useMemo(() => {
    return isNetworkScanning || isServiceScanning || isOSDetecting;
  }, [isNetworkScanning, isServiceScanning, isOSDetecting]);

  const scanStats = useMemo(() => {
    return {
      totalHosts: discoveredHosts.length,
      activeHosts: discoveredHosts.filter((host) => host.isActive).length,
      servicesFound: serviceResults.reduce(
        (total, result) =>
          total + result.services.filter((service) => service.isOpen).length,
        0
      ),
      osDetected: osResults.filter((result) => result.osInfo).length,
    };
  }, [discoveredHosts, serviceResults, osResults]);

  const handleFullScan = async () => {
    if (isAnyScanning) return;

    setIsFullScanRunning(true);
    setScanStartTime(new Date());

    clearServiceResults();
    clearOSResults();

    try {
      const scannedHosts = await scanNetwork();

      if (appSettings.enableServiceScan && scannedHosts.length > 0) {
        const activeIPs = scannedHosts
          .filter((host) => host.isActive)
          .map((host) => host.ip);

        if (activeIPs.length > 0) {
          await scanMultipleHosts(activeIPs);
        }
      }

      if (appSettings.enableOSDetection && scannedHosts.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 100));

        const hostsWithServices = scannedHosts
          .filter((host) => host.isActive)
          .map((host) => {
            const serviceResult = serviceResults.find((s) => s.ip === host.ip);
            const openPorts =
              serviceResult?.services
                .filter((service) => service.isOpen)
                .map((service) => service.port) || [];

            return { ip: host.ip, openPorts };
          });

        if (hostsWithServices.length > 0) {
          await detectMultipleHosts(hostsWithServices);
        }
      }

      if (appSettings.autoSave && networkInfo && scanStartTime) {
        const scanDuration = Date.now() - scanStartTime.getTime();
        await saveScanSession(
          {
            subnet: networkInfo.subnet,
            gateway: networkInfo.gateway,
            localIP: networkInfo.localIP,
          },
          scannedHosts,
          serviceResults,
          osResults,
          scanDuration
        );
      }
    } catch (error) {
      Alert.alert(
        "Scan Failed",
        "The network scan encountered an error. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsFullScanRunning(false);
      setScanStartTime(null);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await getCurrentNetworkInfo();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  return {
    isFullScanRunning,
    refreshing,

    networkInfo,
    discoveredHosts,
    serviceResults,
    osResults,
    appSettings,

    overallProgress,
    hasAnyError,
    isAnyScanning,
    scanStats,
    networkProgress,
    serviceProgress,
    osProgress,
    isNetworkScanning,
    isServiceScanning,
    isOSDetecting,

    networkError,
    serviceError,
    osError,
    persistenceError,

    handleFullScan,
    handleRefresh,
    getCurrentNetworkInfo,
  };
};
