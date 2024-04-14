import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Sizes,
  Colors,
  Fonts,
  screenWidth,
  commonStyles,
} from '../../constants/styles';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';

const movieBannerSliderList = [
  {
    moviePoster: require('../../assets/images/moive/shershaah.png'),
    cashBackPercentage: 50,
    movieName: 'Shershaah',
    movieLanguage: 'Hindi',
    movieCategory: '(U/A)',
  },
  {
    moviePoster: require('../../assets/images/moive/bellbottom.png'),
    cashBackPercentage: 40,
    movieName: 'Bell Bottom',
    movieLanguage: 'Hindi',
    movieCategory: '(U/A)',
  },
  {
    moviePoster: require('../../assets/images/moive/chhichhore.png'),
    cashBackPercentage: 30,
    movieName: 'Chhichhore',
    movieLanguage: 'Hindi',
    movieCategory: '(U/A)',
  },
];

const moviesList = [
  {
    id: '1',
    moviePoster: require('../../assets/images/moive/bellbottom.png'),
    movieName: 'Bell Bottom',
    movieLanguage: 'Hindi',
    movieCategory: '(U/A)',
  },
  {
    id: '2',
    moviePoster: require('../../assets/images/moive/chhichhore.png'),
    movieName: 'Chhichhore',
    movieLanguage: 'Hindi',
    movieCategory: '(U/A)',
  },
  {
    id: '3',
    moviePoster: require('../../assets/images/moive/dreamgirl.png'),
    movieName: 'Dream Girl',
    movieLanguage: 'Hindi',
    movieCategory: '(U/A)',
  },
  {
    id: '4',
    moviePoster: require('../../assets/images/moive/bellbottom.png'),
    movieName: 'Bell Bottom',
    movieLanguage: 'Hindi',
    movieCategory: '(U/A)',
  },
];

const languagesList = [
  'All',
  'Hindi',
  'English',
  'Marathi',
  'Tamil',
  'Punjabi',
  'Telugu',
];

const MovieTicketBookingScreen = ({navigation}) => {
  const flatListRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      flatListRef.current.stopAutoplay();
    });
    return unsubscribe;
  }, [navigation]);

  const [state, setState] = useState({
    activeSlide: 0,
    movieBanners: movieBannerSliderList,
    selectedLanguage: languagesList[0],
  });

  const updateState = data => setState(state => ({...state, ...data}));

  const {activeSlide, movieBanners, selectedLanguage} = state;

  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: Sizes.fixPadding * 2.0}}>
        {movieSlider()}
        {movieLanguages()}
        {movies()}
      </ScrollView>
    </View>
  );

  function movies() {
    return moviesList.map(item => (
      <View key={item.id}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.push('MovieCinemaAndSeatSelection', {item})}
          style={styles.movieInfoWrapStyle}>
          <Image source={item.moviePoster} style={styles.moviePosterStyle} />
          <View style={styles.movieDetailWrapStyle}>
            <View>
              <Text style={{...Fonts.blackColor14SemiBold}}>
                {item.movieName}
              </Text>
              <Text style={{...Fonts.grayColor12Regular}}>
                {item.movieLanguage} {item.movieCategory}
              </Text>
            </View>
            <Text style={{...Fonts.primaryColor14ExtraBold}}>Book Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    ));
  }

  function movieLanguages() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => updateState({selectedLanguage: item})}
        style={{
          ...styles.languageWrapStyle,
          backgroundColor:
            selectedLanguage == item
              ? Colors.secondaryColor
              : Colors.whiteColor,
        }}>
        <Text
          style={
            selectedLanguage == item
              ? {...Fonts.whiteColor16ExtraBold}
              : {...Fonts.secondaryColor16ExtraBold}
          }>
          {item}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View>
        <FlatList
          data={languagesList}
          keyExtractor={index => `${index}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingVertical: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function movieSlider() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push('MovieCinemaAndSeatSelection', {item})}
        style={styles.movieSliderWrapStyle}>
        <Image source={item.moviePoster} style={styles.moviePosterStyle} />
        <Text
          style={{
            paddingVertical: Sizes.fixPadding - 5.0,
            paddingHorizontal: Sizes.fixPadding,
            ...Fonts.blackColor14SemiBold,
          }}>
          <Text>
            GET
            <Text style={{...Fonts.redColor14ExtraBold}}>
              {' '}
              {item.cashBackPercentage}%{' '}
            </Text>
            CASHBACK ON MOIVE TICKETS
          </Text>
        </Text>
      </TouchableOpacity>
    );
    return (
      <View>
        <Carousel
          ref={flatListRef}
          data={movieBanners}
          sliderWidth={screenWidth}
          autoplay={true}
          loop={true}
          autoplayInterval={4000}
          itemWidth={screenWidth}
          renderItem={renderItem}
          onSnapToItem={index => {
            updateState({activeSlide: index});
          }}
        />
        {pagination()}
      </View>
    );
  }

  function pagination() {
    return (
      <Pagination
        dotsLength={movieBanners.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.sliderPaginationWrapStyle}
        dotStyle={styles.sliderActiveDotStyle}
        inactiveDotStyle={styles.sliderInactiveDotStyle}
      />
    );
  }
};

const styles = StyleSheet.create({
  sliderActiveDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4.0,
    backgroundColor: Colors.secondaryColor,
    marginHorizontal: Sizes.fixPadding - 15.0,
  },
  sliderInactiveDotStyle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: Colors.grayColor,
  },
  sliderPaginationWrapStyle: {
    position: 'absolute',
    bottom: -35.0,
    left: 0.0,
    right: 0.0,
  },
  moviePosterStyle: {
    height: 150.0,
    width: '100%',
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
  },
  movieSliderWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    ...commonStyles.boxShadow,
  },
  languageWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 110.0,
    borderRadius: Sizes.fixPadding - 5.0,
    borderColor: Colors.secondaryColor,
    borderWidth: 1.0,
    paddingVertical: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
  },
  movieInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    ...commonStyles.boxShadow,
  },
  movieDetailWrapStyle: {
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MovieTicketBookingScreen;
