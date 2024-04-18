import React from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const offersList = [
  {
    id: '1',
    offerGiverLogo: require('../../assets/images/offers/d2h.png'),
    offerGiver: 'D2H',
    offer: 'Get up to $10 Cashback On First D2H  Recharge',
    claimed: '1.4m',
    endsDays: 4,
  },
  {
    id: '2',
    offerGiverLogo: require('../../assets/images/offers/dream11.png'),
    offerGiver: 'Dream 11',
    offer: 'Get up to $19 Cashback On First 1 Transaction',
    offerDetail: '(mvin transaction amount: Rs.15)',
    claimed: '1.4m',
    endsDays: 2,
  },
  {
    id: '3',
    offerGiverLogo: require('../../assets/images/offers/flipkart.png'),
    offerGiver: 'Flipkart',
    offer: 'Get up to 10% Cashback On Payments Via Digital Payment',
    claimed: '1.2m',
    endsDays: 2,
  },
  {
    id: '4',
    offerGiverLogo: require('../../assets/images/offers/zomato.png'),
    offerGiver: 'Zomato',
    offer: 'Flat 50% Off On Your First Order On Zomato',
    claimed: '1.2m',
    endsDays: 2,
  },
  {
    id: '5',
    offerGiverLogo: require('../../assets/images/offers/jio.png'),
    offerGiver: 'Jio',
    offer: 'Get up to $10 Cashback On Jio Prepaid Recharge',
    offerDetail: '(Min recharge amount Rs.300)',
    claimed: '1.2m',
    endsDays: 2,
  },
  {
    id: '6',
    offerGiverLogo: require('../../assets/images/offers/d2h.png'),
    offerGiver: 'D2H',
    offer: 'Get up to $14 Cashback On First D2H  Recharge',
    claimed: '1.4m',
    endsDays: 4,
  },
  {
    id: '7',
    offerGiverLogo: require('../../assets/images/offers/dream11.png'),
    offerGiver: 'Dream 11',
    offer: 'Get up to $19 Cashback On First 1 Transaction',
    offerDetail: '(mvin transaction amount: Rs.15)',
    claimed: '1.4m',
    endsDays: 2,
  },
  {
    id: '8',
    offerGiverLogo: require('../../assets/images/offers/flipkart.png'),
    offerGiver: 'Flipkart',
    offer: 'Get up to 10% Cashback On Payments Via Digital Payment',
    claimed: '1.2m',
    endsDays: 2,
  },
  {
    id: '9',
    offerGiverLogo: require('../../assets/images/offers/zomato.png'),
    offerGiver: 'Zomato',
    offer: 'Flat 50% Off On Your First Order On Zomato',
    claimed: '1.2m',
    endsDays: 2,
  },
];

const OffersScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {offers()}
      </View>
    </View>
  );

  function offers() {
    const renderItem = ({item}) => (
      <View style={styles.offerWrapStyle}>
        <Image
          source={item.offerGiverLogo}
          style={{width: 50.0, height: 50.0, borderRadius: 25.0}}
        />
        <View style={{marginLeft: Sizes.fixPadding, flex: 1}}>
          <Text style={{...Fonts.grayColor14SemiBold}}>{item.offerGiver}</Text>
          <Text style={{...Fonts.blackColor16SemiBold}}>
            {item.offer}{' '}
            <Text style={{...Fonts.grayColor12Regular}}>
              {item.offerDetail}
            </Text>
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/icons/profile.png')}
              style={{
                width: 12.0,
                height: 12.0,
                resizeMode: 'contain',
              }}
              tintColor={Colors.grayColor}
            />
            <Text
              style={{
                marginLeft: Sizes.fixPadding,
                ...Fonts.grayColor14Regular,
              }}>
              {item.claimed} claimed • Ends in {item.endsDays} days
            </Text>
          </View>
        </View>
      </View>
    );
    return (
      <FlatList
        data={offersList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: Sizes.fixPadding * 2.0}}
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
        <Text style={{marginLeft: Sizes.fixPadding, ...Fonts.blackColor20Bold}}>
          Offers
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
  offerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    borderColor: '#ececec',
    borderWidth: 1.0,
  },
});

export default OffersScreen;
