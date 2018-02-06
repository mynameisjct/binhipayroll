import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
import Tardiness from '../../../CompanyPolicies/tardiness';

export default class EmployeeTardiness extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                <Tardiness/>
            </View>
        )
    }
}
 