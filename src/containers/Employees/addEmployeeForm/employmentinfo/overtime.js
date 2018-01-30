import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
import {Overtime as OvertimePolicy} from '../../../CompanyPolicies/Rules/overtime';

export default class Overtime extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                <OvertimePolicy status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}
 