import React, { useState, useCallback, useEffect } from "react";
import {
  BackHandler,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from 'axios';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenHeight,
  screenWidth,
} from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../components/myStatusBar";
import { Modal } from "react-native-paper";
import { Circle } from "react-native-animated-spinkit";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuth } from "../../redux/authSlice";
import { fetchVenueFailure, fetchVenueStart, fetchVenueSuccess, selectVenue } from "../../redux/venueSlice";
import { fetchBanners } from "../../redux/bannerSlice";

const LoginScreen = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);
    const dispatch = useDispatch();

    const {isAuthenticated } = useSelector(selectAuth);

    useEffect(() => {
      dispatch(fetchBanners());
    }, [dispatch]);

    const venue = useSelector(selectVenue);
  const backAction = () => {
    if (Platform.OS == "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
    }
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      navigation.addListener("gestureEnd", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
        navigation.removeListener("gestureEnd", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  const [state, setState] = useState({
    loginMobileNo:null,
    loginPassword:null,
    viewLoginInfo: true,
    fullName:null,
    email:null,
    registerMobileNo:null,
    registerPassword:null,
    confirmPassword:null,
    secureConfiremPassword: true,
    secureRegisterPassword: true,
    secureLoginPassword: true,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const {
    loginMobileNo,
    loginPassword,
    viewLoginInfo,
    fullName,
    email,
    registerMobileNo,
    registerPassword,
    confirmPassword,
    secureConfiremPassword,
    secureRegisterPassword,
    secureLoginPassword,
  } = state;

  const handleRegister = async () => {
    const baseUrl = "https://api.allroadtaxsolutions.com";
    try {
      const response = await axios.post(`${baseUrl}/users/register`, {
        fullname: state.fullName,
        mobile: state.registerMobileNo,
        email: state.email,
        password: state.registerPassword
      });

      if (response.status === 200) {
        alert(`Registration Successful`);
        updateState({ viewLoginInfo: true })
      } else {
        alert(`Failed Please try again!`);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log(error.response.data)
      alert("Try again");
    }

  }


  const handleLogin = async () => {
    const baseUrl = "https://api.allroadtaxsolutions.com";
    try {
      const response = await axios.post(`${baseUrl}/users/login`, {
        mobile: state.loginMobileNo,
        password: state.loginPassword
      });

      if (response.status === 200) {
        // await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        dispatch(login(response.data));
        navigation.push('BottomTabBar',{ userData: response.data })
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log(error.response.data)
      alert("Try Again");
    }

  }

  useEffect(() => {
    if (isAuthenticated && venue.status === 'idle') {
      const fetchData = async () => {
        dispatch(fetchVenueStart());
        const baseUrl = "https://api.allroadtaxsolutions.com";
        try {
          const response = await axios.get(`${baseUrl}/venue`);

          if (response.status === 200) {
            dispatch(fetchVenueSuccess(response.data));
          } else {
            throw new Error("An error has occurred");
          }
        } catch (error) {
          dispatch(fetchVenueFailure(error.message));
          console.log(error.response ? error.response.data : error.message);
          Alert.alert("Try Again");
          navigation.pop();
        }
      };
      
      fetchData();
    }
  }, [isAuthenticated, dispatch, venue.status, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar color={Colors.secondaryColor} />
      <ImageBackground
        source={require("../../assets/images/bg2.png")}
        style={styles.bgImageStyle}
      >
        {appLogo()}
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={{
              marginTop: 100.0,
              paddingBottom: Sizes.fixPadding * 2.0,
            }}
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
          >
            {loginRegisterInfo()}
          </ScrollView>
        </View>
      </ImageBackground>
        {loading()}
      {exitInfo()}
    </View>
  );

  function loading() {
    return (
      <Modal visible={isLoading} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <View style={styles.dialogStyle}>
          <Circle size={50} color={Colors.primaryColor} />
          <Text
            style={{
              ...Fonts.grayColor16SemiBold,
              marginTop: Sizes.fixPadding * 2.5,
            }}>
            Please Wait..
          </Text>
        </View>
      </Modal>
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={commonStyles.exitWrapper}>
        <Text style={{ ...Fonts.whiteColor14SemiBold }}>
          Press Back Once Again to Exit
        </Text>
      </View>
    ) : null;
  }

  function loginRegisterInfo() {
    return (
      <View style={styles.loginRegisterInfoOuterWrapStyle}>
        <View style={styles.loginRegisterInfoInnerWrapStyle}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Sizes.fixPadding - 8.0,
              paddingBottom: Sizes.fixPadding,
            }}
            automaticallyAdjustContentInsets={true}
          >
            {loginRegisterOptions()}
            {state.viewLoginInfo ? loginInfo() : registerInfo()}
          </ScrollView>
        </View>
      </View>
    );
  }

  function registerInfo() {
    return (
      <View>
        {welcomeText()}
        {fullNameTextField()}
        {emailAddressTextField()}
        {registerMobileNoTextField()}
        {registerPasswordTextField()}
        {confirmPasswordTextField()}
        {registerButton()}
        {alreadyAccountInfo()}
      </View>
    );
  }

  function alreadyAccountInfo() {
    return (
      <Text style={{ textAlign: "center" }}>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>
          Already have an account? { }
        </Text>
        <Text
          onPress={() => updateState({ viewLoginInfo: true })}
          style={{ ...Fonts.primaryColor18Bold }}
        >
          Login Now
        </Text>
      </Text>
    );
  }

  function registerButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        // onPress={() => { setisLoading(true); handleRegister(); setisLoading(false) }}
        onPress={()=>{
          setisLoading(true);
          handleRegister();
          setTimeout(() => {
            setisLoading(false);
          }, 2000);
        }}
        style={styles.loginRegisterButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor22Bold }}>Register</Text>
      </TouchableOpacity>
    );
  }

  function confirmPasswordTextField() {
    return (
      <View
        style={{
          justifyContent: "space-between",
          ...styles.textFieldWrapStyle,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="lock" color={Colors.grayColor} size={15} />
          <TextInput
            secureTextEntry={secureConfiremPassword}
            value={confirmPassword}
            onChangeText={(text) => updateState({ confirmPassword: text })}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.grayColor}
            style={styles.textFieldStyle}
            selectionColor={Colors.primaryColor}
            textContentType="oneTimeCode"
          />
        </View>
        <MaterialCommunityIcons
          name={secureConfiremPassword ? "eye" : "eye-off"}
          color={Colors.grayColor}
          size={15}
          onPress={() =>
            updateState({ secureConfiremPassword: !secureConfiremPassword })
          }
        />
      </View>
    );
  }

  function registerPasswordTextField() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding,
          justifyContent: "space-between",
          ...styles.textFieldWrapStyle,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="lock" color={Colors.grayColor} size={15} />
          <TextInput
            secureTextEntry={secureRegisterPassword}
            value={registerPassword}
            onChangeText={(text) => updateState({ registerPassword: text })}
            placeholder="Create Password"
            placeholderTextColor={Colors.grayColor}
            style={styles.textFieldStyle}
            selectionColor={Colors.primaryColor}
            textContentType="oneTimeCode"
          />
        </View>
        <MaterialCommunityIcons
          name={secureRegisterPassword ? "eye" : "eye-off"}
          color={Colors.grayColor}
          size={15}
          onPress={() =>
            updateState({ secureRegisterPassword: !secureRegisterPassword })
          }
        />
      </View>
    );
  }

  function registerMobileNoTextField() {
    return (
      <View
        style={{ marginBottom: Sizes.fixPadding, ...styles.textFieldWrapStyle }}
      >
        <MaterialIcons
          name="phone-android"
          color={Colors.grayColor}
          size={15}
        />
        <TextInput
          value={registerMobileNo}
          onChangeText={(text) => updateState({ registerMobileNo: text })}
          placeholder="Mobile Number"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="numeric"
          required
        />
      </View>
    );
  }

  function emailAddressTextField() {
    return (
      <View
        style={{ marginBottom: Sizes.fixPadding, ...styles.textFieldWrapStyle }}
      >
        <MaterialIcons name="email" color={Colors.grayColor} size={15} />
        <TextInput
          value={email}
          onChangeText={(text) => updateState({ email: text })}
          placeholder="Email Address"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
        />
      </View>
    );
  }

  function fullNameTextField() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding,
          marginTop: Sizes.fixPadding * 2.5,
          ...styles.textFieldWrapStyle,
        }}
      >
        <MaterialIcons name="person" color={Colors.grayColor} size={15} />
        <TextInput
          value={fullName}
          onChangeText={(text) => updateState({ fullName: text })}
          placeholder="Full Name"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function welcomeText() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0, alignItems: "center" }}>
        <Text style={{ textAlign: "center", ...Fonts.blackColor20Bold }}>
          Welcome to Digital Payment
        </Text>
        <Text style={{ textAlign: "center", ...Fonts.grayColor16SemiBold }}>
          Let’s create your account
        </Text>
      </View>
    );
  }

  function loginInfo() {
    return (
      <View>
        {welcomeBackText()}
        {loginMobileNumberTextField()}
        {loginPasswordTextField()}
        {forgetpasswordText()}
        {loginButton()}
        {dontAccountInfo()}
      </View>
    );
  }

  function dontAccountInfo() {
    return (
      <Text style={{ textAlign: "center" }}>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>
          Don’t have an account?{` `}
        </Text>
        <Text
          onPress={() => updateState({ viewLoginInfo: false })}
          style={{ ...Fonts.primaryColor18Bold }}
        >
          Register Now
        </Text>
      </Text>
    );
  }

  function loginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={()=>{
          setisLoading(true);
          handleLogin();
          setTimeout(() => {
            setisLoading(false);
          }, 2000);
        }}
        style={styles.loginRegisterButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor22Bold }}>Login</Text>
      </TouchableOpacity>
    );
  }

  function forgetpasswordText() {
    return (
      <Text
        style={{
          marginTop: Sizes.fixPadding - 5.0,
          textAlign: "right",
          ...Fonts.primaryColor14SemiBold,
        }}
      >
        Forget password?
      </Text>
    );
  }

  function loginPasswordTextField() {
    return (
      <View
        style={{
          justifyContent: "space-between",
          ...styles.textFieldWrapStyle,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="lock" color={Colors.grayColor} size={15} />
          <TextInput
            secureTextEntry={secureLoginPassword}
            value={loginPassword}
            onChangeText={(text) => { updateState({ loginPassword: text }) }}
            placeholder="Password"
            placeholderTextColor={Colors.grayColor}
            style={styles.textFieldStyle}
            selectionColor={Colors.primaryColor}
            textContentType="oneTimeCode"
          />
        </View>
        <MaterialCommunityIcons
          name={secureLoginPassword ? "eye" : "eye-off"}
          color={Colors.grayColor}
          size={15}
          onPress={() =>
            updateState({ secureLoginPassword: !secureLoginPassword })
          }
        />
      </View>
    );
  }

  function loginMobileNumberTextField() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding,
          marginTop: Sizes.fixPadding * 2.5,
          ...styles.textFieldWrapStyle,
        }}
      >
        <MaterialIcons
          name="phone-android"
          color={Colors.grayColor}
          size={15}
        />
        <TextInput
          value={loginMobileNo}
          onChangeText={(text) => updateState({ loginMobileNo: text })}
          placeholder="Mobile Number"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="phone-pad"
        />
      </View>
    );
  }

  function welcomeBackText() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0, alignItems: "center" }}>
        <Text style={{ ...Fonts.blackColor20Bold }}>Welcome Back</Text>
        <Text style={{ textAlign: "center", ...Fonts.grayColor16SemiBold }}>
          We’re happy to see you again
        </Text>
      </View>
    );
  }

  function loginRegisterOptions() {
    return (
      <View style={styles.loginRegisterOptionsWrapStyle}>
        <Text
          onPress={() => updateState({ viewLoginInfo: true })}
          style={
            viewLoginInfo
              ? { ...Fonts.primaryColor25ExtraBold }
              : { ...Fonts.grayColor25ExtraBold }
          }
        >
          Login
        </Text>
        <Text
          onPress={() => updateState({ viewLoginInfo: false })}
          style={
            !viewLoginInfo
              ? { ...Fonts.primaryColor25ExtraBold }
              : { ...Fonts.grayColor25ExtraBold }
          }
        >
          Register
        </Text>
      </View>
    );
  }

  function appLogo() {
    return (
      <View style={styles.appLogoWrapStyle}>
        <Image
          source={require("../../assets/images/logo1.png")}
          style={{
            width: 130.0,
            height: 75.0,
            resizeMode: "contain",
            marginBottom: Sizes.fixPadding * 2.0,
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  bgImageStyle: {
    width: "100%",
    height: screenHeight / 2.5,
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: Colors.secondaryColor,
  },
  textFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
  textFieldStyle: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
    ...Fonts.blackColor18Regular,
    padding: 0,
  },
  loginRegisterButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: "rgba(86, 0, 65, 0.2)",
    marginVertical: Sizes.fixPadding + 5.0,
    ...commonStyles.buttonShadow,
  },
  loginRegisterOptionsWrapStyle: {
    marginHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appLogoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    position: "absolute",
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    borderTopLeftRadius: Sizes.fixPadding * 5.0,
    borderTopRightRadius: Sizes.fixPadding * 5.0,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 200.0,
  },
  loginRegisterInfoOuterWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding * 5.0,
    height: screenHeight - 250,
    width: screenWidth - 40.0,
    alignSelf: "center",
    marginBottom: 100.0,
    zIndex: 1,
    ...commonStyles.boxShadow,
  },
  loginRegisterInfoInnerWrapStyle: {
    marginTop: Sizes.fixPadding * 3.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flex: 1,
  },
  dialogStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    padding: Sizes.fixPadding * 2.0,
    width: '80%',
    alignSelf: 'center'
  },
});

export default LoginScreen;
