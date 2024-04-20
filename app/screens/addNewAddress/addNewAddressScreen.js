import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const addressTypesList = [
  {
    id: '1',
    type: 'Home',
    icon: require('../../assets/images/icons/home_address.png'),
  },
  {
    id: '2',
    type: 'Office',
    icon: require('../../assets/images/icons/office_address.png'),
  },
  {
    id: '3',
    type: 'Other',
    icon: require('../../assets/images/icons/other_address.png'),
  },
];

const AddNewAddressScreen = ({navigation}) => {
  const [state, setState] = useState({
    deliveryTo: null,
    mobileNumber: null,
    pincode: null,
    houseNoAndBuilding: null,
    streetName: null,
    selectedAddressTypeId: addressTypesList[0].id,
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {
    deliveryTo,
    mobileNumber,
    pincode,
    houseNoAndBuilding,
    streetName,
    selectedAddressTypeId,
  } = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {deliveryToInfo()}
              {mobileNumberInfo()}
              {pincodeInfo()}
              {houseNumberAndBuildingInfo()}
              {streetNameInfo()}
              {addressTypeOptions()}
              {addButton()}
            </>
          }
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );

  function addButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.pop()}
        style={styles.addButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Add</Text>
      </TouchableOpacity>
    );
  }

  function addressTypeOptions() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => updateState({selectedAddressTypeId: item.id})}
        style={{
          ...styles.addressTypeOptionsWrapStyle,
          backgroundColor:
            selectedAddressTypeId == item.id
              ? Colors.secondaryColor
              : Colors.whiteColor,
          borderColor:
            selectedAddressTypeId == item.id
              ? Colors.secondaryColor
              : Colors.grayColor,
        }}>
        <Image
          source={item.icon}
          style={{
            width: 25.0,
            height: 25.0,
            resizeMode: 'contain',
            marginRight: Sizes.fixPadding,
          }}
        />
        <Text
          style={
            selectedAddressTypeId == item.id
              ? {...Fonts.whiteColor16SemiBold}
              : {...Fonts.blackColor16SemiBold}
          }>
          {item.type}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18SemiBold,
          }}>
          Address Type
        </Text>
        <View style={{marginHorizontal: Sizes.fixPadding + 5.0}}>
          <FlatList
            data={addressTypesList}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            numColumns={3}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }

  function streetNameInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor18SemiBold}}>Street Name</Text>
        <TextInput
          value={streetName}
          onChangeText={text => updateState({streetName: text})}
          placeholder="e.g. Back Street"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function houseNumberAndBuildingInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor18SemiBold}}>
          House Number and Building
        </Text>
        <TextInput
          value={houseNoAndBuilding}
          onChangeText={text => updateState({houseNoAndBuilding: text})}
          placeholder="e.g. Oberoi Heights"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function pincodeInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor18SemiBold}}>Pincode</Text>
        <TextInput
          value={pincode}
          onChangeText={text => updateState({pincode: text})}
          placeholder="e.g. 123654"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="numeric"
        />
      </View>
    );
  }

  function mobileNumberInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor18SemiBold}}>Mobile Number</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={text => updateState({mobileNumber: text})}
          placeholder="e.g. (+91) 1236547890"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="numeric"
        />
      </View>
    );
  }

  function deliveryToInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor18SemiBold}}>Deliver To</Text>
        <TextInput
          value={deliveryTo}
          onChangeText={text => updateState({deliveryTo: text})}
          placeholder="e.g. Samantha John"
          placeholderTextColor={Colors.grayColor}
          style={styles.textFieldWrapStyle}
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
          Add New Address
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
  textFieldWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    ...commonStyles.boxShadow,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    height: 50.0,
    marginTop: Sizes.fixPadding - 5.0,
    ...Fonts.blackColor16Regular,
  },
  addressTypeOptionsWrapStyle: {
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
    marginHorizontal: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonStyle: {
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
});

export default AddNewAddressScreen;
