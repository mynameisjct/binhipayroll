import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
/* import {Tax as TaxPolicy} from '../../../CompanyPolicies/Rules/tax'; */

export default class Tax extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                {/* <TaxPolicy status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/> */}
            </View>
        )
    }
}
 