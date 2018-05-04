import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';

import styles from './styles';

//Children Components
import Tax from '../../../CompanyPolicies/tax';
import Payroll from '../../../CompanyPolicies/payroll';

export default class CompanyBasedRules extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.companyBasedRulesStyles.container}>
                    <View style={styles.companyBasedRulesStyles.rulePlaceholder}>
                        <Payroll viewOnly={true}/>
                    </View>
                    
                    <View style={styles.companyBasedRulesStyles.rulePlaceholder}>
                        <Tax viewOnly={true}/>
                    </View>
                </View>
            </View>
        )
    }
}
 