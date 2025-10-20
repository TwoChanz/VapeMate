# VapeMate iOS App Store Compliance Checklist

This document outlines VapeMate's compliance status against Apple's App Store Review Guidelines and iOS development standards (October 2025).

## ⚠️ CRITICAL: Regulated Industry Considerations

**VapeMate operates in a REGULATED INDUSTRY (vaping/tobacco products)**

### Legal Requirements for Regulated Industries

Per Apple Guidelines § Legal Pillar:
> "Apps operating in regulated industries (finance, healthcare, legal cannabis, gambling, etc.) must be submitted by licensed entities and be geo‑restricted"

#### Action Items:
- [ ] **Verify Licensing**: Ensure the submitting entity has appropriate licenses to operate a vaping-related business
- [ ] **Geo-Restrictions**: Implement location-based restrictions
  - Block access in jurisdictions where vaping marketing is prohibited
  - Verify user location before allowing app usage
  - Maintain updated list of restricted regions
- [ ] **Legal Consultation**: Consult with legal counsel regarding:
  - Federal regulations (FDA, if applicable)
  - State-specific vaping laws
  - Age verification requirements by jurisdiction
  - Marketing restrictions

---

## 1. Safety Pillar Compliance

### ✅ Implemented
- [x] Age verification screen (21+ requirement)
- [x] User disclaimers about age requirements
- [x] No content promoting harmful behavior

### 🔄 Needs Enhancement
- [ ] **Server-Side Age Verification**: Current implementation is client-side only
  - Implement backend verification
  - Store verification status in Firestore
  - Prevent bypassing via app reinstall

- [ ] **Health Warnings**: Add prominent health warnings
  - "Vaping products contain nicotine, which is addictive"
  - "This product is not a smoking cessation device"
  - Display warnings on first launch and in settings

- [ ] **Content Moderation** (for Community features):
  - Implement content filters for objectionable material
  - Add reporting mechanism for abusive users
  - Provide block functionality
  - Display contact information for complaints

### 🆕 2026 Age-Assurance Laws (Texas, Utah, Louisiana)
Starting January 1, 2026, new laws require:
- [ ] Users under 18 must be in Family Sharing group
- [ ] Parents must approve downloads
- [ ] Implement **Declared Age Range API**
- [ ] Implement parental-consent APIs (when available)

**Current Status**: NOT IMPLEMENTED
**Priority**: HIGH (Required by Jan 2026)
**Action**: Add Family Sharing integration and parental controls

---

## 2. Performance Pillar Compliance

### ✅ Implemented
- [x] Complete build with functional screens
- [x] No placeholder text in production code
- [x] TypeScript for type safety

### 🔄 Needs Enhancement
- [ ] **Demo Account**: Provide working demo credentials for App Review
  - Create test account: `demo@vapemate.com` / password
  - Pre-populate with sample data
  - Document in App Review Notes

- [ ] **Backend Services**: Ensure all services are live during review
  - Firebase services enabled
  - OpenAI API configured and tested
  - All endpoints functional

- [ ] **TestFlight Beta Testing**:
  - Distribute beta builds to testers
  - Collect feedback on crashes/bugs
  - Fix all critical issues before submission

### ❌ Not Yet Implemented
- [ ] **Complete Metadata**:
  - Accurate app description
  - High-resolution screenshots (iPhone 15 Pro Max required)
  - App preview video showing actual usage
  - Age rating questionnaire completed
  - Privacy policy URL provided

---

## 3. Business Pillar Compliance

### Current Business Model
**Status**: Usage-based with potential premium features (from pitch doc)

### ✅ Compliant Practices
- [x] No custom payment mechanisms (will use Apple IAP)

### 🔄 Needs Implementation
- [ ] **Clearly Define Business Model**:
  ```
  Recommended Model: Freemium
  - Free download
  - Basic swipe & discovery features (free)
  - Premium features via IAP:
    * Unlimited super likes
    * Advanced AI recommendations
    * Community features (forums, direct messaging)
    * Ad-free experience
  ```

