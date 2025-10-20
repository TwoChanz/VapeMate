import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

interface Props {
  onFinish: () => void;
  onBack: () => void;
}

export default function Onboarding4Screen({ onFinish, onBack }: Props) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleFinish = async () => {
    if (notificationsEnabled) {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        console.log("Notification permission:", status);
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    }
    onFinish();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#6b7280" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <View style={styles.bellRing1} />
          <View style={styles.bellRing2} />
          <View style={styles.bellIcon}>
            <Ionicons name="notifications" size={64} color="#6366f1" />
          </View>
        </View>

        <Text style={styles.title}>Stay Updated</Text>

        <Text style={styles.description}>
          Get notified about new products, personalized recommendations, and
          special offers
        </Text>

        <View style={styles.notificationsList}>
          <View style={styles.notificationItem}>
            <View style={styles.notificationIcon}>
              <Ionicons name="flame" size={24} color="#f59e0b" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>New Products</Text>
              <Text style={styles.notificationDesc}>
                Be first to discover new flavors
              </Text>
            </View>
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationIcon}>
              <Ionicons name="sparkles" size={24} color="#6366f1" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>
                AI Recommendations
              </Text>
              <Text style={styles.notificationDesc}>
                Personalized picks just for you
              </Text>
            </View>
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationIcon}>
              <Ionicons name="pricetag" size={24} color="#10b981" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Special Offers</Text>
              <Text style={styles.notificationDesc}>
                Exclusive deals and discounts
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#d1d5db", true: "#a5b4fc" }}
            thumbColor={notificationsEnabled ? "#6366f1" : "#f3f4f6"}
          />
        </View>

        <Text style={styles.disclaimer}>
          You can change notification preferences anytime in Settings
        </Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Get Started</Text>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 24,
    zIndex: 10,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  iconContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    position: "relative",
  },
  bellIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ede9fe",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bellRing1: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "#c7d2fe",
    opacity: 0.4,
  },
  bellRing2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#c7d2fe",
    opacity: 0.2,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  notificationsList: {
    width: "100%",
    marginBottom: 32,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  notificationDesc: {
    fontSize: 14,
    color: "#6b7280",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#ede9fe",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  disclaimer: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1d5db",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#6366f1",
    width: 24,
  },
  finishButton: {
    flexDirection: "row",
    backgroundColor: "#10b981",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
});
