import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'

export default class Tardiness extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text> THIS SHOULD DISPLAY TARDINESS POLICY </Text>
            </View>
        );
    }
}