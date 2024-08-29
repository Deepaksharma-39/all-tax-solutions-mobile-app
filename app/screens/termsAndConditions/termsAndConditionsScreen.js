import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { Colors, Fonts, Sizes, commonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const termsAndConditionsText = `
SCOPE: The Agreement is published in compliance with, and is governed by the provisions of Indian law, including but not limited to: the Indian Contract Act, 1872, the (Indian) Information Technology Act 2000, and the rules, regulations, guidelines and clarifications framed thereunder, including the (Indian) Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011, and the (Indian) Information Technology (Intermediaries Guidelines) Rules, 2011 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. This user agreement (hereafter referred to as the "Agreement") is an agreement between you ("user") and ALL TAX SOLUTIONS (or "we" or "us" as the context permits for the right interpretation) to govern and resolve any dispute that may arise out of any commercial action, mainly it governs the following components as mentioned under this document in different heads: If you do not agree with the terms contained in this entire Agreement, you may not use this App. Clicking on a button or taking any action on the app or using the services in any form will amount to signify your acceptance.

DEFINITIONS:
i. You refer to the authorized users of the ALL TAX SOLUTIONS who may access and use the App, Services, and any other content or resources owned by ALL TAX SOLUTIONS as defined in this Agreement which are subject to the terms and conditions set forth in the Agreement.
ii. We/us/our/ourselves: refers to ALL TAX SOLUTIONS under this agreement.
iii. Parties: ALL TAX SOLUTIONS & the user/users or whoever is availing our service as defined in this Agreement which are subject to the terms and conditions set forth in the Agreement.
iv. Services: means all work necessary to provide the services which are enabled by us for you on the app which may include without limitation paying border taxes levied by the government.
v. Entire Agreement: This Agreement along with the Privacy Policy and refund policy and any other notice/guidelines made applicable to the App from time to time, shall constitute the entire agreement between Us and You with respect to your access to or use of the App and the Services thereof.
vi. Amendment: means a change or addition to the terms of a contract or document. An amendment is an addition or correction that leaves the original document substantially intact.
vii. Privacy Policy: Published on the App titled as a privacy policy in a separate section, kindly go through it if you have any disagreement with any subject matter provided there.
viii. Refund Policy: Published on the App titled as Refund Policy in a separate section, please have a look before using our services/app for better comprehension.
ix. Law: Any law, statute, notification, order, rules having applicability over this entire agreement.

REPRESENTATION AND WARRANTY:
ALL TAX SOLUTIONS is a mobile app that provides services to vehicle owners and vendors for the payment of Border Tax via its app. Please read the terms and conditions carefully before accessing, obtaining data, information, or services. By accessing or using the app, filling information for repayment of tax such as name, mobile no., vehicle no. and other data as mentioned in the privacy policy of the app or accessing or using any content, information, services, features, or resources available or enabled via the app (collectively, the fees) arising from:
i. Any liability for any direct, indirect, or consequential loss or damage incurred by any user in connection with the Services;
ii. your use of and access to the Service/App/content;
iii. your violation of any term of this Agreement;
iv. your violation of any third party right, including without limitation, any copyright, property, or privacy right; or
v. any claim that your User Material caused damage to a third party. This indemnification obligation will survive this Agreement and your use of the Service and/or the App.
vi. Our liability to you shall under all circumstances payment to be paid by you limited to the amount subjected to our (Refund Policy).
vii. any other loss or damage of any kind, however arising and whether caused by tort (including negligence) breach of contract or otherwise, even if foreseeable or advised of the possibility of the same included but not limited to a) loss of income or revenue; b) loss of business; c) loss of profits or contracts; d) loss of anticipated savings; e) loss of data; f) loss of goodwill; g) wasted management or office time; and vii. For any other loss or damage of any kind, however arising and whether caused by tort (including negligence), breach of contract or otherwise, even if foreseeable or advised of the possibility of the same.
viii. ALL TAX SOLUTIONS accepts no liability whatsoever, direct or indirect, for noncompliance with the laws of any country other than that of India, the mere fact that this App can only be accessed or used or any facility can be availed of in a country other than India will not imply that we have anything to do with your jurisdiction or its citizens or accede to the laws of such country.

PAYMENT:
i. Most Services made available to you are you remain in full force and effect and shall be liberally construed so as to effectuate the purpose and intent of the parties as stated in this Agreement.

RELATIONSHIP:
The Parties expressly agree that nothing contained herein shall be deemed to create any association, partnership, joint venture or relationship of principal and agent or master and servant or employer and employee between the Parties hereto or to provide either Party with the right, power, or authority, whether express or implied to create any such duty or obligation on behalf of the other Party.

JURISDICTION:
In the event of you breaching this Agreement, you agree that ALL TAX SOLUTIONS will be irreparably harmed and may not have an adequate remedy in money or damages. In such an event, ALL TAX SOLUTIONS shall be entitled to obtain an injunction and/or other equitable remedy against such a breach from any court of competent jurisdiction. ALL TAX SOLUTIONS's right to obtain such relief shall not limit its right to obtain other remedies.
i. Arbitration: The Parties agree that any dispute arising out of or in connection with this Agreement, including any question regarding the existence, validity, or termination of this Agreement shall be referred to and finally resolved by arbitration in India, at the venue which can be mutually decided by both parties. Such arbitration shall be conducted in accordance with the Indian Arbitration and Conciliation Act, 1996.
ii. Pre-conditions of Arbitration: If you would like to invoke the arbitration clause before that you have to perform the following steps: firstly, you have to submit the complaint application to the ALL TAX SOLUTIONS at the official email provided in the App itself. If you get no rebuttal in 15 days for the same shall preclude either Party applying for urgent interlocutory relief from any court of competent jurisdiction and for this purpose, the Parties expressly submit to the jurisdiction of any such court in Delhi, India.

FORCE MAJEURE:
We, ALL TAX SOLUTIONS shall not be liable for any failure to perform the service under this agreement and delayed due to Force Majeure which shall include fire, explosion, flood, earthquake, act of God, act of terrorism, war, rebellion, riots, sabotage, strike, lockout, governmental or military acts or orders or restrictions, cyber-attack, power outage stoppage of work, aggravated epidemic, failure or diminishment of power, internet availability or other services not under the control of either of the Parties affected thereby.

TERMINATION OF SERVICES:
User may at its sole discretion terminate this Agreement hereunder at any time by not using the services or uses of our app. The Parties may also terminate this Agreement hereunder for a Force Majeure Event in accordance with Clause 7. ALL TAX SOLUTIONS reserves the right to terminate the services and app at any time, it deems fit without any prior notice.

USER AGREEMENT AND PRIVACY POLICY:
These documents are designed to inform you of your rights and obligations when using our services via our app ALL TAX SOLUTIONS. This document must be read in conjunction with Privacy Policy and Refund Policy or any other notice or document which may be published by us on our app from time to time.

CUSTOMER SUPPORT AND ASSISTANCE:
If you have any issues about our Privacy Policy, Refund Policy or Terms and Conditions, or you have any queries/questions/grievances regarding our services.
`;

const TermsAndConditionsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
        >
          {termsAndConditionsContent()}
          {externalLink()}
        </ScrollView>
      </View>
    </View>
  );

  function termsAndConditionsContent() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.text}>{termsAndConditionsText}</Text>
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
  funct

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back-ios"
          size={22}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
        />
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
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
  headerTitle: {
    marginLeft: Sizes.fixPadding,
    ...Fonts.blackColor20Bold,
  },
  contentContainer: {
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  title: {
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor18Bold,
  },
  text: {
    ...Fonts.grayColor14Regular,
  },
  linkContainer: {
    marginTop: Sizes.fixPadding,
    alignItems: 'center',
  },
  linkText: {
    ...Fonts.blueColor14Regular,
    textDecorationLine: 'underline',
  },
});

export default TermsAndConditionsScreen;
