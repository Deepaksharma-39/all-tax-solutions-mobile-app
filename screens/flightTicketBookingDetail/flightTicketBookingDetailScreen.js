import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes,commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const FlightTicketBookingDetailScreen = ({navigation, route}) => {
  const item = route.params.item;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {placesDateAndTotalTimeInfo()}
          {flightInfo()}
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
          marginTop: Sizes.fixPadding * 2.0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{...Fonts.blackColor16Bold}}>Total Amount $250</Text>
        <Text style={{...Fonts.grayColor14Regular}}>
          ( Total fare for 1 Traveller )
        </Text>
      </View>
    );
  }

  function flightInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text>
          <Text style={{flex: 1, ...Fonts.blackColor18SemiBold}}>
            {item.flightName}
          </Text>
          <Text style={{...Fonts.blackColor16Regular}}>{` `}(Economy)</Text>
        </Text>
        <View
          style={{
            marginTop: Sizes.fixPadding,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.blackColor14SemiBold}}>Wed 15 May</Text>
          <View
            style={{
              marginTop: Sizes.fixPadding - 7.0,
              flex: 0.8,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: Colors.secondaryColor,
                  height: 2.0,
                }}
              />
              <Text
                style={{
                  marginHorizontal: Sizes.fixPadding - 5.0,
                  ...Fonts.blackColor12Regular,
                }}>
                2h 5m
              </Text>
              <View
                style={{
                  flex: 1,
                  backgroundColor: Colors.secondaryColor,
                  height: 2.0,
                }}
              />
            </View>
            <Image
              source={require('../../assets/images/icons/plane.png')}
              style={{width: 22.0, height: 22.0, resizeMode: 'contain'}}
            />
          </View>
          <Text style={{...Fonts.blackColor14SemiBold}}>Mon 20 May</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: Sizes.fixPadding}}>
          <View style={{flex: 1, marginRight: Sizes.fixPadding - 5.0}}>
            <Text style={{...Fonts.blackColor16Bold}}>BOM</Text>
            <Text style={{...Fonts.blackColor14SemiBold}}>18:05</Text>
            <Text style={{...Fonts.grayColor12Regular}}>Mumbai</Text>
            <Text style={{...Fonts.grayColor12Regular}}>
              Chhatrapati Shivaji International (Terminal:1)
            </Text>
          </View>
          <View style={{flex: 1, marginLeft: Sizes.fixPadding - 5.0}}>
            <Text style={{...Fonts.blackColor16Bold}}>DEL</Text>
            <Text style={{...Fonts.blackColor14SemiBold}}>20:00</Text>
            <Text style={{...Fonts.grayColor12Regular}}>Delhi</Text>
            <Text style={{...Fonts.grayColor12Regular}}>
              Indira Gandhi International Airport
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function placesDateAndTotalTimeInfo() {
    return (
      <View style={styles.placesDateAndTotalTimeInfoWrapStyle}>
        <Text style={{...Fonts.blackColor18SemiBold}}>Mumbai to Delhi</Text>
        <Text style={{...Fonts.blackColor16Regular}}>
          15 May, 2020 | Non Stop | 2h 5min
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
  placesDateAndTotalTimeInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.grayColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
  },
});

export default FlightTicketBookingDetailScreen;
