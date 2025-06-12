import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import HostsList from "../list";
import NetworkInfoCard from "../network-info-card";
import ScanProgress from "../scan-progress";
import ScanControls from "../ScanControls";
import { useScannerLogic } from "./hooks/useScannerLogic";
import { EmptyState, ErrorList, Header, StatsSection } from "./parts";
import { styles } from "./styles";

export interface ScannerScreenProps {
  onNavigateToHistory?: () => void;
  onNavigateToSettings?: () => void;
}

const ScannerScreen: React.FC<ScannerScreenProps> = ({
  onNavigateToHistory,
  onNavigateToSettings,
}) => {
  const {
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
  } = useScannerLogic();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.content}>
        <Header />

        <ErrorList
          networkError={networkError || undefined}
          serviceError={serviceError || undefined}
          osError={osError || undefined}
          persistenceError={persistenceError || undefined}
        />

        <NetworkInfoCard
          networkInfo={networkInfo}
          isConnected={!!networkInfo?.isConnected}
          onRefresh={getCurrentNetworkInfo}
        />

        <ScanControls
          onStartScan={handleFullScan}
          isScanning={isAnyScanning}
          isNetworkAvailable={!!networkInfo?.isConnected}
          settings={appSettings}
          onNavigateToSettings={onNavigateToSettings}
        />

        {isAnyScanning && (
          <ScanProgress
            networkProgress={networkProgress}
            serviceProgress={serviceProgress}
            osProgress={osProgress}
            overallProgress={overallProgress}
            isNetworkScanning={isNetworkScanning}
            isServiceScanning={isServiceScanning}
            isOSDetecting={isOSDetecting}
            scanStats={scanStats}
          />
        )}

        <StatsSection scanStats={scanStats} isScanning={isAnyScanning} />

        {discoveredHosts.length > 0 && (
          <HostsList
            hosts={discoveredHosts}
            serviceResults={serviceResults}
            osResults={osResults}
            isScanning={isAnyScanning}
            onNavigateToHistory={onNavigateToHistory}
          />
        )}

        <EmptyState
          isScanning={isAnyScanning}
          hasHosts={discoveredHosts.length > 0}
          isConnected={!!networkInfo?.isConnected}
        />
      </View>
    </ScrollView>
  );
};

export default ScannerScreen;
