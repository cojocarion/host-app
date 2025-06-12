import { theme } from "@/src/library/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NetworkHost } from "../../../typings/network";
import { OSDetectionResult } from "../../../typings/os-detection";
import { ServiceScanResult } from "../../../typings/service";
import { useHostsListLogic } from "./hooks/useHostsListLogic";
import { EmptyState } from "./parts/empty-state";
import { HostItem } from "./parts/host-item";
import { styles } from "./styles";

export interface HostsListProps {
  hosts: NetworkHost[];
  serviceResults: ServiceScanResult[];
  osResults: OSDetectionResult[];
  isScanning: boolean;
  onNavigateToHistory?: () => void;
}

const HostsList: React.FC<HostsListProps> = ({
  hosts,
  serviceResults,
  osResults,
  isScanning,
  onNavigateToHistory,
}) => {
  const { activeHosts, inactiveHosts } = useHostsListLogic(hosts);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Network Discovery Tree ({hosts.length})
        </Text>
        {onNavigateToHistory && (
          <TouchableOpacity
            onPress={onNavigateToHistory}
            style={styles.historyButton}
          >
            <Ionicons
              name="time-outline"
              size={16}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        bounces={false}
      >
        {/* Active Hosts Forest */}
        {activeHosts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={theme.colors.success}
              />
              <Text style={styles.sectionTitle}>
                Active Devices ({activeHosts.length})
              </Text>
            </View>
            {activeHosts.map((host) => {
              const hostServices = serviceResults.find((s) => s.ip === host.ip);
              const hostOS = osResults.find((o) => o.ip === host.ip);

              return (
                <HostItem
                  key={host.ip}
                  host={host}
                  services={hostServices}
                  osInfo={hostOS}
                  isScanning={isScanning}
                />
              );
            })}
          </View>
        )}

        {/* Inactive Hosts Forest */}
        {inactiveHosts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="close-circle"
                size={16}
                color={theme.colors.error}
              />
              <Text
                style={[
                  styles.sectionTitle,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Inactive Devices ({inactiveHosts.length})
              </Text>
            </View>
            {inactiveHosts.map((host) => (
              <HostItem
                key={host.ip}
                host={host}
                services={undefined}
                osInfo={undefined}
                isScanning={isScanning}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {hosts.length === 0 && <EmptyState />}
    </View>
  );
};

export default HostsList;
