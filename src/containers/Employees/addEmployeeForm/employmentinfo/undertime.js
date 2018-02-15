import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
import Undertime from '../../../CompanyPolicies/undertime';

export default class EmployeeUndertime extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
               {/*  <Undertime/> */}
            </View>
        )
    }
}
 