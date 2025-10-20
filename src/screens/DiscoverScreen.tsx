import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductDetailModal from "../components/ProductDetailModal";
import { VapeProduct } from "../types";

const { width, height } = Dimensions.get("window");

// Mock data - will be replaced with Firebase data
const MOCK_PRODUCTS: VapeProduct[] = [
  {
    id: "1",
    name: "Berry Blast",
    brand: "VapeX",
    flavors: ["Strawberry", "Blueberry", "Raspberry"],
    nicotineStrength: "5%",
    type: "disposable",
    description: "A refreshing blend of summer berries that delivers a sweet and tangy flavor experience with every puff.",
    imageUrl: "https://via.placeholder.com/400x600/ef4444/ffffff?text=Berry+Blast",
    images: [
      "https://via.placeholder.com/400x600/ef4444/ffffff?text=Berry+Blast",
      "https://via.placeholder.com/400x600/dc2626/ffffff?text=Angle+2",
      "https://via.placeholder.com/400x600/b91c1c/ffffff?text=Packaging",
    ],
    puffCount: 5000,
    tags: ["fruity", "sweet", "popular"],
    rating: 4.5,
    reviewCount: 1247,
    flavorNotes: {
      primary: "Sweet strawberry",
      secondary: "Tangy blueberry undertones",
      aftertaste: "Refreshing raspberry finish",
    },
    specifications: {
      batteryCapacity: "650mAh",
      liquidCapacity: "13ml",
      dimensions: "110 x 24 x 24mm",
      weight: "55g",
    },
    ingredients: ["Propylene Glycol", "Vegetable Glycerin", "Natural & Artificial Flavors", "Nicotine"],
    availability: "in-stock",
  },
  {
    id: "2",
    name: "Mango Tropical",
    brand: "CloudNine",
    flavors: ["Mango", "Pineapple"],
    nicotineStrength: "3%",
    type: "disposable",
    description: "Exotic tropical fruit fusion that transports you to a paradise island with authentic mango and pineapple notes.",
    imageUrl: "https://via.placeholder.com/400x600/f59e0b/ffffff?text=Mango+Tropical",
    images: [
      "https://via.placeholder.com/400x600/f59e0b/ffffff?text=Mango+Tropical",
      "https://via.placeholder.com/400x600/d97706/ffffff?text=Side+View",
    ],
    puffCount: 7000,
    tags: ["tropical", "fruity", "smooth"],
    rating: 4.8,
    reviewCount: 2103,
    flavorNotes: {
      primary: "Ripe mango",
      secondary: "Sweet pineapple",
      aftertaste: "Tropical blend",
    },
    specifications: {
      batteryCapacity: "850mAh",
      liquidCapacity: "16ml",
      dimensions: "115 x 25 x 25mm",
      weight: "60g",
    },
    ingredients: ["Propylene Glycol", "Vegetable Glycerin", "Natural Flavors", "Nicotine"],
    availability: "in-stock",
  },
  {
    id: "3",
    name: "Mint Chill",
    brand: "FrostBite",
    flavors: ["Mint", "Menthol"],
    nicotineStrength: "5%",
    type: "disposable",
    description: "Cool and refreshing mint experience with an icy menthol blast that invigorates your senses.",
    imageUrl: "https://via.placeholder.com/400x600/06b6d4/ffffff?text=Mint+Chill",
    images: [
      "https://via.placeholder.com/400x600/06b6d4/ffffff?text=Mint+Chill",
      "https://via.placeholder.com/400x600/0891b2/ffffff?text=Detailed",
      "https://via.placeholder.com/400x600/0e7490/ffffff?text=Box",
    ],
    puffCount: 6000,
    tags: ["mint", "menthol", "icy"],
    rating: 4.6,
    reviewCount: 1856,
    flavorNotes: {
      primary: "Cool peppermint",
      secondary: "Icy menthol blast",
      aftertaste: "Clean, crisp finish",
    },
    specifications: {
      batteryCapacity: "700mAh",
      liquidCapacity: "14ml",
      dimensions: "112 x 24 x 24mm",
      weight: "57g",
    },
    ingredients: ["Propylene Glycol", "Vegetable Glycerin", "Menthol", "Natural Mint Flavor", "Nicotine"],
    availability: "in-stock",
  },
];

export default function DiscoverScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const currentProduct = MOCK_PRODUCTS[currentIndex];

  // Get similar products (exclude current product)
  const similarProducts = MOCK_PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 3);

  const handleLike = () => {
    console.log("Liked:", currentProduct.name);
    if (currentIndex < MOCK_PRODUCTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back for demo
    }
  };

  const handleDislike = () => {
    console.log("Disliked:", currentProduct.name);
    if (currentIndex < MOCK_PRODUCTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back for demo
    }
  };

  const handleSuperLike = () => {
    console.log("Super Liked:", currentProduct.name);
    if (currentIndex < MOCK_PRODUCTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back for demo
    }
  };

  const handleAddToFavorites = (productId: string) => {
    console.log("Added to favorites:", productId);
    // TODO: Implement Firebase favorite saving
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.infoButton} onPress={() => setShowDetailModal(true)}>
          <Ionicons name="information-circle-outline" size={28} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => setShowDetailModal(true)}
        >
          <Image
            source={{ uri: currentProduct.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{currentProduct.name}</Text>
            <Text style={styles.brand}>{currentProduct.brand}</Text>
            <Text style={styles.flavors}>
              {currentProduct.flavors.join(" • ")}
            </Text>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Ionicons name="flash" size={16} color="#6366f1" />
                <Text style={styles.detailText}>
                  {currentProduct.nicotineStrength}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="infinite" size={16} color="#6366f1" />
                <Text style={styles.detailText}>
                  {currentProduct.puffCount} puffs
                </Text>
              </View>
            </View>
            <Text style={styles.description} numberOfLines={2}>{currentProduct.description}</Text>

            {/* Tap to expand hint */}
            <View style={styles.expandHint}>
              <Ionicons name="expand-outline" size={16} color="#6366f1" />
              <Text style={styles.expandHintText}>Tap to view details</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.dislikeButton]}
          onPress={handleDislike}
        >
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.superLikeButton]}
          onPress={handleSuperLike}
        >
          <Ionicons name="star" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleLike}
        >
          <Ionicons name="heart" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Product Detail Modal */}
      <ProductDetailModal
        visible={showDetailModal}
        product={currentProduct}
        onClose={() => setShowDetailModal(false)}
        onAddToFavorites={handleAddToFavorites}
        similarProducts={similarProducts}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    position: "relative",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  infoButton: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: width - 32,
    height: height * 0.65,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
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
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dislikeButton: {
    backgroundColor: "#ef4444",
  },
  superLikeButton: {
    backgroundColor: "#f59e0b",
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  likeButton: {
    backgroundColor: "#10b981",
  },
});
