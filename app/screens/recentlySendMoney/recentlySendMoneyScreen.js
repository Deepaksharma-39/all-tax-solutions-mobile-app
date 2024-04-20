import React, {createRef, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const usersList = [
  {
    id: '1',
    userImage: require('../../assets/images/users/user3.png'),
    userName: 'Krishna Shah',
    transactionDate: '17/10/2020',
    amount: 50.0,
    isReceive: true,
  },
];

const RecentlySendMoneyScreen = ({navigation}) => {
  const [search, setSearch] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {mobileNumberOrNameField()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 2.0}}>
          {users()}
        </ScrollView>
        {selectContactButton()}
      </View>
    </View>
  );

  function selectContactButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('SelectContact')}
        style={styles.selectContactButtonWrapStyle}>
        <MaterialIcons name="add" color={Colors.whiteColor} size={25} />
      </TouchableOpacity>
    );
  }

  function users() {
    return usersList.map(item => (
      <View key={`${item.id}`}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            navigation.push('SendMoney', {
              contactName: item.userName,
              contactNumber: '9925789632',
            })
          }
          style={styles.userInfoWrapStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={item.userImage}
              style={{width: 60.0, height: 60.0, borderRadius: 30.0}}
            />
            <View style={{marginLeft: Sizes.fixPadding, flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  numberOfLines={1}
                  style={{flex: 1, ...Fonts.blackColor16SemiBold}}>
                  {item.userName}
                </Text>
                <Text style={{...Fonts.grayColor12SemiBold}}>
                  {item.transactionDate}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...Fonts.grayColor14SemiBold}}>
                  {`$`}
                  {item.amount.toFixed(2)} -{' '}
                  {item.isReceive ? `Received` : `Send`} Instantly
                </Text>
                <View
                  style={{
                    width: 12.0,
                    height: 12.0,
                    borderRadius: 6.0,
                    backgroundColor: item.isReceive
                      ? Colors.greenColor
                      : Colors.redColor,
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    ));
  }

  function mobileNumberOrNameField() {
    const textInputRef = createRef();
    return (
      <View style={styles.mobileNumberOrNameFieldWrapStyle}>
        <MaterialIcons
          name="search"
          color={Colors.grayColor}
          size={15}
          onPress={() => textInputRef.current.focus()}
        />
        <TextInput
          ref={textInputRef}
          value={search}
          onChangeText={text => setSearch(text)}
          placeholder="Enter a mobile number or name"
          placeholderTextColor={Colors.grayColor}
          style={styles.textField}
          selectionColor={Colors.primaryColor}
        />
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
          Send Money
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
  textField: {
    flex: 1,
    height: 20.0,
    marginLeft: Sizes.fixPadding,
    ...Fonts.blackColor14SemiBold,
    padding: 0,
  },
  mobileNumberOrNameFieldWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    margin: Sizes.fixPadding * 2.0,
    ...commonStyles.boxShadow,
  },
  userInfoWrapStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
  selectContactButtonWrapStyle: {
    backgroundColor: Colors.primaryColor,
    width: 60.0,
    height: 60.0,
    borderRadius: 30.0,
    position: 'absolute',
    right: 20.0,
    bottom: 20.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    ...commonStyles.buttonShadow
  },
});

export default RecentlySendMoneyScreen;
