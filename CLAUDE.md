# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VapeMate is a React Native/Expo mobile app for personalized vape product discovery through a swipe-based interface (like Tinder for vaping products). Users swipe through products, build flavor profiles, and receive AI-driven recommendations.

**Important**: This app operates in a regulated industry (vaping products) and requires strict compliance with iOS App Store guidelines. All development must consider 21+ age verification and geo-restriction requirements.

## Development Commands

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on specific platforms
npm run ios      # iOS Simulator (Mac only)
npm run android  # Android Emulator
npm run web      # Web browser

# Clear cache and restart
expo start -c

# Run on physical device
# Install Expo Go app, then scan QR code from npm start

# Production builds (requires EAS CLI)
eas build --platform ios
eas build --platform android
```

## Environment Setup

Copy `.env.example` to `.env` and configure:
- Firebase credentials (API key, auth domain, project ID, storage bucket, messaging sender ID, app ID)
- OpenAI API key

Configuration is loaded through `app.config.js` via `process.env`.

## Architecture

### Tech Stack
- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation (Native Stack + Bottom Tabs)
- **Backend**: Firebase (Auth, Firestore, Cloud Messaging)
- **AI**: OpenAI GPT-4o-mini for recommendations
- **Gestures**: react-native-gesture-handler and react-native-reanimated
- **Swipe UI**: react-native-deck-swiper

### Entry Points
- `index.ts` - Registers the root component with Expo
- `App.tsx` - Root component wrapping AppNavigator in GestureHandlerRootView

### Planned Directory Structure (src/)
```
screens/         # WelcomeScreen, AgeVerificationScreen, AuthScreen,
                 # DiscoverScreen, FavoritesScreen, CommunityScreen, ProfileScreen
navigation/      # AppNavigator.tsx (tab + stack configuration)
config/          # firebase.ts, openai.ts
services/        # API and service functions
types/           # TypeScript definitions
```

### Firestore Data Model
- `users/{userId}` - User profile with DOB, verification status
- `products/{productId}` - Product catalog (name, brand, flavors, nicotine strength, puff count)
- `preferences/{userId}` - Liked/disliked products, flavor profiles
- `swipes/{swipeId}` - Swipe action history for recommendations

### Navigation Flow
```
┌─────────────┐     ┌──────────────────┐     ┌────────────┐
│   Welcome   │ ──► │ Age Verification │ ──► │    Auth    │
│   Screen    │     │   (21+ check)    │     │  (SignUp/  │
└─────────────┘     └──────────────────┘     │   SignIn)  │
                                             └─────┬──────┘
                                                   │
                                                   ▼
                    ┌──────────────────────────────────────────┐
                    │           Main Tab Navigator             │
                    ├──────────┬───────────┬──────────┬────────┤
                    │ Discover │ Favorites │Community │Profile │
                    │ (Swipe)  │  (Saved)  │ (Forums) │(Acct)  │
                    └──────────┴───────────┴──────────┴────────┘
```

- **Onboarding Stack**: Welcome → Age Verification → Auth (Native Stack)
- **Main App**: Bottom Tab Navigator with 4 tabs
- **Auth Guard**: Users must pass age verification before accessing main app

## Current State

The project is in MVP phase with scaffolding complete but core features pending implementation:
- Age verification flow exists but uses client-side validation only
- Authentication screens exist but Firebase integration needed
- Swipe interface uses mock data (needs Firestore integration)
- AI recommendations not yet wired up

### Known Issues
- Age verification uses client-side validation only (needs server-side verification)
- Mock data used for products (needs Firestore integration)
- Authentication doesn't persist (needs AsyncStorage implementation)
- Some npm package vulnerabilities from react-native-deck-swiper dependencies

### Roadmap Documents
- `RECOMMENDATIONS.md` - 60+ feature ideas across 10 categories
- `TOP_10_PRIORITIES.md` - Prioritized features to implement first
- `PROJECT_STATUS.md` - Current progress tracking

## Compliance Requirements

Reference these documents before implementing features:
- `IOS_COMPLIANCE_CHECKLIST.md` - App Store requirements for vaping apps
- `IMPLEMENTATION_GUIDE.md` - Step-by-step compliance implementation
- `PRIVACY_POLICY_TEMPLATE.md` and `TERMS_OF_SERVICE_TEMPLATE.md` - Legal templates

Key requirements:
- Mandatory 21+ age verification on signup
- Health warnings on product screens
- Geo-blocking for prohibited regions
- No targeting of minors in any content/marketing
