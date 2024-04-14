import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const availableFlightsList = [
  {
    id: '1',
    flightName: 'SpiceJet SG - 9587',
    amount: '$250',
    availableSeatsCount: 2,
    departureTime: '18:05',
    returnTime: '20:10',
    totalTimeToReachDestination: '2h 5m',
    airlinesLogo: require('../../assets/images/airlines_logo/spice_jet.png'),
  },
  {
    id: '2',
    flightName: 'GoAir G8 - 396',
    amount: '$380',
    availableSeatsCount: 3,
    departureTime: '18:25',
    returnTime: '20:50',
    totalTimeToReachDestination: '2h 15m',
    airlinesLogo: require('../../assets/images/airlines_logo/go_air.png'),
  },
  {
    id: '3',
    flightName: 'IndiGo 6E - 185',
    amount: '$190',
    availableSeatsCount: 1,
    departureTime: '17:20',
    returnTime: '19:00',
    totalTimeToReachDestination: '2h 10m',
    airlinesLogo: require('../../assets/images/airlines_logo/indigo.png'),
  },
  {
    id: '4',
    flightName: 'AirIndia AI - 677',
    amount: '$140',
    availableSeatsCount: 5,
    departureTime: '18:20',
    returnTime: '20:00',
    totalTimeToReachDestination: '2h 5m',
    airlinesLogo: require('../../assets/images/airlines_logo/air_india.png'),
  },
  {
    id: '5',
    flightName: 'Vistara UK - 950',
    amount: '$255',
    availableSeatsCount: 2,
    departureTime: '18:25',
    returnTime: '20:50',
    totalTimeToReachDestination: '2h 15m',
    airlinesLogo: require('../../assets/images/airlines_logo/vistara.png'),
  },
  {
    id: '6',
    flightName: 'AirIndia AI - 007',
    amount: '$320',
    availableSeatsCount: 4,
    departureTime: '18:20',
    returnTime: '20:00',
    totalTimeToReachDestination: '2h 5m',
    airlinesLogo: require('../../assets/images/airlines_logo/air_india.png'),
  },
  {
    id: '7',
    flightName: 'AirIndia AI - 007',
    amount: '$258',
    availableSeatsCount: 2,
    departureTime: '18:25',
    returnTime: '20:50',
    totalTimeToReachDestination: '2h 15m',
    airlinesLogo: require('../../assets/images/airlines_logo/vistara.png'),
  },
  {
    id: '8',
    flightName: 'SpiceJet SG - 9587',
    amount: '$200',
    availableSeatsCount: 2,
    departureTime: '18:05',
    returnTime: '20:10',
    totalTimeToReachDestination: '2h 5m',
    airlinesLogo: require('../../assets/images/airlines_logo/spice_jet.png'),
  },
  {
    id: '9',
    flightName: 'GoAir G8 - 396',
    amount: '$380',
    availableSeatsCount: 3,
    departureTime: '18:25',
    returnTime: '20:50',
    totalTimeToReachDestination: '2h 15m',
    airlinesLogo: require('../../assets/images/airlines_logo/go_air.png'),
  },
];

const FlightSearchScreen = ({navigation, route}) => {
  const fromCity = route.params.fromCity;
  const toCity = route.params.toCity;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {availableFlights()}
      </View>
    </View>
  );

  function availableFlights() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('FlightTicketBookingDetail', {item})}
        style={styles.availableFlightsWrapStyle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            numberOfLines={1}
            style={{flex: 1, ...Fonts.blackColor18SemiBold}}>
            {item.flightName}
          </Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={{...Fonts.blackColor18Bold}}>{item.amount}</Text>
            <Text style={{...Fonts.redColor14SemiBold}}>
              {item.availableSeatsCount} Seat left
            </Text>
          </View>
        </View>
        <View
          style={{paddingRight: Sizes.fixPadding * 3.0, flexDirection: 'row'}}>
          <Image
            source={item.airlinesLogo}
            style={{width: 25.0, height: 25.0}}
            resizeMode="contain"
          />
          <View style={{alignItems: 'center', marginLeft: Sizes.fixPadding}}>
            <Text style={{...Fonts.blackColor16SemiBold}}>
              {item.departureTime}
            </Text>
            <Text style={{...Fonts.grayColor14Regular}}>BOM</Text>
          </View>
          <View style={styles.flightTimeIndicatorWrapStyle}>
            {departureToReturnIndicator()}
            {departureToReturnTimeIndicator()}
            {departureToReturnIndicator()}
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{...Fonts.blackColor16SemiBold}}>
              {item.returnTime}
            </Text>
            <Text style={{...Fonts.grayColor14Regular}}>DEL</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={availableFlightsList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: Sizes.fixPadding * 2.0}}
      />
    );
  }

  function departureToReturnTimeIndicator() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginBottom: Sizes.fixPadding + 7.0,
          flex: 1,
        }}>
        <Text style={{...Fonts.grayColor14Regular}}>2h 5m</Text>
        <View style={styles.departureToReturnTimeDividerStyle} />
      </View>
    );
  }

  function departureToReturnIndicator() {
    return (
      <View style={styles.departureToReturnIndicatorOuterCircleStyle}>
        <View style={styles.departureToReturnIndicatorInnerCircleStyle}>
          <View
            style={{
              width: 8.0,
              height: 8.0,
              borderRadius: 4.0,
              backgroundColor: Colors.secondaryColor,
            }}
          />
        </View>
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
          {fromCity} to {toCity}
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
  availableFlightsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
  flightTimeIndicatorWrapStyle: {
    marginHorizontal: Sizes.fixPadding + 2.0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  departureToReturnIndicatorOuterCircleStyle: {
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    borderColor: 'rgba(254, 107, 18, 0.3)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4.0,
    shadowColor: Colors.secondaryColor,
    marginHorizontal: Sizes.fixPadding - 12.0,
  },
  departureToReturnIndicatorInnerCircleStyle: {
    width: 16.0,
    height: 16.0,
    borderRadius: 8.0,
    borderColor: Colors.secondaryColor,
    backgroundColor: Colors.whiteColor,
    borderWidth: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.secondaryColor,
    elevation: 3.0,
  },
  departureToReturnTimeDividerStyle: {
    backgroundColor: Colors.secondaryColor,
    height: 4.0,
    width: '100%',
    alignSelf: 'center',
  },
});

export default FlightSearchScreen;
