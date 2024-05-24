import React, {useState, createRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const popularTopicksList = [
  'How to book?',
  'How to pay?',
  'How to cancel booking?',
  'How to complain about service?',
  'What is service charge?',
  'How to verify mobile number?',
  'How to cancel and get back a refund for my flight booking?',
  'How to purchase extra baggage?',
  'How to reschedule my flight booking?',
  'How to complain about service?',
  'What is service charge?',
  'How to verify mobile number?',
  'How to book?',
  'How to pay?',
  'How to cancel booking?',
];

const HelpScreen = ({navigation}) => {
  const [search, setsearch] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: Sizes.fixPadding}}>
          {popularTopicsInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function popularTopicsInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold}}>
          Popular Topics
        </Text>
        {popularTopicksList.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('HelpDetail', {helpTitle: item})}
            key={index}
            style={{
              marginBottom: Sizes.fixPadding + 2.0,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{flex: 1, ...Fonts.blackColor16SemiBold}}>{item}</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              color={Colors.blackColor}
              size={15}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  function searchField() {
    const textInputRef = createRef();
    return (
      <View style={styles.searchFieldWrapStyle}>
        <MaterialIcons
          name="search"
          color={Colors.grayColor}
          size={15}
          onPress={() => textInputRef.current.focus()}
        />
        <TextInput
          ref={textInputRef}
          value={search}
          onChangeText={text => setsearch(text)}
          placeholder="Search for your answer here..."
          placeholderTextColor={Colors.grayColor}
          style={styles.searchFieldStyle}
          selectionColor={Colors.primaryColor}
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
          Help
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
  searchFieldStyle: {
    flex: 1,
    height: 20.0,
    marginLeft: Sizes.fixPadding,
    ...Fonts.blackColor14SemiBold,
    padding: 0,
  },
  searchFieldWrapStyle: {
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

export default HelpScreen;
