import React, { createRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const contactsList = [
  {
    id: '1',
    contactName: 'Amisha Patel',
    contactNumber: '9925789632',
    memberOfApp: true,
    bgColor: '#E57373',
  },
  {
    id: '2',
    contactName: 'Aesha Gupta',
    contactNumber: '8456987123',
    memberOfApp: true,
    bgColor: '#F06292',
  },
  {
    id: '3',
    contactName: 'AKii Patel',
    contactNumber: '7698456321',
    bgColor: '#E57373',
  },
  {
    id: '4',
    contactName: 'Aelisha Mehta',
    contactNumber: '9258963148',
    memberOfApp: true,
    bgColor: '#BA68C8',
  },
  {
    id: '5',
    contactName: 'Beena Shah',
    contactNumber: '9925712365',
    memberOfApp: true,
    bgColor: '#9575CD',
  },
  {
    id: '6',
    contactName: 'Brijal Mehta',
    contactNumber: '8456987123',
    bgColor: '#F06292',
  },
  {
    id: '7',
    contactName: 'Benafsha Zariwala',
    contactNumber: '7698456321',
    bgColor: '#7986CB',
  },
  {
    id: '8',
    contactName: 'Bipin Patel',
    contactNumber: '9258963148',
    bgColor: '#64B5F6',
  },
  {
    id: '9',
    contactName: 'Charmi Patel',
    contactNumber: '9925712365',
    memberOfApp: true,
    bgColor: '#4DD0E1',
  },
  {
    id: '10',
    contactName: 'Diya Mehta',
    contactNumber: '8456987123',
    bgColor: '#4DB6AC',
  },
  {
    id: '11',
    contactName: 'Disha Sharma',
    contactNumber: '7698456321',
    bgColor: '#81C784',
  },
  {
    id: '12',
    contactName: 'Dolly John',
    contactNumber: '9258963148',
    bgColor: '#A1887F',
  },
  {
    id: '13',
    contactName: 'Dipali Sharma',
    contactNumber: '7698456321',
    bgColor: '#3D74B6',
  },
  {
    id: '14',
    contactName: 'Dolly John',
    contactNumber: '9258963148',
    bgColor: '#A1887F',
  },
  {
    id: '15',
    contactName: 'Dipali Sharma',
    contactNumber: '7698456321',
    bgColor: '#3D74B6',
  },
];

const SelectContactScreen = ({ navigation }) => {
  const [search, setSearch] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {mobileNumberOrNameField()}
              {contacts()}
            </>
          }
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        />
      </View>
    </View>
  );

  function contacts() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.push('SendMoney', {
            contactName: item.contactName,
            contactNumber: item.contactNumber,
          })
        }
        style={styles.contactsWrapStyle}>
        <View
          style={{
            backgroundColor: item.bgColor,
            ...styles.contactNameShortWrapStyle,
          }}>
          <Text style={{ ...Fonts.whiteColor18Bold }}>
            {item.contactName.charAt(0)}
            {item.contactName
              .substr(item.contactName.indexOf(' ') + 1)
              .charAt(0)}
          </Text>
          {item.memberOfApp ? (
            <View style={styles.appLogoWrapStyle}>
              <Image
                source={require('../../assets/images/logo2.png')}
                style={{
                  width: 12.0,
                  height: 12.0,
                }}
                resizeMode="contain"
              />
            </View>
          ) : null}
        </View>
        <View style={{ marginLeft: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            {item.contactName}
          </Text>
          <Text style={{ ...Fonts.grayColor14SemiBold }}>
            {item.contactNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        ListHeaderComponent={newMobileNumberInfo()}
        data={contactsList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    );
  }

  function newMobileNumberInfo() {
    return (
      <View style={styles.newMobileNumberInfoWrapStyle}>
        <View style={styles.newMobileNumberIconWrapStyle}>
          <Image
            source={require('../../assets/images/icons/apps.png')}
            style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
          />
        </View>
        <Text
          style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor16Bold }}>
          New Mobile Number
        </Text>
      </View>
    );
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
          style={styles.textFieldStyle}
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
        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor20Bold }}>
          Select Contact
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
  textFieldStyle: {
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
  newMobileNumberInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newMobileNumberIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appLogoWrapStyle: {
    position: 'absolute',
    right: -3.0,
    bottom: -3.0,
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2.0,
  },
  contactNameShortWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactsWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
  },
});

export default SelectContactScreen;
