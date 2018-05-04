import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert
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
import * as PromptScreen from '../../../../components/ScreenLoadStatus';
import MessageBox from '../../../../components/MessageBox';

//Children Components
import EmploymentDetailsForm from './forms/employmentDetailsForm';

//helper
import * as oHelper from '../../../../helper';

//CONSTANTS
const add_loading_message = 'Saving a Employment Details. Please wait.';

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

            _oFormData: {},
            
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

    _addNewData = async() => {
        let oActiveData = {};
        console.log('CCCCCCCCCCCCCCCthis.props.oEmpDetails.data.length: ' + this.props.oEmpDetails.data.length);
        if(this.props.oEmpDetails.data.length > 0){
            oActiveData = await oHelper.copyObject(this.props.oEmpDetails.data[0]);
            oActiveData.id = '';
            oActiveData.effectivedate.from.value = null;
            oActiveData.effectivedate.to.value = null;
        }
        else{
            oActiveData = await oHelper.copyObject(this.state._oDefaultData);
        }
        
        this.setState({ 
            _oFormData: oActiveData,
        }, 
            () => {
                console.log('CCCCCCCCCCCCthis.state._oFormData: ' + JSON.stringify(this.state._oFormData));
                console.log('CCCCCCCCCCCCoActiveData: ' + JSON.stringify(oActiveData))
                this.setState({_bShowForm: true});
            }
        )
    }

    _editActiveData = () => {
        this.setState({ 
            _oFormData: oHelper.copyObject(this.state._oActiveData),
            _bShowForm: true
        })
    }
    
    _hideForm = () => {
        this.setState({ _bShowForm: false });
    }

    _addOrUpdateDataToDB = async(oData) => {
        let oInput = {};
        let oRes = {};
        let oActiveData = oHelper.copyObject(this.state._oFormData);
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
        this._showLoadingPrompt(add_loading_message);
        if(oActiveData.id == ''){
            oRes = await this.props.actions.employee.addEmploymentDetailsToDB(oInput);
        }
        else{
            oRes = await this.props.actions.employee.modifyEmploymentDetailsToDB(oInput);
        }
        
        this._hideLoadingPrompt();
        this._evaluateResponse(oRes);
        if(oRes.flagno == 1){
            this._hideForm();
            if(oActiveData.id == ''){
                this._setActiveData(this.props.oEmpDetails.data[0].id);
            }
            else{
                this._setActiveData(oActiveData.id);
            }
        }
    }

    _submitForm = async(oData) => {
        if(this.state._oFormData.id == ''){
            this._addOrUpdateDataToDB(oData);
        }
        else {
            Alert.alert(
                'WARNING',
                'Deleting an Employment Details on a specific date is an irreversible action. ' + 
                'Are you sure you want to proceed ?',
                [
                    {text: 'NO', onPress: async() => {}},
                    {text: 'YES', onPress: async() => {this._addOrUpdateDataToDB(oData)}}
                ],
                { cancelable: false }
            )
        }
    }

    _requestDeleteData = () => {
        let oData = oHelper.copyObject(this.state._oActiveData);
        oData.employeeId = this.props.oActiveEmployee.id;
        Alert.alert(
            'WARNING',
            'Deleting an Employment Details on a specific date is an irreversible action. ' + 
            'Are you sure you want to proceed ?',
            [
                {text: 'NO', onPress: () => {}},
                {text: 'YES', onPress: () => this._deleteDataFromDB(oData)}
            ],
            { cancelable: false }
        )
    }

    _deleteDataFromDB = async(oData) => {
        this._showLoadingPrompt(add_loading_message);
        let oRes = await this.props.actions.employee.deleteEmploymentDetailsFromDB(oData);
        this._hideLoadingPrompt();
        this._evaluateResponse(oRes);
        if(oRes.flagno == 1){
                this._hideForm();
                if(this.props.oEmpDetails.data.length > 0){
                    this._setActiveData(this.props.oEmpDetails.data[0].id);
                }
            }
    }
    
    //Generic Methods
    _evaluateResponse = (res) => {
        switch (res.flagno){
            case 0:
                this._showMsgBox('error-ok', res.message);
                return false
                break;
            case 1:
                this._showMsgBox('success', res.message);
                return true;
                break;
            default:
                this._showMsgBox('error-ok', CONSTANTS.ERROR.UNKNOWN);
                return false
                break;
        }
    }

    _showLoadingPrompt = (msg) => {
        this.setState({
            _promptMsg: msg,
            _promptShow: true
        })
    }
    
    _showMsgBox = (strType, msg) => {
        this.setState({
        _msgBoxShow: true,
        _msgBoxType: strType,
        _resMsg: msg
        });
    }
    
    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        })
    }
    
    _hideLoadingPrompt = () => {
        this.setState({
            _promptShow: false
        })
    }
    
    _onFormClose = () => {
        this.setState({
        _bShowCompForm: false,
        _bShowGovForm: false
        })
    }

    _setActiveData = (value) => {
        let oActiveData = oHelper.getElementByPropValue(this.props.oEmpDetails.data, 'id', value)
        this.setState({ _oActiveData: oActiveData})
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
                            activeData = {this.state._oFormData}
                            cancelForm={this._hideForm}
                            submitForm={this._submitForm}
                            title={this.state._oFormData.id ? 'MODIFY EMPLOYENT DETAILS' : 'ADD NEW EMPLOYMENT DETAILS'}
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

                <PromptScreen.PromptGeneric 
                    show= {this.state._promptShow} 
                    title={this.state._promptMsg}/>

                <MessageBox
                    promptType={this.state._msgBoxType}
                    show={this.state._msgBoxShow}
                    onClose={this._closeMsgBox}
                    onWarningContinue={this._continueActionOnWarning}
                    message={this.state._resMsg}
                /> 

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