import ScannerScreen from "@/src/components/network-scanner/scanner-screen";
import { theme } from "@/src/library/constants/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  const handleNavigateToHistory = () => {
    // TODO: Implement navigation to history screen
  };

  const handleNavigateToSettings = () => {
    // TODO: Implement navigation to settings screen
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScannerScreen
        onNavigateToHistory={handleNavigateToHistory}
        onNavigateToSettings={handleNavigateToSettings}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});
