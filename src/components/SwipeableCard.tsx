import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  interpolate,
  runOnJS,
  Extrapolation,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { VapeProduct } from "../types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const ROTATION_ANGLE = 60;

interface SwipeableCardProps {
  product: VapeProduct;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onTap?: () => void;
  isActive: boolean;
}

type AnimatedGHContext = {
  startX: number;
  startY: number;
};

export default function SwipeableCard({
  product,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onTap,
  isActive,
}: SwipeableCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: (event) => {
      const shouldSwipeRight = translateX.value > SWIPE_THRESHOLD;
      const shouldSwipeLeft = translateX.value < -SWIPE_THRESHOLD;
      const shouldSwipeUp =
        translateY.value < -SWIPE_THRESHOLD && Math.abs(translateX.value) < SWIPE_THRESHOLD;

      if (shouldSwipeRight) {
        translateX.value = withSpring(SCREEN_WIDTH * 1.5, {
          velocity: event.velocityX,
        });
        translateY.value = withSpring(event.translationY, {
          velocity: event.velocityY,
        });
        if (onSwipeRight) {
          runOnJS(onSwipeRight)();
        }
      } else if (shouldSwipeLeft) {
        translateX.value = withSpring(-SCREEN_WIDTH * 1.5, {
          velocity: event.velocityX,
        });
        translateY.value = withSpring(event.translationY, {
          velocity: event.velocityY,
        });
        if (onSwipeLeft) {
          runOnJS(onSwipeLeft)();
        }
      } else if (shouldSwipeUp) {
        translateY.value = withSpring(-SCREEN_HEIGHT * 1.5, {
          velocity: event.velocityY,
        });
        if (onSwipeUp) {
          runOnJS(onSwipeUp)();
        }
      } else {
        // Spring back to original position
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotate}deg` },
      ],
    };
  });

  const likeOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const nopeOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const superLikeOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <PanGestureHandler
      onGestureEvent={gestureHandler}
      enabled={isActive}
    >
      <Animated.View style={[styles.card, cardStyle]}>
        <TouchableOpacity
          style={styles.cardContent}
          activeOpacity={0.9}
          onPress={onTap}
        >
          {/* LIKE Overlay */}
          <Animated.View style={[styles.overlay, styles.likeOverlay, likeOpacityStyle]}>
            <View style={styles.overlayBadge}>
              <Text style={styles.overlayText}>LIKE</Text>
              <Ionicons name="heart" size={40} color="#10b981" />
            </View>
          </Animated.View>

          {/* NOPE Overlay */}
          <Animated.View style={[styles.overlay, styles.nopeOverlay, nopeOpacityStyle]}>
            <View style={styles.overlayBadge}>
              <Text style={styles.overlayText}>NOPE</Text>
              <Ionicons name="close-circle" size={40} color="#ef4444" />
            </View>
          </Animated.View>

          {/* SUPER LIKE Overlay */}
          <Animated.View
            style={[styles.overlay, styles.superLikeOverlay, superLikeOpacityStyle]}
          >
            <View style={styles.overlayBadge}>
              <Text style={styles.overlayText}>SUPER LIKE</Text>
              <Ionicons name="star" size={40} color="#f59e0b" />
            </View>
          </Animated.View>

          {/* Product Image */}
          <Image
            source={{ uri: product.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Product Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.flavors}>
              {product.flavors.join(" • ")}
            </Text>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Ionicons name="flash" size={16} color="#6366f1" />
                <Text style={styles.detailText}>
                  {product.nicotineStrength}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="infinite" size={16} color="#6366f1" />
                <Text style={styles.detailText}>
                  {product.puffCount} puffs
                </Text>
              </View>
            </View>
            <Text style={styles.description} numberOfLines={2}>
              {product.description}
            </Text>

            {/* Tap to expand hint */}
            <View style={styles.expandHint}>
              <Ionicons name="expand-outline" size={16} color="#6366f1" />
              <Text style={styles.expandHintText}>Tap to view details</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_HEIGHT * 0.65,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    position: "absolute",
  },
  cardContent: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  likeOverlay: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
  },
  nopeOverlay: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  superLikeOverlay: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
  },
  overlayBadge: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  overlayText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    letterSpacing: 2,
  },
  image: {
    width: "100%",
    height: "60%",
    backgroundColor: "#e5e7eb",
  },
  infoContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  brand: {
    fontSize: 18,
    color: "#6b7280",
    marginBottom: 12,
  },
  flavors: {
    fontSize: 16,
    color: "#6366f1",
    marginBottom: 12,
  },
  details: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  expandHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ede9fe",
    borderRadius: 20,
    alignSelf: "center",
  },
  expandHintText: {
    fontSize: 12,
    color: "#6366f1",
    fontWeight: "600",
    marginLeft: 4,
  },
});
