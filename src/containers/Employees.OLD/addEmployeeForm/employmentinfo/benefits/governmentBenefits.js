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

import styles from '../styles';

//Custom Components
import CompanyBenefitsForm from '../forms/companyBenefitsForm';
import ActionButton from '../../../../../components/ActionButton';
import * as PromptScreen from '../../../../../components/ScreenLoadStatus';
import MessageBox from '../../../../../components/MessageBox';
import EffectiveDateForm from '../forms/effectiveDateForm';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../../data/activeProfile/actions';
import * as benefitsActions from '../../../../CompanyPolicies/data/benefits/actions';

///API
import * as employeeApi from '../../../data/activeProfile/api'

//Helper and Project Constants
import * as oHelper from '../../../../../helper';

//Constants
import { CONSTANTS } from '../../../../../constants/index';
const off_loading_message = 'Turning off Government Benefit from Employee. Please wait.';
const on_loading_message = 'Turning on Government Benefit from Employee. Please wait.';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';

export class EmpGovBenefits extends Component {
    constructor(props){
        super(props);
        console.log('this.props.oEmpBenefits: ' + JSON.stringify(this.props.oEmpBenefits));
        this.state = {
            //Generic States
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',
            _refreshing: false,
            _status: [2, 'Loading...'],

            _status: CONSTANTS.STATUS.SUCCESS,
            _activeIndex: '',
            _bPendingValue: false,
            _bShowEffectiveDateForm: false,
            _showCompanyBenefitsForm: false,
            _oDefaultActive: {
                id: "",
                name: "",
                enabled: false,
                effectivedate:{
                    from:{
                        value: null,
                        format: 'YYYY-MM-DD'
                    },
                    to:{
                        value: null,
                        format: 'YYYY-MM-DD'
                    }
                }
                
            },

            _oDefaultEffectiveDate: {
                from:{
                    value: null,
                    format: 'YYYY-MM-DD'
                },
                to:{
                    value: null,
                    format: 'YYYY-MM-DD'
                }
            }
        }
    }

    _updateEffectiveDate = (value) => {
        let oData = [...this.props.oEmpBenefits.government.data];
        let strLoading = this.state._bPendingValue ? on_loading_message : off_loading_message;
        let oActive = JSON.parse(JSON.stringify(this.state._oDefaultActive));
        oActive.id = oData[this.state._activeIndex].id;
        oActive.name = oData[this.state._activeIndex].name;
        oActive.enabled = this.state._bPendingValue;
        oActive.effectivedate.from.value = (oHelper.convertDateToString(value.effectivedate, 'YYYY-MM-DD'));
        let inputData = {
            employeeId: this.props.oEmployee.id,
            benefits: {
                government: {
                    data: oActive
                }
            }
        };
        this._saveDataToDB(inputData, strLoading);
        /* let oData = [...this.state._oData];
        oData[this.state._activeIndex].enabled = this.state._bPendingValue;
        oData[this.state._activeIndex].effectivedate.from.value = oHelper.convertDateToString(value.effectivedate, 'YYYY-MM-DD');
        this.setState({
            _oData: oData,
            _bShowEffectiveDateForm: false
        }) */
    }

    _hideEffectiveDateForm = () => {
        this.setState({
            _bPendingValue: false,
            _activeIndex: '',
            _bShowEffectiveDateForm: false
        })
    }

    _toggleGovBenefit = (value, index) => {
        if(value){
            this.setState({
                _bPendingValue: value,
                _activeIndex: index,
                _bShowEffectiveDateForm: true
            })
        }
        else{
            Alert.alert(
                'Warning',
                'Disabling the selected Government Benefit will take effect immediately on the current payroll period. ' +
                    'Are you sure you want to proceed?',
                [
                {text: 'NO', onPress: () => {}},
                {text: 'YES', onPress: () => this._toggleOffGovBenefit(value,index)},
                ],
                { cancelable: false }
            )
        }
    }

