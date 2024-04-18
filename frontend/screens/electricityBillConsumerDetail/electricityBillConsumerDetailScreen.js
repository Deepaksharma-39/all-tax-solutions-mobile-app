import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const ElectricityBillConsumerDetailScreen = ({navigation, route}) => {
  const item = route.params.item;

  const [consumerId, setconsumerId] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {consumerIdInfo()}
        </ScrollView>
        {confirmButton()}
      </View>
    </View>
  );

  function confirmButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('ElectricityBillDetail', {item: item})}
        style={styles.confirmButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Confirm</Text>
      </TouchableOpacity>
    );
  }

  function consumerIdInfo() {
    return (
      <View style={{flex: 1, margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor14SemiBold}}>Enter Consumer ID</Text>
        <TextInput
          value={consumerId}
          onChangeText={text => setconsumerId(text)}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="numeric"
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
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor20Bold,
          }}>
          {item.providerName}
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
  confirmButtonStyle: {
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
  textFieldStyle: {
    ...Fonts.blackColor16Bold,
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 1.0,
    padding: 0,
  },
});

export default ElectricityBillConsumerDetailScreen;
