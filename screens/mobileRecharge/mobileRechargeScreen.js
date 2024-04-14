import React, {useState, createRef} from 'react';
import {
  ScrollView,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Menu} from 'react-native-material-menu';
import MyStatusBar from '../../components/myStatusBar';

const operatorsList = [
  {
    id: '1',
    operatorImage: require('../../assets/images/mobile_card/jio.png'),
    operatorName: 'Jio',
  },
  {
    id: '2',
    operatorImage: require('../../assets/images/mobile_card/aritel.png'),
    operatorName: 'aritel',
  },
  {
    id: '3',
    operatorImage: require('../../assets/images/mobile_card/vodafone.png'),
    operatorName: 'Vodafone',
  },
  {
    id: '4',
    operatorImage: require('../../assets/images/mobile_card/idea.png'),
    operatorName: 'Idea',
  },
  {
    id: '5',
    operatorImage: require('../../assets/images/mobile_card/vodafone_idea.png'),
    operatorName: 'vodafone idea',
  },
];

const rechargePlansList = [
  {
    id: '1',
    amount: '$345',
    validity: '90 days',
    data: '75 GB',
  },
  {
    id: '2',
    amount: '$145',
    validity: '30 days',
    data: '25 GB',
  },
  {
    id: '3',
    amount: '$100',
    validity: '18 days',
    data: '20 GB',
  },
  {
    id: '4',
    amount: '$75',
    validity: '10 days',
    data: '5 GB',
  },
];

