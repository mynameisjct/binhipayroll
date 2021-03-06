//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from '../styles';

//Helper
import * as oHelper from '../../../../helper';

//Children Components
import Payroll from '../../../CompanyPolicies/payroll';

export default class EmpPayroll extends Component {
    render(){
        return(
            <View style={styles.child.container}>
                <Payroll title='Payroll Schedule' viewOnly={true}/>
            </View>
        );
    }
}