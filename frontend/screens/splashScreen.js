import React, { useCallback } from 'react';
import {
  View,
  Image,
  ImageBackground,
  BackHandler,
} from 'react-native';
import { Colors, screenWidth } from '../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import MyStatusBar from '../components/myStatusBar';

const SplashScreen = ({ navigation }) => {
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [backAction]),
  );

  setTimeout(() => {
    navigation.push('Onboarding');
  }, 2000);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/images/bg.png')}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../assets/images/logo1.png')}
            style={{ height: 109.0, width: screenWidth - 40.0, resizeMode: 'contain' }}
          />
        </ImageBackground>
      </View>
    </View>
  );
};

export default SplashScreen;
