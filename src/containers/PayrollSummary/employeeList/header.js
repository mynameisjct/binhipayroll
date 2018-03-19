import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Styles
import styles from '../styles';

export default class PayrollEmployeeListHeader extends Component {
    render(){
        const headerStyles = styles.listStyles.header;
        const textStyles = styles.textStyles;

        return(
            <View style={headerStyles.container}>
                <View style={headerStyles.center}>

                    <View style={headerStyles.icon}>
                        <Icon name='ios-people' size={28} color='#333333'/>
                    </View>
                    <View style={headerStyles.title}>
                        <Text style={textStyles.title}>EMPLOYEE LIST</Text>
                    </View>

                </View>
            </View>
        );
    }
}