    _toggleOffGovBenefit = (value, index) => {
        /* let oData = [...this.state._oData];
        oData[index].enabled = value;
        this.setState({
            _oData: oData
        }) */
        let oData = [...this.props.oEmpBenefits.government.data];
        let strLoading = value ? on_loading_message : off_loading_message;
        let oActive = JSON.parse(JSON.stringify(this.state._oDefaultActive));
        oActive.id = oData[index].id;
        oActive.name = oData[index].name;
        oActive.enabled = value;
        oActive.effectivedate.from.value = oData[index].effectivedate.from.value;
        let inputData = {
            employeeId: this.props.oEmployee.id,
            benefits: {
                government: {
                    data: oActive
                }
            }
        };
        this._saveDataToDB(inputData, strLoading);
    }

    _saveDataToDB = async(oData, strLoading) => {
        this._showLoadingPrompt(strLoading);
    
        let bFlag = false;
        let oRes = null;

        employeeApi.employmentinfo.benefits.request(oData)
            .then((response) => response.json())
            .then((res) => {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                console.log('res: ' + JSON.stringify(res));
                oRes = res;
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno === 1){
                    this._updateLocalStore(oData);
                    this._hideEffectiveDateForm();
                }
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });
    }

    _updateLocalStore = (oData) => {
        console.log('oData: ' + JSON.stringify(oData));
        let newArray = this.props.oEmpBenefits.government.data.slice();
        iData = newArray.findIndex(obj => obj.id == oData.benefits.government.data.id);
        if(iData < 0) {
            //No Action
        }
        else{
            newArray.splice(iData, 1, oData.benefits.government.data);
            console.log('newArray: ' + JSON.stringify(newArray));
            this.props.actions.employee.updateGovernmentBenefits(newArray);
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
        let aData = this.props.oEmpBenefits.government.data;
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Benefits Policy' onRefresh={()=>this.props.triggerRefresh(true)}/>
            ); 
        }

        else if(pProgress==1){

            const oDefaultDate = JSON.parse(JSON.stringify(this.state._oDefaultEffectiveDate));
            return(
                <View style={styles.genericContainer}>
                    <View style={styles.benefitsStyles.contTitle}>
                        <Text style={styles.txtFormTitle}>GOVERNMENT BENEFITS</Text>
                    </View>
                    <View style={styles.benefitsStyles.contContent}>
                        {
                            aData.map((oData, index) => 
                                <View key={index} style={styles.benefitsStyles.contElementPlaceholder}>
                                    <View style={styles.benefitsStyles.contElementMain}>
                                        <View style={styles.benefitsStyles.contLeftElement}>
                                            <Text style={styles.benefitsStyles.txtPropName}>{oData.name}</Text>
                                        </View>
                                        <View style={styles.benefitsStyles.contRightElement}>
                                            <Switch
                                                onValueChange={ (value) => {this._toggleGovBenefit(value, index)}} 
                                                onTintColor={color_SwitchOn}
                                                thumbTintColor={color_SwitchThumb}
                                                tintColor={color_SwitchOff}
                                                value={ oData.enabled }
                                            />
                                        </View>
                                    </View>
                                    {
                                        oData.enabled ?
                                            <View style={styles.benefitsStyles.contElementDescription}>
                                                <View style={styles.benefitsStyles.contLeftElementDescription}>
                                                    <Text style={styles.benefitsStyles.txtDescription}>
                                                        {
                                                            'Effective Date: ' +
                                                            oHelper.convertDateToString(new Date(oData.effectivedate.from.value), oData.effectivedate.from.format)
                                                        }
                                                    </Text>
                                                </View>
                                                {/* <View style={styles.benefitsStyles.contRightElement}>
                                                    
                                                </View> */}
                                            </View>
                                        :
                                            null
                                    }
                                </View>
                            )
                        }
                    </View>
                    {
                        this.state._bShowEffectiveDateForm ?
                            <EffectiveDateForm 
                                title='SELECT AN EFFECTIVE DATE'
                                visible={this.state._bShowEffectiveDateForm}
                                onSubmit={this._updateEffectiveDate}
                                onCancel={this._hideEffectiveDateForm}
                                effectivedate={oDefaultDate}
                            />
                        : null
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
        oEmpBenefits: state.employees.activeProfile.data.employmentinfo.benefits,
        oEmployee: state.employees.activeProfile.data

    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
            benefits: bindActionCreators(benefitsActions, dispatch)
        },
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpGovBenefits)