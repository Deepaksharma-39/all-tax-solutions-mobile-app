
import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Fonts, Sizes } from "../../constants/styles";

const transactionsList = [
    {
        id: '1',
        transactionTitle: 'Paid from friend',
        transactionId: 'D123654789012365',
        transactionDateAndTime: '5 May, 2020 8:30pm',
        amount: '$100',
    },
    {
        id: '2',
        transactionTitle: 'Paid from friend',
        transactionId: 'D123654789012365',
        transactionDateAndTime: '5 May, 2020 8:00pm',
        amount: '$500',
    },
    {
        id: '3',
        transactionTitle: 'Paid from friend',
        transactionId: 'D123654789012365',
        transactionDateAndTime: '5 May, 2020 8:30pm',
        amount: '$100',
    },
    {
        id: '4',
        transactionTitle: 'Paid from friend',
        transactionId: 'D123654789012365',
        transactionDateAndTime: '5 May, 2020 8:00pm',
        amount: '$500',
    },
];

const WalletReceivedTransactions = () => {
    return (
        <View style={{ flex: 1, }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}>
                {transactions()}
            </ScrollView>
        </View>
    )

    function transactions() {
        return (
            transactionsList.map((item) => (
                <View key={`${item.id}`}>
                    <View style={styles.transactionWrapStyle}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image
                                source={require('../../assets/images/icons/add_money.png')}
                                style={{ width: 35.0, height: 35.0, resizeMode: 'contain' }}
                            />
                            <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                                <Text style={{ ...Fonts.grayColor16Regular }}>
                                    {item.transactionTitle}
                                </Text>
                                <Text style={{ ...Fonts.blackColor18Bold }}>
                                    {item.transactionId}
                                </Text>
                                <Text style={{ ...Fonts.grayColor14Regular }}>
                                    {item.transactionDateAndTime}
                                </Text>
                            </View>
                        </View>
                        <Text style={{ ...Fonts.greenColor18Bold }}>
                            {item.amount}
                        </Text>
                    </View>
                </View>
            ))
        )
    }
}

const styles = StyleSheet.create({
    transactionWrapStyle: {
        marginBottom: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default WalletReceivedTransactions;