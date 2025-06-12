import { theme } from "@/src/library/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface OSInfoDisplayProps {
  osInfo: any;
}

const OSInfoDisplay: React.FC<OSInfoDisplayProps> = ({ osInfo }) => (
  <View style={styles.osInfoContainer}>
    <View style={styles.osInfoHeader}>
      <Text style={styles.osInfoTitle}>Operating System</Text>
      <View style={styles.osConfidenceContainer}>
        <View
          style={[
            styles.osConfidenceDot,
            {
              backgroundColor:
                osInfo.confidence > 0.7
                  ? theme.colors.success
                  : osInfo.confidence > 0.4
                  ? theme.colors.warning
                  : theme.colors.error,
            },
          ]}
        />
        <Text style={styles.osConfidenceText}>
          {Math.round(osInfo.confidence * 100)}% confidence
        </Text>
      </View>
    </View>

    <View style={styles.osDetails}>
      <View style={styles.osDetailRow}>
        <Text style={styles.osDetailLabel}>OS:</Text>
        <Text style={styles.osDetailValue}>{osInfo.os}</Text>
      </View>

      {osInfo.version && (
        <View style={styles.osDetailRow}>
          <Text style={styles.osDetailLabel}>Version:</Text>
          <Text style={styles.osDetailValue}>{osInfo.version}</Text>
        </View>
      )}

      <View style={styles.osDetailRow}>
        <Text style={styles.osDetailLabel}>Method:</Text>
        <Text style={styles.osDetailValue}>{osInfo.detectionMethod}</Text>
      </View>

      {osInfo.fingerprint && (
        <View style={styles.osFingerprintContainer}>
          <Text style={styles.osFingerprintLabel}>Fingerprint:</Text>
          <Text style={styles.osFingerprintValue}>{osInfo.fingerprint}</Text>
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  osInfoContainer: {
    backgroundColor: theme.colors.infoLight,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.sm,
  },
  osInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  osInfoTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.info,
  },
  osConfidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  osConfidenceDot: {
    width: 6,
    height: 6,
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.xs,
  },
  osConfidenceText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.info,
  },
  osDetails: {
    gap: theme.spacing.xs,
  },
  osDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  osDetailLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.info,
  },
  osDetailValue: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  osFingerprintContainer: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  osFingerprintLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.info,
    marginBottom: theme.spacing.xs,
  },
  osFingerprintValue: {
    fontSize: theme.fontSize.xs,
    fontFamily: "monospace",
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
  },
});

export { OSInfoDisplay };
