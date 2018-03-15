import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../styles';

export default class SidebarHeaderEmployer extends Component{
    render(){
        return(
            <View style={styles.header.container}>
                <Text>HI!</Text>
            </View>
        )
    }
}