- [ ] **In-App Purchases Configuration**:
  - [ ] Set up products in App Store Connect
  - [ ] Implement StoreKit integration
  - [ ] Add subscription management UI
  - [ ] Test with StoreKit Testing
  - [ ] Implement purchase restoration

- [ ] **Subscription Disclosures** (if using subscriptions):
  - [ ] Clear pricing display
  - [ ] Auto-renewal terms explained
  - [ ] Cancellation instructions provided
  - [ ] **South Korea**: Additional consent for trials/discounts (required Feb 2025)

### ❌ Prohibited Practices (Avoid)
- ❌ Custom payment mechanisms
- ❌ License keys for unlocking features
- ❌ QR codes/AR markers for purchases
- ❌ Cryptocurrency payments for digital content
- ❌ Links to external payment systems

---

## 4. Design Pillar Compliance

### ✅ Implemented
- [x] Unique swipe interface (not copying other apps)
- [x] Useful functionality (vape discovery)
- [x] More than a repackaged website

### 🔄 Human Interface Guidelines Alignment

#### Touch-Friendly Controls
- [x] Buttons are ≥ 44×44 points (current: 64×64 for action buttons ✅)
- [x] Adequate spacing between controls

#### Visual Design
- [ ] **High-Resolution Assets**:
  - Add @2x and @3x app icons
  - Create launch screen (splash)
  - Add adaptive icon for Android
  - Placeholder product images need replacement

- [ ] **Text Legibility**:
  - Review minimum font size (should be ≥ 11pt)
  - Ensure adequate contrast ratios
  - Test on various screen sizes

#### Responsive Layout
- [x] Primary content fits without horizontal scrolling
- [x] SafeAreaView used throughout

### 🆕 Recommended Enhancements
- [ ] Implement haptic feedback on swipe actions
- [ ] Add animations for card transitions
- [ ] Use SF Symbols for icons (iOS native icons)
- [ ] Support Dark Mode (currently light mode only)
- [ ] Add accessibility labels for VoiceOver

---

## 5. Legal Pillar Compliance

### ✅ Implemented
- [x] Age verification (21+ check)
- [x] Legal disclaimers on welcome screen

### ❌ Critical Missing Items

#### Privacy Policy (REQUIRED)
- [ ] **Create comprehensive privacy policy** covering:
  - Personal data collected (email, DOB, preferences, swipes)
  - Usage of data (recommendations, analytics)
  - Third-party partners (Firebase, OpenAI)
  - Data retention and deletion
  - User rights (access, deletion, opt-out)
  - Contact information
  - GDPR compliance (if applicable)
  - CCPA compliance (California users)

- [ ] **Host privacy policy** at permanent URL
- [ ] **Link privacy policy** in:
  - App Store Connect metadata
  - Settings screen
  - Age verification screen
  - Sign-up flow

#### Terms of Service
- [ ] Create Terms of Service document
- [ ] Include:
  - Acceptable use policy
  - Account termination conditions
  - Disclaimer of warranties
  - Limitation of liability
  - Governing law

#### Account Deletion
- [ ] Implement account deletion feature (required by Apple)
- [ ] Allow users to:
  - Request account deletion from Profile screen
  - Download their data before deletion (GDPR/CCPA)
  - Receive confirmation of deletion

#### Data Collection Consent
- [ ] **Request permissions explicitly**:
  - [ ] Camera access (for profile photos)
  - [ ] Photo library access
  - [ ] Push notifications
  - [ ] Location (for geo-restrictions)

- [ ] **Provide opt-out mechanisms**:
  - [ ] Analytics tracking toggle
  - [ ] Marketing notifications toggle
  - [ ] Data sharing preferences

#### App Tracking Transparency (ATT)
- [ ] Implement ATT framework if tracking users across apps/websites
- [ ] Display ATT prompt with clear explanation
- [ ] Honor user's tracking preference

---

## 6. Age Rating Configuration

### Expected Rating: **17+ (Mature) or 18+ (Adults Only)**

