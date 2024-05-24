import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import { useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-native-paper';
import { Circle } from 'react-native-animated-spinkit';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/authSlice';

function formatDate(timestamp) {
  const date = new Date(timestamp);

  // Array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get individual components of the date
  const day = String(date.getDate()).padStart(2, '0');
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Format the date in "DD/MMMM/YYYY" format
  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}
const DownloadReceipt = ({ navigation }) => {
  
  const { user } = useSelector(selectAuth);
  const userData=user;
  const [isLoading,setisLoading]=useState(true);
  const [enquiryList,setEnquiryList]=useState(null);

  const baseUrl = "https://api.allroadtaxsolutions.com";

  const getReceipt = async () => {
    try {
      setisLoading(true);
      console.log("Before making request...");
      const response = await axios.get(`${baseUrl}/enquiry/user/${userData.id}`, {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      });
  
      if (response.status === 200) {
        console.log("Response data:", response.data);
        setEnquiryList(response.data)
        setisLoading(false);
      } else {
        console.log("An error has occurred. Status:", response.status);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("Error caught:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
      alert("Try Again");
    }finally{
      setisLoading(false);
    }
  }
  
  const handleDownload = async(info) => {
    if (info.receiptPath) {
     const path=baseUrl+"/upload/"+info.receiptPath;
     Linking.openURL(path);
    } else {
      alert("Receipt unavailable");
    }
  };
  useEffect(() => {
    console.log("Calling getReceipt function...");
    getReceipt();
  }, []);
  


  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {enquiryList&&enquiryList.map((info, index) => (
            <>
              {paymentMethodInfo(info)}
              { divider()}
            </>
          ))}
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

  function paymentMethodInfo(info) {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <View style={styles.paymentMethodTitleStyle}>
          <Text style={{ ...Fonts.blackColor20Bold }}>{info?.vehicleNumber}</Text>
          {info.receiptPath ? ( // Check if receiptPath exists
          <Text
            onPress={()=>{handleDownload(info)}}
            style={{ ...Fonts.greenColor16Bold }}>
            View
          </Text>
        ) : (
          <Text style={{ ...Fonts.redColor16Bold }}>Unavailable</Text>
        )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Image
            source={require('../../assets/images/icons/hdfc.png')}
            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
          /> */}
          <View style={{ marginLeft: Sizes.fixPadding }}>
            {/* Ensure that both paymentMethod and cardNumber are properly wrapped */}
            <Text style={{ ...Fonts.blackColor16SemiBold }}>{info?.state}</Text>
            <Text style={{ ...Fonts.grayColor14Regular }}>{formatDate(info?.fromDate)}{"→"}{formatDate(info?.toDate)}</Text>
          </View>
        </View>
      </View>
    );
  }
  

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.grayColor,
          height: 1.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      />
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
          Download Receipt
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
  paymentMethodTitleStyle: {
    marginBottom: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default DownloadReceipt;
