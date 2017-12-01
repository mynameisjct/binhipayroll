/**************************************************************
 *  FileName:           index.js
 *  Description:        Custom Cards
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-12-01

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

//Available Props:
//1. title

export default class CustomCard extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.titleCont}>
                    <Text style={styles.txtTitle}>{this.props.title}</Text>
                </View>
                <View style={styles.contentCont}>
                    <View style={styles.detailsCont}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        );
    }
}
