import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from '../styles';

export default class PayrollGenerationInfoHeader extends Component {
    render(){
        const headerStyles = styles.summaryStyles.header;
        const textStyles = styles.textStyles;

        return(
            <View style={headerStyles.container}>
                <View style={headerStyles.center}>

                    <View style={headerStyles.icon}>
                        <Icon name='file-chart' size={25} color='#333333'/>
                    </View>
                    <View style={headerStyles.title}>
                        <Text style={textStyles.title}>PAYROLL SUMMARY</Text>
                    </View>

                </View>
            </View>
        );
    }
}