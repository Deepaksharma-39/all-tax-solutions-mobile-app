import React, {createRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenHeight,
  screenWidth,
} from '../../constants/styles';
import {Menu, MenuItem} from 'react-native-material-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';

const formCitysList = [
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

const toCitysList = [
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

const classList = ['Economy', 'Business', 'First class', 'Premium Economy'];

const FlightTicketBookingScreen = ({navigation}) => {
  const dateObj = new Date();
  const todayDate = `${dateObj.getUTCDate()} ${
    monthsList[dateObj.getUTCMonth()]
  }, ${dateObj.getUTCFullYear()}`;

  const panelRef = createRef();

  const [state, setState] = useState({
    isOneway: true,
    showFromCityOptions: false,
    selectedFromCity: formCitysList[0],
    showToCityOptions: false,
    selectedToCity: toCitysList[toCitysList.length - 1],
    showCalender: false,
    departureDate: null,
    calenderFrom: null,
    returnDate: null,
    selectedClass: classList[0],
    showClassOptions: false,
    adultsCount: 1,
    childrensCount: 0,
    infantsCount: 0,
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {
    isOneway,
    showFromCityOptions,
    selectedFromCity,
    showToCityOptions,
    selectedToCity,
    showCalender,
    departureDate,
    calenderFrom,
    returnDate,
    selectedClass,
    showClassOptions,
    adultsCount,
    childrensCount,
    infantsCount,
  } = state;

  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {onewayAndRoundtripButton()}
          {fromCityInfo()}
          {toCityInfo()}
          {departureAndReturnDateInfo()}
          {travellersAndClassInfo()}
          {searchFlightButton()}
        </ScrollView>
      </View>
      {calender()}
      {travellersSheet()}
    </>
  );

  function searchFlightButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.push('FlightSearch', {
            fromCity: selectedFromCity,
            toCity: selectedToCity,
          });
        }}
        style={styles.searchFlightButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Search Flights</Text>
      </TouchableOpacity>
    );
  }

  function travellersSheet() {
    return (
      <RBSheet
        ref={panelRef}
        closeOnDragDown={true}
        height={225}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: Sizes.fixPadding,
            borderTopRightRadius: Sizes.fixPadding,
            paddingHorizontal: Sizes.fixPadding * 2.0,
          },
          draggableIcon: {
            backgroundColor: 'tranparent',
          },
        }}>
        <View>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 20.0,
              marginBottom: Sizes.fixPadding,
              ...Fonts.blackColor20Bold,
            }}>
            No of Travellers
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{...Fonts.blackColor18SemiBold}}>Adults</Text>
              <Text style={{...Fonts.grayColor16Regular}}>12+ years</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name="add-box"
                size={22}
                color={Colors.primaryColor}
                onPress={() => updateState({adultsCount: adultsCount + 1})}
              />
              <Text
                style={{
                  marginHorizontal: Sizes.fixPadding,
                  ...Fonts.blackColor14ExtraBold,
                }}>
                {adultsCount}
              </Text>
              <MaterialCommunityIcons
                name="minus-box"
                size={22}
                color={Colors.grayColor}
                onPress={() => {
                  adultsCount > 1
                    ? updateState({adultsCount: adultsCount - 1})
                    : null;
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginVertical: Sizes.fixPadding,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{...Fonts.blackColor18SemiBold}}>Children</Text>
              <Text style={{...Fonts.grayColor16Regular}}>2 - 12 years</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name="add-box"
                size={22}
                color={Colors.primaryColor}
                onPress={() =>
                  updateState({childrensCount: childrensCount + 1})
                }
              />
              <Text
                style={{
                  marginHorizontal: Sizes.fixPadding,
                  ...Fonts.blackColor14ExtraBold,
                }}>
                {childrensCount}
              </Text>
              <MaterialCommunityIcons
                name="minus-box"
                size={22}
                color={Colors.grayColor}
                onPress={() => {
                  childrensCount != 0
                    ? updateState({childrensCount: childrensCount - 1})
                    : null;
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{...Fonts.blackColor18SemiBold}}>Infants</Text>
              <Text style={{...Fonts.grayColor16Regular}}>0 - 2 years</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name="add-box"
                size={22}
                color={Colors.primaryColor}
                onPress={() => updateState({infantsCount: infantsCount + 1})}
              />
              <Text
                style={{
                  marginHorizontal: Sizes.fixPadding,
                  ...Fonts.blackColor14ExtraBold,
                }}>
                {infantsCount}
              </Text>
              <MaterialCommunityIcons
                name="minus-box"
                size={22}
                color={Colors.grayColor}
                onPress={() => {
                  infantsCount != 0
                    ? updateState({infantsCount: infantsCount - 1})
                    : null;
                }}
              />
            </View>
          </View>
        </View>
      </RBSheet>
    );
  }

  function travellersAndClassInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: Sizes.fixPadding,
          }}>
          <Text style={{...Fonts.grayColor16SemiBold}}>Travellers</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => panelRef.current.open()}
            style={styles.travellersAndClassInfoWrapStyle}>
            <Text style={{...Fonts.blackColor18SemiBold}}>1 Adult</Text>
            <MaterialIcons
              name="add-circle"
              color={Colors.grayColor}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, marginHorizontal: Sizes.fixPadding}}>
          <Text style={{...Fonts.grayColor16SemiBold}}>Class</Text>
          <Menu
            visible={showClassOptions}
            anchor={
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({showClassOptions: true})}
                style={styles.travellersAndClassInfoWrapStyle}>
                <Text
                  numberOfLines={1}
                  style={{flex: 1, ...Fonts.blackColor18SemiBold}}>
                  {selectedClass}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  color={Colors.grayColor}
                  size={24}
                />
              </TouchableOpacity>
            }
            onRequestClose={() => updateState({showClassOptions: false})}>
            {classList.map((item, index) => (
              <MenuItem
                key={index}
                textStyle={{
                  marginTop: Sizes.fixPadding - 20.0,
                  ...Fonts.blackColor18SemiBold,
                }}
                onPress={() =>
                  updateState({selectedClass: item, showClassOptions: false})
                }>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </View>
      </View>
    );
  }

  function departureAndReturnDateInfo() {
    return (
      <View style={styles.departureAndReturnDateInfoWrapStyle}>
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
            onPress={() =>
              updateState({calenderFrom: 'departure', showCalender: true})
            }
            style={styles.departureAndReturnDateWrapStyle}>
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
        {!isOneway ? (
          <View style={{marginHorizontal: Sizes.fixPadding, flex: 1}}>
            <Text
              style={{
                marginBottom: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor16SemiBold,
              }}>
              Return Date
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                updateState({calenderFrom: 'return', showCalender: true})
              }
              style={styles.departureAndReturnDateWrapStyle}>
              <Text
                numberOfLines={1}
                style={{flex: 1, ...Fonts.blackColor18SemiBold}}>
                {returnDate ? returnDate : todayDate}
              </Text>
              <MaterialCommunityIcons
                name="calendar-range"
                size={20}
                color={Colors.grayColor}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  function calender() {
    const handleConfirm = (e, selectedDate) => {
      calenderFrom == 'departure'
        ? updateState({
            departureDate: `${selectedDate.getUTCDate()} ${
              monthsList[selectedDate.getUTCMonth()]
            }, ${selectedDate.getUTCFullYear()}`,
            showCalender: false,
          })
        : updateState({
            returnDate: `${selectedDate.getUTCDate()} ${
              monthsList[selectedDate.getUTCMonth()]
            }, ${selectedDate.getUTCFullYear()}`,
            showCalender: false,
          });
    };

    return (
      showCalender && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          minimumDate={new Date()}
          onChange={handleConfirm}
          accentColor={Colors.primaryColor}
        />
      )
    );
  }

  function toCityInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor16SemiBold,
          }}>
          To
        </Text>
        <Menu
          visible={showToCityOptions}
          style={{width: screenWidth - 40.0, maxHeight: screenHeight - 100.0}}
          anchor={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => updateState({showToCityOptions: true})}
              style={styles.selectedCityInfoWrapStyle}>
              <Text style={{...Fonts.blackColor18SemiBold}}>
                {selectedToCity}
              </Text>
              <MaterialIcons
                name="arrow-drop-down"
                color={Colors.grayColor}
                size={24}
              />
            </TouchableOpacity>
          }
          onRequestClose={() => updateState({showToCityOptions: false})}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {toCitysList.map((item, index) => (
              <MenuItem
                key={index}
                textStyle={{
                  marginTop: Sizes.fixPadding - 20.0,
                  ...Fonts.blackColor18SemiBold,
                }}
                onPress={() =>
                  updateState({selectedToCity: item, showToCityOptions: false})
                }>
                {item}
              </MenuItem>
            ))}
          </ScrollView>
        </Menu>
      </View>
    );
  }

  function fromCityInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor16SemiBold,
          }}>
          From
        </Text>
        <Menu
          visible={showFromCityOptions}
          style={{width: screenWidth - 40.0, maxHeight: screenHeight - 100.0}}
          anchor={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => updateState({showFromCityOptions: true})}
              style={styles.selectedCityInfoWrapStyle}>
              <Text style={{...Fonts.blackColor18SemiBold}}>
                {selectedFromCity}
              </Text>
              <MaterialIcons
                name="arrow-drop-down"
                color={Colors.grayColor}
                size={24}
              />
            </TouchableOpacity>
          }
          onRequestClose={() => updateState({showFromCityOptions: false})}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {formCitysList.map((item, index) => (
              <MenuItem
                key={index}
                textStyle={{
                  marginTop: Sizes.fixPadding - 20.0,
                  ...Fonts.blackColor18SemiBold,
                }}
                onPress={() =>
                  updateState({
                    selectedFromCity: item,
                    showFromCityOptions: false,
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

  function onewayAndRoundtripButton() {
    return (
      <View style={styles.onewayAndRoundtripButtonWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => updateState({isOneway: true})}
          style={{
            backgroundColor: isOneway ? Colors.primaryColor : Colors.whiteColor,
            shadowColor: isOneway
              ? Colors.primaryColor
              : Colors.lightWhiteColor,
            borderColor: isOneway
              ? 'rgba(86, 0, 65, 0.2)'
              : Colors.lightWhiteColor,
            ...styles.onewayAndRoundtripButtonStyle,
          }}>
          <Text
            style={
              isOneway
                ? {...Fonts.whiteColor20Bold}
                : {...Fonts.primaryColor20Bold}
            }>
            Oneway
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => updateState({isOneway: false})}
          style={{
            backgroundColor: !isOneway
              ? Colors.primaryColor
              : Colors.whiteColor,
            shadowColor: !isOneway
              ? Colors.primaryColor
              : Colors.lightWhiteColor,
            borderColor: !isOneway
              ? 'rgba(86, 0, 65, 0.2)'
              : Colors.lightWhiteColor,
            ...styles.onewayAndRoundtripButtonStyle,
          }}>
          <Text
            style={
              !isOneway
                ? {...Fonts.whiteColor20Bold}
                : {...Fonts.primaryColor20Bold}
            }>
            Roundtrip
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  onewayAndRoundtripButtonStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding,
    borderWidth: 1.5,
    flex: 1,
    ...commonStyles.boxShadow,
  },
  onewayAndRoundtripButtonWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  selectedCityInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  departureAndReturnDateWrapStyle: {
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
  },
  travellersAndClassInfoWrapStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
  },
  searchFlightButtonStyle: {
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
  departureAndReturnDateInfoWrapStyle: {
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FlightTicketBookingScreen;
