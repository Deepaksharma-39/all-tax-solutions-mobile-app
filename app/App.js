import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";
import splashScreen from "./screens/splashScreen";
import loginResisterScreen from "./screens/auth/loginRegisterScreen";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import BorderTaxScreen from './screens/borderTax/borderTaxPaymentScreen';
import BorderTaxBookingDetailsScreen from './screens/borderTaxBookingDetail/borderTaxBookingDetailsScreen';
import DownloadReceipt from './screens/downloadReceipt/downloadReceipt';
import TermsAndConditionsScreen from './screens/termsAndConditions/termsAndConditionsScreen';
import HelpScreen from './screens/help/helpScreen';
import HelpDetailScreen from './screens/helpDetail/helpDetailScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import PrivacyPolicyScreen from './screens/privacyPolicy/privacyPolicy';

ExpoSplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    NunitoSans_Black: require("./assets/fonts/NunitoSans-Black.ttf"),
    NunitoSans_Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    NunitoSans_SemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
    NunitoSans_Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    NunitoSans_ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Splash" component={splashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Onboarding" component={onboardingScreen} />
          <Stack.Screen name="LoginRegister" component={loginResisterScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="BottomTabBar" component={bottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Notifications" component={notificationsScreen} />
          <Stack.Screen name="EditProfile" component={editProfileScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="BorderTax" component={BorderTaxScreen} />
          <Stack.Screen name="BorderTaxBooking" component={BorderTaxBookingDetailsScreen} />
          <Stack.Screen name="DownloadReciept" component={DownloadReceipt} />
          <Stack.Screen name="TermsCondition" component={TermsAndConditionsScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen name="HelpDetail" component={HelpDetailScreen} />

        </Stack.Navigator>
      </NavigationContainer>
      </Provider>

    );
  }
}

export default App;