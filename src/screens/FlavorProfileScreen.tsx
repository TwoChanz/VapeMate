import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { FLAVOR_CATEGORIES } from "../types/flavors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type FlavorProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;

interface Props {
  navigation?: FlavorProfileScreenNavigationProp;
  onComplete?: (profile: any) => void;
  isOnboarding?: boolean;
}

export default function FlavorProfileScreen({
  navigation,
  onComplete,
  isOnboarding = false,
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [sweetness, setSweetness] = useState(50);
  const [coolness, setCoolness] = useState(50);
  const [complexity, setComplexity] = useState(50);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
      // Remove flavors from this category
      const category = FLAVOR_CATEGORIES.find((c) => c.id === categoryId);
      if (category) {
        setSelectedFlavors(
          selectedFlavors.filter(
            (flavor) => !category.subcategories.includes(flavor)
          )
        );
      }
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const toggleFlavor = (flavor: string) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors(selectedFlavors.filter((f) => f !== flavor));
    } else {
      if (selectedFlavors.length >= 10) {
        Alert.alert(
          "Maximum Reached",
          "You can select up to 10 favorite flavors"
        );
        return;
      }
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  const handleSave = () => {
    const profile = {
      selectedCategories,
      favoriteFlavors: selectedFlavors,
      sweetness,
      coolness,
      complexity,
    };

    if (onComplete) {
      onComplete(profile);
    } else {
      // Save to Firestore (implement later)
      Alert.alert("Success", "Flavor profile saved!");
      if (navigation) {
        navigation.goBack();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {!isOnboarding && navigation && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Build Your Flavor Profile</Text>
        {!isOnboarding && <View style={styles.placeholder} />}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          Select Your Favorite Categories
        </Text>
        <Text style={styles.sectionDesc}>
          Choose the flavor types you enjoy most
        </Text>

        <View style={styles.categoriesGrid}>
          {FLAVOR_CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  isSelected && {
                    backgroundColor: category.color + "20",
                    borderColor: category.color,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => toggleCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                {isSelected && (
                  <View
                    style={[
                      styles.checkmark,
                      { backgroundColor: category.color },
                    ]}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedCategories.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Pick Your Top Flavors</Text>
            <Text style={styles.sectionDesc}>
              Select up to 10 favorites ({selectedFlavors.length}/10)
            </Text>

            {FLAVOR_CATEGORIES.filter((c) =>
              selectedCategories.includes(c.id)
            ).map((category) => (
              <View key={category.id} style={styles.flavorSection}>
                <TouchableOpacity
                  style={styles.categoryHeader}
                  onPress={() =>
                    setExpandedCategory(
                      expandedCategory === category.id ? null : category.id
                    )
                  }
                >
                  <View style={styles.categoryHeaderLeft}>
                    <Text style={styles.categoryHeaderIcon}>
                      {category.icon}
                    </Text>
                    <Text style={styles.categoryHeaderText}>
                      {category.name}
                    </Text>
                  </View>
                  <Ionicons
                    name={
                      expandedCategory === category.id
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>

                {expandedCategory === category.id && (
                  <View style={styles.flavorsGrid}>
                    {category.subcategories.map((flavor) => {
                      const isSelected = selectedFlavors.includes(flavor);
                      return (
                        <TouchableOpacity
                          key={flavor}
                          style={[
                            styles.flavorChip,
                            isSelected && {
                              backgroundColor: category.color,
                            },
                          ]}
                          onPress={() => toggleFlavor(flavor)}
                        >
                          <Text
                            style={[
                              styles.flavorChipText,
                              isSelected && { color: "#fff" },
                            ]}
                          >
                            {flavor}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            ))}
          </>
        )}

        <View style={styles.intensitySection}>
          <Text style={styles.sectionTitle}>Flavor Intensity</Text>
          <Text style={styles.sectionDesc}>
            How do you prefer your flavors?
          </Text>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Sweetness</Text>
              <Text style={styles.sliderValue}>
                {sweetness < 33 ? "Low" : sweetness < 67 ? "Medium" : "High"}
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={sweetness}
              onValueChange={setSweetness}
              minimumTrackTintColor="#f59e0b"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#f59e0b"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Subtle</Text>
              <Text style={styles.sliderLabelText}>Very Sweet</Text>
            </View>
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Coolness</Text>
              <Text style={styles.sliderValue}>
                {coolness < 33 ? "Warm" : coolness < 67 ? "Cool" : "Icy"}
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={coolness}
              onValueChange={setCoolness}
              minimumTrackTintColor="#06b6d4"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#06b6d4"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>No Menthol</Text>
              <Text style={styles.sliderLabelText}>Ice Cold</Text>
            </View>
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Complexity</Text>
              <Text style={styles.sliderValue}>
                {complexity < 33
                  ? "Simple"
                  : complexity < 67
                  ? "Balanced"
                  : "Layered"}
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={complexity}
              onValueChange={setComplexity}
              minimumTrackTintColor="#8b5cf6"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#8b5cf6"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Single Note</Text>
              <Text style={styles.sliderLabelText}>Multi-Layered</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            selectedCategories.length === 0 && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={selectedCategories.length === 0}
        >
          <Text style={styles.saveButtonText}>
            {isOnboarding ? "Continue" : "Save Profile"}
          </Text>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 24,
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    position: "relative",
  },
  categoryIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  flavorSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  categoryHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryHeaderIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  flavorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    paddingTop: 0,
    gap: 8,
  },
  flavorChip: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  flavorChipText: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  intensitySection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6366f1",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -8,
  },
  sliderLabelText: {
    fontSize: 12,
    color: "#9ca3af",
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#d1d5db",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
});
