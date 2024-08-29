import React from "react";
import { View, ScrollView, StyleSheet, Text, Linking } from "react-native";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MyStatusBar from "../../components/myStatusBar";
import { TouchableOpacity } from "react-native-gesture-handler";


const privacyPolicyText = `
PRIVACY POLICY FOR ALL TAX SOLUTIONS APP

Thanks for visiting our App (ALL TAX SOLUTIONS) and viewing our privacy policy. Kindly read it conscientiously to understand the data operation and its uses. We only collect the necessary and minimum information required for service operation, so you can avail our services hurdle-free. This section will explain how we handle and collect information while you enter and avail services on our App.

1. SCOPE: The sole purpose of this Privacy Policy is to protect user data and disclose what data we possess in exchange for our services. The app requires personal information to function properly. This app does not automatically capture any specific personal information from you, like your name, phone number, or e-mail address, that allows us to identify you individually. Wherever the app requests you to provide personal information, you will be informed of the particular purposes for which the information is gathered and adequate security measures will be taken to protect your personal information.

2. INFORMATION WE COLLECT FROM YOU:
    - Personal Data: We collect the information you give us while using our services. Personal Information for this privacy policy is any information that directly or indirectly identifies you, which is included but not limited to: A) Your Name; b) Contact Number C) Vehicle Number .

USE OF INFORMATION:
    - Operational Purposes: We collect personal data to provide hassle-free services and improve the functionality and user-friendliness of our app for future requirements. This is necessary for our legitimate interests to constantly monitor and improve our online presence and services to you. a) This information is collected when you download or use our application. b) The details shared by the user will be used to create tax slips for payment of taxes levied by the State government for their respective vehicles for the purpose of border tax payment. We precisely use your personal data, which includes your vehicle number and your name.

    - Administrative Purposes: This app may use personal information about you for its administrative purposes, including: measuring interest in our services; improving our services and developing new services; enforcing the terms that govern our services or this privacy policy; protecting our services, systems, information, employees, business partners, service providers, users, customers, or others; verifying individual identity; preventing potentially prohibited or illegal activities; and processing payments for services purchased.

    - Emergency Purposes: This app only collects and uses your personal information when you use the services of the app. There may be some situations where we may have to share your personal information with third parties without getting your prior consent. Such third parties will be limited to: Police, Ambulances, Fire Brigade, Judicial or Quasi-Judicial Authorities. The information shared with the above authorities is in compliance with any law, rule, regulation, or directions by the Government of India, Union Territories, State, or any other local authority under the laws of India.

    - Marketing and Advertising Purposes: We may use your personal information to improve our marketing and promotional efforts, analyze usage of our app, and improve our content and services. This ensures a smooth, efficient, safe, and user-friendly experience while using our app.

THIRD PARTY LIABILITY: We do not sell or share any personally identifiable information volunteered on the app to any third party (public/private) except in the cases mentioned under Clause (3)(I)(b) and (3)(III). If you encounter any redirection to any third-party platform from our app, we will not be responsible for any data theft, injury, and/or mishap. We, ALL TAX SOLUTIONS, urge you to be aware that when you leave our app through redirection or hyperlink, other sites or apps may have different privacy policies and terms that are beyond our control. Please be sure to check the privacy policies of these sites and their "Terms of Service" before engaging in any business or uploading any information.

RETENTION OF YOUR DATA: We may retain data provided by the user for as long as they use the application and for a reasonable time thereafter. We may retain automatically collected information also for a reasonable period of time depending on the nature of the application and may store it in aggregate form. All personal information collected may be retained on the mobile device for 12 months from the date of collection after which, if it has not already been uploaded to the server, will be purged from the app.

DATA SECURITY: Any information provided to our app will be protected from loss, misuse, unauthorized access or disclosure, alteration, or destruction. We gather certain information about the user, such as Internet Protocol (IP) addresses, domain name, browser type, and operating system. We make no attempt to link these addresses with the identity of individuals visiting our app unless an attempt to damage the app has been detected. Except for authorized law enforcement investigations, no other attempts are made to identify individual users or their usage habits. Raw data logs are used for no other purposes and are scheduled for regular deletion. Unauthorized attempts to upload information or change information on this service are strictly prohibited and may be punishable under the Indian IT Act.

CHANGES IN PRIVACY POLICY: This privacy policy may change from time to time. You understand and agree that you will be deemed to have accepted the updated privacy policy if you use the services after the updated privacy policy is posted on the services. If at any point you do not agree to any portion of the privacy policy then in effect, you must immediately stop using the services.

i. Revision to the Privacy Policy: We may revise this privacy policy in our sole discretion, so review it periodically. If you continue to use this app and the services made available to you after such changes have been made, you hereby provide your consent to the changes.

ii. Posting of Revised Privacy Policy: If there are any material changes to this privacy policy, ALL TAX SOLUTIONS may notify you by email or as otherwise required by applicable law. We will post any adjustments to the privacy policy on this app, and the revised version will be effective immediately when it is posted (or upon notice as applicable). If you are concerned about how your information is used, bookmark this page and read this privacy policy periodically.

GRIEVANCES: If you have any queries about our privacy policy, or if you want to know what information we have collected about you, please contact us at alltaxsolutions44@gmail.com.
`;

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
        >
          {privacyPolicyInfo()}
          {externalLink()}
        </ScrollView>
      </View>
    </View>
  );

  function privacyPolicyInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold }}
        >
          Privacy Policy
        </Text>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          {privacyPolicyText}
        </Text>
      </View>
    );
  }

  function externalLink() {
    return (
      <View  style={{
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
      }}>
        <TouchableOpacity onPress={() => Linking.openURL('https://allroadtaxsolutions.com/privacy-policy')}>
          <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold }}>Read more on our website</Text>
        </TouchableOpacity>
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
        <Text
          style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor20Bold }}
        >
          Privacy Policy
        </Text>
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
  linkContainer:{
    margin:"auto",
    textAlign:"center"
  }
});

export default PrivacyPolicyScreen;
