import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../styles';

export default class SidebarHeaderEmployee extends Component{
    render(){
        return(
            <View style={styles.companyCont}>
                <Text>JCA REALTY CORPORATION JCA REALTY CORPORATION JCA REALTY CORPORATION JCA REALTY CORPORATION</Text>
            </View>
        )
    }
}