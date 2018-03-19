import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

//Styles
import styles from '../styles';

export default class PayrollSummaryInfoFooter extends Component {
    render(){
        const footerStyles = styles.summaryStyles.footer;
        
        return(
            <View style={footerStyles.container}>
            </View>
        );
    }
}