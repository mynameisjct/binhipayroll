import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
import {Tardiness as TardinessPolicy} from '../../../CompanyPolicies/Rules/tardiness';

export default class Tardiness extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                <TardinessPolicy status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}
 