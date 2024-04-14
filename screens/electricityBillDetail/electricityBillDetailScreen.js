import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const ElectricityBillDetailScreen = ({navigation, route}) => {
  const item = route.params.item;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding * 2.0}}>
          {providerAndConsumerDetail()}
          {amountInfo()}
        </ScrollView>
        {payBillButton()}
      </View>
    </View>
  );

  function payBillButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('PaymentMethod')}
        style={styles.payBillButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Pay Bill</Text>
      </TouchableOpacity>
    );
  }

  function amountInfo() {
    return (
      <View style={styles.amountInfoWrapStyle}>
        <Text style={{...Fonts.blackColor18SemiBold}}>$1,598</Text>
        <Text style={{...Fonts.grayColor14Regular}}>
          Please verify your details before proceeding to payment No interest
          will be paid for advance payments
        </Text>
      </View>
    );
  }

  function providerAndConsumerDetail() {
    return (
      <View style={styles.providerAndConsumerDetailWrapStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.providerImage}
            style={{width: 50.0, height: 60.0, resizeMode: 'contain'}}
          />
          <View style={{marginLeft: Sizes.fixPadding + 2.0}}>
            <Text style={{...Fonts.grayColor14Regular}}>Consumer ID</Text>
            <Text style={{...Fonts.blackColor16Bold}}>123-456987-89</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.grayColor,
            height: 1.0,
            marginBottom: Sizes.fixPadding - 5.0,
          }}
        />
        {providerAndConsumerDetailShort({
          title: 'Consumer Name',
          value: 'Samantha John',
        })}
        {providerAndConsumerDetailShort({
          title: 'Bill Number',
          value: '000159874',
        })}
        {providerAndConsumerDetailShort({
          title: 'Bill Date',
          value: 'Jun 15, 2020',
        })}
      </View>
    );
  }

  function providerAndConsumerDetailShort({title, value}) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{width: 130.0, ...Fonts.grayColor14Regular}}>{title}</Text>
        <Text numberOfLines={1} style={{flex: 1, ...Fonts.blackColor16Bold}}>
          {value}
        </Text>
      </View>
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
          Electricity Bill Payment
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
  providerAndConsumerDetailWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 10.0,
  },
  amountInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding,
  },
  payBillButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    marginVertical: Sizes.fixPadding * 2.0,
    position: 'absolute',
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    ...commonStyles.buttonShadow,
  },
});

export default ElectricityBillDetailScreen;
