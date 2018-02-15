import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
import Overtime from '../../../CompanyPolicies/overtime';

export default class EmployeeOvertime extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
               {/*  <Overtime/> */}
            </View>
        )
    }
}
 