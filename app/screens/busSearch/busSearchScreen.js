import React from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Sizes,commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const availableBusesList = [
  {
    id: '1',
    busName: 'PVS Travels',
    busFunctionality: 'Ac sleeper 2 • 1 single Axie',
    amount: '$110',
    availableSeatsCount: 20,
    totalTimeToReachDestination: '12h 5m',
    travelTime: '8:00 pm',
    rating: 5.0,
    dropPoint: 'Boarding & Drop point',
  },
  {
    id: '2',
    busName: 'Geeta Bus Travels',
    busFunctionality: 'Ac sleeper 2 • 1 single Axie',
    amount: '$105',
    availableSeatsCount: 10,
    totalTimeToReachDestination: '15h 10m',
    travelTime: '8:30 pm',
    rating: 4.5,
    dropPoint: 'Boarding & Drop point',
  },
  {
    id: '3',
    busName: 'Shiv Baba Travels',
    busFunctionality: 'Ac sleeper 2 • 1 single Axie',
    amount: '$120',
    availableSeatsCount: 5,
    totalTimeToReachDestination: '14h 10m',
    travelTime: '9:00 pm',
    rating: 4.5,
    dropPoint: 'Boarding & Drop point',
  },
  {
    id: '4',
    busName: 'VRL Travels',
    busFunctionality: 'Ac sleeper 2',
    amount: '$199',
    availableSeatsCount: 20,
    totalTimeToReachDestination: '10h 10m',
    travelTime: '8:00 pm',
    rating: 4.2,
    dropPoint: 'Boarding & Drop point',
  },
  {
    id: '5',
    busName: 'Niazi Express',
    busFunctionality: 'Ac sleeper 2',
    amount: '$90',
    availableSeatsCount: 10,
    totalTimeToReachDestination: '11h 20m',
    travelTime: '8:30 pm',
    rating: 4.0,
    dropPoint: 'Boarding & Drop point',
  },
  {
    id: '6',
    busName: 'Skyways',
    busFunctionality: 'Ac sleeper 2',
    amount: '$199',
    availableSeatsCount: 10,
    totalTimeToReachDestination: '11h 20m',
    travelTime: '8:30 pm',
    rating: 4.0,
    dropPoint: 'Boarding & Drop point',
  },
  {
    id: '7',
    busName: 'PVS Travels',
    busFunctionality: 'Ac sleeper 2 • 1 single Axie',
    amount: '$150',
    availableSeatsCount: 20,
    totalTimeToReachDestination: '12h 5m',
    travelTime: '8:00 pm',
    rating: 5.0,
    dropPoint: 'Boarding & Drop point',
  },
];

const BusSearchScreen = ({navigation, route}) => {
  const sourceCity = route.params.sourceCity;
  const destinationCity = route.params.destinationCity;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {availableBuses()}
      </View>
    </View>
  );

  function availableBuses() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('BusSeatSelection', {item})}
        style={styles.availableBusesInfoWrapStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{...Fonts.blackColor18SemiBold}}>{item.busName}</Text>
            <Text
              numberOfLines={1}
              style={{flex: 1, ...Fonts.grayColor14Regular}}>
              {item.busFunctionality}
            </Text>
          </View>
          <Text style={{...Fonts.blackColor18Bold}}>{item.amount}</Text>
        </View>
        <View style={styles.seatsAndTimeInfoWrapStyle}>
          <Text style={{...Fonts.blackColor16SemiBold}}>
            {item.availableSeatsCount} Seats
          </Text>
          <Text style={{...Fonts.blackColor16SemiBold}}>
            {item.totalTimeToReachDestination}
          </Text>
          <Text style={{...Fonts.blackColor16SemiBold}}>{item.travelTime}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.ratingInfoWrapStyle}>
            <Text style={{...Fonts.whiteColor12ExtraBold}}>
              {item.rating.toFixed(1)}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding,
              ...Fonts.secondaryColor14SemiBold,
            }}>
            {item.rating.toFixed(1)} Ratings • {item.dropPoint}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={availableBusesList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: Sizes.fixPadding * 2.0}}
      />
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
          {sourceCity} to {destinationCity}
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
  availableBusesInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    ...commonStyles.boxShadow,
    paddingBottom: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding - 7.0,
    marginBottom: Sizes.fixPadding,
  },
  seatsAndTimeInfoWrapStyle: {
    marginVertical: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingInfoWrapStyle: {
    backgroundColor: Colors.secondaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding - 7.0,
    paddingHorizontal: Sizes.fixPadding - 6.0,
  },
});

export default BusSearchScreen;
