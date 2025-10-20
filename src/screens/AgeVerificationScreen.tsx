import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type AgeVerificationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AgeVerification"
>;

interface Props {
  navigation: AgeVerificationScreenNavigationProp;
}

export default function AgeVerificationScreen({ navigation }: Props) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const verifyAge = () => {
    if (!month || !day || !year) {
      Alert.alert("Error", "Please enter your complete date of birth");
      return;
    }

    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      // Subtract 1 if birthday hasn't occurred yet this year
      const actualAge = age - 1;
      if (actualAge >= 21) {
        navigation.navigate("Auth");
      } else {
        Alert.alert(
          "Age Requirement Not Met",
          "You must be 21 or older to use VapeMate"
        );
      }
    } else if (age >= 21) {
      navigation.navigate("Auth");
    } else {
      Alert.alert(
        "Age Requirement Not Met",
        "You must be 21 or older to use VapeMate"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Age Verification</Text>
        <Text style={styles.subtitle}>
          You must be 21 or older to continue
        </Text>

        <View style={styles.dateInputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Month</Text>
            <TextInput
              style={styles.input}
              placeholder="MM"
              keyboardType="number-pad"
              maxLength={2}
              value={month}
              onChangeText={setMonth}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Day</Text>
            <TextInput
              style={styles.input}
              placeholder="DD"
              keyboardType="number-pad"
              maxLength={2}
              value={day}
              onChangeText={setDay}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Year</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY"
              keyboardType="number-pad"
              maxLength={4}
              value={year}
              onChangeText={setYear}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={verifyAge}>
          <Text style={styles.buttonText}>Verify Age</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          By continuing, you confirm that you are of legal age to purchase
          vaping products in your jurisdiction and agree to our Terms of Service
          and Privacy Policy.
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
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 48,
  },
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 18,
  },
});
