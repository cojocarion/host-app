import { NetworkInfo } from "@/src/typings/network";
import React from "react";
import { View } from "react-native";
import { useNetworkInfoCard } from "./hooks/useNetworkInfoCard";
import { ErrorState, Footer, Header, NetworkDetails } from "./parts";
import { styles } from "./styles";

export interface NetworkInfoCardProps {
  networkInfo: NetworkInfo | null;
  isConnected: boolean;
  onRefresh: () => void;
}

const NetworkInfoCard: React.FC<NetworkInfoCardProps> = ({
  networkInfo,
  isConnected,
  onRefresh,
}) => {
  const { hasValidNetwork, networkDetails } = useNetworkInfoCard({
    networkInfo,
    isConnected,
  });

  if (!hasValidNetwork) {
    return <ErrorState onRefresh={onRefresh} />;
  }

  return (
    <View style={styles.container}>
      <Header onRefresh={onRefresh} />

      <NetworkDetails
        localIP={networkDetails!.localIP}
        gateway={networkDetails!.gateway}
        subnet={networkDetails!.subnet}
      />

      <Footer />
    </View>
  );
};

export default NetworkInfoCard;
