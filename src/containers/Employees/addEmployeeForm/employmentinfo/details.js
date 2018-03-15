import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import ActionButton from 'react-native-action-button';
import t from 'tcomb-form-native'; // 0.6.9
import moment from "moment";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../data/activeProfile/actions';
import * as ranksActions from '../../../CompanyPolicies/data/ranks/actions';
import * as companyProfileActions from '../../../CompanyProfile/data/actions';

//Styles
import styles from './styles';

//Custom Components
import EffectiveDatePicker from '../../../../components/EffectiveDatePicker';
import FixedCard1 from '../../../../components/FixedCards';

export class EmployeeDetails extends Component {
    render(){
        return(
            <View style={styles.genericContainer}>
                <View style={styles.container}>
                    <EffectiveDatePicker 
                        selectedValue={1}
                        options={[{id: 1, effectivedate: {from: {value: '2018-01-01', format: 'MMM DD, YYYY'}}}]}
                        onChange={this._setActiveData}/>
                    <EmployeeDetailsView/>
                    <ActionButton
                        bgColor='rgba(0,0,0,0.8)'
                        shadowStyle={{elevation: 30}}
                        buttonColor="#EEB843"
                        spacing={10}
                        icon={<Icon name="alarm-multiple" color='#fff' size={25} style={styles.actionButtonIcon} />}>
                        <ActionButton.Item size={45} buttonColor='#26A65B' title="ADD NEW EMPLOYEE SCHEDULE" onPress={this._addNewWorkShift}>
                            <Icon name="bell-plus" color='#fff' size={18} style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item size={45} buttonColor='#4183D7' title="MODIFY ACTIVE EMPLOYEE SCHEDULE" onPress={this._editActiveWorkshift}>
                            <Icon name="table-edit" color='#fff' size={18} style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                </View>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        oEmpDetails: state.employees.activeProfile.data.employmentinfo.details,
        ranks: state.companyPoliciesReducer.ranks,
        companyProfile: state.companyProfile
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
            ranks: bindActionCreators(ranksActions, dispatch),
            companyProfile: bindActionCreators(companyProfileActions,dispatch)
        },
    }
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeDetails)

export class EmployeeDetailsView extends Component{
    render(){
        const attribs = 
        [
            {
                label: 'EMPLOYMENT STATUS',
                value: 'PROBATIONARY'
            },
            {
                label:  'DATE HIRED',
                value: 'January 21, 2018'
            },
            {
                label: 'PAY TYPE',
                value: 'SALARY'
            },
            {
                label: 'PAY RATE',
                value: '25,000.00'
            },
            {
                label: 'POSITION',
                value: 'Secretary'
            },
            {
                label: 'BRANCH',
                value: 'Yacapin Branch'
            },
            {
                label: 'REMARKS',
                value: 'Newly Hired Employee'
            }
        ]

        return(
            <ScrollView>
                    <FixedCard1  hideActionIcon={true}
                        title={'EMPLOYMENT INFORMATION'}
                        attributes={attribs}/>
            </ScrollView>
        )
    }
}