import React, {createRef, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const recentSearchesList = ['Train tickets booking', 'Buy tops', 'Water bill'];

const quickLinksList = [
  {
    id: '1',
    optionName: 'Money Transfer',
    optionIcon: require('../../assets/images/icons/money_transfer.png'),
  },
  {
    id: '2',
    optionName: 'Payments',
    optionIcon: require('../../assets/images/icons/payments.png'),
  },
  {
    id: '3',
    optionName: 'Water',
    optionIcon: require('../../assets/images/icons/flight_ticket.png'),
  },
  {
    id: '4',
    optionName: 'Discounts',
    optionIcon: require('../../assets/images/icons/moive_ticket.png'),
  },
];

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState(null);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {searchField()}
          {recentSearchesInfo()}
          {quickLinksInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function quickLinksInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Bold,
          }}>
          Quick Links
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {quickLinksList.map(item => (
            <View key={`${item.id}`}>
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: Sizes.fixPadding * 2.0,
                }}>
                <Image
                  source={item.optionIcon}
                  style={{width: 35.0, height: 35.0}}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor12SemiBold,
                  }}>
                  {item.optionName}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  function recentSearchesInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor18Bold,
          }}>
          Recent Searches
        </Text>
        {recentSearchesList.map((search, index) => (
          <View key={`${index}`}>
            <Text
              style={{
                marginBottom: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor14Regular,
              }}>
              {search}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  function searchField() {
    const textInputRef = createRef();
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="search"
            color={Colors.grayColor}
            size={16}
            onPress={() => textInputRef.current.focus()}
          />
          <TextInput
            ref={textInputRef}
            value={search}
            onChangeText={text => setSearch(text)}
            selectionColor={Colors.primaryColor}
            placeholder="What’re you looking for?"
            placeholderTextColor={Colors.grayColor}
            style={styles.textFieldStyle}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.grayColor,
            height: 1.0,
            marginTop: Sizes.fixPadding - 5.0,
          }}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back-ios"
          color={Colors.blackColor}
          size={24}
          onPress={() => navigation.pop()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.lightWhiteColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    ...commonStyles.boxShadow,
  },
  textFieldStyle: {
    ...Fonts.blackColor12Regular,
    flex: 1,
    marginLeft: Sizes.fixPadding,
    padding: 0,
  },
});

export default SearchScreen;
