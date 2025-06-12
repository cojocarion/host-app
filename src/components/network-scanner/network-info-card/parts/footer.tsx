import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

export const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Network scanning will discover devices in your local subnet
      </Text>
    </View>
  );
};
