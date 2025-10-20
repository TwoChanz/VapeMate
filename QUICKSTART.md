# VapeMate - Quick Start Guide

## Get Up and Running in 5 Minutes

### 1. Install Dependencies

```bash
cd vapemate-mobile
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then fill in your API keys (you can skip this for now and add them later):
- Firebase configuration (get from Firebase Console)
- OpenAI API key (get from OpenAI Platform)

### 3. Start the Development Server

```bash
npm start
```

This will start Expo and show you a QR code.

### 4. Run on Your Device

**Option A: Physical Device (Easiest)**
1. Install "Expo Go" app from App Store or Google Play
2. Scan the QR code from your terminal
3. App will load on your device

**Option B: iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option C: Android Emulator**
```bash
npm run android
```

**Option D: Web Browser**
```bash
npm run web
```

### 5. Test the App

1. You'll see the Welcome screen
2. Tap "Get Started"
3. Enter a birth date (must be 21+)
4. Sign up/Sign in (currently mock - Firebase integration needed)
5. Start swiping on the Discover screen!

## Next Steps

### Required Configuration (Before Production)

1. **Set up Firebase Project**
   - Go to https://console.firebase.google.com
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Enable Cloud Messaging
   - Get configuration and add to `.env`

2. **Get OpenAI API Key**
   - Go to https://platform.openai.com
   - Create an API key
   - Add to `.env`

3. **Configure EAS Build**
   - Install EAS CLI: `npm install -g eas-cli`
   - Login: `eas login`
   - Configure: `eas build:configure`

### Implement Core Features

Current screens are working with mock data. Next steps:

1. **Implement Firebase Auth**
   - Update `src/screens/AuthScreen.tsx`
   - Use `src/config/firebase.ts`

2. **Add Product Data**
   - Create products collection in Firestore
   - Update `src/screens/DiscoverScreen.tsx` to fetch real data

3. **Implement AI Recommendations**
   - Wire up OpenAI API in `src/config/openai.ts`
   - Create recommendation service

4. **Add Swipe Persistence**
   - Save swipe actions to Firestore
   - Update user preferences

## Project Structure

```
vapemate-mobile/
├── src/
│   ├── screens/      # 7 screens ready to use
│   ├── navigation/   # Tab + Stack navigation configured
│   ├── config/       # Firebase & OpenAI setup files
│   └── types/        # TypeScript definitions
├── App.tsx           # Entry point
└── app.config.js     # Expo configuration
```

## Common Issues

**Issue: App won't start**
- Run `npm install` again
- Clear cache: `expo start -c`

**Issue: "Firebase not configured" error**
- This is expected - add Firebase config to .env
- Or ignore for now if just testing UI

**Issue: Can't scan QR code**
- Make sure phone and computer are on same WiFi
- Try tunnel mode: `expo start --tunnel`

## Development Tips

1. **Hot Reload**: Changes automatically refresh
2. **Debug Menu**: Shake device or press Cmd+D (iOS) / Cmd+M (Android)
3. **Logs**: Check terminal for console.log output
4. **TypeScript**: All screens are fully typed

## Need Help?

- Check full README.md for detailed documentation
- Review Firebase docs: https://firebase.google.com/docs
- Expo docs: https://docs.expo.dev
- React Navigation: https://reactnavigation.org

## Ready for Production?

See README.md sections on:
- Building for iOS/Android
- App Store submission
- Compliance requirements
- Analytics setup

---

Happy coding! 🚀
