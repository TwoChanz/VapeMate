import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  message: string;
  countryCode?: string;
  region?: string;
}

export default function GeoRestrictedScreen({ message, countryCode, region }: Props) {
  const handleContactSupport = () => {
    Linking.openURL("mailto:support@vapemate.com?subject=Regional Availability Inquiry");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="location-outline" size={80} color="#ef4444" />

        <Text style={styles.title}>Service Unavailable</Text>

        <Text style={styles.message}>{message}</Text>

        {countryCode && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Detected Location:</Text>
            <Text style={styles.locationText}>
              {region ? `${region}, ` : ""}
              {countryCode}
            </Text>
          </View>
        )}

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color="#6366f1" />
          <Text style={styles.infoText}>
            VapeMate is only available in regions where vaping product
            marketing is permitted by local law. We comply with all regional
            regulations to ensure legal operation.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
          <Ionicons name="mail-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          If you believe this is an error, please contact our support team.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  locationInfo: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    width: "100%",
  },
  locationLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#ede9fe",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    width: "100%",
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#5b21b6",
    lineHeight: 20,
    marginLeft: 12,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6366f1",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 8,
  },
});
