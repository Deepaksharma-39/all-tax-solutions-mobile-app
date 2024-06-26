import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles, screenHeight, screenWidth } from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Menu } from 'react-native-material-menu';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/authSlice';
import { selectVenue } from '../../redux/venueSlice';


const priceList = [
    '4 + 1',
    '6 + 1',
    '7 + 1',

];

const monthsList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sup',
    'Oct',
    'Nov',
    'Des',
];
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
const BorderTaxScreen = ({ navigation }) => {

    const { user } = useSelector(selectAuth);
    const userData=user;
    const dateObj = new Date();
    const venue = useSelector(selectVenue);

    const todayDate = `${dateObj.getUTCDate()} ${monthsList[dateObj.getUTCMonth()]
        }, ${dateObj.getUTCFullYear()}`;

    const [stateData, setStateData] = useState([]);
    const [state, setState] = useState({
        vehicleNumber: null,
        showCityOptions: false,
        selectedCity: "Delhi",
        selectedState: stateData || {},
        showPriceOptions: false,
        selectedPrice: priceList[0],
        showCalender: false,
        departureDate: todayDate,
        calenderFrom: null,
        returnDate: todayDate,
        seatOption: null,
        activeSlide: 0,
        movieBanners: movieBannerSliderList,

    });


    const updateState = data => setState(state => ({ ...state, ...data }));

    const { vehicleNumber, showCityOptions, selectedCity, showCalender, departureDate, calenderFrom, returnDate, seatOption, activeSlide, movieBanners, selectedState } = state;

    const [enquiry, setEnquiry] = useState({
        state: {},
        vehicleNumber: vehicleNumber,
        seatingCapacity: seatOption,
        borderEntry: "undefined",
        taxMode: "undefined",
        fromDate: departureDate,
        toDate: returnDate,
        user: userData,
        price: 0
    });

    const updateEnquiry = data => setEnquiry(enquiry => ({ ...enquiry, ...data }));
   

    useEffect(() => {
        updateEnquiry({
            state: selectedState.state,
            vehicleNumber: vehicleNumber,
            seatingCapacity: seatOption,
            borderEntry: "undefined",
            taxMode: "undefined",
            fromDate: departureDate,
            toDate: returnDate,
            userId: userData.id,
            price: seatOption === 1 ? selectedState?.perDayCharge41 : seatOption === 2 ? selectedState?.perDayCharge61 : selectedState.perDayCharge71
        })
        if(venue.status==='succeeded'){
            setStateData(venue.data)
        }else{
            setStateData(["Failed to get information"])
        }
    }, [selectedState, vehicleNumber, seatOption, departureDate, returnDate,venue.status]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}>
                    {banner()}
                    {editStateName()}
                    {editSeatOption()}
                    {editVehicleNumber()}
                    {editFromAndToDate()}
                    {continueButton()}
                </ScrollView>
            </View>
            {calender()}

        </View>
    );



    function continueButton() {
        const isDisabled =
            !enquiry.state || !enquiry.vehicleNumber || !enquiry.seatingCapacity;

        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('BorderTaxBooking', { enquiry: enquiry })}
                style={[styles.updateProfileButtonStyle, isDisabled && styles.disabledButtonStyle]}
                disabled={isDisabled}>
                <Text style={{ ...Fonts.whiteColor22Bold }}>Continue</Text>
            </TouchableOpacity>
        );
    }



    function editSeatOption() {
        return (
            <View
                style={{
                    marginBottom: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    ustifyContent: "space-between",
                }}>
                <Text style={{ ...Fonts.grayColor16SemiBold, marginRight: Sizes.fixPadding * 2.0, }}>Select Seats</Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => updateState({ seatOption: 1 })}
                    style={{
                        marginRight: Sizes.fixPadding * 2.0,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            ...styles.radioButtonStyle,
                            borderColor:
                                seatOption == 1
                                    ? Colors.secondaryColor
                                    : Colors.grayColor,
                        }}>
                        {seatOption == 1 ? (
                            <View style={styles.radioButtonInnerCircleStyle} />
                        ) : null}
                    </View>
                    <Text
                        style={{
                            marginLeft: Sizes.fixPadding,
                            ...(seatOption == 1
                                ? { ...Fonts.blackColor18SemiBold }
                                : { ...Fonts.grayColor18SemiBold }),
                        }}>
                        4+1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => updateState({ seatOption: 2 })}
                    style={{ marginRight: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            ...styles.radioButtonStyle,
                            borderColor:
                                seatOption == 2
                                    ? Colors.secondaryColor
                                    : Colors.grayColor,
                        }}>
                        {seatOption == 2 ? (
                            <View style={styles.radioButtonInnerCircleStyle} />
                        ) : null}
                    </View>
                    <Text
                        style={{
                            marginLeft: Sizes.fixPadding,
                            ...(seatOption == 2
                                ? { ...Fonts.blackColor18SemiBold }
                                : { ...Fonts.grayColor18SemiBold }),
                        }}>
                        6+1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => updateState({ seatOption: 3 })}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            ...styles.radioButtonStyle,
                            borderColor:
                                seatOption == 3
                                    ? Colors.secondaryColor
                                    : Colors.grayColor,
                        }}>
                        {seatOption == 3 ? (
                            <View style={styles.radioButtonInnerCircleStyle} />
                        ) : null}
                    </View>
                    <Text
                        style={{
                            marginLeft: Sizes.fixPadding,
                            ...(seatOption == 3
                                ? { ...Fonts.blackColor18SemiBold }
                                : { ...Fonts.grayColor18SemiBold }),
                        }}>
                        7+1
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function editVehicleNumber() {
        return (
            <View
                style={{
                    marginBottom: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                <Text style={{ ...Fonts.grayColor16SemiBold }}>Vehicle Number</Text>
                <TextInput
                    value={vehicleNumber}
                    onChangeText={text => updateState({ vehicleNumber: text })}
                    style={styles.textFieldWrapStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="default"
                />
            </View>
        );
    }

    function editStateName() {
        return (

            <View
                style={{
                    marginVertical: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding,
                        ...Fonts.grayColor16SemiBold,
                    }}>
                    Select State
                </Text>
                <Menu
                    visible={showCityOptions}
                    style={{ paddingTop: Sizes.fixPadding, width: screenWidth - 40.0 }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => updateState({ showCityOptions: true })}
                            style={styles.selectedOperatorInfoWrapStyle}>
                            <View
                                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

                                <Text
                                    style={{

                                        ...Fonts.blackColor18SemiBold,
                                    }}>
                                    {selectedState?.state}
                                </Text>
                            </View>
                            <MaterialIcons
                                name="arrow-drop-down"
                                color={Colors.secondaryColor}
                                size={27}
                            />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => updateState({ showCityOptions: false })}>
                    <ScrollView style={{ maxHeight: 400 }}>
                        {stateData && stateData.map(item => (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => {
                                    updateState({
                                        selectedCity: item?.state,
                                        selectedState: item,
                                        showCityOptions: false,
                                    });
                                }}
                                key={item.id}
                                style={styles.operatorOptionsWrapStyle}>

                                <Text
                                    style={{
                                        marginLeft: Sizes.fixPadding,
                                        ...Fonts.blackColor18SemiBold,
                                    }}>
                                    {item?.state}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Menu>
            </View>
        );
    }

    function editFromAndToDate() {
        return (
            <View style={styles.departureAndReturnDateInfoWrapStyle}>
                <View style={{ marginHorizontal: Sizes.fixPadding, flex: 1 }}>
                    <Text
                        style={{
                            marginBottom: Sizes.fixPadding - 5.0,
                            ...Fonts.grayColor16SemiBold,
                        }}>
                        From Date
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() =>
                            updateState({ calenderFrom: 'departure', showCalender: true })
                        }
                        style={styles.departureAndReturnDateWrapStyle}>
                        <Text
                            numberOfLines={1}
                            style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                            {departureDate ? departureDate : todayDate}
                        </Text>
                        <MaterialCommunityIcons
                            name="calendar-range"
                            size={20}
                            color={Colors.grayColor}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: Sizes.fixPadding, flex: 1 }}>
                    <Text
                        style={{
                            marginBottom: Sizes.fixPadding - 5.0,
                            ...Fonts.grayColor16SemiBold,
                        }}>
                        To Date
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() =>
                            updateState({ calenderFrom: 'return', showCalender: true })
                        }
                        style={styles.departureAndReturnDateWrapStyle}>
                        <Text
                            numberOfLines={1}
                            style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                            {returnDate ? returnDate : todayDate}
                        </Text>
                        <MaterialCommunityIcons
                            name="calendar-range"
                            size={20}
                            color={Colors.grayColor}
                        />
                    </TouchableOpacity>
                </View>

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
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor20Bold }}>
                    Pay Border Tax
                </Text>
            </View>
        );
    }

    function calender() {
        const handleConfirm = (e, selectedDate) => {
            calenderFrom == 'departure'
                ? updateState({
                    departureDate: `${selectedDate.getUTCDate()} ${monthsList[selectedDate.getUTCMonth()]
                        }, ${selectedDate.getUTCFullYear()}`,
                    showCalender: false,
                })
                : updateState({
                    returnDate: `${selectedDate.getUTCDate()} ${monthsList[selectedDate.getUTCMonth()]
                        }, ${selectedDate.getUTCFullYear()}`,
                    showCalender: false,
                });
        };

        return (
            showCalender && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    minimumDate={new Date()}
                    onChange={handleConfirm}
                    accentColor={Colors.primaryColor}
                />
            )
        );
    }

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

};



