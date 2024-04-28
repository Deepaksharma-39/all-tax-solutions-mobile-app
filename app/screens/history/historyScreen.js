import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Sizes,commonStyles} from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const todaysTransactionList = [
  {
    id: '1',
    transactionReason: 'Send Money to Krishna Shah',
    transactionId: 'D12365478901234',
    time: '10:55 am',
    amount: '$35',
  },
  {
    id: '2',
    transactionReason: 'Mobile Recharge',
    transactionId: 'D12365478901234',
    time: '10:30 am',
    amount: '$35',
  },
  {
    id: '3',
    transactionReason: 'DGVCL Bill Paid',
    transactionId: 'D12365478901234',
    time: '10:55 am',
    amount: '$599',
  },
];

const yesterdaysTransactionList = [
  {
    id: '1',
    transactionReason: 'Flight Ticket Booking-Spicejet SG-9587',
    transactionId: 'D12365478901234',
    time: '10:55 am',
    amount: '$100',
  },
  {
    id: '2',
    transactionReason: 'Bus Ticket Booking-PVS Travels',
    transactionId: 'D12365478901234',
    time: '10:00 am',
    amount: '$110',
  },
  {
    id: '3',
    transactionReason: 'Moive Ticket Booking-Rajhans Cinemas',
    transactionId: 'D12365478901234',
    time: '09:30 am',
    amount: '$150',
  },
  {
    id: '4',
    transactionReason: 'Paid to Nautica Online Shopping Hub',
    transactionId: 'D12365478901234',
    time: '09:00 am',
    amount: '$200',
  },
];

const oldTransactionsList = [
  {
    id: '1',
    transactionReason: 'Flight Ticket Booking-Spicejet SG-9587',
    transactionId: 'D12365478901234',
    time: '10:55 am',
    amount: '$100',
  },
  {
    id: '2',
    transactionReason: 'Bus Ticket Booking-PVS Travels',
    transactionId: 'D12365478901234',
    time: '10:00 am',
    amount: '$599',
  },
  {
    id: '3',
    transactionReason: 'Moive Ticket Booking-Rajhans Cinemas',
    transactionId: 'D12365478901234',
    time: '09:30 am',
    amount: '$200',
  },
  {
    id: '4',
    transactionReason: 'Paid to Nautica Online Shopping Hub',
    transactionId: 'D12365478901234',
    time: '09:00 am',
    amount: '$150',
  },
];

const HistoryScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <FlatList
          ListHeaderComponent={<>{transactions()}</>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding}}
        />
      </View>
    </View>
  );

  function comingSoon  ()  {
    return (
      <View
        style={{ width: "100%", }}
      >
        <Image
          source={require('../../assets/images/comingsoon.jpg')}
          style={{width:"100%",height:700}}
        />
      </View>
    )
  }

  function transactions() {
    const renderItem = ({item}) => (
      <View style={styles.transactionWrapStyle}>
        <View style={{flex: 1}}>
          <Text style={{...Fonts.grayColor14Regular}}>
            {item.transactionReason}
          </Text>
          <Text style={{...Fonts.blackColor16Bold}}>{item.transactionId}</Text>
          <Text style={{...Fonts.grayColor12SemiBold}}>{item.time}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('TransactionSuccessful')}
            style={styles.viewButtonStyle}>
            <Text
              style={{
                marginRight: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor14Bold,
              }}>
              View
            </Text>
            <Image
              source={require('../../assets/images/icons/view.png')}
              style={{width: 18.0, height: 18.0, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <Text style={{...Fonts.blackColor16Bold}}>{item.amount}</Text>
        </View>
      </View>
    );
    return (
      <View>
        {todaysTransactionList.length != 0 ? (
          <View>
            <Text
              style={{
                margin: Sizes.fixPadding * 2.0,
                ...Fonts.secondaryColor16SemiBold,
              }}>
              Today 11 January 2022
            </Text>
            <FlatList
              listKey="todays"
              data={todaysTransactionList}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : null}
        {yesterdaysTransactionList.length != 0 ? (
          <View>
            <Text style={styles.transactionTitleStyle}>
              Yesterday 10 January 2022
            </Text>
            <FlatList
              listKey="yesterdays"
              data={yesterdaysTransactionList}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : null}
        {oldTransactionsList.length != 0 ? (
          <View>
            <Text style={styles.transactionTitleStyle}>9 January 2022</Text>
            <FlatList
              listKey="olds"
              data={oldTransactionsList}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : null}
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{...Fonts.blackColor20Bold}}>Transaction History</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    ...commonStyles.boxShadow,
  },
  transactionTitleStyle: {
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    ...Fonts.secondaryColor16SemiBold,
  },
  viewButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 5.0,
  },
  transactionWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,    
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
});

export default HistoryScreen;
