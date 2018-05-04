import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    TouchableOpacity,
    Alert
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Children Components
import EmployeeWorkshiftForm from './forms/employeeWorkshiftForm';

//Styles
import styles from './styles';
import WorkShift from '../../../CompanyPolicies/workshift';

//API
import * as employeeApi from '../../data/activeProfile/api'

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workshiftActions from '../../../CompanyPolicies/data/workshift/actions';
import * as employeeActions from '../../data/activeProfile/actions';
import * as workshiftSelector from '../../../CompanyPolicies/data/workshift/selector';

//Custom Component
import * as PromptScreen from '../../../../components/ScreenLoadStatus';
import MessageBox from '../../../../components/MessageBox';
import EffectiveDatePicker from '../../../../components/EffectiveDatePicker';

//Helper
import * as oHelper from '../../../../helper';

//Constants
import { CONSTANTS } from '../../../../constants/index';
const add_loading_message = 'Saving New Employee Work Schedule. Please wait.';
const delete_loading_message = 'Deleting Employee Work Schedule. Please wait...';
const update_loading_message = 'Updating an Employee Work Schedule. Please wait...';

export class EmployeeWorkShift extends Component {
    constructor(props){
        super(props);
        this.state = {
            language: '',

            //Generic States
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',
            _refreshing: false,
            _status: [2, 'Loading...'],
            
            _oActiveWorkShiftRule: null,
            _bShowWorkshiftForm: false,
            _oWorkShiftTypeList: {},
            _oActiveData: {},
            _iActiveIndex: null,
            _oDefaultData: {
                id: '',
                index: '',
                workshiftid: '',
                effectivedate: {
                    from: {
                        value: null,
                        format: "MMM DD, YYYY"
                    },
                    to: {
                        value: null,
                        "format": "MMM DD, YYYY"
                    }
                },
                remarks: ''
            },

            _activeWorkshiftCode: ''
        }
    }

    componentWillUnmount(){
        this.props.actions.workshift.setActiveRule('');
    }
    
    componentDidMount(){
        this._getDataFromDB();
    }

    componentWillReceiveProps(nextProps){
        if(
            (nextProps.workshift.status[0] != this.state._status[0]) || 
            (JSON.stringify(this.props.oEmpWorkShift) != JSON.stringify(nextProps.oEmpWorkShift))
        ){
            if(nextProps.workshift.status[0]==1){
                this._initData(nextProps.workshift.status);
            }
        }
    }

    _getDataFromDB = () => {
        this._getWorkshiftTypes();
    }

    _getWorkshiftTypes = () => {
        this.props.actions.workshift.get(this._requiredInputs());;
    }

    //TO BE DEPRECATED WHEN BACKEND API IS CHANGED
    _requiredInputs = () => {
        return({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            accesstoken: '',
            clientid: '',
            transtype:'get'
        })
    }

    _initData = (oStatus) => {
        let oWSList = this._generateWorkShifts();
        console.log('this.props.oEmpWorkShift.data.length: ' + this.props.oEmpWorkShift.data.length);
        if(this.props.oEmpWorkShift.data.length > 0){
            this._setActiveData(this.props.oEmpWorkShift.data[0].id);
        }
        
        this.setState({
            _oWorkShiftTypeList: oWSList,
            _status: oStatus
        })
    }

    _generateWorkShifts = () => {
        let arrWSTypes = [...this.props.workshift.data.schedule];
        let oWSList = {};
        arrWSTypes.map((data, index) => {
            oWSList[data.description + CONSTANTS.SPLITSTRING + data.id] = data.description
        })
        return oWSList;
    }

    _addNewWorkShift = () => {
        let oCurData = JSON.parse(JSON.stringify(this.state._oDefaultData));
        this.setState({ 
            _oActiveData: oCurData,
            _bShowWorkshiftForm: true 
        })
    }

    _editActiveWorkshift = () => {
        console.log('this.state._oActiveData: ' + JSON.stringify(this.state._oActiveData));
        this.setState({ 
            _bShowWorkshiftForm: true 
        })
    }

