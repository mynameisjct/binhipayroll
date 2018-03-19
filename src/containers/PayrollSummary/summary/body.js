import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

//Styles
import styles from '../styles';

export default class PayrollSummaryInfoBody extends Component {
    render(){
        const bodyStyles = styles.summaryStyles.body;
        return(
            <View style={bodyStyles.container}>
            </View>
        );
    }
}