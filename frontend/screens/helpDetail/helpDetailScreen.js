import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Colors, Fonts, Sizes, commonStyles} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const helpDetailList = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis tellus interdum amet convallis nisl pellentesque. Elementum eros eu ultricies urna posuere auctor.',
  'Fusce nulla cursus sed at mus in ornare. Pretium, sed aliquet vivamus ornare mattis viverra dolor at pulvinar. Nec sem odio at tristique egestas augue venenatis fermentum. Et sit commodo, vestibulum viverra tincidunt sed etiam. Metus in in convallis placerat.',
  'Vehicula mauris dictum amet non nibh massa ipsum ullamcorper. Diam viverra nisl pharetra dolor. Lorem nunc sapien interdum sapien ipsum sapien, purus commodo aliquet. Odio enim, adipiscing nisl, nibh magna sit at nam in. Lorem at non lectus at. In hac donec orci nec. Magna tincidunt velit in nibh facilisi sagittis pellentesque. Mauris nisl etiam rhoncus fringilla nunc egestas blandit sed. Varius vel pulvinar adipiscing proin adipiscing.',
];

const HelpDetailScreen = ({navigation, route}) => {
  const helpTitle = route.params.helpTitle;

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {helpTitleInfo()}
          {helpDetailInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function helpDetailInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        {helpDetailList.map((item, index) => (
          <Text
            key={index}
            style={{
              marginBottom: Sizes.fixPadding,
              ...Fonts.grayColor14Regular,
            }}>
            {item}
          </Text>
        ))}
      </View>
    );
  }

  function helpTitleInfo() {
    return <Text style={styles.helpTitleStyle}>{helpTitle}</Text>;
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
  helpTitleStyle: {
    marginBottom: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    ...Fonts.blackColor16SemiBold,
  },
});

export default HelpDetailScreen;