    _cancelTransaction = () => {
        this.setState({ _bShowWorkshiftForm: false })
    }

    _submitTransaction = (value) => {
        let oData = JSON.parse(JSON.stringify(this.state._oDefaultData));
        let splitWSType = value.workshiftid.split(CONSTANTS.SPLITSTRING);
        oData.id = this.state._oActiveData.id;
        oData.workshiftid = splitWSType[1];
        oData.effectivedate.from.value = (oHelper.convertDateToString(value.effectivedate, 'YYYY-MM-DD'));
        oData.remarks = value.remarks;
        oData.employeeId = this.props.oEmployee.id
        
        if( oData.id === ''){
            this._saveNewDataToDB(oData);
        }
        else{
            let originalData = {...this.state._oActiveData};
            let newData = {...oData};
            console.log('originalData:' + JSON.stringify(originalData));
            console.log('newData:' + JSON.stringify(newData));
            if(
                (newData.workshiftid==originalData.workshiftid) &&
                (newData.effectivedate.from.value==originalData.effectivedate.from.value) 
            ){
                Alert.alert(
                    'Identical Data',
                    'Unable to commit changes. Modified data is similar to current data.',
                    [
                        {text: 'OK', onPress: () => {}}
                    ],
                    { cancelable: false }
                )
            }
            else{
                Alert.alert(
                    'Warning',
                    'All changes will be saved and will be irreversible. ' + 
                    'Are you sure you want to proceed ?',
                    [
                        {text: 'NO', onPress: () => {}},
                        {text: 'YES', onPress: () => this._updateDataToDB(oData)}
                    ],
                    { cancelable: false }
                )
            }
        }
        /* console.log('value: ' + JSON.stringify(value));
        let splitWSType = value.workshiftid.split(CONSTANTS.SPLITSTRING);
        let oData = JSON.parse(JSON.stringify(this.state._oDefaultData));
        oData.workshiftid = splitWSType[1];
        oData.effectivedate.from.value = (oHelper.convertDateToString(value.effectivedate, 'YYYY-MM-DD'));
        oData.remarks = value.remarks;
        this.setState({
            _oActiveData: oData,
            _bShowWorkshiftForm: false 
        }) */
    }

