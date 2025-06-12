import React from "react";
import { View } from "react-native";
import ErrorMessage from "../../error-message";
import { styles } from "../styles";

interface ErrorListProps {
  networkError?: string;
  serviceError?: string;
  osError?: string;
  persistenceError?: string;
}

export const ErrorList: React.FC<ErrorListProps> = ({
  networkError,
  serviceError,
  osError,
  persistenceError,
}) => {
  const hasAnyError =
    networkError || serviceError || osError || persistenceError;

  if (!hasAnyError) return null;

  return (
    <View style={styles.errorContainer}>
      {networkError && <ErrorMessage message={networkError} type="network" />}
      {serviceError && <ErrorMessage message={serviceError} type="service" />}
      {osError && <ErrorMessage message={osError} type="os" />}
      {persistenceError && (
        <ErrorMessage message={persistenceError} type="storage" />
      )}
    </View>
  );
};
