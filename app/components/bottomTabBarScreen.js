import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Image, BackHandler, Platform} from 'react-native';
import HomeScreen from '../screens/home/homeScreen';
import MallScreen from '../screens/mall/mallScreen';
import ProfileScreen from '../screens/profile/profileScreen';
import {Colors, Fonts, Sizes, commonStyles} from '../constants/styles';
import {useFocusEffect} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/authSlice';

const Tab = createBottomTabNavigator();

const BottomTabBarScreen = ({navigation}) => {
  const backAction = () => {
    if (Platform.OS == 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
    }
    return true;
  };  
  const { user } = useSelector(selectAuth);
  const userData=user;

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        navigation.removeListener('gestureEnd', backAction);
      };
    }, [backAction]),
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {...styles.bottomTabBarStyle},
          tabBarLabelStyle: {fontSize: 12, fontFamily: 'NunitoSans_Bold'},
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grayColor,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{userData:userData}}
          options={{
            tabBarIcon: ({focused}) =>
              tabBarSort({
                focused,
                icon: require('../assets/images/icons/home.png'),
              }),
          }}
        />
        <Tab.Screen
          name="Buy"
          component={MallScreen}
          options={{
            tabBarIcon: ({focused}) =>
              tabBarSort({
                focused,
                icon: require('../assets/images/icons/shopping_bag.png'),
              }),
          }}
        />
        <Tab.Screen
          name="Sell"
          component={MallScreen}
          options={{
            tabBarIcon: ({focused}) =>
              tabBarSort({
                focused,
                icon: require('../assets/images/icons/history.png'),
              }),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{userData:userData}}
          options={{
            tabBarIcon: ({focused}) =>
              tabBarSort({
                focused,
                icon: require('../assets/images/icons/profile.png'),
              }),
            }}
        />
      </Tab.Navigator>
      {exitInfo()}
    </>
  );

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={commonStyles.exitWrapper}>
        <Text style={{...Fonts.whiteColor14SemiBold}}>
          Press Back Once Again to Exit
        </Text>
      </View>
    ) : null;
  }

  function tabBarSort({focused, icon}) {
    return (
      <View
        style={{
          backgroundColor: focused ? Colors.primaryColor : Colors.grayColor,
          ...styles.bottomTabSelectedIconStyle,
        }}>
        <Image
          source={icon}
          style={{width: 14.0, height: 14.0, resizeMode: 'contain'}}
        />
      </View>
    );
  }
};

export default BottomTabBarScreen;

const styles = StyleSheet.create({
  bottomTabBarStyle: {
    height: 65.0,
    backgroundColor: Colors.whiteColor,
    paddingTop: Sizes.fixPadding - 5.0,
    paddingBottom: Sizes.fixPadding - 5.0,
  },
  bottomTabSelectedIconStyle: {
    height: 30.0,
    width: 30.0,
    borderRadius: 20.0,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
});
