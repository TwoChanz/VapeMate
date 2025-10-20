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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
  onNext: () => void;
  onSkip: () => void;
}

export default function Onboarding1Screen({ onNext, onSkip }: Props) {
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
          <View style={[styles.cardBack, { transform: [{ rotate: "-10deg" }] }]}>
            <Ionicons name="card" size={80} color="#d1d5db" />
          </View>
          <View style={[styles.cardFront, { transform: [{ rotate: "5deg" }] }]}>
            <Ionicons name="flame" size={80} color="#6366f1" />
          </View>
        </View>

        <Text style={styles.title}>Swipe to Discover</Text>

        <Text style={styles.description}>
          Browse through personalized vape product recommendations with a simple
          swipe interface
        </Text>

        <View style={styles.gestureGuide}>
          <View style={styles.gestureItem}>
            <View style={[styles.arrow, styles.arrowRight]}>
              <Ionicons name="arrow-forward" size={24} color="#10b981" />
            </View>
            <Text style={styles.gestureText}>Swipe right to like</Text>
          </View>

          <View style={styles.gestureItem}>
            <View style={[styles.arrow, styles.arrowLeft]}>
              <Ionicons name="arrow-back" size={24} color="#ef4444" />
            </View>
            <Text style={styles.gestureText}>Swipe left to pass</Text>
          </View>

          <View style={styles.gestureItem}>
            <View style={[styles.arrow, styles.arrowUp]}>
              <Ionicons name="arrow-up" size={24} color="#f59e0b" />
            </View>
            <Text style={styles.gestureText}>Swipe up to super like</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
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
  },
  cardBack: {
    position: "absolute",
    width: 140,
    height: 180,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardFront: {
    width: 140,
    height: 180,
    backgroundColor: "#ede9fe",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
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
    marginBottom: 48,
  },
  gestureGuide: {
    width: "100%",
  },
  gestureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  arrow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  arrowRight: {
    backgroundColor: "#d1fae5",
  },
  arrowLeft: {
    backgroundColor: "#fee2e2",
  },
  arrowUp: {
    backgroundColor: "#fef3c7",
  },
  gestureText: {
    fontSize: 16,
    color: "#374151",
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
