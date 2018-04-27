import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';

//Styles
import styles from '../styles';

export default class PayrollGenerationInfoBody extends Component {
    render(){
        const bodyStyles = styles.summaryStyles.body;
        const textStyles = styles.textStyles;
        const oSummary = this.props.data.payrollsummary;
        const cardBodyStyles = styles.summaryStyles.body.cardBody;
        const oDetailsCard = (oData) => (
            <View style={bodyStyles.upperBlock}>
                <View style={bodyStyles.title}>
                    <Text style={textStyles.groupTitle}>
                        {oData.title}
                    </Text>
                </View>
                {
                    oData.data.map((data, index) => 
                        <View key={index} style={cardBodyStyles.content}>
                            <View style={cardBodyStyles.label}>
                                <Text style={textStyles.summary}>
                                    {data[0]}
                                </Text>
                            </View>
                            <View style={cardBodyStyles.value}>
                                <Text style={textStyles.summary}>
                                    {data[1]}
                                </Text>
                            </View>
                        </View>
                    ) 
                }  
            </View>
        )

        return(
            <View style={bodyStyles.container}>
                <View style={bodyStyles.content}>
                    <ScrollView>
                        {oDetailsCard(oSummary.payrollinfo)}
                        {oDetailsCard(oSummary.amountsummary)}
                    </ScrollView>
                </View>
            </View>
        );
    }
}