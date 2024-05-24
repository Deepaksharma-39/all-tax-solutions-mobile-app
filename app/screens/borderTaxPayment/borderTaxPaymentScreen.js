import React, { useState, useCallback } from "react";
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
import { Dropdown } from 'react-native-searchable-dropdown-kj';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from "react-native-paper";
import { Circle } from "react-native-animated-spinkit";

const BorderScreen = ({ navigation }) => {
  const domain = process.env.REACT_APP_API_DOMAIN;
  const [isLoading, setisLoading] = useState(false);

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


  const handleRequest = async () => {
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
        console.log(response.data);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        navigation.push('BottomTabBar')
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log(error.response.data)
      alert("Try Again");
    }

  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar color={Colors.secondaryColor} />
      <ImageBackground
        source={require("../../assets/images/bg2.png")}
        style={styles.bgImageStyle}
      >
        {backArrow()}
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
            {borderPaymentInfo()}
          </ScrollView>
        </View>
      </ImageBackground>
        {loading()}
      {exitInfo()}
    </View>
  );

  function backArrow() {
    return (
      <MaterialIcons
        name="arrow-back-ios"
        color={Colors.whiteColor}
        size={24}
        style={{ position: 'absolute', top: 20.0, left: 20.0, zIndex: 1 }}
        onPress={() => navigation.pop()}
      />
    );
  }

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

  function borderPaymentInfo() {
    return (
      <View style={styles.borderPaymentInfoOuterWrapStyle}>
        <View style={styles.borderPaymentInfoInnerWrapStyle}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Sizes.fixPadding - 8.0,
              paddingBottom: Sizes.fixPadding,
            }}
            automaticallyAdjustContentInsets={true}
          >
            {registerInfo()}
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
      </View>
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
        <MaterialIcons name="emoji-transportation" color={Colors.grayColor} size={15} />
        <TextInput
          value={email}
          onChangeText={(text) => updateState({ email: text })}
          placeholder="Email Address"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }


  
  function fullNameTextField() {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    const data = [
      { label: 'Item 1', value: '1' },
      { label: 'Item 2', value: '2' },
      { label: 'Item 3', value: '3' },
      { label: 'Item 4', value: '4' },
      { label: 'Item 5', value: '5' },
      { label: 'Item 6', value: '6' },
      { label: 'Item 7', value: '7' },
      { label: 'Item 8', value: '8' },
    ];

    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding,
          marginTop: Sizes.fixPadding * 2.5,
          ...styles.textFieldWrapStyle,
        }}
      >
        <Dropdown
          style={[styles.textFieldStyle]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          search
          labelField="label"
          valueField="value"
          searchPlaceholder="Select New"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialIcons name="home" color={Colors.grayColor} size={15} />
          )}
        />
      </View>
    );
  }

  function welcomeText() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0, alignItems: "center" }}>
        <Text style={{ textAlign: "center", ...Fonts.blackColor20Bold }}>
          Border Tax Payment
        </Text>
        <Text style={{ textAlign: "center", ...Fonts.grayColor16SemiBold }}>
          Easy way to pay border tax
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
            height: 55.0,
            resizeMode: "contain",
            marginBottom: Sizes.fixPadding * 2.0,
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color:Colors.grayColor
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
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
  borderPaymentInfoOuterWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding * 5.0,
    height: screenHeight - 250,
    width: screenWidth - 40.0,
    alignSelf: "center",
    marginBottom: 100.0,
    zIndex: 1,
    ...commonStyles.boxShadow,
  },
  borderPaymentInfoInnerWrapStyle: {
    marginTop: Sizes.fixPadding * 3.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
});

export default BorderScreen;
