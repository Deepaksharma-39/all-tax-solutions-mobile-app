import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const BusTicketBookingDetailScreen = ({navigation, route}) => {
  const item = route.params.item;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {placesDateAndTotalTimeInfo()}
          {busInfo()}
          {totalAmountInfo()}
          {continueButton()}
        </ScrollView>
      </View>
    </View>
  );

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('TravellersDetail')}
        style={styles.continueButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Continue</Text>
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
        <Text style={{...Fonts.blackColor16Bold}}>Total Amount $110</Text>
        <Text style={{...Fonts.grayColor14Regular}}>( Total 3 Seats)</Text>
      </View>
    );
  }

  function busInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text>
          <Text style={{...Fonts.blackColor18SemiBold}}>{item.busName}</Text>
          <Text style={{...Fonts.blackColor16Regular}}>
            (Ac sleeper 2 • 1 single axie)
          </Text>
        </Text>
        <Text style={{...Fonts.blackColor14SemiBold}}>
          Wed 15 May | Time: 8:30 pm
        </Text>
      </View>
    );
  }

  function placesDateAndTotalTimeInfo() {
    return (
      <View style={styles.placesDateAndTotalTimeInfoWrapStyle}>
        <Text style={{...Fonts.blackColor18SemiBold}}>Jaipur to Srinagar</Text>
        <Text style={{...Fonts.blackColor16Regular}}>
          15 May, 2020 | 12h 5min
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
  placesDateAndTotalTimeInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.grayColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
  },
  continueButtonStyle: {
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

export default BusTicketBookingDetailScreen;
