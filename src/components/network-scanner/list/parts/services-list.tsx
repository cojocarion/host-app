import { theme } from "@/src/library/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Service {
  name: string;
  port: number;
  protocol: string;
  isOpen: boolean;
  responseTime?: number;
  banner?: string;
}

interface ServicesListProps {
  services: Service[];
}

const ServiceItem: React.FC<{ service: Service }> = ({ service }) => (
  <View style={styles.serviceItem}>
    <View style={styles.serviceMain}>
      <View
        style={[
          styles.serviceStatusDot,
          {
            backgroundColor: service.isOpen
              ? theme.colors.success
              : theme.colors.error,
          },
        ]}
      />
      <View style={styles.serviceDetails}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.servicePort}>
          Port {service.port}/{service.protocol}
        </Text>
      </View>
    </View>
    <View style={styles.serviceMetrics}>
      {service.responseTime && (
        <Text style={styles.serviceResponseTime}>{service.responseTime}ms</Text>
      )}
      {service.banner && (
        <Text style={styles.serviceBanner} numberOfLines={1}>
          {service.banner}
        </Text>
      )}
    </View>
  </View>
);

const ServicesList: React.FC<ServicesListProps> = ({ services }) => (
  <View style={styles.servicesList}>
    {services.map((service, index) => (
      <View key={`${service.port}-${index}`} style={styles.serviceTreeItem}>
        <View style={styles.serviceConnector}>
          <View style={styles.serviceLine} />
          <View style={styles.serviceNode} />
        </View>
        <View style={styles.serviceContent}>
          <ServiceItem service={service} />
        </View>
      </View>
    ))}
  </View>
);

export { ServicesList };

const styles = StyleSheet.create({
  // Services tree styles
  servicesList: {
    marginTop: theme.spacing.sm,
  },
  serviceTreeItem: {
    flexDirection: "row",
    marginBottom: theme.spacing.sm,
  },
  serviceConnector: {
    width: 20,
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  serviceLine: {
    width: 1,
    height: 12,
    backgroundColor: theme.colors.borderSecondary,
  },
  serviceNode: {
    width: 4,
    height: 4,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.success,
    marginTop: 2,
  },
  serviceContent: {
    flex: 1,
  },

  // Service item styles
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.scanner.serviceBackground,
    borderRadius: theme.borderRadius.small,
  },
  serviceMain: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  serviceStatusDot: {
    width: 6,
    height: 6,
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.sm,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  servicePort: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  serviceMetrics: {
    alignItems: "flex-end",
  },
  serviceResponseTime: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textTertiary,
  },
  serviceBanner: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textTertiary,
    maxWidth: 120,
  },
});
