import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
    Modal,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import axios from 'axios';
import { useState } from 'react';
import { Circle } from 'react-native-animated-spinkit';

const BorderTaxBookingDetailsScreen = ({ navigation, route }) => {
    const { enquiry } = route.params;
    const [isLoading, setisLoading] = useState(false);

    const postQuery = async () => {
        const baseUrl = "https://api.allroadtaxsolutions.com";

        try {
            // state, vehicleNumber, seatingCapacity, borderEntry, taxMode, fromDate, toDate,userId

            setisLoading(true);
            const response = await axios.post(`${baseUrl}/enquiry`, {
                state: enquiry.state,
                vehicleNumber: enquiry?.vehicleNumber,
                seatingCapacity: enquiry?.seatingCapacity === 1 ? 5 : enquiry?.seatingCapacity === 2 ? 7 : 8,
                borderEntry: enquiry?.borderEntry,
                taxMode: enquiry?.taxMode,
                fromDate: enquiry?.fromDate,
                toDate: enquiry?.toDate,
                userId: enquiry?.user?.id,
            });

            if (response.status === 200) {
                console.log(response.data)
                await sendmail();
                alert('Query Submitted');
                navigation.pop();
            } else {
                throw new Error("An error has occurred");
            }
        } catch (error) {
            console.log(error.response.data)
            alert("Try Again");
        }finally{
            setisLoading(false);
        }

    }

    function createMailHTML(enquiry) {
        // Generate HTML string using string interpolation
        const htmlString = `
          <h2>Enquiry Details:</h2>
          <p><strong>State:</strong> ${enquiry.state}</p>
          <p><strong>Vehicle Number:</strong> ${enquiry.vehicleNumber}</p>
          <p><strong>Seating Capacity:</strong> ${enquiry.seatingCapacity}</p>
          <p><strong>Border Entry:</strong> ${enquiry.borderEntry}</p>
          <p><strong>Tax Mode:</strong> ${enquiry.taxMode}</p>
          <p><strong>From Date:</strong> ${enquiry.fromDate}</p>
          <p><strong>To Date:</strong> ${enquiry.toDate}</p>
        `;

        return htmlString;
    }

    const sendmail = async () => {
        const baseUrl = "https://api.allroadtaxsolutions.com";
        try {
            // state, vehicleNumber, seatingCapacity, borderEntry, taxMode, fromDate, toDate,userId
            const response = await axios.post(`${baseUrl}/email`, {
                html: createMailHTML(enquiry)
            });

            if (response.status === 200) {
                console.log(response.data)
                // navigation.push('BottomTabBar',{ userData: response.data })
            } else {
                throw new Error("Error Sending Email");
            }
        } catch (error) {
            console.log(error.response.data)
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {stateandvehicleInfo()}
                    {busInfo()}
                    {totalAmountInfo()}
                    {continueButton()}
                </ScrollView>
            </View>
                {loading()}
        </View>
    );

    function loading() {
        return (
          <Modal visible={isLoading} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <View style={styles.dialogStyle}>
              <Circle size={50} color={Colors.primaryColor} />
              <Text
                style={{
                  ...Fonts.grayColor16SemiBold,
                  marginTop: Sizes.fixPadding * 2.5,
                }}>
                Please Wait..
              </Text>
            </View>
          </Modal>
        );
      }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={async () => {
                    await postQuery();
                    // await sendmail();

                 

                }}
                // onPress={() => navigation.push('TravellersDetail')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor22Bold }}>Continue</Text>
            </TouchableOpacity>
        );
    }

    function totalAmountInfo() {
        return (
            <View
                style={{
                    marginTop: Sizes.fixPadding * 40.0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{ ...Fonts.blackColor16Bold }}>Total Amount ₹{enquiry?.price}.00</Text>
            </View>
        );
    }

    function busInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text>
                    <Text style={{ ...Fonts.blackColor18SemiBold }}>{enquiry?.state?.state}</Text>
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                        {"Name-"}{enquiry?.user?.fullname}
                    </Text>
                </Text>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    {"Email-"}{enquiry?.user?.email}
                </Text>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    {"Mobile-"}{"+91-"}{enquiry?.user?.mobile}
                </Text>
            </View>
        );
    }

    function stateandvehicleInfo() {
        return (
            <View style={styles.stateandvehicleInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>Entry State-{enquiry?.state}</Text>
                <Text style={{ ...Fonts.blackColor16Regular }}>
                    {enquiry?.vehicleNumber.toUpperCase()} | seats-{enquiry?.seatingCapacity === 1 ? "4+1" : enquiry?.seatingCapacity === 2 ? "6+1" : "7+1"}
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
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor20Bold }}>
                    Payment Details
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
    stateandvehicleInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        borderWidth: 1.5,
        borderColor: 'rgba(86, 0, 65, 0.2)',
        marginVertical: Sizes.fixPadding,
        ...commonStyles.buttonShadow,
    },
    dialogStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
        width: '80%',
        alignSelf: 'center'
      },
});

export default BorderTaxBookingDetailsScreen;
