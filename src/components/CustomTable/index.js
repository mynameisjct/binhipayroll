/**************************************************************
 *  FileName:           index.js
 *  Description:        Custom Table Component
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2018-01-08

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

export default class CustomTable extends Component{
    render(){
        return(
            <View>
                <Text style={styles.textDate}>{this.props.date.toUpperCase() + '  ' + this.props.day}</Text>
                <Text style={styles.textTime}>{this.props.time}</Text>
            </View>
        );
    }
}
