import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';

//Children Components
import Tax from '../../../CompanyPolicies/tax';
import Payroll from '../../../CompanyPolicies/payroll';

export default class CompanyBasedRules extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 1, margin: 20, elevation: 20}}>
                    <Payroll/>
                </View>
                
                {/* <View style={{flex: 1}}>
                    <Tax/>
                </View> */}
            </View>
        )
    }
}
 