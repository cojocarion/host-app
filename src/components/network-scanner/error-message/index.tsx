import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { ErrorType, useErrorConfig } from "./hooks/useErrorConfig";
import { ActionButtons, HelpContent } from "./parts";
import { styles } from "./styles";

export interface ErrorMessageProps {
  message: string;
  type: ErrorType;
  onDismiss?: () => void;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type,
  onDismiss,
  onRetry,
}) => {
  const config = useErrorConfig(type);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
        },
      ]}
    >
      <View style={styles.header}>
        <Ionicons
          name={config.icon as any}
          size={20}
          color={config.color}
          style={styles.icon}
        />
        <View style={styles.content}>
          <Text style={[styles.title, { color: config.textColor }]}>
            {config.title}
          </Text>
          <Text style={[styles.message, { color: config.textColor }]}>
            {message}
          </Text>
        </View>

        <ActionButtons
          config={config}
          onRetry={onRetry}
          onDismiss={onDismiss}
        />
      </View>

      <HelpContent type={type} config={config} />
    </View>
  );
};

export default ErrorMessage;
export type { ErrorType };
