import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
} from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const quickRechargesAndBillPayOptionsList = [
  {
    id: '1',
    optionName: 'Recharge',
    optionIcon: require('../../assets/images/icons/recharge.png'),
    category: 'recharge',
  },
  {
    id: '2',
    optionName: 'FASTag Recharge',
    optionIcon: require('../../assets/images/icons/fastag.png'),
    category: 'recharge'
  },
  {
    id: '3',
    optionName: 'GST',
    optionIcon: require('../../assets/images/icons/tax.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '4',
    optionName: 'Insurance',
    optionIcon: require('../../assets/images/icons/insurance.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
 
  {
    id: '5',
    optionName: 'Bus Ticket',
    optionIcon: require('../../assets/images/icons/bus_ticket.png'),
    category: 'bookTicket',
  },
  {
    id: '6',
    optionName: 'Payments',
    optionIcon: require('../../assets/images/icons/payments.png'),
    category: 'recharge',
  },
  {
    id: '7',
    optionName: 'Money Transfer',
    optionIcon: require('../../assets/images/icons/money_transfer.png'),
    category: 'recharge',
  },
  {
    id: '8',
    optionName: 'Landline',
    optionIcon: require('../../assets/images/icons/landline.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '9',
    optionName: 'Broadband',
    optionIcon: require('../../assets/images/icons/broadband.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '10',
    optionName: 'Electricity',
    optionIcon: require('../../assets/images/icons/electricity.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '11',
    optionName: 'Bill Payments',
    optionIcon: require('../../assets/images/icons/bill_payments.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
  {
    id: '12',
    optionName: 'Loan Payment',
    optionIcon: require('../../assets/images/icons/loan_payment.png'),
    category: 'utilitiesBillsAndFincialServices',
  },
];




const HomeScreen = ({ navigation }) => {

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {banner()}
              {quickReachargesAndBillPaysInfo()}
              {offersRewardsAndInviteNowOptions()}
              {payBorderTaxButton()}
              {DownloadRecieptButton()}

            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
        />
      </View>
    </View>
  );

  function banner() {
    return (
      <View style={styles.bannerWrapStyle}>
        <View>
          <Text style={{ ...Fonts.whiteColor16Bold }}>
            Up to 20% cashback on bill payments every...
          </Text>
          <Text style={{ ...Fonts.whiteColor14Regular }}>
            Lorem Ipsum is simply dummy text of the printing
          </Text>
        </View>
        <View style={styles.knowMoreButtonStyle}>
          <Text style={{ ...Fonts.whiteColor18Bold }}>Know More</Text>
        </View>
        <Image
          source={require('../../assets/images/banner_image1.png')}
          style={styles.bannerImageStyle}
        />
      </View>
    );
  }

  function offersRewardsAndInviteNowOptions() {
    return (
      <View style={styles.offersRewardsAndInviteNowOptionsWrapStyle}>
        {offersRewardOrInviteButton({
          icon: require('../../assets/images/icons/offers.png'),
          title: 'Offers',
          navigateTo: 'Offers',
        })}
        {offersRewardOrInviteButton({
          icon: require('../../assets/images/icons/rewards.png'),
          title: 'Rewards',
          navigateTo: 'Rewards',
        })}
        {offersRewardOrInviteButton({
          icon: require('../../assets/images/icons/invite.png'),
          title: 'Invite Now',
          navigateTo: 'InviteFriends',
        })}
      </View>
    );
  }

  function payBorderTaxButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        // onPress={() => navigation.push(navigateTo)}
        style={styles.payBorderTaxButton}>

        <Text style={{ ...Fonts.whiteColor22Bold }}>Border Tax Payment</Text>
      </TouchableOpacity>
    );
  }


  function DownloadRecieptButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        // onPress={() => navigation.push(navigateTo)}
        style={styles.DownloadRecieptButton}>

        <Text style={{ ...Fonts.whiteColor22Bold }}>Download Receipt</Text>
      </TouchableOpacity>
    );
  }
  function offersRewardOrInviteButton({ icon, title, navigateTo }) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push(navigateTo)}
        style={styles.offersRewardOrInviteButtonStyle}>
        <Image
          source={icon}
          style={{ width: 25.0, height: 25.0 }}
          resizeMode="contain"
        />
        <Text
          numberOfLines={1}
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.whiteColor16SemiBold,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }


  function quickReachargesAndBillPaysInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          item.category == 'recharge'
            ? navigation.push('MobileRecharge')
            : item.category == 'utilitiesBillsAndFincialServices'
              ? navigation.push('ElectricityBillPayment')
              : item.category == 'bookTicket'
                ? navigation.push('TicketBooking', {
                  index:
                    item.optionName == 'Flight Ticket'
                      ? 0
                      : item.optionName == 'Bus Ticket'
                        ? 1
                        : 2,
                })
                : navigation.push('QuickRechargesAndBillPays');
        }}
        style={{
          alignItems: 'center',
          flex: 1,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Image
          source={item.optionIcon}
          style={{ width: 35.0, height: 35.0 }}
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
      </TouchableOpacity>
    );
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding + 10.0,
            ...Fonts.blackColor18Bold,
          }}>
          Quick Recharges & Bill Pays
        </Text>
        <FlatList
          scrollEnabled={false}
          data={quickRechargesAndBillPayOptionsList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          numColumns={4}
          showsVerticalScrollIndicator={false}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  userInfoWrapStyle: {
    padding: Sizes.fixPadding - 3.0,
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    ...commonStyles.boxShadow,
  },
  featuresWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offersRewardOrInviteButtonStyle: {
    backgroundColor: Colors.secondaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
  },
  offersRewardsAndInviteNowOptionsWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.fixPadding,
  },
  bannerWrapStyle: {
    marginVertical: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.secondaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: 'space-between',
    padding: Sizes.fixPadding,
  },
  knowMoreButtonStyle: {
    marginTop: Sizes.fixPadding * 3.0,
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
    width: 200.0,
    height: 150.0,
  },
  payBorderTaxButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: "rgba(86, 0, 65, 0.2)",
    marginVertical: Sizes.fixPadding + 14.0,
    marginHorizontal: Sizes.fixPadding,
    ...commonStyles.buttonShadow,
  },
  DownloadRecieptButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: "rgba(86, 0, 65, 0.2)",
    marginHorizontal: Sizes.fixPadding,
    ...commonStyles.buttonShadow,
  },
});

export default HomeScreen;
