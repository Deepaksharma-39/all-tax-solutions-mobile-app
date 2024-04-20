import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  screenHeight,
  screenWidth,
  commonStyles,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Circle } from 'react-native-animated-spinkit';
import MyStatusBar from '../../components/myStatusBar';
import { OtpInput } from "react-native-otp-entry";
import { Modal } from 'react-native-paper';

const VerificationScreen = ({ navigation,route }) => {
  const [otpInput, setotpInput] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const { mobileNumber } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar color={Colors.secondaryColor} />
      <ImageBackground
        source={require('../../assets/images/bg2.png')}
        style={styles.screenBackImageStyle}>
        {backArrow()}
        {appLogo()}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <ScrollView
            nestedScrollEnabled={true}
            automaticallyAdjustContentInsets={true}
            contentContainerStyle={{
              marginTop: 100.0,
              paddingBottom: Sizes.fixPadding * 2.0,
            }}
            showsVerticalScrollIndicator={false}>
            {verificationInfo()}
          </ScrollView>
        </View>
        {loading()}
      </ImageBackground>
    </View>
  );

  function loading() {
    return (
      <Modal visible={isLoading}>
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

  function verificationInfo() {
    return (
      <View style={styles.loginRegisterInfoOuterWrapStyle}>
        <View style={styles.loginRegisterInfoInnerWrapStyle}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={true}
            contentContainerStyle={{
              paddingHorizontal: Sizes.fixPadding - 8.0,
              paddingBottom: Sizes.fixPadding,
            }}>
            {verifyInfo()}
            {enterCodeInfo()}
            {dontReceiveInfo()}
            {continueButton()}
          </ScrollView>
        </View>
      </View>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push('BottomTabBar');
          }, 2000);
        }}
        style={styles.continueButtonStyle}>
        <Text style={{ ...Fonts.whiteColor22Bold }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function dontReceiveInfo() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', ...Fonts.grayColor16SemiBold }}>
          Didn’t you receive any code?
        </Text>
        <Text
          style={{ marginTop: Sizes.fixPadding, ...Fonts.primaryColor18Bold }}>
          Resend
        </Text>
      </View>
    );
  }

  function enterCodeInfo() {
    return (
      <OtpInput
        numberOfDigits={4}
        focusColor={Colors.primaryColor}
        onTextChange={text => {
          setotpInput(text)
          if (text.length == 4) {
            Keyboard.dismiss();
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              navigation.push('BottomTabBar');
            }, 2000);
          }
        }}
        theme={{
          containerStyle: {
            marginBottom: Sizes.fixPadding + 5.0,
            marginTop: Sizes.fixPadding,
          },
          inputsContainerStyle: {
            justifyContent: 'center',
          },
          pinCodeContainerStyle: { ...styles.textFieldStyle },
          pinCodeTextStyle: { ...Fonts.blackColor16Bold, },
          focusedPinCodeContainerStyle: { borderWidth: 1.5 }
        }}
      />
    );
  }

  function verifyInfo() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', ...Fonts.blackColor20Bold }}>
          Verify your mobile number
        </Text>
        <Text style={{ textAlign: 'center', ...Fonts.grayColor16SemiBold }}>
          Please check your messages and enter the verification code we just
          sent you +91 {mobileNumber}
        </Text>
      </View>
    );
  }

  function appLogo() {
    return (
      <View style={styles.appLogoWrapStyle}>
        <Image
          source={require('../../assets/images/logo1.png')}
          style={styles.appLogoImageStyle}
        />
      </View>
    );
  }

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
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    elevation: 3.0,
  },
  appLogoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    position: 'absolute',
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    borderTopLeftRadius: Sizes.fixPadding * 5.0,
    borderTopRightRadius: Sizes.fixPadding * 5.0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 200.0,
  },
  loginRegisterInfoOuterWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding * 5.0,
    height: screenHeight - 250,
    width: screenWidth - 40.0,
    alignSelf: 'center',
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
  textFieldStyle: {
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    borderWidth: 0,
    width: screenWidth / 11,
    height: screenWidth / 11,
    marginHorizontal:Sizes.fixPadding
  },
  otpFieldsWrapStyle: {
    marginTop: Sizes.fixPadding + 5.0,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding * 5.0,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    shadowColor: Colors.primaryColor,
    marginVertical: Sizes.fixPadding + 5.0,
    ...commonStyles.buttonShadow,
  },
  appLogoImageStyle: {
    width: 130.0,
    height: 55.0,
    resizeMode: 'contain',
    marginBottom: Sizes.fixPadding * 2.0,
  },
  screenBackImageStyle: {
    width: '100%',
    height: screenHeight / 2.5,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: Colors.secondaryColor,
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

export default VerificationScreen;
