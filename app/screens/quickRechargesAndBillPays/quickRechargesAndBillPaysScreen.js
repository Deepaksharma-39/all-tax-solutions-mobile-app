import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, screenWidth,commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const rechargeOptionsList = [
  {
    id: '1',
    optionName: 'Mobile Recharge',
    optionIcon: require('../../assets/images/icons/recharge.png'),
  },
  {
    id: '2',
    optionName: 'FASTag Recharge', 
    optionIcon: require('../../assets/images/icons/fastag.png'),
  },
  {
    id: '3',
    optionName: 'DTH',
    optionIcon: require('../../assets/images/icons/dth.png'),
  },
  {
    id: '4',
    optionName: 'Cable TV Recharge',
    optionIcon: require('../../assets/images/icons/cable_tv.png'),
  },
];

const utilitiesOptionsList = [
  {
    id: '1',
    optionName: 'Book a Cylinder',
    optionIcon: require('../../assets/images/icons/cylinder.png'),
  },
  {
    id: '2',
    optionName: 'Piped Gas',
    optionIcon: require('../../assets/images/icons/piped_gas.png'),
  },
  {
    id: '3',
    optionName: 'Water',
    optionIcon: require('../../assets/images/icons/water.png'),
  },
  {
    id: '4',
    optionName: 'Electricity',
    optionIcon: require('../../assets/images/icons/electricity.png'),
  },
  {
    id: '5',
    optionName: 'Postpaid',
    optionIcon: require('../../assets/images/icons/postpaid.png'),
  },
  {
    id: '6',
    optionName: 'Broadband',
    optionIcon: require('../../assets/images/icons/broadband.png'),
  },
  {
    id: '7',
    optionName: 'Rent Payment',
    optionIcon: require('../../assets/images/icons/rent_payment.png'),
    isNew: true,
  },
  {
    id: '8',
    optionName: 'Landline',
    optionIcon: require('../../assets/images/icons/landline.png'),
  },
];

const billPaymentOptionsList = [
  {
    id: '1',
    optionName: 'SBI Card (Instant)',
    optionIcon: require('../../assets/images/icons/sbi_card.png'),
  },
  {
    id: '2',
    optionName: 'HDFC Bank (Instant)',
    optionIcon: require('../../assets/images/icons/hdfc.png'),
  },
  {
    id: '3',
    optionName: 'ICICI Bank',
    optionIcon: require('../../assets/images/icons/icici.png'),
  },
  {
    id: '4',
    optionName: 'Other Banks',
    optionIcon: require('../../assets/images/icons/other_bank.png'),
  },
];

const financialServicesAndTaxOptionsList = [
  {
    id: '1',
    optionName: 'Loan Payment',
    optionIcon: require('../../assets/images/icons/loan_payment.png'),
  },
  {
    id: '2',
    optionName: 'LIC Insurance',
    optionIcon: require('../../assets/images/icons/insurance.png'),
  },
  {
    id: '3',
    optionName: 'Municipal Tax',
    optionIcon: require('../../assets/images/icons/tax.png'),
  },
  {
    id: '4',
    optionName: 'Education Fees',
    optionIcon: require('../../assets/images/icons/education_fees.png'),
  },
];

const bookTicketOptionsList = [
  {
    id: '1',
    optionName: 'Flight Ticket',
    optionIcon: require('../../assets/images/icons/flight_ticket.png'),
  },
  {
    id: '2',
    optionName: 'Bus Ticket',
    optionIcon: require('../../assets/images/icons/bus_ticket.png'),
  },
  {
    id: '3',
    optionName: 'Moive Ticket',
    optionIcon: require('../../assets/images/icons/moive_ticket.png'),
  },
];

const QuickRechargesAndBillPaysScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {rechargeOptions()}
              {utilitiesOptions()}
              {billPaymentOptions()}
              {financialServicesAndTaxOptions()}
              {bookTicketOptions()}
            </>
          }
          contentContainerStyle={{paddingBottom: Sizes.fixPadding}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );

  function bookTicketOptions() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.push('TicketBooking', {
            index:
              item.optionName == 'Flight Ticket'
                ? 0
                : item.optionName == 'Bus Ticket'
                ? 1
                : 2,
          })
        }
        style={styles.optionWrapStyle}>
        <Image
          source={item.optionIcon}
          style={{width: 35.0, height: 35.0}}
          resizeMode="contain"
        />
        {item.isNew ? (
          <View style={styles.newTextWrapStyle}>
            <Text style={{...Fonts.whiteColor6Black}}>NEW</Text>
          </View>
        ) : null}
        <Text
          numberOfLines={2}
          style={{
            textAlign: 'center',
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor12SemiBold,
          }}>
          {item.optionName}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold}}>
          Book a Tickets
        </Text>
        <FlatList
          listKey="bookTicket"
          scrollEnabled={false}
          data={bookTicketOptionsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          numColumns={4}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  function financialServicesAndTaxOptions() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('ElectricityBillPayment')}
        style={styles.optionWrapStyle}>
        <Image
          source={item.optionIcon}
          style={{width: 35.0, height: 35.0}}
          resizeMode="contain"
        />
        {item.isNew ? (
          <View style={styles.newTextWrapStyle}>
            <Text style={{...Fonts.whiteColor6Black}}>NEW</Text>
          </View>
        ) : null}
        <Text
          numberOfLines={2}
          style={{
            textAlign: 'center',
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor12SemiBold,
          }}>
          {item.optionName}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold}}>
          Financial Services & Taxes
        </Text>
        <FlatList
          listKey="financialServicesAndTaxes"
          scrollEnabled={false}
          data={financialServicesAndTaxOptionsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          numColumns={4}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  function billPaymentOptions() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('ElectricityBillPayment')}
        style={styles.optionWrapStyle}>
        <Image
          source={item.optionIcon}
          style={{width: 35.0, height: 35.0}}
          resizeMode="contain"
        />
        {item.isNew ? (
          <View style={styles.newTextWrapStyle}>
            <Text style={{...Fonts.whiteColor6Black}}>NEW</Text>
          </View>
        ) : null}
        <Text
          numberOfLines={2}
          style={{
            textAlign: 'center',
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor12SemiBold,
          }}>
          {item.optionName}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold}}>
          Credit Card Bill Payments
        </Text>
        <FlatList
          listKey="billPayments"
          scrollEnabled={false}
          data={billPaymentOptionsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          numColumns={4}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  function utilitiesOptions() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('ElectricityBillPayment')}
        style={styles.optionWrapStyle}>
        <Image
          source={item.optionIcon}
          style={{width: 35.0, height: 35.0}}
          resizeMode="contain"
        />
        {item.isNew ? (
          <View style={styles.newTextWrapStyle}>
            <Text style={{...Fonts.whiteColor6Black}}>NEW</Text>
          </View>
        ) : null}
        <Text
          numberOfLines={2}
          style={{
            textAlign: 'center',
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor12SemiBold,
          }}>
          {item.optionName}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold}}>
          Utilities
        </Text>
        <FlatList
          listKey="utilities"
          scrollEnabled={false}
          data={utilitiesOptionsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          numColumns={4}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  function rechargeOptions() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('MobileRecharge')}
        style={styles.optionWrapStyle}>
        <Image
          source={item.optionIcon}
          style={{width: 35.0, height: 35.0}}
          resizeMode="contain"
        />
        {item.isNew ? (
          <View style={styles.newTextWrapStyle}>
            <Text style={{...Fonts.whiteColor6Black}}>NEW</Text>
          </View>
        ) : null}
        <Text
          numberOfLines={2}
          style={{
            textAlign: 'center',
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor12SemiBold,
          }}>
          {item.optionName}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text
          style={{marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold}}>
          Recharge
        </Text>
        <FlatList
          listKey="recharge"
          scrollEnabled={false}
          data={rechargeOptionsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          numColumns={4}
          showsVerticalScrollIndicator={false}
        />
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
          Quick Recharges & Bill Pays
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
  newTextWrapStyle: {
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    position: 'absolute',
    right: 17.0,
    top: 0.0,
    borderWidth: 1.5,
    borderColor: Colors.whiteColor,
    elevation: 3.0,
    shadowColor: Colors.primaryColor,
  },
  optionWrapStyle: {
    alignItems: 'center',
    flex: 1,
    marginBottom: Sizes.fixPadding * 2.0,
    maxWidth: screenWidth / 4.5,
  },
});

export default QuickRechargesAndBillPaysScreen;