#### Age Rating Questionnaire Answers

**Realistic Violence**: None
**Cartoon/Fantasy Violence**: None
**Sexual Content**: None
**Nudity**: None
**Profanity**: None (must moderate user content)
**Horror/Fear Themes**: None
**Mature/Suggestive Themes**: **YES - Tobacco/Vaping Reference**
**Alcohol, Tobacco, Drug Use**: **YES - Tobacco (Vaping)**
**Gambling**: None
**Medical/Treatment Info**: None
**Unrestricted Web Access**: No
**User Generated Content**: **YES** (Community features)

### Required Disclosures
- [ ] Clearly indicate age restriction (21+) in app description
- [ ] Set appropriate age rating in App Store Connect
- [ ] Consider manually selecting 18+ if 17+ seems too low

---

## 7. Marketing & Identity Guidelines

### App Store Badges
- [ ] Use official "Download on the App Store" badge
- [ ] Use black badge as default (white badge only if visually heavy)
- [ ] Do NOT translate "App Store" to other languages
- [ ] Maintain minimum clear space (1/4 badge height)
- [ ] Minimum size: 10mm height (40px)

### Marketing Restrictions
- [ ] **NO marketing to minors**
- [ ] Age-gate any marketing websites
- [ ] Include health warnings in all promotional materials
- [ ] Show app on latest iPhone models (iPhone 15 Pro Max for 2025)
- [ ] Do NOT show competing products in screenshots

### Product Page Requirements
- [ ] Accurate screenshots showing actual app usage
- [ ] No mockups or concept designs
- [ ] Preview video (recommended): 15-30 seconds of actual usage
- [ ] Localized content for target markets
- [ ] Custom product pages for different audiences (optional)

---

## 8. Technical Requirements (2025)

### Build Requirements (Effective April 24, 2025)
- [ ] **Xcode 16 or later** (mandatory)
- [ ] **iOS 18 SDK** (mandatory)
- [ ] Swift 6 or Objective-C with latest features

**Current Status**: Using Expo SDK 54 with React Native
**Action Required**: Ensure Expo CLI generates iOS builds with correct Xcode/SDK versions
**Verify**: Check `eas build` configuration for Xcode 16 support

### EU Trader Status (Effective Feb 18, 2025)
- [ ] Verify trader status in App Store Connect
- [ ] Required for EU distribution
- [ ] Compliance with Digital Services Act

### APNs Token Authentication (Feb 17, 2025)
- [ ] Use team-scoped and topic-specific keys for push notifications
- [ ] Update Firebase Cloud Messaging configuration
- [ ] Test push notification delivery

---

## 9. Geo-Restriction Implementation Plan

### Priority: HIGH (Regulated Industry Requirement)

#### Location Detection
```typescript
// Implement in src/services/geoRestriction.ts
- Detect user's country/region on app launch
- Check against blocked regions list
- Display restriction message if in prohibited area
- Prevent app usage in restricted regions
```

#### Blocked Regions (Example - Update Based on Legal Review)
- Countries where vaping advertising is banned
- U.S. states with strict vaping marketing laws
- Regions where age of majority is > 21

#### Implementation Tasks
- [ ] Create `geoRestriction.ts` service
- [ ] Integrate with Expo Location API
- [ ] Add blocked regions configuration
- [ ] Display geo-restriction screen
- [ ] Test with VPN/location spoofing prevention

---

## 10. Privacy & Data Handling

### Data Collection Transparency

#### Data Collected
- Email address (authentication)
- Date of birth (age verification)
- Display name, photo (optional, profile)
- Product preferences (swipes: like/dislike/superlike)
- Flavor preferences (user-generated)
- Usage analytics (screens viewed, time in app)
- Device information (OS version, device model)

#### Third-Party Services
- **Firebase**: Authentication, Firestore, Analytics, Cloud Messaging
- **OpenAI**: Product recommendations (sends user preferences, not PII)
- **Expo**: Analytics, crash reporting

