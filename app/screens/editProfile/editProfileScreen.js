import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal
} from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../redux/authSlice';
import { Circle } from "react-native-animated-spinkit";

const EditProfileScreen = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const userData=user;
  const [state, setState] = useState({
    fullname: userData.fullname,
    email: userData.email,
    mobileNumber: userData.mobile,
    password: userData?.password,
    showBottomSheet: false,
  });

 
  const updateState = data => setState(state => ({ ...state, ...data }));

  const { fullname, email, mobileNumber, password, showBottomSheet } = state;


  const updateUserData=async ()=>{
    setisLoading(true);
    const baseUrl = "https://api.allroadtaxsolutions.com";
    try {
      const response = await axios.put(`${baseUrl}/users/${userData.id}`, {
        fullname: state.fullname,
        mobile: state.registerMobileNo,
        email: state.email,
        password: state.registerPassword
      });

      if (response.status === 200) {
        dispatch(login(response.data));
        alert(`Update Successful`);
        updateState({ viewLoginInfo: true })
      } else {
        alert(`Failed Please try again!`);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log(error.response.data)
      alert("Try again");
    }finally{
      setisLoading(false);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {profileImage()}
          {editUserNameInfo()}
          {editEmailAddressInfo()}
          {editMobileNumberInfo()}
          {editPasswordInfo()}
          {updateProfileButton()}
        </ScrollView>
        {changeProfilePicOptionsSheet()}
        {loading()}

      </View>
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

  function changeProfilePicOptionsSheet() {
    return (      
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBottomSheet}
        onRequestClose={() => {
          updateState({ showBottomSheet: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            updateState({ showBottomSheet: false });
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={{ backgroundColor: Colors.whiteColor }}
            >
              <View
                style={{
                  backgroundColor: Colors.whiteColor,
                  paddingVertical: Sizes.fixPadding + 5.0,
                }}
              >
                <Text
                  style={{
                    marginBottom: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor20Bold,
                    textAlign: 'center',
                  }}>
                  Choose Option
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => updateState({ showBottomSheet: false })}
                  style={{
                    marginVertical: Sizes.fixPadding,
                    flexDirection: 'row',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={20}
                    color={Colors.blackColor}
                  />
                  <Text
                    style={{
                      ...Fonts.blackColor16SemiBold,
                      marginLeft: Sizes.fixPadding,
                    }}>
                    Take a Picture
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => updateState({ showBottomSheet: false })}
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                  }}
                >
                  <MaterialCommunityIcons
                    name="image-multiple-outline"
                    size={20}
                    color={Colors.blackColor}
                  />
                  <Text
                    style={{
                      ...Fonts.blackColor16SemiBold,
                      marginLeft: Sizes.fixPadding,
                    }}>
                    Select from Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function updateProfileButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={async() => {
          await updateUserData();
          navigation.pop()
        }}
        style={styles.updateProfileButtonStyle}>
        <Text style={{ ...Fonts.whiteColor22Bold }}>Update Profile</Text>
      </TouchableOpacity>
    );
  }

  function editPasswordInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor16SemiBold }}>Password</Text>
        <TextInput
          value={password}
          onChangeText={text => updateState({ password: text })}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
          secureTextEntry
        />
      </View>
    );
  }

  function editMobileNumberInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor16SemiBold }}>Mobile Number</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={text => updateState({ mobileNumber: text })}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="numeric"
        />
      </View>
    );
  }

  function editEmailAddressInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor16SemiBold }}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={text => updateState({ email: text })}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
        />
      </View>
    );
  }

  function editUserNameInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ ...Fonts.grayColor16SemiBold }}>Full Name</Text>
        <TextInput
          value={fullname}
          onChangeText={text => updateState({ fullname: text })}
          style={styles.textFieldWrapStyle}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function profileImage() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => updateState({ showBottomSheet: true })}
        style={{
          alignSelf: 'center',
          marginVertical: Sizes.fixPadding * 2.0,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/users/user.png')}
          style={{ width: 85.0, height: 85.0, borderRadius: 42.5 }}
        />
        {/* <View style={styles.addIconWrapStyle}>
          <MaterialIcons name="add" color={Colors.whiteColor} size={18} />
        </View> */}
      </TouchableOpacity>
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
          Edit Profile
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    borderWidth: 1.5,
    borderColor: 'rgba(86, 0, 65, 0.2)',
    marginVertical: Sizes.fixPadding * 3.0,
    ...commonStyles.buttonShadow,
  },
  addIconWrapStyle: {
    width: 22.0,
    height: 22.0,
    borderRadius: 11.0,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -5.0,
    position: 'absolute',
    right: 7.0,
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

export default EditProfileScreen;
