import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
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

//Children Components
import EmployeeDetailsForm from './forms/employentDetailsForm';

//helper
import * as oHelper from '../../../../helper';

export class EmployeeDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            //Generic States
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',
            _refreshing: false,
            _status: [2, 'Loading...'],

            _oActiveData: {
            },
            _bShowForm: false,
            _oDefaultData: {
                id: '',
                rankid: '',
                effectivedate: {
                    from: {
                        value: null,
                        format: "MMM DD, YYY"
                    },
                    to: {
                        value: null,
                        format: "MMM DD, YYYY"
                    }
                },
                remarks: ''
            }
        }
    }

    _addNewData = () => {
        this.setState({ 
            _oDefaultData: oHelper.copyObject(this.state._oDefaultData),
            _bShowForm: true
        })
    }

    _editNewData = () => {
        this.setState({ 
            _oDefaultData: oHelper.copyObject(this.state._oActiveData),
            _bShowForm: true
        })
    }
    
    render(){
        console.log('this.props.oEmpDetails.data.length: ' + this.props.oEmpDetails.data.length);
        return(
            <View style={styles.genericContainer}>
                {
                    this.props.oEmpDetails.data.length <= 1 ?
                        <TouchableOpacity 
                            style={styles.emptyDataContainer}
                            activeOpacity={0.8}
                            onPress={this._addNewData}>
                                <Text>
                                    No Employment Details set. Tap here to add.
                                </Text>
                        </TouchableOpacity>
                    :
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
                                <ActionButton.Item size={45} buttonColor='#26A65B' title="ADD NEW EFFECTIVE DATE" onPress={this._addNewData}>
                                    <Icon name="bell-plus" color='#fff' size={18} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item size={45} buttonColor='#4183D7' title="MODIFY ACTIVE EMPLOYMENT DETAILS" onPress={this._editActiveData}>
                                    <Icon name="table-edit" color='#fff' size={18} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                        </View>
                }
                {
                    this.state._bShowForm ?
                        <EmployeeDetailsForm
                            minEffectiveDate={null}
                            onDelete={this._requestDeleteData}
                            visible={this.state._bShowForm}
                            activeData = {this.state._oActiveData}
                            cancelForm={this._cancelFormTransaction}
                            submitForm={this._submitFormTransaction}
                            title={this.state._oActiveData.id ? 'MODIFY EMPLOYENT DETAILS' : 'ADD NEW EMPLOYMENT DETAILS'}
                            positions={[{1: 'TEMP POS1'}, {2: 'TEMP POS2'}, {3: 'TEMP POS3'}]}
                            branches={this.state._branchesList}
                        />
                    :
                        null   
                }
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