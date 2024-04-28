import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  BackHandler,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from '../../constants/styles';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';

const onboardingScreenList = [
  {
    id: '1',
    onboardingImage: require('../../assets/images/manage.png'),
    title: 'Secure Your Money',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text..`,
  },
  {
    id: '2',
    onboardingImage: require('../../assets/images/transfer.png'),
    title: 'Quick Money Transfer',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text.`,
  },
  {
    id: '3',
    onboardingImage: require('../../assets/images/services.png'),
    title: 'Various Services',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text.`,
  },
  {
    id: '4',
    onboardingImage: require('../../assets/images/transfer.png'),
    title: 'Quick Money Transfer',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text.`,
  },
];

const OnboardingScreen = ({navigation}) => {
  const flatListRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      flatListRef.current.stopAutoplay();
    });
    return unsubscribe;
  }, [navigation]);

  const backAction = () => {
    if (Platform.OS == 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
    }
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        navigation.removeListener('gestureEnd', backAction);
      };
    }, [backAction]),
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/bg.png')}
          style={{flex: 1}}>
          <>
            <View
              style={{
                flex: 0.85,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={item.onboardingImage}
                style={{
                  width: screenWidth - 40.0,
                  height: 374.0,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                marginBottom: Sizes.fixPadding,
                marginHorizontal: Sizes.fixPadding * 2.0,
              }}>
              <Text style={{textAlign: 'center', ...Fonts.blackColor26Bold}}>
                {item.title}
              </Text>
              <Text
                style={{
                  marginTop: Sizes.fixPadding - 5.0,
                  textAlign: 'center',
                  ...Fonts.blackColor16Regular,
                }}>
                {item.description}
              </Text>
            </View>
          </>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <>
        <Carousel
          ref={flatListRef}
          data={onboardingScreenList}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          onSnapToItem={index => {
            setActiveSlide(index);
          }}
          autoplay={true}
          loop={true}
          autoplayInterval={4000}
          slideStyle={{width: screenWidth}}
        />
        {pagination()}
        {skipNextAndLogin()}
      </>
      {exitInfo()}
    </View>
  );

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={commonStyles.exitWrapper}>
        <Text style={{...Fonts.whiteColor14SemiBold}}>
          Press Back Once Again to Exit
        </Text>
      </View>
    ) : null;
  }

  function skipNextAndLogin() {
    return (
      <View style={styles.skipAndDoneWrapStyle}>
        {activeSlide != 3 ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('LoginRegister')}
            style={styles.skipButtonStyle}>
            <Text style={{...Fonts.grayColor16Bold}}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}
        {activeSlide == 3 ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('LoginRegister')}
            style={styles.nextAndLoginButtonStyle}>
            <Text style={{...Fonts.whiteColor16Bold}}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              if (activeSlide == 0) {
                flatListRef.current.snapToItem(1);
              } else if (activeSlide == 1) {
                flatListRef.current.snapToItem(2);
              } 
            }}
            style={styles.nextAndLoginButtonStyle}>
            <Text style={{...Fonts.whiteColor16Bold}}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function pagination() {
    return (
      <Pagination
        dotsLength={onboardingScreenList.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: 'absolute',
          bottom: 0.0,
          alignSelf: 'center',
        }}
        dotStyle={styles.activeDotStyle}
        inactiveDotStyle={styles.dotStyle}
        inactiveDotScale={0.8}
      />
    );
  }
};

const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: Colors.grayColor,
    marginHorizontal: Sizes.fixPadding - 15.0,
  },
  activeDotStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 6.0,
    height: 12.0,
    width: 12.0,
    marginHorizontal: Sizes.fixPadding - 15.0,
  },
  skipAndDoneWrapStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20.0,
    left: 20.0,
    right: 20.0,
  },
  nextAndLoginButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding - 3.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonStyle: {
    backgroundColor: '#E6E6E6',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding - 3.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingScreen;
