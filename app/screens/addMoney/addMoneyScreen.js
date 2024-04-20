import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';

const AddMoneyScreen = ({navigation}) => {
  const [amount, setamount] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {enterAmountTextField()}
        </ScrollView>
        {continueButton()}
      </View>
    </View>
  );

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('PaymentMethod')}
        style={styles.continueButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function enterAmountTextField() {
    return (
      <View
        style={{
          flex: 1,
          marginVertical: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.grayColor14SemiBold}}>
          Enter Amount to be added
        </Text>
        <TextInput
          value={amount}
          onChangeText={text => setamount(text)}
          style={styles.amountField}
          selectionColor={Colors.primaryColor}
          keyboardType="numeric"
          left={
            <TextInput.Affix text="$" textStyle={{...Fonts.blackColor16Bold}} />
          }
          theme={{colors: {primary: Colors.grayColor}}}
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
          Add Money
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
  continueButtonStyle: {
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
  amountField: {
    ...Fonts.blackColor16Bold,
    backgroundColor: 'transparent',
    height: 30.0,
    padding: 0,
  },
});

export default AddMoneyScreen;
