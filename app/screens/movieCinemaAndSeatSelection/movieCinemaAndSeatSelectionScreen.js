import React, { useState } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  screenHeight,
  screenWidth,
  commonStyles,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Menu, MenuItem } from 'react-native-material-menu';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import MyStatusBar from '../../components/myStatusBar';

const locationsList = [
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

const cinemaOptionsList = [
  'Rajhans Cinemas',
  'PVR Surat',
  'Cinepolis',
  'Harmony Cinema',
  'INOX Raj Imperial',
  'Bollywood Metro',
];

const slotsList = [
  '10:30 am',
  '12:00 am',
  '01:20 pm',
  '02:45 pm',
  '03:15 pm',
  '05:10 pm',
];

const seatArrangementsList = [
  {
    id: 'A',
    left: [
      {
        seatNo: 'A1',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'A2',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'A3',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'A4',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
    middle: [],
    right: [
      {
        seatNo: 'A5',
        isAvailable: false,
      },
      {
        seatNo: 'A6',
        isAvailable: false,
      },
      {
        seatNo: 'A7',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'A8',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
  },
  {
    id: 'B',
    left: [
      {
        seatNo: 'B1',
        isAvailable: false,
      },
      {
        seatNo: 'B2',
        isAvailable: false,
      },
      {
        seatNo: 'B3',
        isAvailable: false,
      },
      {
        seatNo: 'B4',
        isAvailable: false,
      },
    ],
    middle: [],
    right: [
      {
        seatNo: 'B5',
        isAvailable: false,
      },
      {
        seatNo: 'B6',
        isAvailable: false,
      },
      {
        seatNo: 'B7',
        isAvailable: false,
      },
      {
        seatNo: 'B8',
        isAvailable: false,
      },
    ],
  },
  {
    id: 'C',
    left: [
      {
        seatNo: 'C1',
        isAvailable: false,
      },
      {
        seatNo: 'C2',
        isAvailable: false,
      },
      {
        seatNo: 'C3',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'C4',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
    middle: [
      {
        seatNo: 'C5',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'C6',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'C7',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
    right: [
      {
        seatNo: 'C8',
        isAvailable: false,
      },
      {
        seatNo: 'C9',
        isAvailable: false,
      },
      {
        seatNo: 'C10',
        isAvailable: false,
      },
      {
        seatNo: 'C11',
        isAvailable: false,
      },
    ],
  },
  {
    id: 'D',
    left: [
      {
        seatNo: 'D1',
        isAvailable: false,
      },
      {
        seatNo: 'D2',
        isAvailable: false,
      },
      {
        seatNo: 'D3',
        isAvailable: false,
      },
      {
        seatNo: 'D4',
        isAvailable: false,
      },
    ],
    middle: [
      {
        seatNo: 'D5',
        isAvailable: true,
        isYourSeat: true,
      },
      {
        seatNo: 'D6',
        isAvailable: true,
        isYourSeat: true,
      },
      {
        seatNo: 'D7',
        isAvailable: true,
        isYourSeat: true,
      },
    ],
    right: [
      {
        seatNo: 'D8',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'D9',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'D10',
        isAvailable: false,
      },
      {
        seatNo: 'D11',
        isAvailable: false,
      },
    ],
  },
  {
    id: 'E',
    left: [
      {
        seatNo: 'E1',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'E2',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'E3',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'E4',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
    middle: [
      {
        seatNo: 'E5',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'E6',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'E7',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
    right: [
      {
        seatNo: 'E8',
        isAvailable: false,
      },
      {
        seatNo: 'E9',
        isYourSeat: false,
      },
      {
        seatNo: 'E10',
        isAvailable: false,
      },
      {
        seatNo: 'E11',
        isAvailable: false,
      },
    ],
  },
  {
    id: 'F',
    left: [
      {
        seatNo: 'F1',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'F2',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'F3',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'F4',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
    middle: [
      {
        seatNo: 'F5',
        isAvailable: false,
      },
      {
        seatNo: 'F6',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'F7',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
    right: [
      {
        seatNo: 'F8',
        isAvailable: false,
      },
      {
        seatNo: 'F9',
        isYourSeat: false,
      },
      {
        seatNo: 'F10',
        isAvailable: false,
      },
      {
        seatNo: 'F11',
        isAvailable: false,
      },
    ],
  },
  {
    id: 'G',
    left: [
      {
        seatNo: 'G1',
        isAvailable: false,
      },
      {
        seatNo: 'G2',
        isAvailable: false,
      },
      {
        seatNo: 'G3',
        isAvailable: false,
      },
      {
        seatNo: 'G4',
        isAvailable: false,
      },
    ],
    middle: [
      {
        seatNo: 'G5',
        isAvailable: false,
      },
      {
        seatNo: 'G6',
        isAvailable: false,
      },
      {
        seatNo: 'G7',
        isAvailable: false,
      },
    ],
    right: [
      {
        seatNo: 'G8',
        isAvailable: false,
      },
      {
        seatNo: 'G9',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'G10',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'G11',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
  },
  {
    id: 'H',
    left: [
      {
        seatNo: 'H1',
        isAvailable: false,
      },
      {
        seatNo: 'H2',
        isAvailable: false,
      },
      {
        seatNo: 'H3',
        isAvailable: false,
      },
      {
        seatNo: 'H4',
        isAvailable: false,
      },
    ],
    middle: [
      {
        seatNo: 'H5',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'H6',
        isAvailable: false,
      },
      {
        seatNo: 'H7',
        isAvailable: false,
      },
    ],
    right: [
      {
        seatNo: 'H8',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'H9',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'H10',
        isAvailable: true,
        isYourSeat: false,
      },
      {
        seatNo: 'H11',
        isAvailable: true,
        isYourSeat: false,
      },
    ],
  },
];

const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

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

const MovieCinemaAndSeatSelectionScreen = ({ navigation, route }) => {
  const item = route.params.item;

  const [state, setState] = useState({
    showLocationsOptions: false,
    selectedLocation: locationsList[0],
    showCinemaOptions: false,
    selectedCinema: cinemaOptionsList[0],
    selectedSlot: slotsList[slotsList.length - 1],
    seatArrangements: seatArrangementsList,
    selectedDate: null,
  });

  const updateState = data => setState(state => ({ ...state, ...data }));

  const {
    showLocationsOptions,
    selectedLocation,
    showCinemaOptions,
    selectedCinema,
    selectedSlot,
    seatArrangements,
    selectedDate,
  } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {movieInfo()}
              {locationAndCinemaInfo()}
              {selectDate()}
              {selectTime()}
              {seatArrangment()}
              {availableBookedAndYourSeatColorInfo()}
              {bookSeatButton()}
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );

  function getTotaluserSeats() {
    var total = 0;
    seatArrangements.map(item => {
      const leftSeats = item.left.filter(
        seat => seat.isYourSeat == true,
      ).length;
      const middleSeats = item.middle.filter(
        seat => seat.isYourSeat == true,
      ).length;
      const rightSeats = item.right.filter(
        seat => seat.isYourSeat == true,
      ).length;
      total = total + leftSeats + middleSeats + rightSeats;
    });
    return total;
  }

  function bookSeatButton() {
    const booking = {
      cinema: selectedCinema,
      movieName: item.movieName,
      date: selectedDate
        ? selectedDate
        : `${new Date().getDate()} ${monthsList[new Date().getMonth()]}`,
      timeSlot: selectedSlot,
      noOfSeats: getTotaluserSeats(),
    };
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.push('MovieTicketBookingDetail', { booking: booking })
        }
        style={styles.bookSeatButtonStyle}>
        <Text style={{ ...Fonts.whiteColor22Bold }}>Book Seat</Text>
      </TouchableOpacity>
    );
  }

  function availableBookedAndYourSeatColorInfo() {
    return (
      <View style={styles.availableBookedAndYourSeatColorInfoWrapStyle}>
        {availableBookedAndYourSeatColorSort({
          color: Colors.greenColor,
          colorFor: 'Available',
        })}
        {availableBookedAndYourSeatColorSort({
          color: Colors.grayColor,
          colorFor: 'Booked',
        })}
        {availableBookedAndYourSeatColorSort({
          color: Colors.secondaryColor,
          colorFor: 'Your Seats',
        })}
      </View>
    );
  }

  function availableBookedAndYourSeatColorSort({ color, colorFor }) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 18.0,
            height: 18.0,
            borderRadius: Sizes.fixPadding - 7.0,
            backgroundColor: color,
          }}></View>
        <Text
          style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
          {colorFor}
        </Text>
      </View>
    );
  }

  function updateSeatArrangement({ itemId, seatNo }) {
    const newList = seatArrangements.map(item => {
      if (item.id === itemId) {
        const rightList = item.right.map(seat => {
          if (seat.seatNo === seatNo) {
            const updatedItem = { ...seat, isYourSeat: !seat.isYourSeat };
            return updatedItem;
          }
          return seat;
        });

        const middleList = item.middle.map(seat => {
          if (seat.seatNo === seatNo) {
            const updatedItem = { ...seat, isYourSeat: !seat.isYourSeat };
            return updatedItem;
          }
          return seat;
        });

        const leftList = item.left.map(seat => {
          if (seat.seatNo === seatNo) {
            const updatedItem = { ...seat, isYourSeat: !seat.isYourSeat };
            return updatedItem;
          }
          return seat;
        });

        const updatedItem = {
          ...item,
          right: rightList,
          left: leftList,
          middle: middleList,
        };
        return updatedItem;
      }
      return item;
    });
    updateState({ seatArrangements: newList });
  }

  function seatArrangment() {
    const renderItem = ({ item, index }) => (
      <View
        style={{
          marginBottom: Sizes.fixPadding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginRight: Sizes.fixPadding,
              ...Fonts.blackColor16SemiBold,
            }}>
            {seatRows[index]}
          </Text>
          {item.left.map(seat => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                seat.isAvailable
                  ? updateSeatArrangement({
                    itemId: item.id,
                    seatNo: seat.seatNo,
                  })
                  : null
              }
              key={seat.seatNo}
              style={{
                marginRight: Sizes.fixPadding,
                ...styles.seatIndicatorStyle,
                backgroundColor: seat.isAvailable
                  ? seat.isYourSeat
                    ? Colors.secondaryColor
                    : Colors.greenColor
                  : Colors.grayColor,
              }}
            />
          ))}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.middle.map(seat => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                seat.isAvailable
                  ? updateSeatArrangement({
                    itemId: item.id,
                    seatNo: seat.seatNo,
                  })
                  : null
              }
              key={seat.seatNo}
              style={{
                ...styles.seatIndicatorStyle,
                marginHorizontal: Sizes.fixPadding - 5.0,
                backgroundColor: seat.isAvailable
                  ? seat.isYourSeat
                    ? Colors.secondaryColor
                    : Colors.greenColor
                  : Colors.grayColor,
              }}
            />
          ))}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.right.map(seat => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                seat.isAvailable
                  ? updateSeatArrangement({
                    itemId: item.id,
                    seatNo: seat.seatNo,
                  })
                  : null
              }
              key={seat.seatNo}
              style={{
                marginLeft: Sizes.fixPadding,
                ...styles.seatIndicatorStyle,
                backgroundColor: seat.isAvailable
                  ? seat.isYourSeat
                    ? Colors.secondaryColor
                    : Colors.greenColor
                  : Colors.grayColor,
              }}
            />
          ))}
        </View>
      </View>
    );

    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <FlatList
          listKey="seatArrangement"
          data={seatArrangements}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    );
  }

  function selectTime() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => updateState({ selectedSlot: item })}
        style={{
          backgroundColor:
            selectedSlot == item ? Colors.secondaryColor : '#E6E6E6',
          ...styles.slotWrapStyle,
        }}>
        <Text
          style={
            selectedSlot == item
              ? { ...Fonts.whiteColor14Bold }
              : { ...Fonts.blackColor14Bold }
          }>
          {item}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <FlatList
          data={slotsList}
          keyExtractor={index => `${index}`}
          renderItem={renderItem}
          numColumns={8}
          columnWrapperStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        />
      </View>
    );
  }

  function selectDate() {
    return (
      <CalendarStrip
        style={{
          height: 100,
          paddingBottom: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        highlightDateContainerStyle={{
          backgroundColor: Colors.secondaryColor,
          borderRadius: Sizes.fixPadding - 5.0,
        }}
        calendarHeaderContainerStyle={{ marginTop: Sizes.fixPadding - 5.0 }}
        calendarHeaderStyle={{ ...Fonts.blackColor16ExtraBold }}
        iconStyle={{ width: 0.0, height: 0.0 }}
        dateNumberStyle={{
          fontSize: 16,
          color: Colors.blackColor,
          fontFamily: 'NunitoSans_Bold',
        }}
        dateNameStyle={{
          fontSize: 16,
          color: Colors.grayColor,
          fontFamily: 'NunitoSans_Bold',
        }}
        highlightDateNameStyle={{
          fontSize: 16,
          color: Colors.whiteColor,
          fontFamily: 'NunitoSans_Bold',
        }}
        highlightDateNumberStyle={{
          fontSize: 16,
          color: Colors.whiteColor,
          fontFamily: 'NunitoSans_Bold',
        }}
        useIsoWeekday={false}
        scrollable={true}
        upperCaseDays={false}
        styleWeekend={true}
        selectedDate={moment()}
        onDateSelected={date => {
          updateState({ selectedDate: date.format('DD MMM') });
        }}
        minDate={moment()}
      />
    );
  }

  function locationAndCinemaInfo() {
    return (
      <View style={styles.locationAndCinemaInfoWrapStyle}>
        <View style={{ marginHorizontal: Sizes.fixPadding, flex: 1 }}>
          <Text
            style={{
              marginBottom: Sizes.fixPadding - 5.0,
              ...Fonts.grayColor16SemiBold,
            }}>
            Location
          </Text>
          <Menu
            visible={showLocationsOptions}
            style={{ maxHeight: screenHeight - 100.0 }}
            anchor={
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ showLocationsOptions: true })}
                style={styles.selectedLocationAndCinemaInfoWrapStyle}>
                <Text
                  numberOfLines={1}
                  style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                  {selectedLocation}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  color={Colors.grayColor}
                  size={24}
                />
              </TouchableOpacity>
            }
            onRequestClose={() => updateState({ showLocationsOptions: false })}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {locationsList.map((item, index) => (
                <MenuItem
                  key={index}
                  textStyle={{
                    marginTop: Sizes.fixPadding - 20.0,
                    ...Fonts.blackColor18SemiBold,
                  }}
                  onPress={() =>
                    updateState({
                      selectedLocation: item,
                      showLocationsOptions: false,
                    })
                  }>
                  {item}
                </MenuItem>
              ))}
            </ScrollView>
          </Menu>
        </View>
        <View style={{ marginHorizontal: Sizes.fixPadding, flex: 1 }}>
          <Text
            style={{
              marginBottom: Sizes.fixPadding - 5.0,
              ...Fonts.grayColor16SemiBold,
            }}>
            Cinema
          </Text>
          <Menu
            visible={showCinemaOptions}
            style={{ width: screenWidth - 40.0, maxHeight: screenHeight - 100.0 }}
            anchor={
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ showCinemaOptions: true })}
                style={styles.selectedLocationAndCinemaInfoWrapStyle}>
                <Text
                  numberOfLines={1}
                  style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                  {selectedCinema}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  color={Colors.grayColor}
                  size={24}
                />
              </TouchableOpacity>
            }
            onRequestClose={() => updateState({ showCinemaOptions: false })}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {cinemaOptionsList.map((item, index) => (
                <MenuItem
                  key={index}
                  textStyle={{
                    marginTop: Sizes.fixPadding - 20.0,
                    ...Fonts.blackColor18SemiBold,
                  }}
                  onPress={() =>
                    updateState({
                      selectedCinema: item,
                      showCinemaOptions: false,
                    })
                  }>
                  {item}
                </MenuItem>
              ))}
            </ScrollView>
          </Menu>
        </View>
      </View>
    );
  }

  function movieInfo() {
    return (
      <View style={styles.movieInfoWrapStyle}>
        <Image
          source={item.moviePoster}
          style={{
            height: 110.0,
            borderRadius: Sizes.fixPadding - 5.0,
            flex: 0.7,
          }}
        />
        <View style={{ flex: 0.4, marginLeft: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.blackColor16Bold }}>{item.movieName}</Text>
          {showRating({ rate: 5.0 })}
          <View
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/social_media/youtube.png')}
              style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
            />
            <Text
              style={{
                marginLeft: Sizes.fixPadding,
                ...Fonts.grayColor14SemiBold,
              }}>
              Watch Trailer
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function showRating({ rate }) {
    const rating = Math.ceil(rate);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {rating == 1 ||
          rating == 2 ||
          rating == 3 ||
          rating == 4 ||
          rating == 5 ? (
          <MaterialIcons name="star" color={Colors.yellowColor} size={18} />
        ) : (
          <MaterialIcons name="star" color={Colors.grayColor} size={18} />
        )}
        {rating == 2 || rating == 3 || rating == 4 || rating == 5 ? (
          <MaterialIcons name="star" color={Colors.yellowColor} size={18} />
        ) : (
          <MaterialIcons name="star" color={Colors.grayColor} size={18} />
        )}
        {rating == 3 || rating == 4 || rating == 5 ? (
          <MaterialIcons name="star" color={Colors.yellowColor} size={18} />
        ) : (
          <MaterialIcons name="star" color={Colors.grayColor} size={18} />
        )}
        {rating == 4 || rating == 5 ? (
          <MaterialIcons name="star" color={Colors.yellowColor} size={18} />
        ) : (
          <MaterialIcons name="star" color={Colors.grayColor} size={18} />
        )}
        {rating == 5 ? (
          <MaterialIcons name="star" color={Colors.yellowColor} size={18} />
        ) : (
          <MaterialIcons name="star" color={Colors.grayColor} size={18} />
        )}
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
        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor20Bold }}>
          Moive Tickets
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
  movieInfoWrapStyle: {
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedLocationAndCinemaInfoWrapStyle: {
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
  locationAndCinemaInfoWrapStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 3.0,
    marginRight: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
  },
  seatIndicatorStyle: {
    width: 16.0,
    height: 16.0,
    borderRadius: Sizes.fixPadding - 7.0,
  },
  availableBookedAndYourSeatColorInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Sizes.fixPadding - 5.0,
  },
  bookSeatButtonStyle: {
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
});

export default MovieCinemaAndSeatSelectionScreen;
