import { theme } from "@/src/library/constants/theme";
import { NetworkHost } from "@/src/typings/network";
import { OSDetectionResult } from "@/src/typings/os-detection";
import { ServiceScanResult } from "@/src/typings/service";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useHostItemLogic } from "../hooks/useHostItemLogic";
import { hostItemStyles as styles } from "../styles/hostItem";
import { OSInfoDisplay } from "./info-display";
import { ServicesList } from "./services-list";

interface HostItemProps {
  host: NetworkHost;
  services: ServiceScanResult | undefined;
  osInfo: OSDetectionResult | undefined;
  isScanning: boolean;
}

const HostItem: React.FC<HostItemProps> = ({
  host,
  services,
  osInfo,
  isScanning,
}) => {
  const {
    isExpanded,
    hasServices,
    hasOSInfo,
    hasDetails,
    getHostIcon,
    getStatusColor,
    toggleExpanded,
  } = useHostItemLogic(host, services, osInfo, isScanning);

  return (
    <View style={styles.hostCard}>
      <TouchableOpacity
        onPress={toggleExpanded}
        style={styles.hostHeader}
        disabled={!hasDetails}
      >
        <View style={styles.hostMainInfo}>
          <View
            style={[
              styles.hostStatusDot,
              { backgroundColor: getStatusColor() },
            ]}
          />
          <Ionicons
            name={getHostIcon()}
            size={20}
            color={theme.colors.textSecondary}
            style={styles.hostIcon}
          />
          <View style={styles.hostTextInfo}>
            <Text style={styles.hostIP}>{host.hostname || host.ip}</Text>
            {host.hostname && (
              <Text style={styles.hostSecondaryIP}>{host.ip}</Text>
            )}
            <View style={styles.hostMetadata}>
              {host.responseTime && (
                <Text style={styles.hostResponseTime}>
                  {host.responseTime}ms
                </Text>
              )}
              {osInfo?.osInfo && (
                <Text style={styles.hostOS}>{osInfo.osInfo.os}</Text>
              )}
              {hasServices && (
                <Text style={styles.hostServices}>
                  {services!.services.filter((s) => s.isOpen).length} services
                </Text>
              )}
            </View>
          </View>
        </View>

        {hasDetails && (
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={theme.colors.textSecondary}
          />
        )}
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          {hasOSInfo && (
            <View style={styles.treeBranch}>
              <View style={styles.branchConnector}>
                <View style={styles.branchLine} />
                <Ionicons
                  name="desktop-outline"
                  size={16}
                  color={theme.colors.primary}
                  style={styles.branchIcon}
                />
              </View>
              <View style={styles.branchContent}>
                <OSInfoDisplay osInfo={osInfo!.osInfo} />
              </View>
            </View>
          )}

          {/* Services Branch */}
          {hasServices && (
            <View style={styles.treeBranch}>
              <View style={styles.branchConnector}>
                <View style={styles.branchLine} />
                <Ionicons
                  name="server-outline"
                  size={16}
                  color={theme.colors.success}
                  style={styles.branchIcon}
                />
              </View>
              <View style={styles.branchContent}>
                <Text style={styles.branchTitle}>
                  Available Services (
                  {services!.services.filter((s) => s.isOpen).length})
                </Text>
                <ServicesList
                  services={services!.services.filter(
                    (service) => service.isOpen
                  )}
                />
              </View>
            </View>
          )}

          {/* Host Details Branch */}
          <View style={styles.treeBranch}>
            <View style={styles.branchConnector}>
              <View style={styles.branchLine} />
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={theme.colors.info}
                style={styles.branchIcon}
              />
            </View>
            <View style={styles.branchContent}>
              <Text style={styles.branchTitle}>Host Details</Text>
              <View style={styles.hostDetailsContent}>
                <View style={styles.hostDetailRow}>
                  <Text style={styles.hostDetailLabel}>Last Seen:</Text>
                  <Text style={styles.hostDetailValue}>
                    {host.lastSeen.toLocaleTimeString()}
                  </Text>
                </View>
                {host.hostname && (
                  <View style={styles.hostDetailRow}>
                    <Text style={styles.hostDetailLabel}>Hostname:</Text>
                    <Text style={styles.hostDetailValue}>{host.hostname}</Text>
                  </View>
                )}
                <View style={styles.hostDetailRow}>
                  <Text style={styles.hostDetailLabel}>Status:</Text>
                  <Text
                    style={[
                      styles.hostDetailValue,
                      { color: getStatusColor() },
                    ]}
                  >
                    {host.isActive ? "Active" : "Inactive"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export { HostItem };
