import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ErrorConfig } from "../hooks/useErrorConfig";
import { styles } from "../styles";

interface ActionButtonsProps {
  config: ErrorConfig;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  config,
  onRetry,
  onDismiss,
}) => {
  if (!onRetry && !onDismiss) return null;

  return (
    <View style={styles.actions}>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.actionButton}>
          <Ionicons name="refresh" size={16} color={config.color} />
        </TouchableOpacity>
      )}
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.actionButton}>
          <Ionicons name="close" size={16} color={config.color} />
        </TouchableOpacity>
      )}
    </View>
  );
};
