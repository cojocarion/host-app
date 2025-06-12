import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

export const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Network Scanner</Text>
      <Text style={styles.subtitle}>
        Discover hosts, services, and operating systems on your network
      </Text>
    </View>
  );
};
