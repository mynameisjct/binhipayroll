import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'

export default class Leaves extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text> THIS SHOULD DISPLAY LEAVE POLICY </Text>
            </View>
        );
    }
}