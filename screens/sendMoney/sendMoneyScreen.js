import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/myStatusBar';

const userMessages = [
  {
    id: '1',
    amountOrMessage: '$35.00',
    dateAndTime: '13 Jan 2021, 8:27 pm',
    isSender: true,
    isSuccess: true,
  },
  {
    id: '2',
    amountOrMessage: '$35.00',
    dateAndTime: '13 Jan 2021, 8:30 pm',
    isSuccess: true,
  },
  {
    id: '3',
    amountOrMessage: '$105.00',
    dateAndTime: '12 Jan 2021, 8:27 pm',
    isSender: true,
  },
  {
    id: '4',
    amountOrMessage: '$105.00',
    dateAndTime: '12 Jan 2021, 8:30 pm',
  },
];

const receiverImage = require('../../assets/images/users/user3.png');

const senderImage = require('../../assets/images/users/user1.png');

const SendMoneyScreen = ({ navigation, route }) => {
  const contactName = route.params.contactName;

  const contactNumber = route.params.contactNumber;

  const [messagesList, setMessagesList] = useState(userMessages);

  function messages() {
    const renderItem = ({ item, index }) => {
      return (
        <View
          style={{
            alignItems: item.isSender == true ? 'flex-end' : 'flex-start',
            marginHorizontal: Sizes.fixPadding + 10.0,
            marginVertical: Sizes.fixPadding,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            {!item.isSender ? (
              index != 0 ? (
                messagesList[index].isSender ==
                  messagesList[index - 1].isSender ? (
                  <View style={{ marginRight: Sizes.fixPadding * 6.0 }} />
                ) : (
                  <Image
                    source={receiverImage}
                    style={{
                      marginRight: Sizes.fixPadding,
                      width: 50.0,
                      height: 50.0,
                      borderRadius: 25.0,
                    }}
                  />
                )
              ) : messagesList[index].isSender ==
                messagesList[index + 1].isSender ||
                !messagesList[index].isSender ? (
                <Image
                  source={receiverImage}
                  style={{
                    marginRight: Sizes.fixPadding,
                    width: 50.0,
                    height: 50.0,
                    borderRadius: 25.0,
                  }}
                />
              ) : null
            ) : null}
            <View
              style={{
                width: 200.0,
                ...styles.messageWrapStyle,
                backgroundColor:
                  item.isSender == true ? Colors.whiteColor : '#E6E6E6',
              }}>
              <Text style={{ ...Fonts.blackColor20Bold }}>
                {item.amountOrMessage}
              </Text>
              <View
                style={{
                  marginVertical: Sizes.fixPadding,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AntDesign
                    name={
                      item.isSuccess ? 'checkcircleo' : 'exclamationcircleo'
                    }
                    color={item.isSuccess ? Colors.greenColor : Colors.redColor}
                    size={15}
                  />
                  <Text
                    style={{
                      marginLeft: Sizes.fixPadding,
                      ...Fonts.blackColor16SemiBold,
                    }}>
                    {item.isSuccess
                      ? `${item.isSender ? 'Sent' : 'Received'} Securely`
                      : `Failed`}
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  color={Colors.blackColor}
                  size={13}
                />
              </View>
              <Text
                style={{ alignSelf: 'flex-end', ...Fonts.grayColor12SemiBold }}>
                {item.dateAndTime}
              </Text>
            </View>
            {item.isSender ? (
              index != 0 ? (
                messagesList[index].isSender ==
                  messagesList[index - 1].isSender ? (
                  <View style={{ marginLeft: Sizes.fixPadding * 6.0 }} />
                ) : (
                  <Image
                    source={senderImage}
                    style={{
                      marginLeft: Sizes.fixPadding,
                      width: 50.0,
                      height: 50.0,
                      borderRadius: 25.0,
                    }}
                  />
                )
              ) : messagesList[index].isSender ==
                messagesList[index + 1].isSender ||
                messagesList[index].isSender ? (
                <Image
                  source={senderImage}
                  style={{
                    marginLeft: Sizes.fixPadding,
                    width: 50.0,
                    height: 50.0,
                    borderRadius: 25.0,
                  }}
                />
              ) : null
            ) : null}
          </View>
        </View>
      );
    };

    return (
      <View
        style={{
          paddingBottom: Sizes.fixPadding * 4.0,
          marginTop: Sizes.fixPadding - 5.0,
        }}>
        <FlatList
          inverted
          data={messagesList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column-reverse',
            paddingTop: Sizes.fixPadding * 4.0,
          }}
        />
      </View>
    );
  }

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  function addMessage({ message }) {
    const oldMessages = messagesList;
    let date = Date();
    let year = new Date(date).getFullYear();
    let month = monthNames[new Date(date).getMonth()];
    let today = new Date(date).getDate();
    let hour = new Date(date).getHours();
    let minute = new Date(date).getMinutes();
    let AmPm = hour >= 12 ? 'pm' : 'am';
    let finalhour = hour > 12 ? hour - 12 : hour;

    const newMessage = {
      id: messagesList.length + 1,
      amountOrMessage: message,
      dateAndTime: `${today} ${month} ${year}, ${finalhour}:${minute} ${AmPm}`,
      isSender: true,
    };

    oldMessages.push(newMessage);
    setMessagesList(oldMessages);
  }

  function typeMessage() {
    const [message, setMessage] = useState(null);
    return (
      <View style={styles.typeMessageWrapStyle}>
        <View style={styles.textFieldWrapStyle}>
          <TextInput
            selectionColor={Colors.primaryColor}
            value={message}
            onChangeText={setMessage}
            placeholder="Enter amount or say something"
            style={{
              ...Fonts.blackColor14Regular,
              flex: 1,
              height: 20.0,
              padding: 0,
            }}
            placeholderTextColor={Colors.grayColor}
          />
          <MaterialIcons
            name="send"
            size={15}
            color={Colors.grayColor}
            style={{ marginLeft: Sizes.fixPadding + 5.0 }}
            onPress={() => {
              if (message != '') {
                addMessage({ message: message });
                setMessage(null);
              }
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.push('TransactionSuccessful')}
          style={styles.payButtonStyle}>
          <Text style={{ ...Fonts.whiteColor22Bold }}>Pay</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "height" : null} style={{ flex: 1 }}>
        {header()}
        <View style={{ flex: 1 }}>
          {messages()}
          {typeMessage()}
        </View>
      </KeyboardAvoidingView>
    </View>
  );

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons
            name="arrow-back-ios"
            size={22}
            color={Colors.blackColor}
            style={{ marginRight: Sizes.fixPadding - 5.0 }}
            onPress={() => navigation.pop()}
          />
          <Image
            source={require('../../assets/images/users/user3.png')}
            style={{ width: 30.0, height: 30.0, borderRadius: 15.0 }}
          />
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor14Bold }}>{contactName}</Text>
            <Text style={{ ...Fonts.grayColor12SemiBold }}>{contactNumber}</Text>
          </View>
        </View>
        <MaterialIcons name="more-vert" color={Colors.blackColor} size={25} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    ...commonStyles.boxShadow,
  },
  messageWrapStyle: {
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    ...commonStyles.boxShadow,
  },
  typeMessageWrapStyle: {
    position: 'absolute',
    bottom: 20.0,
    left: 20.0,
    right: 20.0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
  },
  payButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 1.0,
    width: 100.0,
    marginLeft: Sizes.fixPadding,
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    ...commonStyles.buttonShadow
  },
  textFieldWrapStyle: {
    flex: 1.0,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Sizes.fixPadding + 1.0,
    paddingHorizontal: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
});

export default SendMoneyScreen;
