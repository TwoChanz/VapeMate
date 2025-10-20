export interface FlavorCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: string[];
}

export const FLAVOR_CATEGORIES: FlavorCategory[] = [
  {
    id: "fruity",
    name: "Fruity",
    icon: "🍓",
    color: "#ef4444",
    subcategories: [
      "Strawberry",
      "Blueberry",
      "Watermelon",
      "Mango",
      "Peach",
      "Apple",
      "Grape",
      "Pineapple",
      "Kiwi",
      "Lychee",
    ],
  },
  {
    id: "dessert",
    name: "Dessert",
    icon: "🍰",
    color: "#f59e0b",
    subcategories: [
      "Vanilla",
      "Chocolate",
      "Custard",
      "Cream",
      "Cake",
      "Cookie",
      "Donut",
      "Cheesecake",
    ],
  },
  {
    id: "mint",
    name: "Mint/Menthol",
    icon: "❄️",
    color: "#06b6d4",
    subcategories: [
      "Peppermint",
      "Spearmint",
      "Menthol",
      "Ice",
      "Cool Mint",
      "Wintergreen",
    ],
  },
  {
    id: "beverage",
    name: "Beverage",
    icon: "☕",
    color: "#8b5cf6",
    subcategories: [
      "Coffee",
      "Latte",
      "Cappuccino",
      "Tea",
      "Soda",
      "Cola",
      "Energy Drink",
      "Lemonade",
    ],
  },
  {
    id: "candy",
    name: "Candy",
    icon: "🍬",
    color: "#ec4899",
    subcategories: [
      "Gummy",
      "Hard Candy",
      "Sour",
      "Cotton Candy",
      "Bubblegum",
      "Taffy",
      "Licorice",
    ],
  },
  {
    id: "tobacco",
    name: "Tobacco",
    icon: "🍂",
    color: "#78716c",
    subcategories: [
      "Classic Tobacco",
      "Virginia",
      "Turkish",
      "Cuban",
      "Honey Tobacco",
      "Clove",
    ],
  },
];

export interface FlavorPreference {
  category: string;
  subcategories: string[];
  intensity: number; // 0-100
}

export interface UserFlavorProfile {
  userId: string;
  selectedCategories: string[];
  favoriteFlavors: string[];
  sweetness: number; // 0-100
  coolness: number; // 0-100
  complexity: number; // 0-100 (simple to layered)
  createdAt: Date;
  updatedAt: Date;
}
