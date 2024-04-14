import React, {useCallback} from 'react';
import {
  BackHandler,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';

const TransactionSuccessfulScreen = ({navigation}) => {
  const backAction = () => {
    if (Platform.OS == 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      navigation.push('BottomTabBar');
    }
    return true;
  };

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

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {successInfo()}
        {transactionIdInfo()}
        {transactionDetail()}
        {paymentInfo()}
        {doneButton()}
      </View>
    </View>
  );

  function doneButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('BottomTabBar')}
        style={styles.doneButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Done</Text>
      </TouchableOpacity>
    );
  }

  function paymentInfo() {
    return (
      <View style={styles.transactionInfoWrapStyle}>
        <View style={{flex: 1}}>
          <Text style={{...Fonts.grayColor16Regular}}>Debited from</Text>
          <Text style={{...Fonts.blackColor16SemiBold}}>xxxxxxxx1710</Text>
          <Text style={{...Fonts.blackColor18SemiBold}}>Bank of Baroda</Text>
        </View>
        <Text style={{...Fonts.blackColor18SemiBold}}>$35.00</Text>
      </View>
    );
  }

  function transactionDetail() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding,
          ...styles.transactionInfoWrapStyle,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...Fonts.grayColor16Regular}}>Mobile Recharged</Text>
          <Text style={{...Fonts.blackColor12SemiBold}}>992578936</Text>
          <Text style={{...Fonts.blackColor18SemiBold}}>
            Jio / Uttar Pradesh East
          </Text>
        </View>
        <Text style={{...Fonts.blackColor18SemiBold}}>$35.00</Text>
      </View>
    );
  }

  function transactionIdInfo() {
    return (
      <View style={styles.transactionInfoWrapStyle}>
        <View style={{flex: 1}}>
          <Text style={{...Fonts.grayColor16Regular}}>Transaction ID</Text>
          <Text style={{...Fonts.blackColor18SemiBold}}>D12365478901478</Text>
        </View>
        <Text style={{...Fonts.primaryColor16ExtraBold}}>Copy</Text>
      </View>
    );
  }

  function successInfo() {
    return (
      <View
        style={{alignItems: 'center', marginBottom: Sizes.fixPadding + 5.0}}>
        <FontAwesome5 name="check-circle" size={85} color={Colors.greenColor} />
        <Text style={{marginTop: Sizes.fixPadding, ...Fonts.blackColor22Bold}}>
          Transaction Successful
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor18SemiBold,
          }}>
          Jun 15,2020
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  transactionInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doneButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    alignSelf: 'stretch',
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    marginVertical: Sizes.fixPadding * 4.0,
    ...commonStyles.buttonShadow,
  },
});

export default TransactionSuccessfulScreen;
