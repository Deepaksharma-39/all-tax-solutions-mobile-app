import React, {useState, useRef} from 'react';
import {Image, FlatList, Animated, View, StyleSheet, Text} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
  screenHeight,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Snackbar} from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';

const todaysNotificatiosList = [
  {
    key: '1',
    title: 'Electicity bill for the month of August is $125/-',
    time: '10:55 am',
  },
  {
    key: '2',
    title: 'Amount send to CNIC has collected',
    time: '10:45 am',
  },
  {
    key: '3',
    title:
      'You have received $200 cashback added in your wallet You have received $200 cashback added in your wallet',
    time: '10:00 am',
  },
];

const yesterdaysNotificationsList = [
  {
    key: '1',
    title: 'Checkout the fashion collections you may like to see. Hurry!!',
    time: '11:25 am',
  },
  {
    key: '2',
    title: 'Get 25% cashback on first electricity bill payment.',
    time: '10:55 am',
  },
  {
    key: '3',
    title: 'Verify your phone number before booking a train ticket.',
    time: '10:45 am',
  },
  {
    key: '4',
    title: 'Your booking for AC bus from NY to KY is confirmed.',
    time: '10:40 am',
  },
  {
    key: '5',
    title:
      'Trx ID 123654789012. You receivedd $150.00 from SCB in your Digital Payment account fee for this transaction is $0.00.You new Digital Payment account balance is $150.00',
    time: '11:25 am',
  },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = ({navigation}) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [snackBarMsg, setSnackBarMsg] = useState('');

  const [listData, setListData] = useState(todaysNotificatiosList);

  const [oldListData, setOldListData] = useState(yesterdaysNotificationsList);

  Array(listData.length + 1)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  Array(oldListData.length + 1)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;

    if (
      (value < -screenWidth || value > screenWidth) &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        const removedItem = listData.find(item => item.key === key);

        setSnackBarMsg(`${removedItem.title} dismissed`);

        setListData(newData);

        setShowSnackBar(true);

        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = data => (
    <Animated.View
      style={[
        {
          height: rowTranslateAnimatedValues[data.item.key].interpolate({
            inputRange: ['0%', '100%'],
            outputRange: ['0%', '100%'],
          }),
        },
      ]}>
      <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
        <View style={styles.notificationWrapStyle}>
          <Text style={{...Fonts.blackColor14Regular}}>{data.item.title}</Text>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 7.0,
              ...Fonts.grayColor12SemiBold,
            }}>
            {data.item.time}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderHiddenItem = () => <View style={styles.rowBack} />;

  const oldOnSwipeValueChange = swipeData => {
    const {key, value} = swipeData;

    if (
      (value < -screenWidth || value > screenWidth) &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...oldListData];
        const prevIndex = oldListData.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        const removedItem = oldListData.find(item => item.key === key);

        setSnackBarMsg(`${removedItem.title} dismissed`);

        setOldListData(newData);

        setShowSnackBar(true);

        animationIsRunning.current = false;
      });
    }
  };

  const oldRenderItem = data => (
    <Animated.View
      style={[
        {
          height: rowTranslateAnimatedValues[data.item.key].interpolate({
            inputRange: ['0%', '100%'],
            outputRange: ['0%', '100%'],
          }),
        },
      ]}>
      <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
        <View style={styles.notificationWrapStyle}>
          <Text style={{...Fonts.blackColor14Regular}}>{data.item.title}</Text>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 7.0,
              ...Fonts.grayColor12SemiBold,
            }}>
            {data.item.time}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const oldRenderHiddenItem = () => <View style={styles.rowBack} />;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <>
          <FlatList
            ListHeaderComponent={
              <View style={{flex: 1}}>
                {listData.length == 0 && oldListData.length == 0 ? (
                  <View
                    style={{
                      height: screenHeight - 90,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/images/icons/notification_off.png')}
                      style={{width: 50.0, height: 50.0, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{
                        ...Fonts.grayColor18SemiBold,
                        marginTop: Sizes.fixPadding,
                      }}>
                      No new notifications
                    </Text>
                  </View>
                ) : (
                  <>
                    {listData.length == 0 ? null : (
                      <View>
                        <Text
                          style={{
                            marginVertical: Sizes.fixPadding + 5.0,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                            ...Fonts.secondaryColor16SemiBold,
                          }}>
                          Today 25 August 2020
                        </Text>
                        <SwipeListView
                          listKey={`todays`}
                          data={listData}
                          renderItem={renderItem}
                          renderHiddenItem={renderHiddenItem}
                          rightOpenValue={-screenWidth}
                          leftOpenValue={screenWidth}
                          onSwipeValueChange={onSwipeValueChange}
                          useNativeDriver={false}
                          contentContainerStyle={{
                            paddingVertical: Sizes.fixPadding - 8.0,
                          }}
                          scrollEnabled={false}
                        />
                      </View>
                    )}
                    {oldListData.length == 0 ? null : (
                      <View>
                        <Text
                          style={{
                            marginBottom: Sizes.fixPadding + 5.0,
                            marginTop:listData.length == 0?Sizes.fixPadding+5.0: Sizes.fixPadding - 5.0,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                            ...Fonts.secondaryColor16SemiBold,
                          }}>
                          Yesterday 24 August 2020
                        </Text>
                        <SwipeListView
                          listKey={`olds`}
                          data={oldListData}
                          renderItem={oldRenderItem}
                          renderHiddenItem={oldRenderHiddenItem}
                          rightOpenValue={-screenWidth}
                          leftOpenValue={screenWidth}
                          onSwipeValueChange={oldOnSwipeValueChange}
                          useNativeDriver={false}
                          contentContainerStyle={{
                            paddingVertical: Sizes.fixPadding - 8.0,
                          }}
                          scrollEnabled={false}
                        />
                      </View>
                    )}
                  </>
                )}
              </View>
            }
            contentContainerStyle={{paddingBottom: Sizes.fixPadding}}
            showsVerticalScrollIndicator={false}
          />
          <Snackbar
            style={styles.snackBarStyle}
            visible={showSnackBar}
            onDismiss={() => setShowSnackBar(false)}>
            {snackBarMsg}
          </Snackbar>
        </>
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
          Notifications
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
  snackBarStyle: {
    position: 'absolute',
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: '#333333',
  },
  notificationWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 0.5,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
    bottom: 9.0,
  },
});

export default NotificationsScreen;
