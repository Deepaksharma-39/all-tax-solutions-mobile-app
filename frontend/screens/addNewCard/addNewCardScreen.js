import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import { CreditCardInput } from 'rn-card-input';

const AddNewCardScreen = ({ navigation }) => {
  const [cardNumberStatus, setcardNumberStatus] = useState('invalid');
  const [cardExpiryStatus, setcardExpiryStatus] = useState('invalid');
  const [cardCvcStatus, setcardCvcStatus] = useState('invalid');
  const [cardHolderStatus, setcardHolderStatus] = useState('invalid');

  const _onChange = formData => {
    setcardNumberStatus(formData.values.number);
    setcardExpiryStatus(formData.values.expiry);
    setcardCvcStatus(formData.values.cvc);
    setcardHolderStatus(formData.values.name);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}>
          {cardDetail()}
          {addButton()}
        </ScrollView>
      </View>
    </View>
  );

  function addButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.pop();
        }}
        style={styles.addButtonStyle}>
        <Text style={{ ...Fonts.whiteColor22Bold }}>Add</Text>
      </TouchableOpacity>
    );
  }

  function cardDetail() {
    return (
      <CreditCardInput
        requiresName
        requiresCVC
        labelStyle={{ ...Fonts.blackColor16SemiBold }}
        inputStyle={styles.cardInputFieldStyle}
        inputContainerStyle={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        cardFontFamily={'NunitoSans_SemiBold'}
        cardScale={1.13}
        validColor={'black'}
        invalidColor={'red'}
        placeholderColor={Colors.grayColor}
        onChange={_onChange}
        cardImageFront={require('../../assets/images/card_bg.png')}
        cardImageBack={require('../../assets/images/card_bg.png')}
      />
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
          Add New Card
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
  cardInputFieldStyle: {
    ...Fonts.blackColor16Medium,
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    paddingHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    height: 50.0,
    marginTop: Sizes.fixPadding - 2.0,
    borderColor: '#ececec',
    borderWidth: 1.0,
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
    marginVertical: Sizes.fixPadding * 2.0,
    ...commonStyles.buttonShadow,
  },
});

export default AddNewCardScreen;
