import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export default function Onboarding3Screen({ onNext, onSkip, onBack }: Props) {
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#6b7280" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
        <Text style={styles.skipText}>Skip</Text>
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
          <View style={styles.userCircle}>
            <Ionicons name="person" size={36} color="#6366f1" />
          </View>
          <View style={[styles.userCircle, styles.userCircle2]}>
            <Ionicons name="person" size={32} color="#10b981" />
          </View>
          <View style={[styles.userCircle, styles.userCircle3]}>
            <Ionicons name="person" size={28} color="#f59e0b" />
          </View>
          <View style={styles.communityIcon}>
            <Ionicons name="people" size={64} color="#6366f1" />
          </View>
        </View>

        <Text style={styles.title}>Join the Community</Text>

        <Text style={styles.description}>
          Connect with 10,000+ vape enthusiasts, share reviews, and discover new
          favorites together
        </Text>

        <View style={styles.features}>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="chatbubbles" size={28} color="#6366f1" />
            </View>
            <Text style={styles.featureTitle}>Discussion Forums</Text>
            <Text style={styles.featureDesc}>
              Join conversations about flavors and products
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="star" size={28} color="#f59e0b" />
            </View>
            <Text style={styles.featureTitle}>Product Reviews</Text>
            <Text style={styles.featureDesc}>
              Share your experiences and read honest reviews
            </Text>
          </View>
        </View>

        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={20} color="#10b981" />
          <Text style={styles.badgeText}>Safe, moderated community</Text>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
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
  skipButton: {
    position: "absolute",
    top: 50,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "500",
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
  communityIcon: {
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
  userCircle: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    top: -20,
    left: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userCircle2: {
    backgroundColor: "#d1fae5",
    top: 120,
    left: 10,
  },
  userCircle3: {
    backgroundColor: "#fef3c7",
    top: 60,
    right: -10,
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
  features: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 24,
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDesc: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 16,
  },
  badge: {
    flexDirection: "row",
    backgroundColor: "#d1fae5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 14,
    color: "#059669",
    marginLeft: 8,
    fontWeight: "500",
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
  nextButton: {
    flexDirection: "row",
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
});
