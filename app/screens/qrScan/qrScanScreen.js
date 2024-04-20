import React from 'react';
import {View, Image, ImageBackground, StyleSheet, Text} from 'react-native';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const QrScanScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {scanner()}
      </View>
    </View>
  );

  function scanner() {
    return (
      <ImageBackground
        source={require('../../assets/images/qr_scan.png')}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{position: 'absolute', top: 20.0, ...Fonts.whiteColor16Bold}}>
          Scan Digital Payment QR or any QR
        </Text>
        <View style={{position: 'absolute', right: 20.0}}>
          <Image
            source={require('../../assets/images/icons/flash.png')}
            style={{width: 22.0, height: 22.0}}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/images/icons/photo.png')}
            style={{width: 20.0, height: 20.0, top: 30.0}}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
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
          QR Scan
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
    elevation: 3.0,
  },
});

export default QrScanScreen;
