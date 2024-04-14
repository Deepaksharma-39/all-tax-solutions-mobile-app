import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const electricityProvidersList = [
  {
    id: '1',
    providerImage: require('../../assets/images/electricity_company/company1.png'),
    providerName: 'APSPDCL AP South',
  },
  {
    id: '2',
    providerImage: require('../../assets/images/electricity_company/company2.png'),
    providerName: 'Adani Electricity Mumbai Limited',
  },
  {
    id: '3',
    providerImage: require('../../assets/images/electricity_company/company3.png'),
    providerName: 'Ajmer Vidyut Vitran Nigam Ltd',
  },
  {
    id: '4',
    providerImage: require('../../assets/images/electricity_company/company4.png'),
    providerName: 'Assam Power Distribution Company',
  },
  {
    id: '5',
    providerImage: require('../../assets/images/electricity_company/company5.png'),
    providerName: 'BESCOM Bangalore',
  },
  {
    id: '6',
    providerImage: require('../../assets/images/electricity_company/company6.png'),
    providerName: 'BESL Bharatpur Electricity Services Ltd',
  },
  {
    id: '7',
    providerImage: require('../../assets/images/electricity_company/company7.png'),
    providerName: 'DGVCL Dakshin Gujarat Vij Company',
  },
  {
    id: '8',
    providerImage: require('../../assets/images/electricity_company/company8.png'),
    providerName: 'Gift Power Company Limited',
  },
  {
    id: '9',
    providerImage: require('../../assets/images/electricity_company/company9.png'),
    providerName: 'MGVCL Madhya Gujarat Vij',
  },
  {
    id: '10',
    providerImage: require('../../assets/images/electricity_company/company10.png'),
    providerName: 'Torrent Power',
  },
  {
    id: '11',
    providerImage: require('../../assets/images/electricity_company/company11.png'),
    providerName: 'PGVCL Paschim Gujarat Vij',
  },
  {
    id: '12',
    providerImage: require('../../assets/images/electricity_company/company1.png'),
    providerName: 'APSPDCL AP South',
  },
  {
    id: '13',
    providerImage: require('../../assets/images/electricity_company/company2.png'),
    providerName: 'Adani Electricity Mumbai Limited',
  },
  {
    id: '14',
    providerImage: require('../../assets/images/electricity_company/company3.png'),
    providerName: 'Ajmer Vidyut Vitran Nigam Ltd',
  },
];

const ElectricityBillPaymentScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {providersDetail()}
      </View>
    </View>
  );

  function providersDetail() {
    const renderItem = ({item}) => (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            navigation.push('ElectricityBillConsumerDetail', {item: item})
          }
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.providerImage}
            style={{width: 40.0, height: 40.0, resizeMode: 'contain'}}
          />
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding + 5.0,
              ...Fonts.blackColor16SemiBold,
            }}>
            {item.providerName}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: Colors.grayColor,
            height: 1.0,
            marginVertical: Sizes.fixPadding,
          }}
        />
      </View>
    );

    return (
      <FlatList
        ListHeaderComponent={<>{providerSearchInfo()}</>}
        data={electricityProvidersList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: Sizes.fixPadding}}
      />
    );
  }

  function providerSearchInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.push('Search');
        }}
        style={styles.providerSearchInfoWrapStyle}>
        <MaterialIcons name="search" color={Colors.grayColor} size={15} />
        <Text
          style={{marginLeft: Sizes.fixPadding, ...Fonts.grayColor14SemiBold}}>
          Type your provider name...
        </Text>
      </TouchableOpacity>
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
          Electricity Bill Payment
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
  providerSearchInfoWrapStyle: {
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
});

export default ElectricityBillPaymentScreen;
