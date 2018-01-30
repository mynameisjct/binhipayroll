import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
import {Leaves as LeavesPolicy} from '../../../CompanyPolicies/Rules/leaves';

export default class Leaves extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                <LeavesPolicy status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}
 