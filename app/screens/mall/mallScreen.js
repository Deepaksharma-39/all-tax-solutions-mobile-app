import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
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

const shoppingCategoriesList = [
  {
    id: '1',
    categoryImage: require('../../assets/images/shopping_category/fashion.png'),
    categoryName: 'Fashion',
  },
  {
    id: '2',
    categoryImage: require('../../assets/images/shopping_category/electronics.png'),
    categoryName: 'Electronics',
  },
  {
    id: '3',
    categoryImage: require('../../assets/images/shopping_category/phones.png'),
    categoryName: 'Phones',
  },
  {
    id: '4',
    categoryImage: require('../../assets/images/shopping_category/devices.png'),
    categoryName: 'Devices',
  },
  {
    id: '5',
    categoryImage: require('../../assets/images/shopping_category/beauty.png'),
    categoryName: 'Beauty',
  },
  {
    id: '6',
    categoryImage: require('../../assets/images/shopping_category/home_decor.png'),
    categoryName: 'Home Decor',
  },
  {
    id: '7',
    categoryImage: require('../../assets/images/shopping_category/toys_games.png'),
    categoryName: 'Toys - Games',
  },
  {
    id: '8',
    categoryImage: require('../../assets/images/shopping_category/baby_care.png'),
    categoryName: 'Baby Care Products',
  },
];

const shoppingDealsList = [
  {
    id: '1',
    shoppingDealImage: require('../../assets/images/shopping_deals/accessories.png'),
    shoppingDeals: 'Accessories Deals',
    offer: 'Up to 25% off',
  },
  {
    id: '2',
    shoppingDealImage: require('../../assets/images/shopping_deals/fashion.png'),
    shoppingDeals: 'Fashion Deals',
    offer: 'Up to 20% off',
  },
  {
    id: '3',
    shoppingDealImage: require('../../assets/images/shopping_deals/hair_care.png'),
    shoppingDeals: 'Hair Care Deals',
    offer: 'Up to 25% off',
  },
  {
    id: '4',
    shoppingDealImage: require('../../assets/images/shopping_deals/electronics_item.png'),
    shoppingDeals: 'Electronics Items De...',
    offer: 'Up to 20% off',
  },
];

const MallScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {/* {searchInfo()}
              {shoppingCategoriesInfo()}
              {banner()}
              {todaysDealsInfo()} */}
              {comingSoon()}
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );


  function comingSoon  ()  {
    return (
      <View
        style={{ width: "100%", }}
      >
        <Image
          source={require('../../assets/images/comingsoon.jpg')}
          style={{width:"100%",height:700}}
        />
      </View>
    )
  }

  function todaysDealsInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('ShopByCategories')}
        style={styles.shoppingDealsInfoWrapStyle}>
        <Image
          source={item.shoppingDealImage}
          style={styles.shoppingDealImageStyle}
        />
        <View
          style={{
            paddingHorizontal: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding - 5.0,
          }}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, ...Fonts.blackColor16SemiBold }}>
            {item.shoppingDeals}
          </Text>
          <Text style={{ ...Fonts.secondaryColor14Bold }}>{item.offer}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View>
        <Text
          style={{
            marginBottom: Sizes.fixPadding * 2.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18Bold,
          }}>
          Today’s Deals
        </Text>
        <View style={{ marginHorizontal: Sizes.fixPadding }}>
          <FlatList
            data={shoppingDealsList}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }

  function banner() {
    return (
      <View style={styles.bannerWrapStyle}>
        <Image
          source={require('../../assets/images/banner_image2.png')}
          style={styles.bannerImageStyle}
        />
        <View>
          <Text style={{ ...Fonts.whiteColor16Bold }}>
            All New Summer Collection
          </Text>
          <Text style={{ ...Fonts.whiteColor14SemiBold }}>Get 25% Off</Text>
        </View>
        <View style={styles.shopNowButtonStyle}>
          <Text style={{ ...Fonts.whiteColor18Bold }}>Shop Now</Text>
        </View>
      </View>
    );
  }

  function shoppingCategoriesInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('ShopByCategories')}
        style={{
          width: 60.0,
          marginRight: Sizes.fixPadding,
          alignItems: 'center',
        }}>
        <View style={styles.shoppingCategoryImageWrapStyle}>
          <Image
            source={item.categoryImage}
            style={{ width: 60.0, height: 60.0, borderRadius: 30.0 }}
          />
        </View>
        <Text style={{ ...Fonts.blackColor12SemiBold }}>{item.categoryName}</Text>
      </TouchableOpacity>
    );
    return (
      <View>
        <Text
          style={{
            marginBottom: Sizes.fixPadding + 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18Bold,
          }}>
          Shop by Categories
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={shoppingCategoriesList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function searchInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.push('Search');
        }}
        style={styles.searchInfoWrapStyle}>
        <MaterialIcons name="search" color={Colors.grayColor} size={15} />
        <Text
          style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor14SemiBold }}>
          Search here...
        </Text>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor20Bold }}>Mall</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          // onPress={() => navigation.push('Cart')}
          >
          <Image
            source={require('../../assets/images/icons/shopping_basket.png')}
            style={{ width: 17.0, height: 17.0, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    ...commonStyles.boxShadow,
  },
  searchInfoWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    margin: Sizes.fixPadding * 2.0,
    ...commonStyles.boxShadow,
  },
  bannerWrapStyle: {
    marginVertical: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.secondaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: 'space-between',
    padding: Sizes.fixPadding,
    overflow: 'hidden',
  },
  shopNowButtonStyle: {
    marginTop: Sizes.fixPadding * 4.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    alignSelf: 'flex-start',
  },
  bannerImageStyle: {
    position: 'absolute',
    bottom: 0.0,
    right: 0.0,
    width: 180.0,
    height: 130.0,
    overflow: 'hidden',
  },
  shoppingCategoryImageWrapStyle: {
    width: 60.0,
    height: 60.0,
    borderRadius: 30.0,
    elevation: 3.0,
  },
  shoppingDealsInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding,
    flex: 1,
    maxWidth: screenWidth / 2.0 - 30.0,
    ...commonStyles.boxShadow,
    borderColor: '#ececec',
    borderWidth: 1.0,
  },
  shoppingDealImageStyle: {
    height: 177.0,
    width: '100%',
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
  },
});

export default MallScreen;
