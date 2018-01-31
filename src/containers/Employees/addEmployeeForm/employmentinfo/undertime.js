import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
import {Undertime as UndertimePolicy} from '../../../CompanyPolicies/Rules/undertime';

export default class Undertime extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                {/* <UndertimePolicy status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/> */}
            </View>
        )
    }
}
 