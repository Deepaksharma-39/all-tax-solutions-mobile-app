import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import {Colors, Fonts, Sizes, screenHeight} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const socialMediaOptions = [
  {
    optionImage: require('../../assets/images/social_media/insta.png'),
    optionsName: 'Instagram',
  },
  {
    optionImage: require('../../assets/images/social_media/snap.png'),
    optionsName: 'Snapchat',
  },
  {
    optionImage: require('../../assets/images/social_media/gmail.png'),
    optionsName: 'Gmail',
  },
  {
    optionImage: require('../../assets/images/social_media/twitter.png'),
    optionsName: 'Twitter',
  },
  {
    optionImage: require('../../assets/images/social_media/messages.png'),
    optionsName: 'Messages',
  },
  {
    optionImage: require('../../assets/images/social_media/linkedin.png'),
    optionsName: 'Linkedin',
  },
];

const InviteFriendsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar color={Colors.secondaryColor} />
      <View style={{flex: 1, backgroundColor: Colors.secondaryColor}}>
        <ImageBackground
          source={require('../../assets/images/bg2.png')}
          style={styles.bgImage}>
          {header()}
          {inviteFriendInfo()}
          {inviteOptions()}
        </ImageBackground>
      </View>
    </View>
  );

  function inviteOptions() {
    return (
      <View style={styles.inviteOptionsInfoWrapStyle}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 2.0,
            textAlign: 'center',
            ...Fonts.blackColor20Bold,
          }}>
          Invite
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: Sizes.fixPadding * 2.0}}>
          {socialMediaOptions.map((item, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                marginRight: Sizes.fixPadding * 2.0,
              }}>
              <Image
                source={item.optionImage}
                style={{width: 35.0, height: 35.0, resizeMode: 'contain'}}
              />
              <Text numberOfLines={1} style={{...Fonts.blackColor12Regular}}>
                {item.optionsName}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  function inviteFriendInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/invite_friends.png')}
          style={{
            height: screenHeight / 2.5,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            textAlign: 'center',
            ...Fonts.whiteColor18Bold,
          }}>
          Invite Your Friends and Earn Bonus Amount in Wallet
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            textAlign: 'center',
            ...Fonts.whiteColor14Regular,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
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
          color={Colors.whiteColor}
          onPress={() => navigation.pop()}
        />
        <Text style={{marginLeft: Sizes.fixPadding, ...Fonts.whiteColor20Bold}}>
          Invite Now
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: screenHeight / 2.5,
    justifyContent: 'space-between',
    flex: 1,
  },
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  inviteOptionsInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding * 2.0,
  },
});

export default InviteFriendsScreen;
