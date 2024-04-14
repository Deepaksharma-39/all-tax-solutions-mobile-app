import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenHeight,
  screenWidth,
} from '../../constants/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const sourceCitysList = [
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Jaipur',
  'Bhopal',
  'Patna',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Surat',
  'Kanpur',
  'Srinagar',
  'Delhi',
];

const destinationCitysList = [
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Jaipur',
  'Bhopal',
  'Patna',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Surat',
  'Kanpur',
  'Srinagar',
  'Delhi',
];

const monthsList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sup',
  'Oct',
  'Nov',
  'Des',
];

const BusTicketBookingScreen = ({navigation}) => {
  const dateObj = new Date();
  const todayDate = `${dateObj.getUTCDate()} ${
    monthsList[dateObj.getUTCMonth()]
  }, ${dateObj.getUTCFullYear()}`;
  const defaultTravelTime = '9:00 PM';

  const [state, setState] = useState({
    showSourceCityOptions: false,
    selectedSourceCity: sourceCitysList[3],
    showDestinationCityOptions: false,
    selectedDestinationCity:
      destinationCitysList[destinationCitysList.length - 2],
    showCalender: false,
    departureDate: null,
    showTimer: false,
    travelTime: null,
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {
    showSourceCityOptions,
    selectedSourceCity,
    showDestinationCityOptions,
    selectedDestinationCity,
    showCalender,
    departureDate,
    showTimer,
    travelTime,
  } = state;

  return (
    <>
      <View style={{flex: 1}}>
        {sourceCityInfo()}
        {destinationCityInfo()}
        {departureDateAndTravelTimeInfo()}
        {searchBusesButton()}
      </View>
      {calender()}
      {timer()}
    </>
  );

  function searchBusesButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.push('BusSearch', {
            destinationCity: selectedDestinationCity,
            sourceCity: selectedSourceCity,
          });
        }}
        style={styles.searchBusesButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Search Buses</Text>
      </TouchableOpacity>
    );
  }

  function departureDateAndTravelTimeInfo() {
    return (
      <View style={styles.departureDateAndTravelTimeInfoWrapStyle}>
        <View style={{marginHorizontal: Sizes.fixPadding, flex: 1}}>
          <Text
            style={{
              marginBottom: Sizes.fixPadding - 5.0,
              ...Fonts.grayColor16SemiBold,
            }}>
            Departure Date
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => updateState({showCalender: true})}
            style={styles.departureDateAndTravelTimeWrapStyle}>
            <Text
              numberOfLines={1}
              style={{flex: 1, ...Fonts.blackColor18SemiBold}}>
              {departureDate ? departureDate : todayDate}
            </Text>
            <MaterialCommunityIcons
              name="calendar-range"
              size={20}
              color={Colors.grayColor}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: Sizes.fixPadding, flex: 1}}>
          <Text
            style={{
              marginBottom: Sizes.fixPadding - 5.0,
              ...Fonts.grayColor16SemiBold,
            }}>
            Travel Time
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => updateState({showTimer: true})}
            style={styles.departureDateAndTravelTimeWrapStyle}>
            <Text
              numberOfLines={1}
              style={{flex: 1, ...Fonts.blackColor18SemiBold}}>
              {travelTime ? travelTime : defaultTravelTime}
            </Text>
            <MaterialIcons
              name="access-time"
              size={20}
              color={Colors.grayColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function timer() {
    const handleConfirm = (e, selectedTime) => {
      updateState({
        travelTime: `${
          ((selectedTime.getHours() + 11) % 12) + 1
        }:${selectedTime.getMinutes()} ${
          selectedTime.getHours() >= 12 ? 'PM' : 'AM'
        }`,
        showTimer: false,
      });
    };

    return (
      showTimer && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          onChange={handleConfirm}
          accentColor={Colors.primaryColor}
        />
      )
    );
  }

  function calender() {
    const onChange = (e, date) => {
      updateState({
        departureDate: `${date.getUTCDate()} ${
          monthsList[date.getUTCMonth()]
        }, ${date.getUTCFullYear()}`,
        showCalender: false,
      });
    };

    return (
      showCalender && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          minimumDate={new Date()}
          onChange={onChange}
          accentColor={Colors.primaryColor}
        />
      )
    );
  }

  function destinationCityInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor16SemiBold,
          }}>
          Destination City
        </Text>
        <Menu
          visible={showDestinationCityOptions}
          style={{width: screenWidth - 40.0, maxHeight: screenHeight - 100.0}}
          anchor={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => updateState({showDestinationCityOptions: true})}
              style={styles.selectedCityInfoWrapStyle}>
              <Text style={{...Fonts.blackColor18SemiBold}}>
                {selectedDestinationCity}
              </Text>
              <MaterialIcons
                name="arrow-drop-down"
                color={Colors.grayColor}
                size={24}
              />
            </TouchableOpacity>
          }
          onRequestClose={() =>
            updateState({showDestinationCityOptions: false})
          }>
          <ScrollView showsVerticalScrollIndicator={false}>
            {destinationCitysList.map((item, index) => (
              <MenuItem
                key={index}
                textStyle={{
                  marginTop: Sizes.fixPadding - 20.0,
                  ...Fonts.blackColor18SemiBold,
                }}
                onPress={() =>
                  updateState({
                    selectedDestinationCity: item,
                    showDestinationCityOptions: false,
                  })
                }>
                {item}
              </MenuItem>
            ))}
          </ScrollView>
        </Menu>
      </View>
    );
  }

  function sourceCityInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor16SemiBold,
          }}>
          Source City
        </Text>
        <Menu
          visible={showSourceCityOptions}
          style={{width: screenWidth - 40.0, maxHeight: screenHeight - 100.0}}
          anchor={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => updateState({showSourceCityOptions: true})}
              style={styles.selectedCityInfoWrapStyle}>
              <Text style={{...Fonts.blackColor18SemiBold}}>
                {selectedSourceCity}
              </Text>
              <MaterialIcons
                name="arrow-drop-down"
                color={Colors.grayColor}
                size={24}
              />
            </TouchableOpacity>
          }
          onRequestClose={() => updateState({showSourceCityOptions: false})}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {sourceCitysList.map((item, index) => (
              <MenuItem
                key={index}
                textStyle={{
                  marginTop: Sizes.fixPadding - 20.0,
                  ...Fonts.blackColor18SemiBold,
                }}
                onPress={() =>
                  updateState({
                    selectedSourceCity: item,
                    showSourceCityOptions: false,
                  })
                }>
                {item}
              </MenuItem>
            ))}
          </ScrollView>
        </Menu>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  selectedCityInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor:'#ececec',
    borderWidth:0.50,
  },
  departureDateAndTravelTimeWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor:'#ececec',
    borderWidth:0.50,
  },
  searchBusesButtonStyle: {
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
  departureDateAndTravelTimeInfoWrapStyle: {
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BusTicketBookingScreen;
