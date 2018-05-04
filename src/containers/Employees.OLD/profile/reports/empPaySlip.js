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
import EmployeePayslipForm from '../../../Reports/payslip/payslipform';

//Redux
import { connect } from 'react-redux';
import * as employeeActions from '../../data/activeProfile/actions';
import { bindActionCreators } from 'redux';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Employee Pay Slip'

export default class EmpPaySlip extends Component {
    render(){
        return(
            <View style={styles.child.container}>
                <EmployeePayslipForm/>
            </View>
        );
    }
}
