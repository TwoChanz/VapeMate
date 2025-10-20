import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VapeProduct } from "../types";

const { width } = Dimensions.get("window");

interface ProductDetailModalProps {
  visible: boolean;
  product: VapeProduct;
  onClose: () => void;
  onAddToFavorites?: (productId: string) => void;
  similarProducts?: VapeProduct[];
}

export default function ProductDetailModal({
  visible,
  product,
  onClose,
  onAddToFavorites,
  similarProducts = [],
}: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const images = product.images || [product.imageUrl];

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentImageIndex(index);
  };

  const handleAddToFavorites = () => {
    setIsFavorited(!isFavorited);
    if (onAddToFavorites) {
      onAddToFavorites(product.id);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color="#f59e0b"
        />
      );
    }
    return stars;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleAddToFavorites}
          >
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={28}
              color={isFavorited ? "#ef4444" : "#1f2937"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Image Carousel */}
          <View style={styles.carouselContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {images.map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            {/* Pagination Dots */}
            {images.length > 1 && (
              <View style={styles.paginationDots}>
                {images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      currentImageIndex === index && styles.activeDot,
                    ]}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.brand}>{product.brand}</Text>

            {/* Rating */}
            {product.rating && (
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {renderStars(product.rating)}
                </View>
                <Text style={styles.ratingText}>
                  {product.rating.toFixed(1)}
                </Text>
                {product.reviewCount && (
                  <Text style={styles.reviewCount}>
                    ({product.reviewCount} reviews)
                  </Text>
                )}
              </View>
            )}

            {/* Flavors */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Flavors</Text>
              <View style={styles.flavorTags}>
                {product.flavors.map((flavor, index) => (
                  <View key={index} style={styles.flavorTag}>
                    <Text style={styles.flavorTagText}>{flavor}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>

            {/* Flavor Notes */}
            {product.flavorNotes && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Flavor Profile</Text>
                <View style={styles.flavorNotes}>
                  <View style={styles.flavorNote}>
                    <Text style={styles.flavorNoteLabel}>Primary:</Text>
                    <Text style={styles.flavorNoteValue}>
                      {product.flavorNotes.primary}
                    </Text>
                  </View>
                  <View style={styles.flavorNote}>
                    <Text style={styles.flavorNoteLabel}>Secondary:</Text>
                    <Text style={styles.flavorNoteValue}>
                      {product.flavorNotes.secondary}
                    </Text>
                  </View>
                  <View style={styles.flavorNote}>
                    <Text style={styles.flavorNoteLabel}>Aftertaste:</Text>
                    <Text style={styles.flavorNoteValue}>
                      {product.flavorNotes.aftertaste}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Specifications */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Specifications</Text>
              <View style={styles.specs}>
                <View style={styles.specRow}>
                  <View style={styles.specItem}>
                    <Ionicons name="flash" size={20} color="#6366f1" />
                    <Text style={styles.specLabel}>Nicotine</Text>
                    <Text style={styles.specValue}>
                      {product.nicotineStrength}
                    </Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="infinite" size={20} color="#6366f1" />
                    <Text style={styles.specLabel}>Puffs</Text>
                    <Text style={styles.specValue}>
                      {product.puffCount?.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {product.specifications && (
                  <>
                    {product.specifications.batteryCapacity && (
                      <View style={styles.specRow}>
                        <View style={styles.specItem}>
                          <Ionicons name="battery-charging" size={20} color="#6366f1" />
                          <Text style={styles.specLabel}>Battery</Text>
                          <Text style={styles.specValue}>
                            {product.specifications.batteryCapacity}
                          </Text>
                        </View>
                        {product.specifications.liquidCapacity && (
                          <View style={styles.specItem}>
                            <Ionicons name="water" size={20} color="#6366f1" />
                            <Text style={styles.specLabel}>E-Liquid</Text>
                            <Text style={styles.specValue}>
                              {product.specifications.liquidCapacity}
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </>
                )}
              </View>
            </View>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                <Text style={styles.ingredients}>
                  {product.ingredients.join(", ")}
                </Text>
              </View>
            )}

            {/* Similar Products */}
            {similarProducts.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Similar Products</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.similarProducts}
                >
                  {similarProducts.map((similarProduct) => (
                    <TouchableOpacity
                      key={similarProduct.id}
                      style={styles.similarProductCard}
                    >
                      <Image
                        source={{ uri: similarProduct.imageUrl }}
                        style={styles.similarProductImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.similarProductName} numberOfLines={1}>
                        {similarProduct.name}
                      </Text>
                      <Text style={styles.similarProductBrand} numberOfLines={1}>
                        {similarProduct.brand}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.bottomPadding} />
          </View>
        </ScrollView>

        {/* Add to Favorites Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.addButton,
              isFavorited && styles.addButtonFavorited,
            ]}
            onPress={handleAddToFavorites}
          >
            <Ionicons
              name={isFavorited ? "checkmark-circle" : "heart"}
              size={20}
              color="#fff"
            />
            <Text style={styles.addButtonText}>
              {isFavorited ? "Added to Favorites" : "Add to Favorites"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  favoriteButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  carouselContainer: {
    position: "relative",
  },
  carouselImage: {
    width: width,
    height: 400,
    backgroundColor: "#e5e7eb",
  },
  paginationDots: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 24,
  },
  productInfo: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  productName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  brand: {
    fontSize: 20,
    color: "#6b7280",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: "#6b7280",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  flavorTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  flavorTag: {
    backgroundColor: "#ede9fe",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  flavorTagText: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
  },
  flavorNotes: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  flavorNote: {
    flexDirection: "row",
    marginBottom: 8,
  },
  flavorNoteLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    width: 100,
  },
  flavorNoteValue: {
    flex: 1,
    fontSize: 14,
    color: "#1f2937",
  },
  specs: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  specRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  specItem: {
    flex: 1,
    alignItems: "center",
  },
  specLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  specValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 2,
  },
  ingredients: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  similarProducts: {
    marginTop: 8,
  },
  similarProductCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  similarProductImage: {
    width: 140,
    height: 140,
    backgroundColor: "#e5e7eb",
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    padding: 12,
    paddingBottom: 4,
  },
  similarProductBrand: {
    fontSize: 12,
    color: "#6b7280",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  bottomPadding: {
    height: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonFavorited: {
    backgroundColor: "#10b981",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
