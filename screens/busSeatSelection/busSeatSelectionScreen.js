import React, {useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const seatsArrangmentList = [
  {
    id: 'A',
    left: [
      {
        id: 'A1',
        available: false,
      },
      {
        id: 'A2',
        available: false,
      },
      {
        id: 'A3',
        available: false,
      },
    ],
    right: [
      {
        id: 'A4',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'A5',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'A6',
        available: false,
      },
    ],
  },
  {
    id: 'B',
    left: [
      {
        id: 'B1',
        available: false,
      },
      {
        id: 'B2',
        available: false,
      },
      {
        id: 'B3',
        available: false,
      },
    ],
    right: [
      {
        id: 'B4',
        available: false,
      },
      {
        id: 'B5',
        available: false,
      },
      {
        id: 'B6',
        available: false,
      },
    ],
  },
  {
    id: 'C',
    left: [
      {
        id: 'C1',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'C2',
        available: false,
      },
      {
        id: 'C3',
        available: true,
        isYourSeat: false,
      },
    ],
    right: [
      {
        id: 'C4',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'C5',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'C6',
        available: false,
      },
    ],
  },
  {
    id: 'D',
    left: [
      {
        id: 'D1',
        available: false,
      },
      {
        id: 'D2',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'D3',
        available: false,
      },
    ],
    right: [
      {
        id: 'D4',
        available: false,
      },
      {
        id: 'D5',
        available: false,
      },
      {
        id: 'D6',
        available: false,
      },
    ],
  },
  {
    id: 'E',
    left: [
      {
        id: 'E1',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'E2',
        available: false,
      },
      {
        id: 'E3',
        available: false,
      },
    ],
    right: [
      {
        id: 'E4',
        available: false,
      },
      {
        id: 'E5',
        available: false,
      },
      {
        id: 'E6',
        available: false,
      },
    ],
  },
  {
    id: 'F',
    left: [
      {
        id: 'F1',
        available: false,
      },
      {
        id: 'F2',
        available: false,
      },
      {
        id: 'F3',
        available: true,
        isYourSeat: false,
      },
    ],
    right: [
      {
        id: 'F4',
        available: false,
      },
      {
        id: 'F5',
        available: false,
      },
      {
        id: 'F6',
        available: false,
      },
    ],
  },
  {
    id: 'G',
    left: [
      {
        id: 'G1',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'G2',
        available: false,
      },
      {
        id: 'G3',
        available: true,
        isYourSeat: false,
      },
    ],
    right: [
      {
        id: 'G4',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'G5',
        available: false,
      },
      {
        id: 'G6',
        available: true,
        isYourSeat: false,
      },
    ],
  },
  {
    id: 'H',
    left: [
      {
        id: 'H1',
        available: false,
      },
      {
        id: 'H2',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'H3',
        available: false,
      },
    ],
    right: [
      {
        id: 'H4',
        available: false,
      },
      {
        id: 'H5',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'H6',
        available: false,
      },
    ],
  },
  {
    id: 'I',
    left: [
      {
        id: 'I1',
        available: false,
      },
      {
        id: 'I2',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'I3',
        available: false,
      },
    ],
    right: [
      {
        id: 'I4',
        available: false,
      },
      {
        id: 'I5',
        available: false,
      },
      {
        id: 'I6',
        available: false,
      },
    ],
  },
  {
    id: 'J',
    left: [
      {
        id: 'J1',
        available: false,
      },
      {
        id: 'J2',
        available: false,
      },
      {
        id: 'J3',
        available: true,
        isYourSeat: false,
      },
    ],
    right: [
      {
        id: 'J4',
        available: true,
        isYourSeat: true,
      },
      {
        id: 'J5',
        available: true,
        isYourSeat: true,
      },
      {
        id: 'J6',
        available: true,
        isYourSeat: true,
      },
    ],
  },
  {
    id: 'K',
    left: [
      {
        id: 'K1',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'K2',
        available: false,
      },
      {
        id: 'K3',
        available: true,
        isYourSeat: false,
      },
    ],
    right: [
      {
        id: 'K4',
        available: false,
      },
      {
        id: 'K5',
        available: false,
      },
      {
        id: 'K6',
        available: false,
      },
    ],
  },
  {
    id: 'L',
    left: [
      {
        id: 'L1',
        available: false,
      },
      {
        id: 'L2',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'L3',
        available: true,
        isYourSeat: false,
      },
    ],
    right: [
      {
        id: 'L4',
        available: false,
      },
      {
        id: 'L5',
        available: true,
        isYourSeat: false,
      },
      {
        id: 'L6',
        available: true,
        isYourSeat: false,
      },
    ],
  },
];

const BusSeatSelectionScreen = ({navigation, route}) => {
  const item = route.params.item;

  const [seatArrangements, setseatArrangements] = useState(seatsArrangmentList);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {seatsInfo()}
              {availableBookedAndYourSeatColorInfo()}
              {proceedButton()}
            </>
          }
        />
      </View>
    </View>
  );

  function proceedButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('BusTicketBookingDetail', {item: item})}
        style={styles.proceedButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Proceed</Text>
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

  function availableBookedAndYourSeatColorSort({color, colorFor}) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 18.0,
            height: 18.0,
            borderRadius: Sizes.fixPadding - 7.0,
            backgroundColor: color,
          }}></View>
        <Text
          style={{marginLeft: Sizes.fixPadding, ...Fonts.blackColor18SemiBold}}>
          {colorFor}
        </Text>
      </View>
    );
  }

  function updateSeatArrangement({itemId, seatId}) {
    const newList = seatArrangements.map(item => {
      if (item.id === itemId) {
        const rightList = item.right.map(seat => {
          if (seat.id === seatId) {
            const updatedItem = {...seat, isYourSeat: !seat.isYourSeat};
            return updatedItem;
          }
          return seat;
        });

        const leftList = item.left.map(seat => {
          if (seat.id === seatId) {
            const updatedItem = {...seat, isYourSeat: !seat.isYourSeat};
            return updatedItem;
          }
          return seat;
        });

        const updatedItem = {...item, right: rightList, left: leftList};
        return updatedItem;
      }
      return item;
    });
    setseatArrangements(newList);
  }

  function seatsInfo() {
    const renderItem = ({item}) => (
      <View style={styles.seatArrangementsWrapStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.left.map(seat => (
            <View key={seat.id}>
              <MaterialIcons
                name="airline-seat-recline-normal"
                size={29}
                style={{marginRight: Sizes.fixPadding + 10.0}}
                color={
                  seat.available
                    ? seat.isYourSeat
                      ? Colors.secondaryColor
                      : Colors.greenColor
                    : Colors.grayColor
                }
                onPress={() =>
                  seat.available
                    ? updateSeatArrangement({itemId: item.id, seatId: seat.id})
                    : null
                }
              />
            </View>
          ))}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.right.map(seat => (
            <View key={seat.id}>
              <MaterialIcons
                name="airline-seat-recline-normal"
                size={29}
                style={{marginLeft: Sizes.fixPadding + 10.0}}
                color={
                  seat.available
                    ? seat.isYourSeat
                      ? Colors.secondaryColor
                      : Colors.greenColor
                    : Colors.grayColor
                }
                onPress={() =>
                  seat.available
                    ? updateSeatArrangement({itemId: item.id, seatId: seat.id})
                    : null
                }
              />
            </View>
          ))}
        </View>
      </View>
    );

    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginVertical: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor20Bold,
          }}>
          Choose a Seats
        </Text>
        <FlatList
          data={seatArrangements}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
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
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor20Bold,
          }}>
          {item.busName}
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
  availableBookedAndYourSeatColorInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Sizes.fixPadding - 5.0,
  },
  seatArrangementsWrapStyle: {
    marginBottom: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proceedButtonStyle: {
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
});

export default BusSeatSelectionScreen;
