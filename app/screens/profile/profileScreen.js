import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Modal
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';



const ProfileScreen = ({ navigation,route  }) => {
  const [showLogoutDialog, setshowLogoutDialog] = useState(false);

  const {userData} = route.params;

  
  
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}>
          {userDetail()}
          {divider()}
          {/* {profileOptions({
            optionIcon: require('../../assets/images/icons/scan.png'),
            option: 'My QR Code',
            navigateTo: 'QrCode',
          })}
          {profileOptions({
            optionIcon: require('../../assets/images/icons/heart.png'),
            option: 'Favorites',
            navigateTo: 'Favorites',
          })}
          {profileOptions({
            optionIcon: require('../../assets/images/icons/wallet.png'),
            option: 'Wallet',
            navigateTo: 'Wallet',
          })}
          {profileOptions({
            optionIcon: require('../../assets/images/icons/notification.png'),
            option: 'Notifications',
            navigateTo: 'Notifications',
          })}
          {profileOptions({
            optionIcon: require('../../assets/images/icons/help_line.png'),
            option: 'Help',
            navigateTo: 'Help',
          })}
          {profileOptions({
            optionIcon: require('../../assets/images/icons/list.png'),
            option: 'Terms and Conditions',
            navigateTo: 'TermsAndConditions',
          })} */}
          {logoutOption()}
        </ScrollView>
        {logoutDialog()}
      </View>
    </View>
  );

  function logoutDialog() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutDialog}
        onRequestClose={() => {
          setshowLogoutDialog(false)
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setshowLogoutDialog(false)
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={styles.dialogContainerStyle}
            >
              <View>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor18Bold }}>
                  Sure you want to logout?
                </Text>
                <View
                  style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setshowLogoutDialog(false)}
                    style={styles.cancelButtonStyle}>
                    <Text style={{ ...Fonts.primaryColor22Bold }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setshowLogoutDialog(false);
                      navigation.push('LoginRegister');
                    }}
                    style={styles.logoutButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor22Bold }}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function logoutOption() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setshowLogoutDialog(true)}
        style={styles.profileOptionsWrapStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/icons/logout.png')}
            style={{ width: 22.0, height: 22.0, resizeMode: 'contain' }}
          />
          <Text
            style={{
              marginLeft: Sizes.fixPadding + 5.0,
              ...Fonts.secondaryColor16SemiBold,
            }}>
            Logout
          </Text>
        </View>
        <MaterialIcons
          name="arrow-forward-ios"
          color={Colors.secondaryColor}
          size={17}
        />
      </TouchableOpacity>
    );
  }

  function profileOptions({ optionIcon, option, navigateTo }) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push(navigateTo)}
        style={styles.profileOptionsWrapStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={optionIcon}
            style={{ width: 22.0, height: 22.0, resizeMode: 'contain' }}
          />
          <Text
            style={{
              marginLeft: Sizes.fixPadding + 5.0,
              ...Fonts.blackColor16SemiBold,
            }}>
            {option}
          </Text>
        </View>
        <MaterialIcons
          name="arrow-forward-ios"
          color={Colors.blackColor}
          size={17}
        />
      </TouchableOpacity>
    );
  }

  function divider() {
    return <View style={styles.dividerStyle} />;
  }



  function userDetail() {
    return (
      <View style={styles.userDetailWrapStyle}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/users/user.png')}
            style={{ width: 65.0, height: 65.0, borderRadius: 32.5 }}
          />
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor18SemiBold }}>{userData.fullname}</Text>
            <Text style={{ ...Fonts.grayColor16Regular }}>+91 {userData.mobile}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.push('EditProfile', { id: 'photo',userData:userData })}>
          <Image
            source={require('../../assets/images/icons/edit.png')}
            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor20Bold }}>Profile</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    ...commonStyles.boxShadow,
  },
  dividerStyle: {
    height: 1.0,
    backgroundColor: Colors.grayColor,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  userDetailWrapStyle: {
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileOptionsWrapStyle: {
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding,
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    marginLeft: Sizes.fixPadding,
    flex: 1,
    ...commonStyles.buttonShadow,
  },
  cancelButtonStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: Sizes.fixPadding,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.5,
    ...commonStyles.boxShadow,
  },
  dialogContainerStyle: {
    padding: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    width: '80%',
    alignSelf: 'center'
  },
});

export default ProfileScreen;
