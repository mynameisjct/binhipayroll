import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
import {Benefits as BenefitsPolicy} from '../../../CompanyPolicies/Rules/benefits';

export default class Benefits extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                {/* <BenefitsPolicy status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/> */}
            </View>
        )
    }
}
 