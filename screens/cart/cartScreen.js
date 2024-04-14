import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  screenHeight,
  commonStyles,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Snackbar} from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';

const cartItemsList = [
  {
    id: '1',
    productImage: require('../../assets/images/products/product7.png'),
    productname: 'NAUTICA Solid Women Round Neck  White T-Shirt',
    productSize: 'M',
    productColor: 'White',
    amount: '$100',
    productQty: 1,
  },
  {
    id: '2',
    productImage: require('../../assets/images/products/product10.png'),
    productname: 'NAUTICA Solid Women Round Neck  White T-Shirt',
    productSize: 'M',
    productColor: 'Black',
    amount: '$99',
    productQty: 1,
  },
];

const CartScreen = ({navigation}) => {
  const [state, setState] = useState({
    cartData: cartItemsList,
    showSnackBar: false,
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {cartData, showSnackBar} = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {cartItems()}
              {cartData.length == 0 ? (
                cartEmptyInfo()
              ) : (
                <>
                  {priceDetail()}
                  {checkoutButton()}
                </>
              )}
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: cartData.length == 0 ? 0.0 : Sizes.fixPadding * 2.0,
          }}
        />
      </View>
      {snackBarInfo()}
    </View>
  );

  function snackBarInfo() {
    return (
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => updateState({showSnackBar: false})}
        style={styles.snackBarStyle}>
        <Text style={{...Fonts.whiteColor14Regular}}>
          Item removed from cart
        </Text>
      </Snackbar>
    );
  }

  function cartEmptyInfo() {
    return (
      <View
        style={{
          height: screenHeight - 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/images/icons/shopping_basket.png')}
          tintColor={Colors.grayColor}
          style={{width: 36.0, height: 36.0, resizeMode: 'contain'}}
        />
        <Text style={{...Fonts.grayColor18SemiBold}}>No new product</Text>
      </View>
    );
  }

  function checkoutButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('Checkout')}
        style={styles.checkoutButtonStyle}>
        <Text style={{...Fonts.whiteColor22Bold}}>Checkout</Text>
      </TouchableOpacity>
    );
  }

  function priceDetail() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold}}>
          Price Details
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.grayColor14Regular}}>Sub Total(2 Items)</Text>
          <Text style={{...Fonts.grayColor14Regular}}>$199</Text>
        </View>
        <View
          style={{
            marginVertical: Sizes.fixPadding - 5.0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.grayColor14Regular}}>Delivery Charges</Text>
          <Text style={{...Fonts.grayColor14Regular}}>Free</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...Fonts.blackColor16SemiBold}}>Amount Payable</Text>
          <Text style={{...Fonts.blackColor16SemiBold}}>$199</Text>
        </View>
      </View>
    );
  }

  function updateQuantity({id, type}) {
    const newList = cartData.map(item => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          productQty: type == 'add' ? item.productQty + 1 : item.productQty - 1,
        };
        return updatedItem;
      }
      return item;
    });
    updateState({cartData: newList});
  }

  function removeFromCart({id}) {
    const newList = cartData.filter(item => item.id != id);

    updateState({cartData: newList, showSnackBar: true});
  }

  function cartItems() {
    const renderItem = ({item}) => (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.productImageWrapStyle}>
            <Image
              source={item.productImage}
              style={{width: 88.0, height: 110.0, resizeMode: 'contain'}}
            />
          </View>
          <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
            <Text numberOfLines={2} style={{...Fonts.blackColor16SemiBold}}>
              {item.productname}
            </Text>
            <Text style={{...Fonts.grayColor14Regular}}>
              Size : {item.productSize}
            </Text>
            <Text style={{...Fonts.grayColor14Regular}}>
              Color : {item.productColor}
            </Text>
            <Text style={{...Fonts.blackColor16Bold}}>{item.amount}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: Sizes.fixPadding + 5.0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AntDesign
            name="minussquare"
            size={25}
            color="#D3D3D3"
            onPress={() =>
              item.productQty > 1
                ? updateQuantity({id: item.id, type: 'minus'})
                : null
            }
          />
          <Text
            style={{
              marginHorizontal: Sizes.fixPadding + 5.0,
              ...Fonts.blackColor14ExtraBold,
            }}>
            {item.productQty}
          </Text>
          <AntDesign
            name="plussquare"
            size={25}
            color={Colors.secondaryColor}
            onPress={() => updateQuantity({id: item.id, type: 'add'})}
          />
          <Text
            onPress={() => removeFromCart({id: item.id})}
            style={{
              marginLeft: Sizes.fixPadding * 2.0,
              ...Fonts.primaryColor18Bold,
            }}>
            Remove
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.grayColor,
            height: 1.0,
            marginVertical: Sizes.fixPadding * 2.0,
          }}
        />
      </View>
    );
    return (
      <View>
        <FlatList
          data={cartData}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
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
          My Cart
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
  productImageWrapStyle: {
    width: 110.0,
    height: 140.0,
    borderColor: Colors.grayColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonStyle: {
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
  snackBarStyle: {
    position: 'absolute',
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    elevation: 0.0,
    backgroundColor: '#333333',
  },
});

export default CartScreen;
