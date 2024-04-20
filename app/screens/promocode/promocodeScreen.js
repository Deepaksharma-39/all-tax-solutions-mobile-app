import React, {useState, createRef} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const offersList = [
  {
    id: '1',
    offerCode: 'HYTFR123',
    offerDescription:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy',
  },
  {
    id: '2',
    offerCode: 'TSRTY589',
    offerDescription:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy',
  },
  {
    id: '3',
    offerCode: 'OIYTR147',
    offerDescription:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy',
  },
  {
    id: '4',
    offerCode: 'GTSDR159',
    offerDescription:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy',
  },
];

const PromocodeScreen = ({navigation, route}) => {
  const planAmount = route.params.planAmount;
  const operatorName = route.params.operatorName;

  const [promocode, setpromocode] = useState();

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {rechargeInfo()}
          {promoCodeInfo()}
          {offers()}
          {proceedToPayButton()}
        </ScrollView>
      </View>
    </View>
  );

  function proceedToPayButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('PaymentMethod')}
        style={styles.proceedToPayButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>
          Proceed to Pay {planAmount}
        </Text>
      </TouchableOpacity>
    );
  }

  function offers() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor18Bold,
          }}>
          Offers
        </Text>
        {offersList.map(item => (
          <View key={item.id} style={styles.offerWrapStyle}>
            <Text style={{...Fonts.blackColor18SemiBold}}>
              {item.offerCode}
            </Text>
            <Text style={{...Fonts.grayColor14Regular}}>
              {item.offerDescription}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  function promoCodeInfo() {
    const textInputRef = createRef();
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <TextInput
            ref={textInputRef}
            value={promocode}
            onChangeText={text => setpromocode(text)}
            placeholder="Enter Promocode"
            placeholderTextColor={Colors.grayColor}
            style={styles.textFieldStyle}
            selectionColor={Colors.primaryColor}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => textInputRef.current.focus()}
            style={styles.applyButtonStyle}>
            <Text style={{...Fonts.whiteColor20Bold}}>Apply</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: Sizes.fixPadding,
            backgroundColor: Colors.grayColor,
            height: 1.0,
          }}
        />
      </View>
    );
  }

  function rechargeInfo() {
    return (
      <View style={styles.rechargeInfoWrapStyle}>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={{...Fonts.grayColor18SemiBold}}>
            Recharge For {operatorName} Mobile
          </Text>
          <Text style={{...Fonts.secondaryColor20Bold}}>9925736985</Text>
        </View>
        <View>
          <Text style={{...Fonts.grayColor18SemiBold}}>Amount</Text>
          <Text style={{...Fonts.secondaryColor20Bold}}>{planAmount}</Text>
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
          Mobile Recharge
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textFieldStyle: {
    height: 20.0,
    padding: 0,
    flex: 1,
    ...Fonts.blackColor14SemiBold,
  },
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    ...commonStyles.boxShadow,
  },
  rechargeInfoWrapStyle: {
    margin: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  applyButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    elevation: 4.0,
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    shadowColor: Colors.primaryColor,
  },
  offerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    ...commonStyles.boxShadow,
  },
  proceedToPayButtonStyle: {
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

export default PromocodeScreen;
