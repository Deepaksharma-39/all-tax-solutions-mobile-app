import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import qrScanScreen from "./screens/qrScan/qrScanScreen";
import searchScreen from "./screens/search/searchScreen";
import selectContactScreen from "./screens/selectContact/selectContactScreen";
import recentlySendMoneyScreen from "./screens/recentlySendMoney/recentlySendMoneyScreen";
import sendMoneyScreen from "./screens/sendMoney/sendMoneyScreen";
import addMoneyScreen from "./screens/addMoney/addMoneyScreen";
import paymentMethodScreen from "./screens/paymentMethod/paymentMethodScreen";
import transactionSuccessfulScreen from "./screens/transactionSuccessful/transactionSuccessfulScreen";
import chooseCardScreen from "./screens/chooseCard/chooseCardScreen";
import addNewCardScreen from "./screens/addNewCard/addNewCardScreen";
import walletScreen from "./screens/wallet/walletScreen";
import quickRechargesAndBillPaysScreen from "./screens/quickRechargesAndBillPays/quickRechargesAndBillPaysScreen";
import mobileRechargeScreen from "./screens/mobileRecharge/mobileRechargeScreen";
import promocodeScreen from "./screens/promocode/promocodeScreen";
import electricityBillPaymentScreen from "./screens/electricityBillPayment/electricityBillPaymentScreen";
import electricityBillConsumerDetailScreen from "./screens/electricityBillConsumerDetail/electricityBillConsumerDetailScreen";
import electricityBillDetailScreen from "./screens/electricityBillDetail/electricityBillDetailScreen";
import ticketBookingScreen from "./screens/ticketBooking/ticketBookingScreen";
import flightSearchScreen from "./screens/flightSearch/flightSearchScreen";
import flightTicketBookingDetailScreen from "./screens/flightTicketBookingDetail/flightTicketBookingDetailScreen";
import travellersDetailScreen from "./screens/travellersDetail/travellersDetailScreen";
import busSearchScreen from "./screens/busSearch/busSearchScreen";
import busSeatSelectionScreen from "./screens/busSeatSelection/busSeatSelectionScreen";
import busTicketBookingDetailScreen from "./screens/busTicketBookingDetail/busTicketBookingDetailScreen";
import movieCinemaAndSeatSelectionScreen from "./screens/movieCinemaAndSeatSelection/movieCinemaAndSeatSelectionScreen";
import movieTicketBookingDetailScreen from "./screens/movieTicketBookingDetail/movieTicketBookingDetailScreen";
import offersScreen from "./screens/offers/offersScreen";
import rewardsScreen from "./screens/rewards/rewardsScreen";
import shopByCategoriesScreen from "./screens/shopByCategories/shopByCategoriesScreen";
import inviteFriendsScreen from "./screens/inviteFriends/inviteFriendsScreen";
import productsScreen from "./screens/products/productsScreen";
import productDetailScreen from "./screens/productDetail/productDetailScreen";
import cartScreen from "./screens/cart/cartScreen";
import checkoutScreen from "./screens/checkout/checkoutScreen";
import addNewAddressScreen from "./screens/addNewAddress/addNewAddressScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import qrCodeScreen from "./screens/qrCode/qrCodeScreen";
import favoritesScreen from "./screens/favorites/favoritesScreen";
import helpScreen from "./screens/help/helpScreen";
import helpDetailScreen from "./screens/helpDetail/helpDetailScreen";
import termsAndConditionsScreen from "./screens/termsAndConditions/termsAndConditionsScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";
import splashScreen from "./screens/splashScreen";
import loginResisterScreen from "./screens/auth/loginRegisterScreen";
import verificationScreen from "./screens/auth/verificationScreen";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

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
          <Stack.Screen name="Verification" component={verificationScreen} />
          <Stack.Screen name="BottomTabBar" component={bottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Search" component={searchScreen} />
          <Stack.Screen name="QrScan" component={qrScanScreen} />
          <Stack.Screen name="Notifications" component={notificationsScreen} />
          <Stack.Screen name="RecentlySendMoney" component={recentlySendMoneyScreen} />
          <Stack.Screen name="SelectContact" component={selectContactScreen} />
          <Stack.Screen name="SendMoney" component={sendMoneyScreen} />
          <Stack.Screen name="TransactionSuccessful" component={transactionSuccessfulScreen} />
          <Stack.Screen name="AddMoney" component={addMoneyScreen} />
          <Stack.Screen name="PaymentMethod" component={paymentMethodScreen} />
          <Stack.Screen name="ChooseCard" component={chooseCardScreen} />
          <Stack.Screen name="AddNewCard" component={addNewCardScreen} />
          <Stack.Screen name="Wallet" component={walletScreen} />
          <Stack.Screen name="QuickRechargesAndBillPays" component={quickRechargesAndBillPaysScreen} />
          <Stack.Screen name="MobileRecharge" component={mobileRechargeScreen} />
          <Stack.Screen name="PromoCode" component={promocodeScreen} />
          <Stack.Screen name="ElectricityBillPayment" component={electricityBillPaymentScreen} />
          <Stack.Screen name="ElectricityBillConsumerDetail" component={electricityBillConsumerDetailScreen} />
          <Stack.Screen name="ElectricityBillDetail" component={electricityBillDetailScreen} />
          <Stack.Screen name="TicketBooking" component={ticketBookingScreen} />
          <Stack.Screen name="FlightSearch" component={flightSearchScreen} />
          <Stack.Screen name="FlightTicketBookingDetail" component={flightTicketBookingDetailScreen} />
          <Stack.Screen name="TravellersDetail" component={travellersDetailScreen} />
          <Stack.Screen name="BusSearch" component={busSearchScreen} />
          <Stack.Screen name="BusSeatSelection" component={busSeatSelectionScreen} />
          <Stack.Screen name="BusTicketBookingDetail" component={busTicketBookingDetailScreen} />
          <Stack.Screen name="MovieCinemaAndSeatSelection" component={movieCinemaAndSeatSelectionScreen} />
          <Stack.Screen name="MovieTicketBookingDetail" component={movieTicketBookingDetailScreen} />
          <Stack.Screen name="Offers" component={offersScreen} />
          <Stack.Screen name="Rewards" component={rewardsScreen} />
          <Stack.Screen name="InviteFriends" component={inviteFriendsScreen} />
          <Stack.Screen name="ShopByCategories" component={shopByCategoriesScreen} />
          <Stack.Screen name="Products" component={productsScreen} />
          <Stack.Screen name="ProductDetail" component={productDetailScreen} />
          <Stack.Screen name="Cart" component={cartScreen} />
          <Stack.Screen name="Checkout" component={checkoutScreen} />
          <Stack.Screen name="AddNewAddress" component={addNewAddressScreen} />
          <Stack.Screen name="EditProfile" component={editProfileScreen} />
          <Stack.Screen name="QrCode" component={qrCodeScreen} />
          <Stack.Screen name="Favorites" component={favoritesScreen} />
          <Stack.Screen name="Help" component={helpScreen} />
          <Stack.Screen name="HelpDetail" component={helpDetailScreen} />
          <Stack.Screen name="TermsAndConditions" component={termsAndConditionsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;