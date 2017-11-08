/**************************************************************
 *  FileName:           header.js
 *  Description:        Login Header (DateTime)
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';

import styles from './styles';

export default class Clock extends Component{
    render(){
        return(
            <View style={[styles.boxContHeader]}>
                <Text style={styles.textDate}>{this.props.date.toUpperCase() + '  ' + this.props.day}</Text>
                <Text style={styles.textTime}>{this.props.time}</Text>
            </View>
        );
    }
}
