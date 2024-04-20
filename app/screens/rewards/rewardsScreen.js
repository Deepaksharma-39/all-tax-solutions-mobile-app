import React from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  screenWidth,
  commonStyles,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const rewardsList = [
  {
    id: '1',
    category: 'other',
    description: 'Available on 16 October at 10:00',
  },
  {
    id: '2',
    category: 'offer',
    offerFromImage: require('../../assets/images/rewards/ajio.png'),
    offer: `$5 off on\nAJIO`,
    offerCode: 'GP1-5GHA-55',
  },
  {
    id: '3',
    category: 'offer',
    offerFromImage: require('../../assets/images/rewards/coolwinks.png'),
    offer: `Rs.450 off on\nCooolwinks`,
    offerCode: 'DUGTY65894',
  },
  {
    id: '4',
    category: 'cashback',
    description: `You’ve won\n$2`,
  },
  {
    id: '5',
    category: 'cashback',
    description: `Cashback\n$10`,
  },
  {
    id: '6',
    category: 'other',
    description: 'Unlock by making your 1st DTH payment before October 16',
  },
  {
    id: '7',
    category: 'offer',
    offerFromImage: require('../../assets/images/rewards/flipkart.png'),
    offer: `10% off on\nFlipkart`,
    offerCode: 'DUGTY65894',
  },
  {
    id: '8',
    category: 'cashback',
    description: `Cashback\n$10`,
  },
  {
    id: '9',
    category: 'cashback',
    description: `Cashback\n$5`,
  },
  {
    id: '10',
    category: 'other',
    description: 'Unlock by making your 1st DTH payment before October 16',
  },
];

const RewardsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {rewards()}
      </View>
    </View>
  );

  function rewards() {
    const renderItem = ({item}) => (
      <View style={styles.rewardsWrapStyle}>
        {item.category == 'other' ? (
          <View
            style={{
              backgroundColor: Colors.secondaryColor,
              borderRadius: Sizes.fixPadding - 5.0,
            }}>
            <ImageBackground
              source={require('../../assets/images/rewards/card.png')}
              style={{width: '100%', height: 170.0}}
              borderRadius={Sizes.fixPadding - 5.0}>
              <View style={styles.otherCategoryDescriptionWrapStyle}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    ...Fonts.blackColor14SemiBold,
                  }}>
                  {item.description}
                </Text>
              </View>
            </ImageBackground>
          </View>
        ) : item.category == 'offer' ? (
          <View style={styles.offerAndCashBackInfoWrapStyle}>
            <Image
              source={item.offerFromImage}
              style={{width: '100%', height: 27.0, resizeMode: 'contain'}}
            />
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: Sizes.fixPadding - 5.0,
                  ...Fonts.blackColor14SemiBold,
                }}>
                {item.offer}
              </Text>
              <View style={styles.offerCodeWrapStyle}>
                <Text style={{...Fonts.blackColor14SemiBold}}>
                  {item.offerCode}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.offerAndCashBackInfoWrapStyle}>
            <Image
              source={require('../../assets/images/rewards/gift.png')}
              style={{height: 100, resizeMode: 'contain', width: '100%'}}
            />
            <Text
              numberOfLines={2}
              style={{textAlign: 'center', ...Fonts.blackColor14SemiBold}}>
              {item.description}
            </Text>
          </View>
        )}
      </View>
    );
    return (
      <FlatList
        data={rewardsList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Sizes.fixPadding,
          paddingTop: Sizes.fixPadding * 2.0,
        }}
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
          Rewards
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
  rewardsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    ...commonStyles.boxShadow,
    height: 170.0,
    flex: 1,
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding,
    maxWidth: screenWidth / 2.0 - 30.0,
    borderColor: '#ececec',
    borderWidth: 1.0,
  },
  offerCodeWrapStyle: {
    borderColor: Colors.grayColor,
    borderRadius: Sizes.fixPadding - 5.0,
    borderStyle: 'dashed',
    borderWidth: 1.0,
    padding: Sizes.fixPadding,
  },
  offerAndCashBackInfoWrapStyle: {
    paddingVertical: Sizes.fixPadding * 2.0,
    height: 170.0,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  otherCategoryDescriptionWrapStyle: {
    position: 'absolute',
    left: 0.0,
    right: 0.0,
    bottom: 40.0,
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding - 5.0,
  },
});

export default RewardsScreen;
