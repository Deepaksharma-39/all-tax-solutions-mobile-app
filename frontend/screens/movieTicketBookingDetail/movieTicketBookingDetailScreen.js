import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const MovieTicketBookingDetailScreen = ({navigation, route}) => {
  const booking = route.params.booking;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {bookingDetails()}
          {totalAmountInfo()}
          {makePaymenyButton()}
        </ScrollView>
      </View>
    </View>
  );

  function makePaymenyButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('PaymentMethod')}
        style={styles.makePaymentButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Make Payment</Text>
      </TouchableOpacity>
    );
  }

  function totalAmountInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding + 5.0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{...Fonts.blackColor16Bold}}>Total Amount $199</Text>
        <Text style={{...Fonts.grayColor14Regular}}>( Total 3 Seats)</Text>
      </View>
    );
  }

  function bookingDetails() {
    return (
      <View style={styles.bookingDetailsWrapStyle}>
        {bookingDetailSort({title: 'Cinema', value: booking.cinema})}
        {bookingDetailSort({title: 'Movie', value: booking.movieName})}
        {bookingDetailSort({
          title: 'Date - Time',
          value: `${booking.date} - ${booking.timeSlot}`,
        })}
        {bookingDetailSort({title: 'No of Seats', value: booking.noOfSeats})}
      </View>
    );
  }

  function bookingDetailSort({title, value}) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{width: 115, ...Fonts.grayColor14Regular}}>{title}</Text>
        <Text numberOfLines={1} style={{flex: 1, ...Fonts.blackColor16Bold}}>
          {value}
        </Text>
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
          Booking Details
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
    marginVertical: Sizes.fixPadding * 4.0,
    ...commonStyles.buttonShadow,
  },
  bookingDetailsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    padding: Sizes.fixPadding,
  },
});

export default MovieTicketBookingDetailScreen;
