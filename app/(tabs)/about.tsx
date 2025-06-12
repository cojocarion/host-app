import { theme } from "@/src/library/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="radio" size={64} color={theme.colors.primary} />
            <Text style={styles.title}>Network Scanner</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons
                  name="wifi"
                  size={20}
                  color={theme.colors.success}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Automatic network discovery
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons
                  name="server"
                  size={20}
                  color={theme.colors.primary}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Service and port scanning
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons
                  name="desktop"
                  size={20}
                  color={theme.colors.warning}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Operating system detection
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons
                  name="analytics"
                  size={20}
                  color={theme.colors.error}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>Real-time scan progress</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons
                  name="shield-checkmark"
                  size={20}
                  color={theme.colors.info}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Security-focused scanning
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons
                  name="phone-portrait"
                  size={20}
                  color={theme.colors.success}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Cross-platform compatibility
                </Text>
              </View>
            </View>
          </View>

          {/* Technical Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Information</Text>
            <View style={styles.techInfo}>
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>Framework:</Text>
                <Text style={styles.techValue}>React Native with Expo</Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>Architecture:</Text>
                <Text style={styles.techValue}>Custom Hooks + Components</Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>Scanning Method:</Text>
                <Text style={styles.techValue}>HTTP-based discovery</Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>OS Detection:</Text>
                <Text style={styles.techValue}>
                  Multi-method fingerprinting
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  version: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.fontSize.base,
    lineHeight: 24,
    color: theme.colors.textSecondary,
  },
  featureList: {
    gap: theme.spacing.md,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.small,
  },
  featureIcon: {
    marginRight: theme.spacing.md,
  },
  featureText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    flex: 1,
  },
  techInfo: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.small,
  },
  techItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  techLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  techValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  },
});
