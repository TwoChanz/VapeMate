# VapeMate iOS Implementation Guide

This guide provides step-by-step instructions for implementing iOS App Store compliance requirements and launching VapeMate on the Apple App Store.

## 📋 Prerequisites

Before beginning implementation, ensure you have:

- [ ] Apple Developer Account ($99/year) - [Sign up](https://developer.apple.com)
- [ ] Legal consultation regarding vaping product app distribution
- [ ] Business license (if required for regulated industry apps)
- [ ] Firebase project set up
- [ ] OpenAI API key
- [ ] Mac with Xcode 16+ installed
- [ ] Understanding of React Native & Expo

---

## Phase 1: Legal & Compliance Foundation (Week 1-2)

### Step 1: Legal Consultation
**Priority: CRITICAL**

1. **Consult with legal counsel** regarding:
   - Federal vaping regulations (FDA, if applicable)
   - State-specific laws in your target markets
   - Age verification requirements (21+ minimum)
   - Marketing restrictions (no targeting minors)
   - Geo-restriction requirements
   - Business licensing needs

2. **Determine restricted regions**:
   - Update `src/services/geoRestriction.ts` with your list
   - Document legal basis for each restriction

3. **Verify submission eligibility**:
   - Confirm your entity can submit a vaping-related app
   - Obtain necessary licenses

**Deliverable**: Legal clearance document and list of restricted regions

---

### Step 2: Privacy Policy & Terms of Service
**Priority: CRITICAL**

1. **Customize templates**:
   - Update `PRIVACY_POLICY_TEMPLATE.md` with your actual:
     - Company name and address
     - Data retention policies
     - Contact emails
     - Specific third-party services
   - Update `TERMS_OF_SERVICE_TEMPLATE.md` with:
     - Company name
     - Governing law jurisdiction
     - Arbitration location
     - Pricing details (if monetizing)

2. **Host documents online**:
   - Use GitHub Pages, your website, or a service like [TermsFeed](https://www.termsfeed.com/)
   - URLs must be permanent and publicly accessible
   - Example URLs:
     - `https://vapemate.com/privacy`
     - `https://vapemate.com/terms`

3. **Update app to link policies**:
   ```typescript
   // In src/screens/AgeVerificationScreen.tsx
   // Add "Privacy Policy" and "Terms" links

   // In src/screens/ProfileScreen.tsx
   // Add menu items linking to policies
   ```

**Deliverable**: Hosted Privacy Policy & Terms of Service with permanent URLs

---

### Step 3: Configure App Store Connect
**Priority: CRITICAL**

1. **Create App Store Connect record**:
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - Click "+" to add new app
   - Platform: iOS
   - Name: VapeMate
   - Bundle ID: `com.vapemate.app` (or your chosen ID)

2. **Set app information**:
   - **Category**: Lifestyle
   - **Age Rating**: Complete questionnaire
     - Tobacco/Vaping Reference: YES
     - User Generated Content: YES (if Community enabled)
     - Recommended: 17+ or 18+
   - **Privacy Policy URL**: [Your URL from Step 2]
   - **Support URL**: Create a support page
   - **Marketing URL**: (Optional) Your marketing website

3. **Configure availability**:
   - **Pricing**: Free (or your chosen model)
   - **Countries**: SELECT ONLY ALLOWED REGIONS
     - Exclude restricted countries from Step 1
     - You can adjust this later

**Deliverable**: App Store Connect record created and configured

---

## Phase 2: Core Compliance Features (Week 3-4)

### Step 4: Implement Server-Side Age Verification
**Priority: HIGH**

Current implementation (client-side) is insufficient for App Store compliance.

1. **Create Firebase Cloud Function** for age verification:
   ```typescript
   // functions/src/verifyAge.ts
   export const verifyAge = functions.https.onCall(async (data, context) => {
     const { dateOfBirth } = data;
     const age = calculateAge(dateOfBirth);

     if (age < 21) {
       throw new functions.https.HttpsError('failed-precondition', 'Must be 21+');
     }

     // Store verification status in Firestore
     await admin.firestore().collection('users').doc(context.auth.uid).update({
       isAgeVerified: true,
       dateOfBirth: dateOfBirth,
       verifiedAt: admin.firestore.FieldValue.serverTimestamp()
     });

     return { verified: true };
   });
   ```

2. **Update `AgeVerificationScreen.tsx`**:
   ```typescript
   const verifyAge = async () => {
     try {
       const result = await functions().httpsCallable('verifyAge')({
         dateOfBirth: `${year}-${month}-${day}`
       });

       if (result.data.verified) {
         navigation.navigate("Auth");
       }
     } catch (error) {
       Alert.alert("Verification Failed", error.message);
     }
   };
   ```

3. **Enforce verification** on app launch:
   - Check `isAgeVerified` status in Firestore
   - Redirect unverified users to AgeVerificationScreen
   - Prevent bypassing via app reinstall

**Deliverable**: Server-side age verification functional

---

### Step 5: Implement Geo-Restrictions
**Priority: HIGH**

1. **Install Expo Location**:
   ```bash
   npx expo install expo-location
   ```

2. **Update `App.tsx`** to check location on launch:
   ```typescript
   import { checkGeoRestriction } from './src/services/geoRestriction';
   import GeoRestrictedScreen from './src/screens/GeoRestrictedScreen';

   export default function App() {
     const [isRestricted, setIsRestricted] = useState(false);
     const [restrictionMessage, setRestrictionMessage] = useState("");

     useEffect(() => {
       async function checkLocation() {
         const result = await checkGeoRestriction();
         if (result.isRestricted) {
           setIsRestricted(true);
           setRestrictionMessage(getRestrictionMessage(result));
         }
       }
       checkLocation();
     }, []);

     if (isRestricted) {
       return <GeoRestrictedScreen message={restrictionMessage} />;
     }

     return <AppNavigator />;
   }
   ```

3. **Update `app.config.js`** permissions:
   ```javascript
   ios: {
     infoPlist: {
       NSLocationWhenInUseUsageDescription: "VapeMate needs your location to verify regional availability and comply with local regulations.",
     },
   },
   ```

4. **Test geo-restrictions**:
   - Use device simulator to test different locations
   - Verify restricted regions show GeoRestrictedScreen

**Deliverable**: Geo-restriction enforcement functional

---

### Step 6: Add Health Warnings
**Priority: HIGH**

1. **Create HealthWarningModal component**:
   ```typescript
   // src/components/HealthWarningModal.tsx
   export default function HealthWarningModal({ visible, onAccept }) {
     return (
       <Modal visible={visible}>
         <View>
           <Text style={styles.warning}>⚠️ Health Warning</Text>
           <Text>
             Vaping products contain nicotine, which is an addictive substance.
             Nicotine is harmful and may be especially harmful to pregnant women.
             This product is not a smoking cessation device.
           </Text>
           <Button title="I Understand" onPress={onAccept} />
         </View>
       </Modal>
     );
   }
   ```

2. **Show warning on first launch**:
   - Use AsyncStorage to track if warning shown
   - Display modal before allowing app access
   - Also show in Settings > Health Information

3. **Add warning to ProfileScreen**:
   ```typescript
   <TouchableOpacity style={styles.menuItem}>
     <Ionicons name="warning" size={24} color="#ef4444" />
     <Text style={styles.menuText}>Health Information</Text>
   </TouchableOpacity>
   ```

**Deliverable**: Health warnings displayed prominently

---

### Step 7: Implement Account Deletion
**Priority: HIGH** (Required by Apple)

1. **Add "Delete Account" to ProfileScreen**:
   ```typescript
   const handleDeleteAccount = () => {
     Alert.alert(
       "Delete Account",
       "Are you sure? This action cannot be undone.",
       [
         { text: "Cancel", style: "cancel" },
         { text: "Delete", style: "destructive", onPress: deleteAccount }
       ]
     );
   };

   const deleteAccount = async () => {
     // Delete user data from Firestore
     await firestore().collection('users').doc(userId).delete();

     // Delete Firebase Auth account
     await auth().currentUser.delete();

     // Sign out and redirect
     navigation.navigate("Welcome");
   };
   ```

2. **Implement data export** (GDPR/CCPA):
   - Create "Download My Data" option
   - Export user data as JSON
   - Email or allow download

**Deliverable**: Account deletion and data export functional

---

## Phase 3: App Store Submission Prep (Week 5-6)

### Step 8: Create App Store Assets

1. **App Icon** (1024×1024px):
   - Design in Figma/Photoshop
   - No transparency, no rounded corners (Apple adds them)
   - High quality PNG

2. **Screenshots** (Required sizes for iPhone):
   - iPhone 15 Pro Max (6.7"): 1290 × 2796 px
   - iPhone 15 Pro (6.1"): 1179 × 2556 px
   - iPhone SE (4.7"): 750 × 1334 px

   **Required screens**:
   - Welcome/Onboarding
   - Age Verification
   - Discover (Swipe Interface)
   - Favorites
   - Profile

   **Tips**:
   - Use Expo's screenshot tools or device simulator
   - Show actual app usage (no mockups)
   - Add captions highlighting features
   - Ensure screenshots show app at its best

3. **App Preview Video** (Optional but recommended):
   - 15-30 seconds of actual app usage
   - Show swipe interaction, favorites, profile
   - Portrait orientation
   - Record on device or simulator

4. **App Description**:
   ```
   VapeMate - Discover Your Perfect Vape

   VapeMate helps adult users (21+) discover disposable vape products through an intuitive swipe interface powered by AI recommendations.

   KEY FEATURES:
   • Swipe to Discover - Browse products with a fun, Tinder-style interface
   • AI-Powered Recommendations - Get personalized suggestions based on your flavor profile
   • Favorites System - Save and manage your liked products
   • Community (Coming Soon) - Connect with other enthusiasts

   AGE RESTRICTION: VapeMate is for adults 21 years and older only. Age verification is required.

   HEALTH WARNING: Vaping products contain nicotine, which is an addictive substance. This app does not sell vaping products.

   Privacy Policy: [URL]
   Terms of Service: [URL]
   ```

**Deliverable**: All App Store assets ready for upload

---

### Step 9: Create Demo Account
**Priority: CRITICAL**

Apple requires a demo account for review.

1. **Create test account**:
   - Email: `demo@vapemate.com`
   - Password: `Demo2025!VapeMate`
   - DOB: 01/01/1990 (ensures 21+)

2. **Pre-populate with data**:
   - Add 10-15 product swipes
   - Add 3-5 favorites
   - Complete profile

3. **Document in App Review Notes**:
   ```
   DEMO ACCOUNT:
   Email: demo@vapemate.com
   Password: Demo2025!VapeMate

   TESTING INSTRUCTIONS:
   1. Launch app and complete age verification (DOB: 01/01/1990)
   2. Sign in with demo account
   3. Swipe through products on Discover screen
   4. View Favorites tab
   5. Explore Profile settings

   IMPORTANT NOTES:
   - Age verification is mandatory (21+)
   - Geo-restrictions enforced for [list regions]
   - Health warnings displayed on first launch
   - User-generated content moderation enabled (Community features)
   ```

**Deliverable**: Demo account ready and documented

---

### Step 10: TestFlight Beta Testing

1. **Set up TestFlight**:
   - In App Store Connect, go to TestFlight
   - Create internal testing group
   - Add beta testers (up to 100 internal testers)

2. **Build and upload**:
   ```bash
   eas build --platform ios
   ```

3. **Distribute to testers**:
   - Testers receive TestFlight invite
   - Collect feedback via TestFlight app

4. **Fix bugs and iterate**:
   - Address crashes
   - Fix UI issues
   - Improve performance

5. **External testing** (optional):
   - Add external testers (up to 10,000)
   - Requires beta app review (faster than full review)

**Deliverable**: Beta tested and bug-free build

---

## Phase 4: Submission & Launch (Week 7-8)

### Step 11: Final Pre-Submission Checklist

Go through `IOS_COMPLIANCE_CHECKLIST.md` and verify:

- [ ] Age verification (server-side) implemented
- [ ] Geo-restrictions enforced
- [ ] Health warnings displayed
- [ ] Privacy Policy hosted and linked
- [ ] Terms of Service hosted and linked
- [ ] Account deletion functional
- [ ] Demo account created
- [ ] All features tested on device
- [ ] No crashes or critical bugs
- [ ] App icon and screenshots ready
- [ ] App description written
- [ ] Age rating questionnaire completed
- [ ] Countries/regions configured (excluding restricted areas)
- [ ] IAP configured (if monetizing)
- [ ] Push notifications tested (if enabled)

---

### Step 12: Submit for Review

1. **Upload build to App Store Connect**:
   ```bash
   eas build --platform ios --auto-submit
   ```
   Or upload manually via Xcode/Transporter

2. **Configure version information**:
   - Version: 1.0.0
   - Build: 1
   - What's New: "Initial release of VapeMate - Discover your perfect vape!"

3. **Add screenshots and metadata**:
   - Upload all screenshots
   - Add app preview video (if created)
   - Enter description, keywords, support URL

4. **Enter Review Notes**:
   - Paste demo account credentials
   - Explain age verification
   - Note geo-restrictions
   - Mention health warnings

5. **Submit for Review**:
   - Click "Submit for Review"
   - Review typically takes 24-48 hours

6. **Monitor status**:
   - Check App Store Connect daily
   - Respond promptly to any issues

---

### Step 13: Handle App Review

**If Approved**:
- App goes live within 24 hours
- Notify users via email/social media
- Begin marketing campaign

**If Rejected**:
1. **Read rejection reason carefully**
2. **Common issues**:
   - Age verification insufficient
   - Missing health warnings
   - Privacy policy issues
   - Geo-restrictions not enforced
   - Demo account not working

3. **Fix issues** and resubmit
4. **Appeal if necessary** (rare)

---

## Phase 5: Post-Launch (Ongoing)

### Step 14: Monitor & Maintain

1. **App Analytics**:
   - Track downloads, active users, retention
   - Monitor crash rate (target: < 1%)
   - Analyze user behavior

2. **Respond to reviews**:
   - Reply to user feedback
   - Address issues mentioned in reviews

3. **Regular updates**:
   - Fix bugs reported by users
   - Add new features
   - Update for new iOS versions
   - Update for regulatory changes

4. **Compliance monitoring**:
   - Stay updated on vaping regulations
   - Adjust geo-restrictions as needed
   - Implement 2026 age-assurance laws (Family Sharing)

---

## Step 15: Prepare for 2026 Age-Assurance Laws

**Deadline: January 1, 2026** (Texas, Utah, Louisiana)

1. **Implement Declared Age Range API**:
   ```swift
   // iOS native code required
   import FamilyControls

   let center = AuthorizationCenter.shared
   center.requestAuthorization { result in
     switch result {
     case .success:
       // User authorized - check age range
       let ageRange = center.declaredAgeRange
     case .failure(let error):
       // Handle error
     }
   }
   ```

2. **Integrate with React Native**:
   - Create native module bridge
   - Expose API to React Native
   - Update age verification flow

3. **Test with Family Sharing**:
   - Set up test Family Sharing group
   - Test parental approval flow
   - Ensure under-18 users are blocked

**Note**: This requires native iOS development (Swift/Objective-C). Consider hiring iOS developer or using Expo's custom native modules.

---

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|-----------------|
| Phase 1: Legal & Compliance | 1-2 weeks | Legal clearance, Privacy Policy, Terms, App Store Connect setup |
| Phase 2: Core Features | 2-3 weeks | Server-side age verification, geo-restrictions, health warnings, account deletion |
| Phase 3: Submission Prep | 2-3 weeks | App Store assets, demo account, TestFlight beta testing |
| Phase 4: Submission & Launch | 1-2 weeks | App submission, review handling, launch |
| Phase 5: Post-Launch | Ongoing | Monitoring, updates, compliance |

**Total time to launch**: 6-10 weeks (assuming no major setbacks)

---

## Budget Estimate

| Item | Cost |
|------|------|
| Apple Developer Account | $99/year |
| Legal consultation | $1,000-$5,000 |
| Firebase (Blaze plan) | $25-100/month |
| OpenAI API | $20-200/month (usage-based) |
| Expo EAS Build | Free (500 builds/month) or $99/month (Pro) |
| Design assets (if outsourced) | $200-$1,000 |
| Marketing website hosting | $10-50/month |
| **Total (first year)** | **$2,000-$7,000** |

---

## Resources

- **App Store Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **App Store Connect**: https://appstoreconnect.apple.com
- **Expo Documentation**: https://docs.expo.dev
- **Firebase Documentation**: https://firebase.google.com/docs
- **React Native Documentation**: https://reactnative.dev

---

## Getting Help

- **Apple Developer Forums**: https://developer.apple.com/forums/
- **Expo Discord**: https://chat.expo.dev
- **Stack Overflow**: Tag questions with `react-native`, `expo`, `ios`
- **VapeMate Issues**: Open issues in your GitHub repo

---

**Good luck with your launch! 🚀**

If you have questions or need clarification on any step, refer to the detailed compliance checklist (`IOS_COMPLIANCE_CHECKLIST.md`) or reach out to the community resources above.
