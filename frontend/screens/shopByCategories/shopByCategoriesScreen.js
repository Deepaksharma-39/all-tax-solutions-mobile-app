import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const categoriesList = [
  {
    id: '1',
    categoryImage: require('../../assets/images/products/product1.png'),
    category: 'Men’s Clothing',
    categoryDetail:
      'Tshirts , Jeans , Shirts , Flip flops , Belts  Coats - Jackets , Sweaters - Vests , Polo shirts Rugby etc...',
  },
  {
    id: '2',
    categoryImage: require('../../assets/images/products/product2.png'),
    category: 'Women’s Clothing',
    categoryDetail:
      'Tshirts , Jeans , Shirts , Suits , Saree , Kurtis Lehengas , Nightwear , Shorts , Dresses , Casual etc...',
  },
  {
    id: '3',
    categoryImage: require('../../assets/images/products/product3.png'),
    category: 'Kids Clothing',
    categoryDetail:
      'Tshirts , Trousers , Skirts , Shorts , Denim , Nightwear , Jeans , Dresses , Polos , Trousers etc...',
  },
  {
    id: '4',
    categoryImage: require('../../assets/images/products/product4.png'),
    category: 'Footwear',
    categoryDetail: `Women’s : Ballet Flats , Flip-Flops , Sandals etc...\nMen’s : Loafers , Moccasins , Oxfords etc...`,
  },
  {
    id: '5',
    categoryImage: require('../../assets/images/products/product5.png'),
    category: 'Accessories',
    categoryDetail: `Women’s : Shawls , Socks , Caps - Hats , Ties etc...\nMen’s : Ties , Caps , Suspenders etc...`,
  },
  {
    id: '6',
    categoryImage: require('../../assets/images/products/product6.png'),
    category: 'Jewelry ',
    categoryDetail: `Crowns , Earrings , Chokers , Necklaces , Bracelet , Rings Belly chain , Brooch , Kundan etc...`,
  },
];

const ShopByCategoriesScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {categories()}
      </View>
    </View>
  );

  function categories() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('Products')}
        style={styles.categoryWrapStyle}>
        <Image
          source={item.categoryImage}
          style={{width: 66.0, height: 92.0}}
        />
        <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
          <Text style={{...Fonts.blackColor18Bold}}>{item.category}</Text>
          <Text
            numberOfLines={3}
            style={{
              marginBottom: Sizes.fixPadding - 5.0,
              ...Fonts.grayColor14Regular,
            }}>
            {item.categoryDetail}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={categoriesList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Sizes.fixPadding * 2.0,
          paddingBottom: Sizes.fixPadding,
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
          Fashion
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
  categoryWrapStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    paddingTop: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    borderColor: '#ececec',
    borderWidth: 1.0,
  },
});

export default ShopByCategoriesScreen;