#### Privacy Controls
- [ ] Implement data export functionality
- [ ] Implement data deletion (Right to be Forgotten)
- [ ] Add privacy dashboard in Settings
- [ ] Display what data is collected and why
- [ ] Allow users to opt out of analytics
- [ ] Allow users to opt out of marketing notifications

---

## 11. Submission Checklist

### Pre-Submission
- [ ] All features complete and tested
- [ ] No crashes or critical bugs
- [ ] TestFlight beta testing completed
- [ ] Demo account created and tested
- [ ] All backend services live and functional
- [ ] Privacy policy published and linked
- [ ] Terms of Service published
- [ ] App icon (1024×1024px) ready
- [ ] Screenshots for all required devices
- [ ] App preview video (optional but recommended)

### App Store Connect Configuration
- [ ] App name: "VapeMate"
- [ ] Subtitle: "Discover Your Perfect Vape"
- [ ] Category: Lifestyle
- [ ] Age rating: 17+ or 18+
- [ ] Pricing: Free (with IAP if applicable)
- [ ] Availability: Select countries (exclude restricted regions)
- [ ] Privacy Policy URL: [your-url]
- [ ] Support URL: [your-url]
- [ ] Marketing URL: [your-url]
- [ ] Copyright: © 2025 VapeMate LLC

### Review Notes for Apple
```
VapeMate is an age-restricted app for adults 21+ only.

DEMO ACCOUNT:
Email: demo@vapemate.com
Password: Demo2025!

IMPORTANT NOTES:
- Age verification is required (21+)
- App operates in regulated vaping industry
- Geo-restrictions implemented for [list regions]
- User-generated content will be moderated (Community features)
- Health warnings displayed prominently
- No marketing to minors

TESTING INSTRUCTIONS:
1. Complete age verification with DOB: 01/01/1990
2. Sign in with demo account
3. Explore Discover screen (swipe interface)
4. View Favorites and Profile screens
```

---

## 12. Post-Launch Requirements

### Analytics & Monitoring
- [ ] Monitor App Analytics (conversion rate, retention)
- [ ] Track crash rate (target: < 1%)
- [ ] Monitor reviews and ratings
- [ ] Set up alerts for issues

### Maintenance
- [ ] Update for new iOS versions within 30 days
- [ ] Respond to user reviews
- [ ] Fix reported bugs promptly
- [ ] Update privacy policy as needed
- [ ] Renew licenses annually

### Regulatory Compliance
- [ ] Monitor changes in vaping regulations
- [ ] Update geo-restrictions as needed
- [ ] Adjust age verification for new laws
- [ ] Stay informed via Apple Developer News

---

## Summary of Immediate Action Items (Priority Order)

### 🔴 Critical (Required for Submission)
1. Create and publish Privacy Policy
2. Create and publish Terms of Service
3. Implement server-side age verification
4. Add health warnings
5. Implement geo-restrictions
6. Configure In-App Purchases (if monetizing)
7. Create demo account for App Review
8. Implement account deletion feature
9. Add high-resolution app icon and screenshots
10. Complete age rating questionnaire

### 🟡 Important (Recommended)
1. Implement Family Sharing integration (for 2026 laws)
2. Add content moderation for Community features
3. Create app preview video
4. Implement Dark Mode support
5. Add haptic feedback and animations
6. TestFlight beta testing
7. Set up Analytics dashboard

### 🟢 Nice-to-Have (Future)
1. Custom product pages for different audiences
2. Localization for other languages
3. In-App Events for promotions
4. Advanced personalization features

---

## Timeline Estimate

**Minimum Viable Compliant App**: 4-6 weeks
**Fully Featured Launch**: 8-12 weeks
**2026 Age-Assurance Compliance**: Before Jan 1, 2026

---

## Resources

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [App Store Connect Guide](https://developer.apple.com/app-store-connect/)
- [Privacy Policy Generator](https://app-privacy-policy-generator.firebaseapp.com/)
- [Apple Developer News](https://developer.apple.com/news/)

---

**Last Updated**: October 2025
**Next Review**: Before submission to App Store Connect
