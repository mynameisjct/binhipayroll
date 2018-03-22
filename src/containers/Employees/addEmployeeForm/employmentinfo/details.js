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
import * as positionsActions from '../../../CompanyPolicies/data/positions/actions';

//Styles
import styles from './styles';

//Custom Components
import EffectiveDatePicker from '../../../../components/EffectiveDatePicker';
import FixedCard1 from '../../../../components/FixedCards';

//Children Components
import EmploymentDetailsForm from './forms/employmentDetailsForm';

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
                id: '',
                employmenttype:{  
                   label:'',
                   value:''
                },
                datehired:{  
                   format:"MMMM DD, YYYY",
                   value: ''
                },
                dateend:{  
                   format:"MMMM DD, YYYY",
                   value: ""
                },
                paytype:{  
                   label: '',
                   value: ''
                },
                payrate: '',
                position: {  
                   id:  '',
                   value: ''
                },
                branch: {  
                   id: '',
                   value: ''
                },
                effectivedate:{  
                    from: {  
                        format:"MMMM DD, YYYY",
                        value: ''
                   },
                    to: {  
                        format:"MMMM DD, YYYY",
                        value: ''
                   }
                },
                remarks: ''
            },
            
            _bShowForm: false,
            _oDefaultData: {  
                id: '',
                employmenttype:{  
                   label:'',
                   value:''
                },
                datehired:{  
                   format:"MMMM DD, YYYY",
                   value: ''
                },
                dateend:{  
                   format:"MMMM DD, YYYY",
                   value: ""
                },
                paytype:{  
                   label: '',
                   value: ''
                },
                payrate: '',
                position: {  
                   id:  '',
                   value: ''
                },
                branch: {  
                   id: '',
                   value: ''
                },
                effectivedate:{  
                    from: {  
                        format:"MMMM DD, YYYY",
                        value: ''
                   },
                    to: {  
                        format:"MMMM DD, YYYY",
                        value: ''
                   }
                },
                remarks: ''
            }
    
        }
    }

    componentDidMount(){
        const oAllData = this.props.oEmpDetails.data;
        this.props.actions.companyProfile.getBranches();
        this.props.actions.positions.get();
        if(oAllData.length > 0){
            this.setState({ _oActiveData: oAllData[0]})
        }
    }

    _addNewData = () => {
        this.setState({ 
            _oActiveData: oHelper.copyObject(this.state._oDefaultData),
            _bShowForm: true
        })
    }

    _editActiveData = () => {
        this.setState({ 
            _oActiveData: oHelper.copyObject(this.state._oActiveData),
            _bShowForm: true
        })
    }
    
    _cancelForm = () => {
        this.setState({ _bShowForm: false });
    }

    _submitForm = (oData) => {
        let oInput = {};
        let oActiveData = oHelper.copyObject(this.state._oActiveData);
        oActiveData.employmenttype.value = oData.employmenttype;
        oActiveData.datehired.value = oHelper.convertDateToString(oData.datehired, 'YYYY-MM-DD');
        oActiveData.dateend.value = oHelper.convertDateToString(oData.dateend, 'YYYY-MM-DD');
        oActiveData.paytype.value = oData.paytype;
        oActiveData.payrate = oData.payrate;
        oActiveData.position.id = oData.position;
        oActiveData.branch.id = oData.branch;
        oActiveData.effectivedate.from.value = oHelper.convertDateToString(oData.effectivedate, 'YYYY-MM-DD');
        oActiveData.remarks = oData.remarks;

        oInput.employeeId = this.props.oActiveEmployee.id;
        oInput.employmentinfo = {
            details: oActiveData
        }
        let oRes = this.props.actions.employee.addEmployeeDetails(oInput);
        
    }
    
    render(){
        const oAllData = this.props.oEmpDetails.data;
        return(
            <View style={styles.genericContainer}>
                {
                    oAllData.length < 1 ?
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
                                selectedValue={this.state._oActiveData.id}
                                options={oAllData}
                                onChange={this._setActiveData}/>
                            <EmployeeDetailsView data={this.state._oActiveData}/>
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
                        <EmploymentDetailsForm
                            minEffectiveDate={null}
                            onDelete={this._requestDeleteData}
                            visible={this.state._bShowForm}
                            activeData = {this.state._oActiveData}
                            cancelForm={this._cancelForm}
                            submitForm={this._submitForm}
                            title={this.state._oActiveData.id ? 'MODIFY EMPLOYENT DETAILS' : 'ADD NEW EMPLOYMENT DETAILS'}
                            employmenttypeoptions={
                                oHelper.generateEnums(this.props.oEmpDetails.employmenttypeoptions, 'id', 'name')
                            }
                            paytypeoptions={
                                oHelper.generateEnums(this.props.oEmpDetails.paytypeoptions, 'id', 'name')
                            }
                            positions={
                                oHelper.generateEnums(this.props.positionsPolicy.data.position.data, 'id', 'name')
                            }
                            branches={
                                oHelper.generateEnums(this.props.companyProfile.branch, 'id', 'name')
                            }
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
        oActiveEmployee: state.employees.activeProfile.data,
        companyProfile: state.companyProfile.data,
        positionsPolicy: state.companyPoliciesReducer.positions,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
            ranks: bindActionCreators(ranksActions, dispatch),
            companyProfile: bindActionCreators(companyProfileActions,dispatch),
            positions: bindActionCreators(positionsActions,dispatch)
        },
    }
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeDetails)

export class EmployeeDetailsView extends Component{
    render(){
        console.log('this.props.data: ' + JSON.stringify(this.props.data));
        let oActiveData = this.props.data;
        const attribs = 
        [
            {
                label: 'EMPLOYMENT STATUS',
                value: oActiveData.employmenttype.label || ''
            },
            {
                label:  'DATE HIRED',
                value: oHelper.convertDateToString(oActiveData.datehired.value, oActiveData.datehired.format) || '' 
            },
            {
                label: 'PAY TYPE',
                value: oActiveData.paytype.label || ''
            },
            {
                label: 'PAY RATE',
                value: oActiveData.payrate || ''
            },
            {
                label: 'POSITION',
                value: oActiveData.position.value || ''
            },
            {
                label: 'BRANCH',
                value: oActiveData.branch.value || ''
            },
            {
                label: 'REMARKS',
                value: oActiveData.remarks || ''
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