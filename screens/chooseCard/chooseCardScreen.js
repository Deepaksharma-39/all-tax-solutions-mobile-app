import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const cardsList = [
  {
    id: '1',
    cardNumber: 'XXXX XXXX XXXX 1489',
    cardHolder: 'Samantha John',
  },
  {
    id: '2',
    cardNumber: 'XXXX XXXX XXXX 1489',
    cardHolder: 'Isha John',
  },
  {
    id: '3',
    cardNumber: 'XXXX XXXX XXXX 1489',
    cardHolder: 'Arvind John',
  },
];

const ChooseCardScreen = ({navigation}) => {
  const [state, setState] = useState({
    currentSelectedCardIndex: 1,
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {currentSelectedCardIndex} = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding * 2.0}}>
          {cardsImages()}
          {cards()}
          {addNewAndPayNowButton()}
        </ScrollView>
      </View>
    </View>
  );

  function addNewAndPayNowButton() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: Sizes.fixPadding * 2.0,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.push('AddNewCard')}
          style={styles.addNewButtonStyle}>
          <Text style={{...Fonts.primaryColor22Bold}}>Add New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.push('TransactionSuccessful')}
          style={styles.payNowButtonStyle}>
          <Text style={{...Fonts.whiteColor22Bold}}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function cards() {
    return cardsList.map((item, index) => (
      <View key={`${item.id}`}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => updateState({currentSelectedCardIndex: index + 1})}
          style={{
            ...styles.cardInfoWrapStyle,
            backgroundColor:
              currentSelectedCardIndex == index + 1
                ? Colors.secondaryColor
                : Colors.whiteColor,
            borderColor:
              currentSelectedCardIndex == index + 1
                ? 'rgba(254, 107, 18, 0.3)'
                : Colors.grayColor,
            shadowColor:
              currentSelectedCardIndex == index + 1
                ? Colors.secondaryColor
                : Colors.lightWhiteColor,
          }}>
          <View
            style={{
              width: 12.0,
              height: 12.0,
              borderRadius: 6.0,
              backgroundColor:
                currentSelectedCardIndex == index + 1
                  ? Colors.whiteColor
                  : Colors.grayColor,
            }}></View>
          <View style={{marginLeft: Sizes.fixPadding}}>
            <Text
              style={
                currentSelectedCardIndex == index + 1
                  ? {...Fonts.whiteColor18Bold}
                  : {...Fonts.grayColor18Bold}
              }>
              {item.cardNumber}
            </Text>
            <Text
              style={
                currentSelectedCardIndex == index + 1
                  ? {...Fonts.whiteColor16SemiBold}
                  : {...Fonts.grayColor16SemiBold}
              }>
              {item.cardHolder}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ));
  }

  function cardsImages() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding * 2.0,
          paddingBottom: Sizes.fixPadding * 4.0,
        }}>
        <View
          style={{
            backgroundColor:
              currentSelectedCardIndex % 3 == 0
                ? Colors.secondaryColor
                : Colors.grayColor,
            ...styles.thirdCardImageStyle,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/card_chip.png')}
              style={{width: 35.0, height: 35.0, resizeMode: 'contain'}}
            />
            <Text
              style={{marginLeft: Sizes.fixPadding, ...Fonts.whiteColor20Bold}}>
              CREDIT CARD
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor:
              currentSelectedCardIndex % 2 == 0
                ? Colors.secondaryColor
                : Colors.primaryColor,
            ...styles.secondCardImageStyle,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/card_chip.png')}
              style={{width: 35.0, height: 35.0, resizeMode: 'contain'}}
            />
            <Text
              style={{marginLeft: Sizes.fixPadding, ...Fonts.whiteColor20Bold}}>
              CREDIT CARD
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor:
              currentSelectedCardIndex % 2 == 0
                ? Colors.primaryColor
                : currentSelectedCardIndex % 3 == 0
                ? Colors.grayColor
                : Colors.secondaryColor,
            ...styles.firstCardImageStyle,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/card_chip.png')}
                style={{width: 35.0, height: 35.0, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  marginLeft: Sizes.fixPadding,
                  ...Fonts.whiteColor20Bold,
                }}>
                CREDIT CARD
              </Text>
            </View>
            <Text style={{...Fonts.whiteColor18Bold}}>1234 4569 7892 1589</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{...Fonts.whiteColor14SemiBold}}>08/24</Text>
              <Text style={{...Fonts.whiteColor14SemiBold}}>Samantha John</Text>
            </View>
            <Image
              source={require('../../assets/images/card_logo.png')}
              style={{width: 30.0, height: 30.0, resizeMode: 'contain'}}
            />
          </View>
        </View>
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
          Choose Card
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
  payNowButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    marginLeft: Sizes.fixPadding,
    flex: 1,
    ...commonStyles.buttonShadow,
  },
  addNewButtonStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: Sizes.fixPadding,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.5,
    ...commonStyles.boxShadow,
  },
  cardInfoWrapStyle: {
    borderWidth: 1.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thirdCardImageStyle: {
    marginHorizontal: Sizes.fixPadding * 4.0,
    height: 150.0,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding,
  },
  secondCardImageStyle: {
    marginHorizontal: Sizes.fixPadding * 3.0,
    height: 150.0,
    borderRadius: Sizes.fixPadding - 5.0,
    position: 'absolute',
    top: 20.0,
    left: 0.0,
    right: 0.0,
    padding: Sizes.fixPadding,
  },
  firstCardImageStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    height: 150.0,
    borderRadius: Sizes.fixPadding - 5.0,
    position: 'absolute',
    top: 40.0,
    left: 0.0,
    right: 0.0,
    padding: Sizes.fixPadding,
    justifyContent: 'space-between',
  },
});

export default ChooseCardScreen;
