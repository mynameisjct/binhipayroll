import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from '../personalinfo/styles';
import Ranks from '../../../CompanyPolicies/ranks';

export default class RankBasedRules extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Ranks title='Select Employee Rank' viewOnly={true}/>
            </View>
        )
    }
}
 