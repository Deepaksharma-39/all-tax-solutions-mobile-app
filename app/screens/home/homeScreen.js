import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Linking,
} from "react-native";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { Circle } from "react-native-animated-spinkit";
import Carousel, { Pagination } from "react-native-snap-carousel-v4";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
import { fetchBanners, selectBanner } from "../../redux/bannerSlice";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector(selectAuth);
  const userData = user;
  const [showLogoutDialog, setshowLogoutDialog] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const flatListRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(selectBanner);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      setisLoading(false);
    }
  }, [status]);

  function createMailHTML(tag) {
    // Generate HTML string using string interpolation
    const htmlString = `
      <h2>${tag} Query:</h2>
      <p><strong>Name:</strong> ${userData.fullname}</p>
      <p><strong>Phone:</strong> ${userData.mobile}</p>
      <p><strong>Email:</strong> ${userData.email}</p>
    
    `;

    return htmlString;
  }
  const sendmail = async (tag) => {
    console.log("here");
    setisLoading(true);
    const baseUrl = "https://api.allroadtaxsolutions.com";
    try {
      // state, vehicleNumber, seatingCapacity, borderEntry, taxMode, fromDate, toDate,userId
      const response = await axios.post(`${baseUrl}/email`, {
        html: createMailHTML(tag),
      });
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        setshowLogoutDialog(true);
        // navigation.push('BottomTabBar',{ userData: response.data })
      } else {
        throw new Error("Error Sending Email");
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setisLoading(false);
    }
  };

  const convertedBanners = Array.isArray(data)
    ? data.map((banner) => ({
        moviePoster: `https://api.allroadtaxsolutions.com/admin/banner/${banner.filename}`,
        description: banner.description,
      }))
    : [];



  if (status === "failed") {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}

        <FlatList
          ListHeaderComponent={
            <>
              {imageSlider()}
              {banner()}
              {insuranceFastTagTAxes()}
              {payBorderTaxButton()}
              {DownloadRecieptButton()}
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
        />
        {loading()}
      </View>
      {logoutDialog()}
    </View>
  );

  function loading() {
    return (
      <Modal
        visible={isLoading}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.dialogStyle}>
          <Circle size={50} color={Colors.primaryColor} />
          <Text
            style={{
              ...Fonts.grayColor16SemiBold,
              marginTop: Sizes.fixPadding * 2.5,
            }}
          >
            Please Wait..
          </Text>
        </View>
      </Modal>
    );
  }

  function imageSlider() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        // onPress={() => navigation.push('MovieCinemaAndSeatSelection', { item })}
        style={styles.movieSliderWrapStyle}
      >
        <Image
          source={{ uri: item.moviePoster }}
          style={styles.moviePosterStyle}
        />
        <Text
          style={{
            paddingVertical: Sizes.fixPadding - 5.0,
            paddingHorizontal: Sizes.fixPadding,
            ...Fonts.blackColor14SemiBold,
          }}
        >
          <Text>
            <Text style={{ ...Fonts.redColor14ExtraBold }}>
              {" "}
              {item.description}
            </Text>
          </Text>
        </Text>
      </TouchableOpacity>
    );
    return (
      <View>
        <Carousel
          ref={flatListRef}
          data={convertedBanners || []}
          sliderWidth={screenWidth}
          autoplay={true}
          loop={true}
          autoplayInterval={4000}
          itemWidth={screenWidth}
          renderItem={renderItem}
          onSnapToItem={(index) => {
            setActiveSlide(index);
          }}
        />
        {pagination()}
      </View>
    );
  }
  function pagination() {
    return (
      <Pagination
        dotsLength={data ? data.length : 1}
        activeDotIndex={activeSlide}
        containerStyle={styles.sliderPaginationWrapStyle}
        dotStyle={styles.sliderActiveDotStyle}
        inactiveDotStyle={styles.sliderInactiveDotStyle}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/users/user.png")}
            style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
          />
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor14SemiBold }}>
              {userData.fullname}
            </Text>
          </View>
        </View>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('Notifications')}>
            <Image
              source={require('../../assets/images/icons/notification.png')}
              style={{
                width: 16.0,
                height: 16.0,
                marginHorizontal: Sizes.fixPadding + 5.0,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        
        </View> */}
      </View>
    );
  }

  function insuranceFastTagTAxes() {
    return (
      <View style={styles.offersRewardsAndInviteNowOptionsWrapStyle}>
        {offersRewardOrInviteButton({
          icon: require("../../assets/images/icons/insurance.png"),
          title: "Insurance",
          navigateTo: "Offers",
        })}
        {offersRewardOrInviteButton({
          icon: require("../../assets/images/icons/fastag.png"),
          title: "Fasttag",
          navigateTo: "Rewards",
        })}
        {offersRewardOrInviteButton({
          icon: require("../../assets/images/icons/tax.png"),
          title: "Taxes",
          navigateTo: "InviteFriends",
        })}
      </View>
    );
  }

  function payBorderTaxButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push("BorderTax", { userData: userData })}
        style={styles.payBorderTaxButton}
      >
        <Text style={{ ...Fonts.whiteColor22Bold }}>Border Tax Payment</Text>
      </TouchableOpacity>
    );
  }

  function DownloadRecieptButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.push("DownloadReciept", { userData: userData })
        }
        style={styles.DownloadRecieptButton}
      >
        <Text style={{ ...Fonts.whiteColor22Bold }}>Download Receipt</Text>
      </TouchableOpacity>
    );
  }
  function offersRewardOrInviteButton({ icon, title, navigateTo }) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => sendmail(title)}
        style={styles.offersRewardOrInviteButtonStyle}
      >
        <Image
          source={icon}
          style={{ width: 25.0, height: 25.0, tintColor: "white" }}
          resizeMode="contain"
        />
        <Text
          numberOfLines={1}
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.whiteColor16SemiBold,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  function logoutDialog() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutDialog}
        onRequestClose={() => {
          setshowLogoutDialog(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setshowLogoutDialog(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={styles.dialogContainerStyle}
            >
              <View>
                <Text
                  style={{ textAlign: "center", ...Fonts.blackColor18Bold }}
                >
                  Agent will contact you Shortly
                </Text>
                <View
                  style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setshowLogoutDialog(false)}
                    style={styles.cancelButtonStyle}
                  >
                    <Text style={{ ...Fonts.primaryColor22Bold }}>Dismiss</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
  function banner() {
    const makeCall = () => {
      // Replace with the phone number you want to dial
      const phoneNumber = 'tel:+916262959544';
      
      Linking.openURL(phoneNumber).catch(err => console.error('Failed to make a call', err));
    };
    return (
      <View style={styles.bannerWrapStyle}>
        <View>
          <Text style={{ ...Fonts.whiteColor16Bold }}>
          Pay all your payments seamlessly....
          </Text>
          <Text style={{ ...Fonts.whiteColor14Regular }}>
            Insurance premiums, taxes, mobile recharge, Fastag, and more
          </Text>
        </View>
        <View style={styles.knowMoreButtonStyle} onTouchEnd={makeCall}>
      <Text style={{ ...Fonts.whiteColor18Bold }}>Contact now</Text>
    </View>
        <Image
          source={require("../../assets/images/banner_image1.png")}
          style={styles.bannerImageStyle}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...commonStyles.boxShadow,
  },
  searchInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  offersRewardOrInviteButtonStyle: {
    backgroundColor: Colors.secondaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
  },
  offersRewardsAndInviteNowOptionsWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding,
    marginTop: 20,
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

  payBorderTaxButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: "rgba(86, 0, 65, 0.2)",
    marginVertical: Sizes.fixPadding,
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
  logoutButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    borderWidth: 1.5,
    borderColor: "rgba(86, 0, 65, 0.2)",
    marginLeft: Sizes.fixPadding,
    flex: 1,
    ...commonStyles.buttonShadow,
  },
  cancelButtonStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: Sizes.fixPadding,
    borderColor: Colors.lightWhiteColor,
    borderWidth: 1.5,
    ...commonStyles.boxShadow,
  },
  profileOptionsWrapStyle: {
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dialogContainerStyle: {
    padding: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    width: "80%",
    alignSelf: "center",
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
  dialogStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    padding: Sizes.fixPadding * 2.0,
    width: "80%",
    alignSelf: "center",
  },
  disabledButtonStyle: {
    backgroundColor: Colors.grayColor,
  },
  moviePosterStyle: {
    height: 150.0,
    width: "100%",
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
  },
  movieSliderWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    ...commonStyles.boxShadow,
  },
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
    position: "absolute",
    bottom: -35.0,
    left: 0.0,
    right: 0.0,
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
});

export default HomeScreen;
