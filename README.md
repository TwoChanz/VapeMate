# VapeMate - Mobile App

VapeMate is a personalized vape discovery mobile app that helps users find their ideal disposable vapes through swiping and AI-driven recommendations. Built with React Native (Expo) for iOS and Android.

## ⚠️ IMPORTANT: iOS App Store Compliance

**VapeMate operates in a REGULATED INDUSTRY (vaping products) and requires strict compliance with Apple's App Store Guidelines.**

Before proceeding with development or submission:

1. **Read the Compliance Checklist**: See [IOS_COMPLIANCE_CHECKLIST.md](./IOS_COMPLIANCE_CHECKLIST.md)
2. **Follow the Implementation Guide**: See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
3. **Legal Consultation Required**: Consult with legal counsel regarding vaping regulations in your target markets
4. **Age Restriction**: App is for users 21+ only
5. **Geo-Restrictions**: App must be blocked in regions where vaping marketing is prohibited

### Quick Links to Compliance Documents
- 📋 [iOS Compliance Checklist](./IOS_COMPLIANCE_CHECKLIST.md) - Complete checklist of requirements
- 📖 [Implementation Guide](./IMPLEMENTATION_GUIDE.md) - Step-by-step implementation instructions
- 🔒 [Privacy Policy Template](./PRIVACY_POLICY_TEMPLATE.md) - Must be customized and hosted
- 📜 [Terms of Service Template](./TERMS_OF_SERVICE_TEMPLATE.md) - Must be customized and hosted

## Features

- **Swipe-to-Discover Interface**: Tinder-style swipe interface for vape product discovery
- **Age Verification**: Mandatory 21+ age verification on signup
- **AI-Powered Recommendations**: Personalized suggestions using OpenAI GPT-4o-mini
- **Flavor Profile Builder**: Track preferences and build custom flavor profiles
- **Favorites System**: Save and manage liked products
- **Community Features** (Coming Soon): Connect with other users
- **Push Notifications**: Get notified about new products and recommendations
- **Cross-Platform**: Works on iOS and Android

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation (Native Stack & Bottom Tabs)
- **UI**: Custom components with Expo Vector Icons
- **Backend**: Firebase (Auth, Firestore, Cloud Messaging)
- **AI**: OpenAI GPT-4o-mini for recommendations
- **State Management**: React Hooks
- **Gestures**: React Native Gesture Handler & Reanimated

## Prerequisites

- Node.js 18+ installed
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac only) or Android Studio
- Firebase project configured
- OpenAI API key

## Installation

1. Clone the repository:
```bash
cd vapemate-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration
   - Add your OpenAI API key

4. Update `app.config.js`:
   - Set your EAS project ID
   - Configure bundle identifiers for iOS/Android

## Running the App

### Development Server
```bash
npm start
```

### Run on iOS Simulator (Mac only)
```bash
npm run ios
```

### Run on Android Emulator
```bash
npm run android
```

### Run on Web
```bash
npm run web
```

### Run on Physical Device
1. Install Expo Go app on your device
2. Scan the QR code from `npm start`

## Project Structure

```
vapemate-mobile/
├── src/
│   ├── screens/          # Screen components
│   │   ├── WelcomeScreen.tsx
│   │   ├── AgeVerificationScreen.tsx
│   │   ├── AuthScreen.tsx
│   │   ├── DiscoverScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── services/         # API and service functions
│   ├── config/           # App configuration
│   │   ├── firebase.ts   # Firebase setup
│   │   └── openai.ts     # OpenAI setup
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── assets/           # Images, fonts, etc.
├── App.tsx               # Root component
├── app.config.js         # Expo configuration
└── package.json
```

## Key Screens

### 1. Welcome Screen
- App introduction
- Feature highlights
- "Get Started" CTA

### 2. Age Verification
- Mandatory DOB verification (21+ required)
- Validates age before allowing access
- Clear disclaimer about age requirements

### 3. Authentication
- Email/password sign up and sign in
- Firebase Authentication integration
- Form validation

### 4. Discover (Main Screen)
- Card-based swipe interface
- Product details (name, brand, flavors, nicotine strength, puffs)
- Three actions: Dislike, Super Like, Like
- Real-time preference tracking

### 5. Favorites
- List of liked products
- Quick access to saved items
- Empty state for new users

### 6. Community (Coming Soon)
- Discussion forums
- Product reviews
- Social features

### 7. Profile
- User information
- Preference settings
- Notifications configuration
- Account management

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Enable Cloud Messaging for push notifications
5. Add iOS and Android apps to your Firebase project
6. Download configuration files and update `app.config.js`

### Firestore Collections Structure

```
users/
  {userId}/
    - email
    - displayName
    - dateOfBirth
    - isVerified
    - createdAt

