import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    Switch,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from '../styles';

//Children Components
import EmpGovBenefits from './governmentBenefits';
import EmpCompBenefits from './companyBenefits';

//Helper
import * as oHelper from '../../../../../helper';
import { CONSTANTS } from '../../../../../constants/index';

//Custom Components
import EffectiveDateForm from '../forms/effectiveDateForm';
import CompanyBenefitsForm from '../forms/companyBenefitsForm';
import ActionButton from '../../../../../components/ActionButton';

export default class EmployeeBenefits extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.benefitsStyles.container}>
                    <View style={styles.benefitsStyles.contLeft}>
                        <EmpGovBenefits/>
                    </View>
                    <View style={styles.benefitsStyles.contRight}>
                        <EmpCompBenefits/>
                    </View>
                </View>
            </View>
        )
    }
}
 