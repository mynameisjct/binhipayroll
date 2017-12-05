import React, { Component } from 'react';
import {
    View,
    Text, 
    Button,
    TouchableNativeFeedback,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const iconName_undo = 'ios-undo';
const iconName_save = 'md-checkmark';
const iconSize = 20;
const iconColor_undo = '#434646';
const iconColor_save = '#434646';

export default class SavePrompt extends Component {
    static navigationOptions = {
        header : null,
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableNativeFeedback
                    disabled={false}
                    onPress={() => {}}
                    background={TouchableNativeFeedback.SelectableBackground()}>

                    <View style={styles.btnContLeft}>
                        <Icon style={styles.iconStyle} name={iconName_undo} size={iconSize} color={iconColor_undo}/>
                        <Text style={styles.txtLabel}>UNDO ALL CHANGES</Text>
                    </View>

                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    disabled={false}
                    onPress={() => {}}
                    background={TouchableNativeFeedback.SelectableBackground()}>

                    <View style={styles.btnContRight}>
                        <Icon style={styles.iconStyle} name={iconName_save} size={iconSize} color={iconColor_save}/>
                        <Text style={styles.txtLabel}>SAVE CHANGES</Text>
                    </View>

                </TouchableNativeFeedback>

            </View>
        );
    }
}