const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightWhiteColor,
    ...commonStyles.boxShadow,
  },
  textFieldWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    ...commonStyles.boxShadow,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    height: 50.0,
    marginTop: Sizes.fixPadding - 5.0,
    ...Fonts.blackColor18Regular,
  },
  updateProfileButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: "rgba(86, 0, 65, 0.2)",
    marginVertical: Sizes.fixPadding * 3.0,
    ...commonStyles.buttonShadow,
  },
  disabledButtonStyle: {
    backgroundColor: Colors.grayColor,
  },
  selectedOperatorInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...commonStyles.boxShadow,
  },
  operatorOptionsWrapStyle: {
    flex: 1,
    marginHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  departureAndReturnDateInfoWrapStyle: {
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
  },
  departureAndReturnDateWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
    ...commonStyles.boxShadow,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioButtonStyle: {
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInnerCircleStyle: {
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    backgroundColor: Colors.secondaryColor,
  },
  bannerWrapStyle: {
    marginVertical: Sizes.fixPadding * 1.5,
    backgroundColor: Colors.secondaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "space-between",
    padding: Sizes.fixPadding,
  },
  bannerImageStyle: {
    position: "absolute",
    bottom: 0.0,
    right: 0.0,
    width: 200.0,
    height: 150.0,
  },
  knowMoreButtonStyle: {
    marginTop: Sizes.fixPadding * 3.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    alignSelf: "flex-start",
  },
});

export default BorderTaxScreen;
