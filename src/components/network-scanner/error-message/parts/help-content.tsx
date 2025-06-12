import React from "react";
import { Text, View } from "react-native";
import { ErrorConfig, ErrorType } from "../hooks/useErrorConfig";
import { styles } from "../styles";

interface HelpContentProps {
  type: ErrorType;
  config: ErrorConfig;
}

export const HelpContent: React.FC<HelpContentProps> = ({ type, config }) => {
  const getHelpText = () => {
    switch (type) {
      case "network":
        return "• Make sure you are connected to WiFi\n• Check if the network allows device discovery\n• Try switching to a different network";
      case "service":
        return "• Some services may be blocked by firewalls\n• Service detection may take longer on some networks";
      case "storage":
        return "• Check available storage space\n• Try clearing app data if the problem persists";
      default:
        return null;
    }
  };

  const helpText = getHelpText();

  if (!helpText) return null;

  return (
    <View
      style={[styles.helpContainer, { borderTopColor: config.borderColor }]}
    >
      <Text style={[styles.helpText, { color: config.textColor }]}>
        {helpText}
      </Text>
    </View>
  );
};