products/
  {productId}/
    - name
    - brand
    - flavors[]
    - nicotineStrength
    - description
    - imageUrl
    - puffCount
    - tags[]

preferences/
  {userId}/
    - likedProducts[]
    - dislikedProducts[]
    - favoriteFlavorProfiles[]
    - nicotinePreference

swipes/
  {swipeId}/
    - userId
    - productId
    - action (like/dislike/superlike)
    - timestamp
```

## OpenAI Integration

The app uses OpenAI GPT-4o-mini to generate personalized recommendations based on:
- Liked products
- Disliked products
- Flavor preferences
- Nicotine strength preferences

API calls are made from `src/config/openai.ts` and return JSON-formatted recommendations.

## Building for Production

### iOS (requires Mac)

1. Configure signing in Xcode
2. Build:
```bash
eas build --platform ios
```

### Android

1. Configure signing keys
2. Build:
```bash
eas build --platform android
```

## App Store Deployment

### iOS App Store
1. Build with `eas build --platform ios`
2. Submit for review via App Store Connect
3. Ensure compliance with age verification requirements

### Google Play Store
1. Build with `eas build --platform android`
2. Upload APK/AAB to Google Play Console
3. Complete age rating questionnaire (Mature 17+)
4. Submit for review

## Compliance & Legal

**CRITICAL**: This app is designed for users 21+ only

### Required Compliance Features
- ✅ Mandatory age verification (implemented)
- ✅ Clear age disclaimers
- ✅ Privacy Policy (link in profile)
- ✅ Terms of Service acceptance
- ⚠️ Health warnings (to be added)
- ⚠️ Location-based restrictions (to be added)

### App Store Requirements
- Age rating: Mature 17+ / Adults Only 18+
- Clear description of vaping content
- Compliance with local regulations
- No targeting of minors

## Development Roadmap

### 30 Days (MVP - Current Phase)
- [x] Core navigation and screens
- [x] Age verification flow
- [x] Firebase integration setup
- [x] Basic swipe interface
- [ ] Firebase authentication implementation
- [ ] Firestore data integration
- [ ] OpenAI recommendations implementation
- [ ] Beta testing with TestFlight/Google Play Beta

### 60 Days (Enhance & Scale)
- [ ] Advanced swipe gestures with animations
- [ ] Flavor profile builder
- [ ] Push notifications
- [ ] Referral system
- [ ] Community features (forums, chat)
- [ ] User reviews and ratings
- [ ] App Store/Play Store submission

### 90 Days (Launch & Grow)
- [ ] Public launch on both platforms
- [ ] Marketing campaign
- [ ] Analytics dashboard
- [ ] User feedback implementation
- [ ] Performance optimizations
- [ ] Additional AI features

## 🚀 Product Enhancements & Roadmap

### Feature Recommendations
See comprehensive feature recommendations and prioritization:
- 📈 [RECOMMENDATIONS.md](./RECOMMENDATIONS.md) - 60+ feature ideas across 10 categories
- 🎯 [TOP_10_PRIORITIES.md](./TOP_10_PRIORITIES.md) - Top 10 features to implement first
- 📊 [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Current progress and next steps

**Quick Highlights**:
- Interactive onboarding flow (50% completion boost)
- Enhanced swipe animations (40% engagement increase)
- Flavor profile builder (core differentiator)
- Freemium premium tier ($9.99/month)
- Daily discovery mix (30% DAU increase)
- Community reviews system (2x session duration)

## Known Issues

- Age verification currently uses client-side validation only (needs server-side verification)
- Mock data used for products (needs Firestore integration)
- Authentication doesn't persist (needs AsyncStorage)
- Some npm package vulnerabilities (mostly from react-native-deck-swiper dependencies)

## Contributing

Please read `CONTRIBUTING.md` for contribution guidelines.

## License

[Specify your license here]

## Support

For support, email support@vapemate.com or open an issue.

## Disclaimer

This application is intended for adult users (21+) only. By using this app, you confirm that you are of legal age to purchase vaping products in your jurisdiction. Vaping products contain nicotine, which is an addictive substance. This app does not promote or encourage the use of vaping products to non-users or minors.
