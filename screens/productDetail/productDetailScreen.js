import React, {useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/myStatusBar';

const sizesList = ['X', 'XS', 'M', 'L', 'XL'];

const colorsList = ['#FFFFFF', '#66BB6A', '#26C6DA', '#8D6E63'];

const ProductDetailScreen = ({navigation, route}) => {
  const item = route.params.item;

  const [state, setState] = useState({
    selectedSize: sizesList[2],
    selectedColor: colorsList[0],
    currentProductQuantity: 1,
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {selectedSize, selectedColor, currentProductQuantity} = state;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding}}>
          {productInfo()}
          {sizeInfo()}
          {colorInfo()}
          {quantityInfo()}
          {productDescriptionInfo()}
          {productAmount()}
          {addToCartAndBuyNowButton()}
        </ScrollView>
      </View>
    </View>
  );

  function addToCartAndBuyNowButton() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: Sizes.fixPadding * 2.0,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.push('Cart')}
          style={styles.addToCartButtonStyle}>
          <Text style={{...Fonts.primaryColor22Bold}}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.push('Checkout')}
          style={styles.buyNowButtonStyle}>
          <Text style={{...Fonts.whiteColor22Bold}}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function productAmount() {
    return (
      <Text
        style={{
          marginTop: Sizes.fixPadding,
          textAlign: 'center',
          ...Fonts.blackColor18Bold,
        }}>
        {item.amount}
      </Text>
    );
  }

  function productDescriptionInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor16Regular,
          }}>
          Product Description
        </Text>
        <Text style={{...Fonts.grayColor14Regular}}>
          Lorem Ipsum is simply dummy text of the printing and type setting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </Text>
      </View>
    );
  }

  function quantityInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.blackColor16Regular,
          }}>
          Select Quantity
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign
            name="minussquare"
            size={28}
            color="#D3D3D3"
            onPress={() => {
              currentProductQuantity > 1
                ? updateState({
                    currentProductQuantity: currentProductQuantity - 1,
                  })
                : null;
            }}
          />
          <Text
            style={{
              marginHorizontal: Sizes.fixPadding + 5.0,
              ...Fonts.blackColor14ExtraBold,
            }}>
            {currentProductQuantity}
          </Text>
          <AntDesign
            name="plussquare"
            size={28}
            color={Colors.secondaryColor}
            onPress={() =>
              updateState({currentProductQuantity: currentProductQuantity + 1})
            }
          />
        </View>
      </View>
    );
  }

  function colorInfo() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => updateState({selectedColor: item})}
        style={{
          borderColor:
            selectedColor == item ? Colors.secondaryColor : 'transparent',
          borderWidth: selectedColor == item ? 2.0 : 0.5,
          backgroundColor: item,
          ...styles.colorBoxStyle,
        }}
      />
    );
    return (
      <View style={{marginTop: Sizes.fixPadding}}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding - 2.0,
            ...Fonts.blackColor16Regular,
          }}>
          Select Color
        </Text>
        <FlatList
          horizontal
          data={colorsList}
          keyExtractor={(index, item) => `${index}${item}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding - 8.0,
          }}
        />
      </View>
    );
  }

  function sizeInfo() {
    return (
      <View>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding,
            ...Fonts.blackColor16Regular,
          }}>
          Select Size
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {sizesList.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({selectedSize: item})}
                key={index}
                style={{
                  ...styles.productSizeWrapStyle,
                  backgroundColor:
                    selectedSize == item ? Colors.secondaryColor : '#E6E6E6',
                }}>
                <Text
                  style={
                    selectedSize == item
                      ? {...Fonts.whiteColor16ExtraBold}
                      : {...Fonts.blackColor16ExtraBold}
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  function productInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding,
        }}>
        <Image source={item.productImage} style={styles.productImageStyle} />
        <Text style={{...Fonts.grayColor18SemiBold}}>NAUTICA</Text>
        <Text style={{...Fonts.blackColor18SemiBold}}>{item.productName}</Text>
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    ...commonStyles.boxShadow,
  },
  productSizeWrapStyle: {
    width: 35.0,
    height: 35.0,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Sizes.fixPadding,
  },
  productImageStyle: {
    width: '100%',
    height: 220.0,
    resizeMode: 'contain',
    marginBottom: Sizes.fixPadding * 2.0,
  },
  colorBoxStyle: {
    marginRight: Sizes.fixPadding,
    width: 35.0,
    height: 35.0,
    borderRadius: Sizes.fixPadding - 5.0,
    ...commonStyles.boxShadow,
  },
  buyNowButtonStyle: {
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
  addToCartButtonStyle: {
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: Sizes.fixPadding,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.5,
  },
});

export default ProductDetailScreen;
