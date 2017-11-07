/**************************************************************
 *  FileName:           logo.js
 *  Description:        Login Logo
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
    Image
} from 'react-native';

import styles from './styles';

export default class Logo extends Component{
    render(){
        return(
            <View style={styles.flexLogo}>
                <Image 
                    style={styles.imgLogo}
                    resizeMode='cover'
                    source={require('../../assets/img/binhilogo.png')}
                />
                <Text style={styles.textLogoLabel}>PAYROLL SYSTEM</Text>
            </View>
        );
    }
}
