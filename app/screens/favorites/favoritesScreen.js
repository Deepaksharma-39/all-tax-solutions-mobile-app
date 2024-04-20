import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  TouchableHighlight,
  Image,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Snackbar} from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';

const favoritesList = [
  {
    key: '1',
    productImage: require('../../assets/images/products/product7.png'),
    productName: 'Solid women round neck white T-Shirt',
    amount: '$100',
  },
  {
    key: '2',
    productImage: require('../../assets/images/products/product8.png'),
    productName: 'Solid women round neck black T-Shirt',
    amount: '$99',
  },
  {
    key: '3',
    productImage: require('../../assets/images/products/product12.png'),
    productName: 'Solid women round neck green T-Shirt',
    amount: '$100',
  },
  {
    key: '4',
    productImage: require('../../assets/images/products/product11.png'),
    productName: 'Casual regular sleeves Tie & Dye',
    amount: '$150',
  },
];

const rowSwipeAnimatedValues = {};

Array(favoritesList.length + 1)
  .fill('')
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

const FavoritesScreen = ({navigation}) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [listData, setListData] = useState(favoritesList);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={{alignItems: 'center', flex: 1}}>
      <TouchableOpacity
        style={styles.backDeleteContinerStyle}
        onPress={() => deleteRow(rowMap, data.item.key)}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                    inputRange: [45, 46],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <MaterialIcons
            name="delete-outline"
            size={24}
            color={Colors.whiteColor}
            style={{alignSelf: 'center'}}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setShowSnackBar(true);
    setListData(newData);
  };

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const renderItem = data => (
    <TouchableHighlight
      style={{backgroundColor: Colors.whiteColor}}
      activeOpacity={0.6}>
      <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.push('Products')}
          style={styles.categoryWrapStyle}>
          <Image
            source={data.item.productImage}
            style={{width: 66.0, height: 77.0}}
          />
          <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
            <Text style={{...Fonts.blackColor16SemiBold}}>
              {data.item.productName}
            </Text>
            <Text style={{...Fonts.blackColor16Bold}}>{data.item.amount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );

  function noItemsSaveInfo() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/icons/heart.png')}
          tintColor={Colors.grayColor}
          style={{width: 36.0, height: 36.0, resizeMode: 'contain'}}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            ...Fonts.grayColor18SemiBold,
          }}>
          Favorite List Is Empty
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.whiteColor,
            marginTop: Sizes.fixPadding - 8.0,
          }}>
          {listData.length == 0 ? (
            <>{noItemsSaveInfo()}</>
          ) : (
            <SwipeListView
              data={listData}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-50}
              onSwipeValueChange={onSwipeValueChange}
              useNativeDriver={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: Sizes.fixPadding * 2.0,
              }}
            />
          )}
          <Snackbar
            style={styles.snackBarStyle}
            visible={showSnackBar}
            onDismiss={() => setShowSnackBar(false)}>
            <Text style={{...Fonts.whiteColor14Regular}}>
              Item Remove From Favorite List.
            </Text>
          </Snackbar>
        </View>
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
          Favorites
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
    borderColor: '#ececec',
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    paddingTop: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    alignItems: 'center',
  },
  snackBarStyle: {
    position: 'absolute',
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: '#333333',
    elevation: 0.0,
  },
  backDeleteContinerStyle: {
    alignItems: 'center',
    bottom: 10,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 50,
    backgroundColor: Colors.redColor,
    right: 0,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderBottomLeftRadius: Sizes.fixPadding - 5.0,
  },
});

export default FavoritesScreen;
