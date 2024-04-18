import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  screenWidth,
  commonStyles,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TabView, TabBar} from 'react-native-tab-view';
import {Snackbar} from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';

const womensTopsList = [
  {
    id: '1',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '2',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '3',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
  {
    id: '4',
    productImage: require('../../assets/images/products/product10.png'),
    productName: 'Casual full sleeves black T-Shirt',
    amount: '$110',
    isFavorite: true,
  },
  {
    id: '5',
    productImage: require('../../assets/images/products/product11.png'),
    productName: 'Casual regular sleeves Tie & Dye',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '6',
    productImage: require('../../assets/images/products/product12.png'),
    productName: 'Solid women round neck green T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '7',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '8',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '9',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
  {
    id: '10',
    productImage: require('../../assets/images/products/product10.png'),
    productName: 'Casual full sleeves black T-Shirt',
    amount: '$110',
    isFavorite: true,
  },
  {
    id: '11',
    productImage: require('../../assets/images/products/product11.png'),
    productName: 'Casual regular sleeves Tie & Dye',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '12',
    productImage: require('../../assets/images/products/product12.png'),
    productName: 'Solid women round neck green T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '13',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '14',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '15',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
];

const womensSareesList = [
  {
    id: '1',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '2',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '3',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
  {
    id: '4',
    productImage: require('../../assets/images/products/product10.png'),
    productName: 'Casual full sleeves black T-Shirt',
    amount: '$110',
    isFavorite: true,
  },
  {
    id: '5',
    productImage: require('../../assets/images/products/product11.png'),
    productName: 'Casual regular sleeves Tie & Dye',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '6',
    productImage: require('../../assets/images/products/product12.png'),
    productName: 'Solid women round neck green T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '7',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '8',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '9',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
  {
    id: '10',
    productImage: require('../../assets/images/products/product10.png'),
    productName: 'Casual full sleeves black T-Shirt',
    amount: '$110',
    isFavorite: true,
  },
  {
    id: '11',
    productImage: require('../../assets/images/products/product11.png'),
    productName: 'Casual regular sleeves Tie & Dye',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '12',
    productImage: require('../../assets/images/products/product12.png'),
    productName: 'Solid women round neck green T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '13',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '14',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '15',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
];

const womensDressesList = [
  {
    id: '1',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '2',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '3',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
  {
    id: '4',
    productImage: require('../../assets/images/products/product10.png'),
    productName: 'Casual full sleeves black T-Shirt',
    amount: '$110',
    isFavorite: true,
  },
  {
    id: '5',
    productImage: require('../../assets/images/products/product11.png'),
    productName: 'Casual regular sleeves Tie & Dye',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '6',
    productImage: require('../../assets/images/products/product12.png'),
    productName: 'Solid women round neck green T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '7',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '8',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '9',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
  {
    id: '10',
    productImage: require('../../assets/images/products/product10.png'),
    productName: 'Casual full sleeves black T-Shirt',
    amount: '$110',
    isFavorite: true,
  },
  {
    id: '11',
    productImage: require('../../assets/images/products/product11.png'),
    productName: 'Casual regular sleeves Tie & Dye',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '12',
    productImage: require('../../assets/images/products/product12.png'),
    productName: 'Solid women round neck green T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '13',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '14',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '15',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
];

const womensJeansList = [
  {
    id: '1',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '2',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '3',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
  {
    id: '4',
    productImage: require('../../assets/images/products/product10.png'),
    productName: 'Casual full sleeves black T-Shirt',
    amount: '$110',
    isFavorite: true,
  },
  {
    id: '5',
    productImage: require('../../assets/images/products/product11.png'),
    productName: 'Casual regular sleeves Tie & Dye',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '6',
    productImage: require('../../assets/images/products/product12.png'),
    productName: 'Solid women round neck green T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '7',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '8',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '9',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
  {
    id: '10',
    productImage: require('../../assets/images/products/product10.png'),
    productName: 'Casual full sleeves black T-Shirt',
    amount: '$110',
    isFavorite: true,
  },
  {
    id: '11',
    productImage: require('../../assets/images/products/product11.png'),
    productName: 'Casual regular sleeves Tie & Dye',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '12',
    productImage: require('../../assets/images/products/product12.png'),
    productName: 'Solid women round neck green T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '13',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
    isFavorite: true,
  },
  {
    id: '14',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
    isFavorite: false,
  },
  {
    id: '15',
    productImage: require('../../assets/images/products/product9.png'),
    productName: 'Casual cutout solid women red T-Shirt',
    amount: '$149',
    isFavorite: false,
  },
];

const ProductsScreen = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Tops'},
    {key: 'second', title: 'Sarees'},
    {key: 'third', title: 'Dresses'},
    {key: 'forth', title: 'Jeans'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <Products navigation={navigation} listData={womensTopsList} />;
      case 'second':
        return <Products navigation={navigation} listData={womensSareesList} />;
      case 'third':
        return (
          <Products navigation={navigation} listData={womensDressesList} />
        );
      case 'forth':
        return <Products navigation={navigation} listData={womensJeansList} />;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: Colors.secondaryColor}}
              style={{backgroundColor: Colors.lightWhiteColor}}
              renderLabel={({route, focused}) => (
                <Text
                  numberOfLines={1}
                  style={
                    focused
                      ? {...Fonts.secondaryColor20SemiBold}
                      : {...Fonts.grayColor20SemiBold}
                  }>
                  {route.title}
                </Text>
              )}
            />
          )}
        />
      </View>
    </View>
  );

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
          Women’s Clothing
        </Text>
      </View>
    );
  }
};

const Products = ({navigation, listData}) => {
  const [productList, setProductList] = useState(listData);

  const [showSnackBar, setShowSnackBar] = useState(false);

  const [snackBarMsg, setSnackBarMsg] = useState(null);

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.push('ProductDetail', {item})}
      style={styles.productWrapStyle}>
      <Image
        source={item.productImage}
        style={{height: 113.0, width: '100%'}}
        resizeMode="contain"
      />
      <Text numberOfLines={2} style={{flex: 1, ...Fonts.blackColor12SemiBold}}>
        {item.productName}
      </Text>
      <View style={styles.productAmountAndFavoriteInfoWrapStyle}>
        <Text style={{...Fonts.blackColor14Bold}}>{item.amount}</Text>
        <MaterialIcons
          name={item.isFavorite ? 'favorite' : 'favorite-border'}
          color={Colors.grayColor}
          size={15}
          onPress={() => {
            setShowSnackBar(true);
            updateListItems({id: item.id});
          }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={productList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Sizes.fixPadding * 2.0,
          paddingBottom: Sizes.fixPadding,
          paddingHorizontal: Sizes.fixPadding + 5.0,
        }}
      />
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
        style={styles.snackBarStyle}>
        <Text style={{...Fonts.whiteColor14Regular}}>{snackBarMsg}</Text>
      </Snackbar>
    </View>
  );

  function updateListItems({id}) {
    const newList = productList.map(item => {
      if (item.id === id) {
        const updatedItem = {...item, isFavorite: !item.isFavorite};
        setSnackBarMsg(
          updatedItem.isFavorite
            ? `Item added to favorite`
            : `Item removed from favorite`,
        );
        return updatedItem;
      }
      return item;
    });
    setProductList(newList);
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
  },
  productWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
    maxWidth: screenWidth / 3.0 - 20.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    padding: Sizes.fixPadding - 5.0,
    ...commonStyles.boxShadow,
  },
  productAmountAndFavoriteInfoWrapStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  snackBarStyle: {
    position: 'absolute',
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    elevation: 0.0,
    backgroundColor: '#333333',
  },
});

export default ProductsScreen;