const MobileRechargeScreen = ({navigation}) => {
  const [state, setState] = useState({
    currentPlanIndex: 1,
    mobileNumber: null,
    showOperatorOptions: false,
    selectedOperatorImage: operatorsList[0].operatorImage,
    selectedOperatorName: operatorsList[0].operatorName,
    showPlansOptions: false,
    selectedPlanAmout: rechargePlansList[rechargePlansList.length - 1].amount,
    promocode: null,
    instantPaymentCheckBoxCheck: false,
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {
    currentPlanIndex,
    mobileNumber,
    showOperatorOptions,
    selectedOperatorImage,
    selectedOperatorName,
    showPlansOptions,
    selectedPlanAmout,
    promocode,
    instantPaymentCheckBoxCheck,
  } = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding}}>
          {prepaidAndPostpaidOption()}
          {mobileNumberInfo()}
          {operatorInfo()}
          {amountInfo()}
          {promocodeInfo()}
          {instantPaymentInfo()}
          {proceedToRechargeButton()}
        </ScrollView>
      </View>
    </View>
  );

  function proceedToRechargeButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.push('PromoCode', {
            operatorName: selectedOperatorName,
            planAmount: selectedPlanAmout,
          })
        }
        style={styles.proceedToRechargeButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Proceed To Recharge</Text>
      </TouchableOpacity>
    );
  }

  function instantPaymentInfo() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            updateState({
              instantPaymentCheckBoxCheck: !instantPaymentCheckBoxCheck,
            })
          }
          style={{
            ...styles.checkBoxStyle,
            backgroundColor: instantPaymentCheckBoxCheck
              ? Colors.blackColor
              : Colors.whiteColor,
          }}>
          {instantPaymentCheckBoxCheck ? (
            <MaterialIcons name="check" color={Colors.whiteColor} size={15} />
          ) : null}
        </TouchableOpacity>
        <Text numberOfLines={1} style={{flex: 1, marginLeft: Sizes.fixPadding}}>
          <Text style={{...Fonts.blackColor14Regular}}>
            Instant Payment From{` `}
          </Text>
          <Text style={{...Fonts.secondaryColor16Bold}}>
            Digital Payment Wallet
          </Text>
        </Text>
      </View>
    );
  }

  function promocodeInfo() {
    return (
      <View style={styles.promocodeInfoWrapStyle}>
        <TextInput
          selectionColor={Colors.primaryColor}
          placeholder="Have Promocode?"
          placeholderTextColor={Colors.secondaryColor}
          style={{...Fonts.secondaryColor12Bold, padding: 0}}
          value={promocode}
          onChangeText={text => updateState({promocode: text})}
        />
      </View>
    );
  }

  function amountInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.grayColor16SemiBold,
          }}>
          Amount
        </Text>
        <Menu
          visible={showPlansOptions}
          style={{
            paddingTop: Sizes.fixPadding * 2.0,
            width: screenWidth - 40.0,
          }}
          anchor={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => updateState({showPlansOptions: true})}
              style={styles.selectedRechargePlanInfoWrapStyle}>
              <Text style={{...Fonts.blackColor18SemiBold}}>
                {selectedPlanAmout}
              </Text>
              <Text style={{...Fonts.secondaryColor12Bold}}>See Plans</Text>
            </TouchableOpacity>
          }
          onRequestClose={() => updateState({showPlansOptions: false})}>
          {rechargePlansList.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.6}
              onPress={() =>
                updateState({
                  selectedPlanAmout: item.amount,
                  showPlansOptions: false,
                })
              }
              style={styles.rechargePlanOptionsWrapStyle}>
              <View style={{alignItems: 'center'}}>
                <Text style={{...Fonts.grayColor16SemiBold}}>Plan</Text>
                <Text style={{...Fonts.redColor16Bold}}>{item.amount}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{...Fonts.grayColor16SemiBold}}>Validity</Text>
                <Text style={{...Fonts.blackColor16Bold}}>{item.validity}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{...Fonts.grayColor16SemiBold}}>Data</Text>
                <Text style={{...Fonts.blackColor16Bold}}>{item.data}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Menu>
      </View>
    );
  }

  function operatorInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.grayColor16SemiBold,
          }}>
          Select Operator
        </Text>
        <Menu
          visible={showOperatorOptions}
          style={{paddingTop: Sizes.fixPadding, width: screenWidth - 40.0}}
          anchor={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => updateState({showOperatorOptions: true})}
              style={styles.selectedOperatorInfoWrapStyle}>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={selectedOperatorImage}
                  style={{width: 20.0, height: 20.0, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    marginLeft: Sizes.fixPadding,
                    ...Fonts.blackColor18SemiBold,
                  }}>
                  {selectedOperatorName}
                </Text>
              </View>
              <MaterialIcons
                name="arrow-drop-down"
                color={Colors.secondaryColor}
                size={27}
              />
            </TouchableOpacity>
          }
          onRequestClose={() => updateState({showOperatorOptions: false})}>
          {operatorsList.map(item => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                updateState({
                  selectedOperatorImage: item.operatorImage,
                  selectedOperatorName: item.operatorName,
                  showOperatorOptions: false,
                });
              }}
              key={item.id}
              style={styles.operatorOptionsWrapStyle}>
              <Image
                source={item.operatorImage}
                style={{width: 20.0, height: 20.0, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  marginLeft: Sizes.fixPadding,
                  ...Fonts.blackColor18SemiBold,
                }}>
                {item.operatorName}
              </Text>
            </TouchableOpacity>
          ))}
        </Menu>
      </View>
    );
  }

  function mobileNumberInfo() {
    const textInputRef = createRef();
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16SemiBold}}>Mobile Number</Text>
        <View style={styles.mobileNumberFieldWrapStyle}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons
              name="phone-android"
              color={Colors.blackColor}
              size={18}
              onPress={() => textInputRef.current.focus()}
            />
            <TextInput
              selectionColor={Colors.primaryColor}
              ref={textInputRef}
              value={mobileNumber}
              onChangeText={text => updateState({mobileNumber: text})}
              keyboardType="numeric"
              style={styles.textFieldStyle}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => textInputRef.current.focus()}>
            <Image
              source={require('../../assets/images/icons/contact_number.png')}
              style={{width: 15.0, height: 15.0, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function prepaidAndPostpaidOption() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => updateState({currentPlanIndex: 1})}
          style={{
            marginRight: Sizes.fixPadding * 4.0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              ...styles.radioButtonStyle,
              borderColor:
                currentPlanIndex == 1
                  ? Colors.secondaryColor
                  : Colors.grayColor,
            }}>
            {currentPlanIndex == 1 ? (
              <View style={styles.radioButtonInnerCircleStyle} />
            ) : null}
          </View>
          <Text
            style={{
              marginLeft: Sizes.fixPadding,
              ...(currentPlanIndex == 1
                ? {...Fonts.blackColor18SemiBold}
                : {...Fonts.grayColor18SemiBold}),
            }}>
            Prepaid
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => updateState({currentPlanIndex: 2})}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              ...styles.radioButtonStyle,
              borderColor:
                currentPlanIndex == 2
                  ? Colors.secondaryColor
                  : Colors.grayColor,
            }}>
            {currentPlanIndex == 2 ? (
              <View style={styles.radioButtonInnerCircleStyle} />
            ) : null}
          </View>
          <Text
            style={{
              marginLeft: Sizes.fixPadding,
              ...(currentPlanIndex == 2
                ? {...Fonts.blackColor18SemiBold}
                : {...Fonts.grayColor18SemiBold}),
            }}>
            Postpaid
          </Text>
        </TouchableOpacity>
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
    marginLeft: Sizes.fixPadding,
    ...Fonts.blackColor18SemiBold,
    flex: 1,
    padding: 0,
  },
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    ...commonStyles.boxShadow,
  },
  radioButtonStyle: {
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    borderWidth: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInnerCircleStyle: {
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    backgroundColor: Colors.secondaryColor,
  },
  mobileNumberFieldWrapStyle: {
    marginTop: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
  selectedOperatorInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...commonStyles.boxShadow,
  },
  operatorOptionsWrapStyle: {
    flex: 1,
    marginHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rechargePlanOptionsWrapStyle: {
    marginBottom: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding + 5.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedRechargePlanInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...commonStyles.boxShadow,
  },
  promocodeInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 2.0,
    ...commonStyles.boxShadow,
  },
  checkBoxStyle: {
    width: 18.0,
    height: 18.0,
    borderRadius: 3.0,
    borderColor: Colors.blackColor,
    borderWidth: 2.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedToRechargeButtonStyle: {
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

export default MobileRechargeScreen;
