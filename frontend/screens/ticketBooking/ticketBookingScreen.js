import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TabView, TabBar} from 'react-native-tab-view';
import FlightTicketBooking from '../flightTicketBooking/flightTicketBookingScreen';
import BusTicketBookingScreen from '../busTicketBooking/busTicketBookingScreen';
import MovieTicketBookingScreen from '../movieTicketBooking/movieTicketBookingScreen';
import MyStatusBar from '../../components/myStatusBar';

const TicketBookingScreen = ({navigation, route}) => {
  const currentIndex = route.params.index ? route.params.index : 0;

  const [index, setIndex] = useState(currentIndex);
  const [routes] = useState([
    {key: 'first', title: 'Flight'},
    {key: 'second', title: 'Bus'},
    {key: 'third', title: 'Moive'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FlightTicketBooking navigation={navigation} />;
      case 'second':
        return <BusTicketBookingScreen navigation={navigation} />;
      case 'third':
        return <MovieTicketBookingScreen navigation={navigation} />;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: Colors.secondaryColor}}
              style={{backgroundColor: Colors.lightWhiteColor}}
              renderLabel={({route, focused}) => (
                <Text
                  style={
                    focused
                      ? {...Fonts.secondaryColor20SemiBold}
                      : {...Fonts.grayColor20SemiBold}
                  }>
                  {route.title}
                </Text>
              )}
            />
          )}
        />
      </View>
    </View>
  );

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
          Book a Tickets
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
  },
});

export default TicketBookingScreen;
