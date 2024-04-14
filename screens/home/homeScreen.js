import React, {useState} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
  screenHeight,
} from '../../constants/styles';
import {Menu, MenuItem} from 'react-native-material-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const quickRechargesAndBillPayOptionsList = [
  {
    id: '1',
    optionName: 'Recharge',
    optionIcon: require('../../assets/images/icons/recharge.png'),
    category: 'recharge',
  },
  {
    id: '2',
    optionName: 'Electricity',
    optionIcon: require('../../assets/images/icons/electricity.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '3',
    optionName: 'Flight Ticket',
    optionIcon: require('../../assets/images/icons/flight_ticket.png'),
    category: 'bookTicket',
  },
  {
    id: '4',
    optionName: 'Moive Ticket',
    optionIcon: require('../../assets/images/icons/moive_ticket.png'),
    category: 'bookTicket',
  },
  {
    id: '5',
    optionName: 'Bus Ticket',
    optionIcon: require('../../assets/images/icons/bus_ticket.png'),
    category: 'bookTicket',
  },
  {
    id: '6',
    optionName: 'Payments',
    optionIcon: require('../../assets/images/icons/payments.png'),
    category: 'recharge',
  },
  {
    id: '7',
    optionName: 'Money Transfer',
    optionIcon: require('../../assets/images/icons/money_transfer.png'),
    category: 'recharge',
  },
  {
    id: '8',
    optionName: 'Landline',
    optionIcon: require('../../assets/images/icons/landline.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '9',
    optionName: 'Broadband',
    optionIcon: require('../../assets/images/icons/broadband.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '10',
    optionName: 'Piped Gas',
    optionIcon: require('../../assets/images/icons/piped_gas.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '11',
    optionName: 'Bill Payments',
    optionIcon: require('../../assets/images/icons/bill_payments.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '12',
    optionName: 'More',
    optionIcon: require('../../assets/images/icons/more.png'),
  },
];

const recentTransactionsList = [
  {
    id: '1',
    userImage: require('../../assets/images/users/user4.png'),
    userName: 'Tina Shah',
    amount: 35.0,
    date: '17/10',
    isSend: true,
  },
  {
    id: '2',
    userImage: require('../../assets/images/users/user2.png'),
    userName: 'Tanay John',
    amount: 150.0,
    date: '17/10',
  },
  {
    id: '3',
    userImage: require('../../assets/images/users/user3.png'),
    userName: 'Isha Khatri',
    amount: 150.0,
    date: '17/10',
  },
];

const citysList = [
  'Surat',
  'Ahmedabad',
  'Vadodara',
  'Rajkot',
  'Gandhinagar',
  'Anand',
  'Navasari',
  'Surendranagar',
  'Bharuch',
  'Vapi',
];

const HomeScreen = ({navigation}) => {
  const [state, setState] = useState({
    showCityOptions: false,
    selectedCity: citysList[0],
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {showCityOptions, selectedCity} = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {searchInfo()}
              {features()}
              {banner()}
              {quickReachargesAndBillPaysInfo()}
              {offersRewardsAndInviteNowOptions()}
              {recentTransactionsInfo()}
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding}}
        />
      </View>
    </View>
  );

  function banner() {
    return (
      <View style={styles.bannerWrapStyle}>
        <View>
          <Text style={{...Fonts.whiteColor16Bold}}>
            Up to 20% cashback on bill payments every...
          </Text>
          <Text style={{...Fonts.whiteColor14Regular}}>
            Lorem Ipsum is simply dummy text of the printing
          </Text>
        </View>
        <View style={styles.knowMoreButtonStyle}>
          <Text style={{...Fonts.whiteColor18Bold}}>Know More</Text>
        </View>
        <Image
          source={require('../../assets/images/banner_image1.png')}
          style={styles.bannerImageStyle}
        />
      </View>
    );
  }

  function offersRewardsAndInviteNowOptions() {
    return (
      <View style={styles.offersRewardsAndInviteNowOptionsWrapStyle}>
        {offersRewardOrInviteButton({
          icon: require('../../assets/images/icons/offers.png'),
          title: 'Offers',
          navigateTo: 'Offers',
        })}
        {offersRewardOrInviteButton({
          icon: require('../../assets/images/icons/rewards.png'),
          title: 'Rewards',
          navigateTo: 'Rewards',
        })}
        {offersRewardOrInviteButton({
          icon: require('../../assets/images/icons/invite.png'),
          title: 'Invite Now',
          navigateTo: 'InviteFriends',
        })}
      </View>
    );
  }

  function offersRewardOrInviteButton({icon, title, navigateTo}) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push(navigateTo)}
        style={styles.offersRewardOrInviteButtonStyle}>
        <Image
          source={icon}
          style={{width: 25.0, height: 25.0}}
          resizeMode="contain"
        />
        <Text
          numberOfLines={1}
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.whiteColor16SemiBold,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  function recentTransactionsInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <View
          style={{
            marginBottom: Sizes.fixPadding,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.blackColor18Bold}}>Recent Transactions</Text>
          <Text style={{...Fonts.blackColor14ExtraBold}}>View All</Text>
        </View>
        {recentTransactionsList.map(item => (
          <View key={`${item.id}`}>
            <View
              style={{
                marginBottom: Sizes.fixPadding,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={item.userImage}
                  style={{width: 50.0, height: 50.0, borderRadius: 25.0}}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    marginLeft: Sizes.fixPadding + 5.0,
                    ...Fonts.blackColor16SemiBold,
                  }}>
                  {item.userName}
                </Text>
              </View>
              <View style={{flex: 0.6, alignItems: 'flex-end'}}>
                <Text
                  style={{
                    ...(item.isSend
                      ? {...Fonts.redColor14Bold}
                      : {...Fonts.greenColor14Bold}),
                  }}>
                  {`$`}
                  {item.amount.toFixed(2)}
                </Text>
                <Text style={{...Fonts.grayColor12Regular}}>{item.date}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }

  function quickReachargesAndBillPaysInfo() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          item.category == 'recharge'
            ? navigation.push('MobileRecharge')
            : item.category == 'utilitiesBillsAndFincialServices'
            ? navigation.push('ElectricityBillPayment')
            : item.category == 'bookTicket'
            ? navigation.push('TicketBooking', {
                index:
                  item.optionName == 'Flight Ticket'
                    ? 0
                    : item.optionName == 'Bus Ticket'
                    ? 1
                    : 2,
              })
            : navigation.push('QuickRechargesAndBillPays');
        }}
        style={{
          alignItems: 'center',
          flex: 1,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Image
          source={item.optionIcon}
          style={{width: 35.0, height: 35.0}}
          resizeMode="contain"
        />
        <Text
          numberOfLines={1}
          style={{
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
          style={{
            marginBottom: Sizes.fixPadding + 10.0,
            ...Fonts.blackColor18Bold,
          }}>
          Quick Recharges & Bill Pays
        </Text>
        <FlatList
          scrollEnabled={false}
          data={quickRechargesAndBillPayOptionsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          numColumns={4}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  

  function searchInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.push('Search');
        }}
        style={styles.searchInfoWrapStyle}>
        <MaterialIcons name="search" color={Colors.grayColor} size={15} />
        <Text
          style={{marginLeft: Sizes.fixPadding, ...Fonts.grayColor14SemiBold}}>
          Search here...
        </Text>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/users/user1.png')}
            style={{width: 50.0, height: 50.0, borderRadius: 25.0}}
          />
          <View style={{marginLeft: Sizes.fixPadding}}>
            <Text style={{...Fonts.blackColor14SemiBold}}>Your Location</Text>
            <Menu
              visible={showCityOptions}
              style={{
                paddingTop: Sizes.fixPadding,
                maxHeight: screenHeight - 100.0,
              }}
              anchor={
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => updateState({showCityOptions: true})}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{...Fonts.blackColor16Bold}}>
                    {selectedCity}
                  </Text>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={24}
                    color={Colors.blackColor}
                    style={{marginLeft: Sizes.fixPadding}}
                  />
                </TouchableOpacity>
              }
              onRequestClose={() => updateState({showCityOptions: false})}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {citysList.map((item, index) => (
                  <MenuItem
                    key={index}
                    textStyle={{
                      marginRight: Sizes.fixPadding,
                      marginTop: Sizes.fixPadding - 20.0,
                      ...Fonts.blackColor16Bold,
                    }}
                    onPress={() =>
                      updateState({selectedCity: item, showCityOptions: false})
                    }>
                    {item}
                  </MenuItem>
                ))}
              </ScrollView>
            </Menu>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('QrScan')}>
            <Image
              source={require('../../assets/images/icons/scan.png')}
              style={{width: 16.0, height: 16.0}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('Notifications')}>
            <Image
              source={require('../../assets/images/icons/notification.png')}
              style={{
                width: 16.0,
                height: 16.0,
                marginHorizontal: Sizes.fixPadding + 5.0,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('Help')}>
            <Image
              source={require('../../assets/images/icons/help_line.png')}
              style={{width: 16.0, height: 16.0}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...commonStyles.boxShadow,
  },
  searchInfoWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    margin: Sizes.fixPadding * 2.0,
    ...commonStyles.boxShadow,
  },
  userInfoWrapStyle: {
    padding: Sizes.fixPadding - 3.0,
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    ...commonStyles.boxShadow,
  },
  featuresWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offersRewardOrInviteButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
  },
  offersRewardsAndInviteNowOptionsWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.fixPadding,
  },
  bannerWrapStyle: {
    marginVertical: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.secondaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: 'space-between',
    padding: Sizes.fixPadding,
  },
  knowMoreButtonStyle: {
    marginTop: Sizes.fixPadding * 3.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    alignSelf: 'flex-start',
  },
  bannerImageStyle: {
    position: 'absolute',
    bottom: 0.0,
    right: 0.0,
    width: 200.0,
    height: 150.0,
  },
});

export default HomeScreen;
