import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const QrCodeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {qrCode()}
        {downloadButton()}
      </View>
    </View>
  );

  function downloadButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.pop()}
        style={styles.downloadButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Download</Text>
      </TouchableOpacity>
    );
  }

  function qrCode() {
    return (
      <View style={{marginVertical: Sizes.fixPadding * 2.0}}>
        <ImageBackground
          source={require('../../assets/images/qr_code.png')}
          style={styles.qrCodeImageStyle}
          resizeMode="contain">
          <Image
            source={require('../../assets/images/users/user1.png')}
            style={styles.userImageStyle}
          />
        </ImageBackground>
        <Text
          style={{
            marginTop: Sizes.fixPadding + 5.0,
            textAlign: 'center',
            ...Fonts.blackColor18SemiBold,
          }}>
          BOCC - 1710
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
          My Qr Code
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
  downloadButtonStyle: {
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
  qrCodeImageStyle: {
    width: 200.0,
    height: 200.0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImageStyle: {
    width: 85.0,
    height: 85.0,
    borderRadius: 42.5,
    borderColor: Colors.whiteColor,
    borderWidth: 3.0,
  },
});

export default QrCodeScreen;
