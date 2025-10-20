import * as Location from "expo-location";

// Regions where vaping marketing/sales are restricted
// UPDATE THIS LIST based on legal consultation
const RESTRICTED_REGIONS = {
  // Countries with strict vaping advertising bans
  countries: [
    "IN", // India
    "BR", // Brazil
    "TH", // Thailand
    "SG", // Singapore (heavy restrictions)
    // Add more country codes as needed
  ],

  // U.S. states with additional restrictions (if needed)
  // Format: Two-letter state codes
  usStates: [
    // Add state codes if specific states prohibit vaping apps
  ],
};

export interface GeoRestrictionResult {
  isRestricted: boolean;
  countryCode?: string;
  region?: string;
  message?: string;
}

/**
 * Check if the user's location is in a restricted region
 * Returns restriction status and appropriate message
 */
export async function checkGeoRestriction(): Promise<GeoRestrictionResult> {
  try {
    // Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      // If user denies location, we cannot verify - allow with warning
      console.warn("Location permission denied - cannot verify geo-restrictions");
      return {
        isRestricted: false,
        message: "Location access required to verify regional availability",
      };
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low, // City-level is sufficient
    });

    // Reverse geocode to get country/region
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (reverseGeocode.length > 0) {
      const locationData = reverseGeocode[0];
      const countryCode = locationData.isoCountryCode?.toUpperCase();
      const region = locationData.region;

      // Check if country is restricted
      if (countryCode && RESTRICTED_REGIONS.countries.includes(countryCode)) {
        return {
          isRestricted: true,
          countryCode,
          region,
          message: `VapeMate is not available in your region due to local regulations regarding vaping products.`,
        };
      }

      // Check if US state is restricted (if in US)
      if (countryCode === "US" && region) {
        const stateCode = region.substring(0, 2).toUpperCase();
        if (RESTRICTED_REGIONS.usStates.includes(stateCode)) {
          return {
            isRestricted: true,
            countryCode,
            region,
            message: `VapeMate is not available in ${region} due to state regulations.`,
          };
        }
      }

      // Location is allowed
      return {
        isRestricted: false,
        countryCode,
        region,
      };
    }

    // Could not determine location - allow with caution
    return {
      isRestricted: false,
      message: "Unable to verify location - proceed with caution",
    };
  } catch (error) {
    console.error("Geo-restriction check failed:", error);

    // On error, allow access but log for monitoring
    // In production, you might want stricter handling
    return {
      isRestricted: false,
      message: "Location verification unavailable",
    };
  }
}

/**
 * Get user-friendly message for restricted region
 */
export function getRestrictionMessage(result: GeoRestrictionResult): string {
  if (!result.isRestricted) {
    return "";
  }

  return (
    result.message ||
    "This app is not available in your region due to local regulations regarding vaping products. " +
    "Please contact support@vapemate.com for more information."
  );
}

/**
 * Check if specific country code is restricted
 * Useful for server-side checks
 */
export function isCountryRestricted(countryCode: string): boolean {
  return RESTRICTED_REGIONS.countries.includes(countryCode.toUpperCase());
}

/**
 * Add a region to the restricted list (admin function)
 * In production, this should be managed via remote config
 */
export function addRestrictedRegion(countryCode: string): void {
  const code = countryCode.toUpperCase();
  if (!RESTRICTED_REGIONS.countries.includes(code)) {
    RESTRICTED_REGIONS.countries.push(code);
  }
}

/**
 * Get list of all restricted regions (for display)
 */
export function getRestrictedRegions(): typeof RESTRICTED_REGIONS {
  return { ...RESTRICTED_REGIONS };
}
