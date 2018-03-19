import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

//Styles
import styles from '../styles';

//Children components
import PayrollSummaryInfoHeader from './header';
import PayrollSummaryInfoFooter from './footer';
import PayrollSummaryInfoBody from './body';

export default class PayrollSummaryInfo extends Component {
    render(){
        const summaryStyles = styles.summaryStyles;
        return(
            <View style={summaryStyles.container}>
                <PayrollSummaryInfoHeader/>
                <PayrollSummaryInfoBody/>
                <PayrollSummaryInfoFooter/>
            </View>
        );
    }
}