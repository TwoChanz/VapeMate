import OpenAI from "openai";
import Constants from "expo-constants";

const apiKey = Constants.expoConfig?.extra?.openaiApiKey || "";

export const openai = new OpenAI({
  apiKey: apiKey,
});

export const generateRecommendations = async (
  likedProducts: string[],
  dislikedProducts: string[],
  flavorPreferences: string[]
): Promise<any> => {
  if (!apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  const prompt = `Based on the following user preferences for disposable vapes:

Liked products: ${likedProducts.join(", ") || "None yet"}
Disliked products: ${dislikedProducts.join(", ") || "None yet"}
Flavor preferences: ${flavorPreferences.join(", ") || "None specified"}

Suggest 5 disposable vape products that would match their taste profile. For each suggestion, provide:
1. Product name
2. Brand
3. Flavor profile
4. Why it matches their preferences
5. Confidence score (0-100)

Return the response as a JSON array.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a vape recommendation expert. Provide personalized disposable vape suggestions based on user preferences.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const recommendations = completion.choices[0].message.content;
    return recommendations ? JSON.parse(recommendations) : [];
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
};
