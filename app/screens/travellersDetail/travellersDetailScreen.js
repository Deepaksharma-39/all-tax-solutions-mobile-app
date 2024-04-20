import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const TravellersDetailScreen = ({navigation}) => {
  const [state, setState] = useState({
    currentStatusIndex: 1,
    fullName: null,
    mobileNumber: null,
    email: null,
    agreeWithTermsAndCondition: false,
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {
    currentStatusIndex,
    fullName,
    mobileNumber,
    email,
    agreeWithTermsAndCondition,
  } = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {statusOptionsInfo()}
          {fullNameInfo()}
          {contactDetailInfo()}
          {agreeWithTermsAndConditionsInfo()}
          {totalAmountInfo()}
          {makePaymentButton()}
        </ScrollView>
      </View>
    </View>
  );

  function makePaymentButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('PaymentMethod')}
        style={styles.makePaymentButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Make Payment</Text>
      </TouchableOpacity>
    );
  }

  function totalAmountInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{...Fonts.blackColor16Bold}}>Total Amount $250</Text>
        <Text style={{...Fonts.grayColor14Regular}}>
          ( Total fare for 1 Traveller )
        </Text>
      </View>
    );
  }

  function agreeWithTermsAndConditionsInfo() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            updateState({
              agreeWithTermsAndCondition: !agreeWithTermsAndCondition,
            })
          }
          style={{
            ...styles.checkBoxStyle,
            backgroundColor: agreeWithTermsAndCondition
              ? Colors.blackColor
              : Colors.whiteColor,
          }}>
          {agreeWithTermsAndCondition ? (
            <MaterialIcons name="check" color={Colors.whiteColor} size={15} />
          ) : null}
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            ...Fonts.blackColor14Regular,
            marginLeft: Sizes.fixPadding,
          }}>
          Agree to terms & Conditions
        </Text>
      </View>
    );
  }

  function contactDetailInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor18SemiBold}}>Contact Details</Text>
        <Text style={{...Fonts.redColor12Regular}}>
          ( Your booking details will be sent to below contact details.)
        </Text>
        {mobileNumberInfo()}
        {emailAddressInfo()}
      </View>
    );
  }

  function emailAddressInfo() {
    return (
      <View style={{marginTop: Sizes.fixPadding}}>
        <Text style={{...Fonts.blackColor18SemiBold}}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={text => updateState({email: text})}
          placeholder="Enter your mail address"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
        />
      </View>
    );
  }

  function mobileNumberInfo() {
    return (
      <View style={{marginTop: Sizes.fixPadding}}>
        <Text style={{...Fonts.blackColor18SemiBold}}>Mobile Number</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={text => updateState({mobileNumber: text})}
          placeholder="Enter your mobile number"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldWrapStyle}
          keyboardType="numeric"
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function fullNameInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text>
          <Text style={{...Fonts.blackColor18SemiBold}}>Full Name</Text>
          <Text style={{...Fonts.redColor12Regular}}>
            {` `}(Name should be same as in goverment ID proof.)
          </Text>
        </Text>
        <TextInput
          value={fullName}
          onChangeText={text => updateState({fullName: text})}
          placeholder="Enter name"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function statusOptionsInfo() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {statusOptionsShort({index: 1, status: 'Mr'})}
        {statusOptionsShort({index: 2, status: 'Mrs'})}
        {statusOptionsShort({index: 3, status: 'Ms'})}
      </View>
    );
  }

  function statusOptionsShort({index, status}) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => updateState({currentStatusIndex: index})}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: index == 2 ? Sizes.fixPadding * 3.0 : 0.0,
        }}>
        <View
          style={{
            ...styles.radioButtonOuterCircleStyle,
            borderColor:
              currentStatusIndex == index
                ? Colors.primaryColor
                : Colors.grayColor,
          }}>
          {currentStatusIndex == index ? (
            <View style={styles.radioButtonInnerCircleStyle} />
          ) : null}
        </View>
        <Text
          style={{
            marginLeft: Sizes.fixPadding,
            ...(currentStatusIndex == index
              ? {...Fonts.primaryColor18SemiBold}
              : {...Fonts.grayColor18SemiBold}),
          }}>
          {status}
        </Text>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back-ios"
          size={22}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
        />
        <Text style={{marginLeft: Sizes.fixPadding, ...Fonts.blackColor20Bold}}>
          Traveller Details
        </Text>
      </View>
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
    ...commonStyles.boxShadow,
  },
  radioButtonOuterCircleStyle: {
    borderWidth: 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
  },
  radioButtonInnerCircleStyle: {
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    backgroundColor: Colors.primaryColor,
  },
  textFieldWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    height: 50.0,
    marginTop: Sizes.fixPadding - 5.0,
    ...Fonts.blackColor16Regular,
    ...commonStyles.boxShadow,
  },
  checkBoxStyle: {
    width: 18.0,
    height: 18.0,
    borderRadius: 3.0,
    borderColor: Colors.blackColor,
    borderWidth: 2.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  makePaymentButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    marginVertical: Sizes.fixPadding * 4.0,
    ...commonStyles.buttonShadow,
  },
});

export default TravellersDetailScreen;
