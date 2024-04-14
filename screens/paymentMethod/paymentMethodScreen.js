import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const PaymentMethodScreen = ({navigation}) => {
  const [currentSelectedMethodIndex, setcurrentSelectedMethodIndex] =
    useState(1);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {paymentMethods()}
          {continueButton()}
        </ScrollView>
      </View>
    </View>
  );

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('ChooseCard')}
        style={styles.continueButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function paymentMethods() {
    return (
      <View style={{marginTop: Sizes.fixPadding * 2.0}}>
        {paymentMethodShort({index: 1, paymentMethod: 'Credit Card'})}
        {paymentMethodShort({index: 2, paymentMethod: 'Debit Card'})}
        {paymentMethodShort({index: 3, paymentMethod: 'Net Banking'})}
        {paymentMethodShort({
          index: 4,
          paymentMethod: 'UPI (Google pay/Phone pay etc...)',
        })}
        {paymentMethodShort({
          index: 5,
          paymentMethod: 'Digital Payment Wallet',
        })}
      </View>
    );
  }

  function paymentMethodShort({index, paymentMethod}) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setcurrentSelectedMethodIndex(index)}
        style={{
          ...styles.paymentMethodWrapStyle,
          borderColor:
            currentSelectedMethodIndex == index
              ? 'rgba(254, 107, 18, 0.3)'
              : Colors.grayColor,
          backgroundColor:
            currentSelectedMethodIndex == index
              ? Colors.secondaryColor
              : Colors.whiteColor,
          shadowColor:
            currentSelectedMethodIndex == index
              ? Colors.secondaryColor
              : Colors.lightWhiteColor,
        }}>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            ...(currentSelectedMethodIndex == index
              ? {...Fonts.whiteColor18SemiBold}
              : {...Fonts.grayColor18SemiBold}),
          }}>
          {paymentMethod}
        </Text>
        <MaterialIcons
          name="arrow-forward-ios"
          color={
            currentSelectedMethodIndex == index
              ? Colors.whiteColor
              : Colors.grayColor
          }
          size={18}
        />
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
          Choose Payment Method
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
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    marginVertical: Sizes.fixPadding * 2.0,
    ...commonStyles.buttonShadow,
  },
  paymentMethodWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Sizes.fixPadding + 3.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
    elevation: 4.0,
    borderWidth: 1.5,
    shadowColor: Colors.secondaryColor,
    shadowOpacity: 1,
    shadowOffset: {x: 1, y: 3},
  },
});

export default PaymentMethodScreen;
