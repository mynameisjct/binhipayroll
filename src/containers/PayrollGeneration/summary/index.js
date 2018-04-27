import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

//Styles
import styles from '../styles';

//Children components
import PayrollGenerationInfoHeader from './header';
import PayrollGenerationInfoFooter from './footer';
import PayrollGenerationInfoBody from './body';

export default class PayrollGenerationInfo extends Component {
    render(){
        const summaryStyles = styles.summaryStyles;
        return(
            <View style={summaryStyles.container}>
                <PayrollGenerationInfoHeader data={this.props.data}/>
                <PayrollGenerationInfoBody data={this.props.data}/>
                <PayrollGenerationInfoFooter data={this.props.data}/>
            </View>
        );
    }
}