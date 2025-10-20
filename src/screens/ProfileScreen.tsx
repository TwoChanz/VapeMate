import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FlavorProfileScreen from "./FlavorProfileScreen";

export default function ProfileScreen() {
  const [showFlavorProfile, setShowFlavorProfile] = useState(false);
  const [showHealthWarning, setShowHealthWarning] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#6366f1" />
          </View>
          <Text style={styles.name}>Guest User</Text>
          <Text style={styles.email}>guest@vapemate.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setShowFlavorProfile(true)}
          >
            <Ionicons name="color-palette" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Flavor Profile</Text>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="flash" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Nicotine Preference</Text>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="shield-checkmark" size={24} color="#6366f1" />
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setShowHealthWarning(true)}
          >
            <Ionicons name="warning" size={24} color="#ef4444" />
            <Text style={styles.menuText}>Health Information</Text>
            <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Flavor Profile Modal */}
      <Modal
        visible={showFlavorProfile}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <FlavorProfileScreen
          onComplete={(profile) => {
            console.log("Flavor profile saved:", profile);
            setShowFlavorProfile(false);
          }}
        />
      </Modal>

      {/* Health Warning Modal */}
      <Modal
        visible={showHealthWarning}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="warning" size={48} color="#ef4444" />
              <Text style={styles.modalTitle}>Health Warning</Text>
            </View>

            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>WARNING:</Text> Vaping products
                contain nicotine, which is an addictive substance.
              </Text>

              <Text style={styles.modalText}>
                • Nicotine is harmful and may be especially harmful to pregnant
                women
              </Text>
              <Text style={styles.modalText}>
                • This product is not a smoking cessation device and has not
                been evaluated by the FDA for this purpose
              </Text>
              <Text style={styles.modalText}>
                • VapeMate does not provide medical or health advice
              </Text>
              <Text style={styles.modalText}>
                • Consult a healthcare professional regarding nicotine use
              </Text>
              <Text style={styles.modalText}>
                • Keep out of reach of children and pets
              </Text>

              <View style={styles.modalInfoBox}>
                <Ionicons name="information-circle" size={24} color="#6366f1" />
                <Text style={styles.modalInfoText}>
                  VapeMate is an informational tool only. We do not sell vaping
                  products directly.
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowHealthWarning(false)}
            >
              <Text style={styles.modalButtonText}>I Understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ede9fe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#6b7280",
  },
  section: {
    backgroundColor: "#fff",
    marginBottom: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
    marginBottom: 32,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "100%",
    maxHeight: "80%",
    padding: 24,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 12,
  },
  modalScroll: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
    color: "#ef4444",
  },
  modalInfoBox: {
    flexDirection: "row",
    backgroundColor: "#ede9fe",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  modalInfoText: {
    flex: 1,
    fontSize: 14,
    color: "#5b21b6",
    marginLeft: 12,
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
