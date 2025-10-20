export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  dateOfBirth?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface VapeProduct {
  id: string;
  name: string;
  brand: string;
  flavors: string[];
  nicotineStrength: string;
  type: "disposable" | "pod" | "mod";
  description: string;
  imageUrl: string;
  images?: string[]; // Multiple product images for carousel
  price?: number;
  puffCount?: number;
  tags: string[];
  // Detailed information for expanded view
  flavorNotes?: {
    primary: string;
    secondary: string;
    aftertaste: string;
  };
  specifications?: {
    batteryCapacity?: string;
    liquidCapacity?: string;
    dimensions?: string;
    weight?: string;
  };
  ingredients?: string[];
  rating?: number;
  reviewCount?: number;
  availability?: "in-stock" | "low-stock" | "out-of-stock";
}

export interface UserPreferences {
  userId: string;
  likedProducts: string[];
  dislikedProducts: string[];
  favoriteFlavorProfiles: string[];
  nicotinePreference?: string;
  budgetRange?: {
    min: number;
    max: number;
  };
}

export interface SwipeAction {
  userId: string;
  productId: string;
  action: "like" | "dislike" | "superlike";
  timestamp: Date;
}

export interface Recommendation {
  productId: string;
  score: number;
  reason: string;
}

export type RootStackParamList = {
  Welcome: undefined;
  AgeVerification: undefined;
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Discover: undefined;
  Favorites: undefined;
  Community: undefined;
  Profile: undefined;
};
