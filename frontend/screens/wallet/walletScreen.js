import React, {useState} from 'react';
import {SafeAreaView, View, StatusBar, StyleSheet, Text} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TabView, TabBar} from 'react-native-tab-view';
import WalletAllTransactions from '../walletAllTransactions/walletAllTransactionsScreen';
import WalletReceivedTransactions from '../walletReceivedTransactions/walletReceivedTransactionsScreen';
import WalletSentTransactions from '../walletSentTransactions/walletSentTransactionsScreen';
import MyStatusBar from '../../components/myStatusBar';

const WalletScreen = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'All'},
    {key: 'second', title: 'Received'},
    {key: 'third', title: 'Sent'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <WalletAllTransactions />;
      case 'second':
        return <WalletReceivedTransactions />;
      case 'third':
        return <WalletSentTransactions />;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {amountInfo()}
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

  function amountInfo() {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Colors.lightWhiteColor,
        }}>
        <Text style={{...Fonts.grayColor18SemiBold}}>
          Digital Payment Wallet Balance
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.blackColor25Bold,
          }}>
          $5,945.00
        </Text>
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
          Wallet
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
  },
});

export default WalletScreen;
