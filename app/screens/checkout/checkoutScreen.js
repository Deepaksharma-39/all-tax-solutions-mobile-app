import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const deliveryOptionsList = [
  {
    id: '1',
    option: 'Free Standard delivery',
    description: 'Delivery on or before Monday, 24 Sep 2020',
  },
  {
    id: '2',
    option: 'Rs.50 Express delivery',
    description: 'Delivery on or before Fridat, 12 Sep 2020',
  },
];

const CheckoutScreen = ({navigation}) => {
  const [state, setState] = useState({
    currentDeliveryOptionsId: deliveryOptionsList[0].id,
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {currentDeliveryOptionsId} = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {deliveryAddressInfo()}
          {divider()}
          {deliveryOptions()}
          {divider()}
          {paymentMethodInfo()}
          {divider()}
          {priceDetail()}
          {makePaymentButton()}
        </ScrollView>
      </View>
    </View>
  );

  function makePaymentButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('TransactionSuccessful')}
        style={styles.makePaymentButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Make Payment</Text>
      </TouchableOpacity>
    );
  }

  function priceDetail() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.grayColor14Regular}}>Sub Total(2 Items)</Text>
          <Text style={{...Fonts.grayColor14Regular}}>$199</Text>
        </View>
        <View style={styles.deliveryChargesInfoWrapStyle}>
          <Text style={{...Fonts.grayColor14Regular}}>Delivery Charges</Text>
          <Text style={{...Fonts.grayColor14Regular}}>Free</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.blackColor16SemiBold}}>Amount Payable</Text>
          <Text style={{...Fonts.blackColor16SemiBold}}>Free</Text>
        </View>
      </View>
    );
  }

  function paymentMethodInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <View style={styles.paymentMethodTitleStyle}>
          <Text style={{...Fonts.blackColor20Bold}}>Payment Method</Text>
          <Text
            onPress={() => navigation.push('PaymentMethod')}
            style={{...Fonts.secondaryColor16Bold}}>
            Change
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/icons/hdfc.png')}
            style={{width: 20.0, height: 20.0, resizeMode: 'contain'}}
          />
          <View style={{marginLeft: Sizes.fixPadding}}>
            <Text style={{...Fonts.blackColor16SemiBold}}>
              Bank of Baroda Credit Card
            </Text>
            <Text style={{...Fonts.grayColor14Regular}}>
              48** **** **** 1710
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function deliveryOptions() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor18Bold,
          }}>
          Delivery Options
        </Text>
        {deliveryOptionsList.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.6}
            onPress={() => updateState({currentDeliveryOptionsId: item.id})}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: Sizes.fixPadding - 6.0,
            }}>
            <View
              style={{
                width: 14.0,
                height: 14.0,
                borderRadius: 7.0,
                backgroundColor:
                  currentDeliveryOptionsId == item.id
                    ? Colors.secondaryColor
                    : Colors.grayColor,
              }}
            />
            <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
              <Text style={{...Fonts.blackColor16SemiBold}}>{item.option}</Text>
              <Text style={{...Fonts.grayColor14Regular}}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.grayColor,
          height: 1.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      />
    );
  }

  function deliveryAddressInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.blackColor20Bold}}>Delivery Address</Text>
          <Text
            onPress={() => navigation.push('AddNewAddress')}
            style={{...Fonts.secondaryColor16Bold}}>
            Change
          </Text>
        </View>
        <>
          <Text style={{...Fonts.blackColor16SemiBold}}>Samantha John</Text>
          <Text style={{...Fonts.grayColor14Regular}}>+1 923 456 7890</Text>
          <Text style={{...Fonts.grayColor14Regular}}>
            444, Grove Avenue, Golden Tower Near City Part, Washington DC,
            United States Of America
          </Text>
        </>
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
          Checkout
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
  makePaymentButtonStyle: {
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
  paymentMethodTitleStyle: {
    marginBottom: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryChargesInfoWrapStyle: {
    marginVertical: Sizes.fixPadding - 7.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CheckoutScreen;
