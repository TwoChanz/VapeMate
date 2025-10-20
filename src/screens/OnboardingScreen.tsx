import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding1Screen from "./onboarding/Onboarding1Screen";
import Onboarding2Screen from "./onboarding/Onboarding2Screen";
import Onboarding3Screen from "./onboarding/Onboarding3Screen";
import Onboarding4Screen from "./onboarding/Onboarding4Screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const ONBOARDING_COMPLETED_KEY = "@vapemate_onboarding_completed";

export default function OnboardingScreen({ navigation }: Props) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < 3) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleSkip = async () => {
    await markOnboardingComplete();
    navigation.navigate("Auth");
  };

  const handleFinish = async () => {
    await markOnboardingComplete();
    navigation.navigate("Auth");
  };

  const markOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
    } catch (error) {
      console.error("Error saving onboarding state:", error);
    }
  };

  return (
    <View style={styles.container}>
      {currentScreen === 0 && (
        <Onboarding1Screen
          navigation={navigation}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}
      {currentScreen === 1 && (
        <Onboarding2Screen
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}
      {currentScreen === 2 && (
        <Onboarding3Screen
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}
      {currentScreen === 3 && (
        <Onboarding4Screen onFinish={handleFinish} onBack={handleBack} />
      )}
    </View>
  );
}

// Helper function to check if onboarding is complete
export async function hasCompletedOnboarding(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
    return value === "true";
  } catch (error) {
    console.error("Error checking onboarding state:", error);
    return false;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