    _saveNewDataToDB = async(oData) => {
        this._showLoadingPrompt(add_loading_message);
    
        let bFlag = false;
        let oRes = null;

        employeeApi.employmentinfo.workshift.add(oData)
            .then((response) => response.json())
            .then((res) => {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                console.log('res: ' + JSON.stringify(res));
                oRes = res;
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno === 1){
                    this.props.actions.employee.updateWorkshift(res.workshift.data);
                    this._cancelTransaction();
                }
            })
            .then(() => {
                if(oRes.flagno === 1){
                    this._initData(CONSTANTS.STATUS.SUCCESS);
                }
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });
    }

    _updateDataToDB = async(oData) => {
        this._showLoadingPrompt(add_loading_message);
    
        let bFlag = false;
        let oRes = null;

        employeeApi.employmentinfo.workshift.update(oData)
            .then((response) => response.json())
            .then((res) => {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                console.log('res: ' + JSON.stringify(res));
                oRes = res;
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno === 1){
                    this.props.actions.employee.updateWorkshift(res.workshift.data);
                    this._cancelTransaction();
                }
            })
            .then(() => {
                if(oRes.flagno === 1){
                    this._initData(CONSTANTS.STATUS.SUCCESS);
                }
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });
    }

    _requestDelete = () => {
        let oData = JSON.parse(JSON.stringify(this.state._oActiveData));
        oData.employeeId = this.props.oEmployee.id;
        Alert.alert(
            'WARNING',
            'Deleting a workshift schedule is an irreversible action. ' + 
            'Are you sure you want to proceed ?',
            [
                {text: 'NO', onPress: () => {}},
                {text: 'YES', onPress: () => this._deleteDataFromDB(oData)}
            ],
            { cancelable: false }
        )
    }

    _deleteDataFromDB = (oData) => {
        this._showLoadingPrompt(delete_loading_message);
        let oRes = null;
        
        employeeApi.employmentinfo.workshift.delete(oData)
            .then((response) => response.json())
            .then((res) => {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                console.log('res: ' + JSON.stringify(res));
                oRes = res;
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno === 1){
                    this.props.actions.employee.updateWorkshift(res.workshift.data);
                    this._cancelTransaction();
                }
            })
            .then(() => {
                if(oRes.flagno === 1){
                    this._initData(CONSTANTS.STATUS.SUCCESS);
                }
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });
    }

    _formatEffectiveDate = (oEffectiveDate) => {
        
    }

    _setActiveData = (value) => {
        if(!oHelper.isStringEmptyOrSpace(value)){
            
            let oActive = oHelper.getElementByPropValue(this.props.oEmpWorkShift.data, 'id', value);
            let oCurWSData = workshiftSelector.getScheduleFromTypeID(oActive.workshiftid);
            console.log('oActive.workshiftid: ' + JSON.stringify(oActive));
            this.setState({
                _oActiveData: oActive,
                _oActiveWorkShiftRule: oCurWSData
            }, 
                console.log('JSON.stringify(this.state._oActiveData: ' + JSON.stringify(this.state._oActiveDat))
            );
            if(oActive!==undefined){
                this.props.actions.workshift.setActiveRule(oActive.workshiftid);
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

    render(){
        
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Workshift Schedule' onRefresh={this._getDataFromDB}/>
            );
        }

        else if(pProgress==1){
            /* console.log('RENDERING EMP WS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('this.state._status: ' + this.state._status);
            console.log('this.state._oActiveWorkShiftRule: ' + JSON.stringify(this.state._oActiveWorkShiftRule));
            console.log('this.state._oActiveData.workshiftid: ' + JSON.stringify(this.state._oActiveData.workshiftid));
             */
            let oActiveScheduleValue = null
            if(this.state._oActiveWorkShiftRule){
                oActiveScheduleValue = this.state._oActiveWorkShiftRule.description +
                CONSTANTS.SPLITSTRING + this.state._oActiveData.workshiftid
            }

            return(
                <View style={styles.transparentContainer}>
                    { 
                        this.props.oEmpWorkShift.data.length === 0 ?
                            <TouchableOpacity 
                                style={styles.emptyDataContainer}
                                activeOpacity={0.8}
                                onPress={this._addNewWorkShift}>
                                    <Text>
                                        No workshift assigned to employee. Tap here to add.
                                    </Text>
                            </TouchableOpacity>
                        :
                        <View style={styles.container}>
                            <EffectiveDatePicker 
                                selectedValue={this.state._oActiveData.id}
                                options={this.props.oEmpWorkShift.data}
                                onChange={this._setActiveData}/>

                            <View style={styles.workshiftStyles.body.container}>
                                <View style={styles.workshiftStyles.body.contRule}>
                                    <WorkShift hideHeader={true} viewOnly={true}/>
                                </View>
                            </View>

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
                    }
                    {
                        this.state._bShowWorkshiftForm ?
                            <EmployeeWorkshiftForm
                                activeScheduleValue = {oActiveScheduleValue}
                                minEffectiveDate={null}
                                onDelete={this._requestDelete}
                                visible={this.state._bShowWorkshiftForm}
                                activeData = {this.state._oActiveData}
                                cancelForm={this._cancelTransaction}
                                submitForm={this._submitTransaction}
                                title= {this.state._iActiveIndex ? 'MODIFY EMPLOYEE WORKSHIFT' : 'ADD NEW EMPLOYEE WORKSHIFT'}
                                workshifttype={this.state._oWorkShiftTypeList}/>
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
        else{
            return (
                <View style={styles.container}>
                    <PromptScreen.PromptLoading title={pMessage}/>
                </View>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        workshift: state.companyPoliciesReducer.workshift,
        oEmpWorkShift: state.employees.activeProfile.data.employmentinfo.workshift,
        oEmployee: state.employees.activeProfile.data
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
            workshift: bindActionCreators(workshiftActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeWorkShift)