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

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../../data/activeProfile/actions';
import * as benefitsPolicyActions from '../../../../CompanyPolicies/data/benefits/actions';

//API
import * as employeeApi from '../../../data/activeProfile/api'

//Helper and Project Constants
import * as oHelper from '../../../../../helper';

//Constants
import { CONSTANTS } from '../../../../../constants/index';
const add_loading_message = 'Adding new Company Benefit. Please wait.';
const delete_loading_message = 'Removing an employee Company Benefit. Please wait...';

export class EmpCompBenefits extends Component {
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

            _showCompanyBenefitsForm: false,
            _oDefaultActive: {
                id: '',
                benefitid: '',
                effectivedate: {
                    from: {
                        value: null,
                        format: 'YYYY-MM-DD'
                    },
                    to: {
                        value: null,
                        format: 'YYYY-MM-DD'
                    }
                },
                amountpermonth: '',
                scheme: {
                    value: ''
                }
            }
        }
    }

    componentDidMount(){
        this._getDataFromDB();
    }
    
    _getDataFromDB = () => {
        this.props.actions.benefits.get({...this._requiredInputs(), transtype:'get'});
    }

    _requiredInputs = () => {
        return({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
        })
    }

    _addNewBenefit = () => {
        this.setState({
            _showCompanyBenefitsForm: true
        })
    }

    _onCancel = () => {
       this._hideForm();
    }

    _onSubmit = (data) => {
        let oActive = JSON.parse(JSON.stringify(this.state._oDefaultActive));
        oActive.id = '';
        oActive.benefitid = data.benefittype;
        oActive.effectivedate.from.value = (oHelper.convertDateToString(data.effectivedate, 'YYYY-MM-DD'));
        oActive.amountpermonth = data.amountpermonth;
        oActive.scheme.value = data.scheme;
        oActive.name=this._getBenifitNameFromID(data.benefittype);
        let oData = {
            employeeId: this.props.oEmployee.id,
            benefits: {
                company: {
                    data: oActive
                }
            }
        };
        this._saveNewDataToDB(oData);
    }

    _hideForm = () => {
        this.setState({
            _showCompanyBenefitsForm: false
        })
    }

    _requestRemoveBenefit = (oData) => {
        Alert.alert(
            'Warning',
            'Removing a benefit is an irreversible action. ' + 
            'When a benefit is removed, it will immediately take effect on ' + 
            'the current period. Are you sure you want to proceed ? ' +
                'Are you sure you want to proceed?',
            [
            {text: 'NO', onPress: () => {}},
            {text: 'YES', onPress: () => this._deleteFromDB(oData)},
            ],
            { cancelable: false }
        )
    }

    _deleteFromDB = (oData) => {
        this._showLoadingPrompt(delete_loading_message);
        oData.employeeId = this.props.oEmployee.id;

        employeeApi.employmentinfo.benefits.delete(oData)
        .then((response) => response.json())
        .then((res) => {
            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
            console.log('res: ' + JSON.stringify(res));
            oRes = res;
            this._hideLoadingPrompt();
            bFlag = this._evaluateResponse(res);
            if(res.flagno === 1){
                this._deleteItemFromLocalStore(oData);
                this._hideForm();
            }
        })
        .catch((exception) => {
            this._hideLoadingPrompt();
            this._showMsgBox('error-ok', exception.message);
        });

        let bFlag = false;
        let oRes = null;
    }

    _saveNewDataToDB = async(oData) => {
        this._showLoadingPrompt(add_loading_message);
    
        let bFlag = false;
        let oRes = null;

        employeeApi.employmentinfo.benefits.add(oData)
            .then((response) => response.json())
            .then((res) => {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                console.log('res: ' + JSON.stringify(res));
                oRes = res;
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno === 1){
                    this._updateLocalStore(oData, res);
                    this._hideForm();
                }
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });
    }

    _getBenifitNameFromID = (id) => {
        let newArray = this.props.oBenefitsPolicy.data.company.data.slice();
        iData = newArray.findIndex(obj => obj.id == id);
        if (iData < 0){
            return null;
        }
        else{ 
            return newArray[iData].name;
        }
    }

    _deleteItemFromLocalStore = oData => {
        let newArray = this.props.oEmpBenefits.company.data.slice();
        iData = newArray.findIndex(obj => obj.id == oData.id);
        if (iData > -1) {
            newArray.splice(iData, 1);
            console.log('newArray: ' + JSON.stringify(newArray));
            this.props.actions.employee.updateCompanyBenefits(newArray);
        }
    }

    _updateLocalStore = (oData, res) => {
        console.log('oData: ' + JSON.stringify(oData));
        let curData = {...oData.benefits.company.data};
        curData.id = res.id;
        let newArray = this.props.oEmpBenefits.company.data.slice();
        newArray.push(curData);
        this.props.actions.employee.updateCompanyBenefits(newArray);
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
        let pStatus = this.props.oBenefitsPolicy.status;
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];
        console.log(this.props.oBenefitsPolicy.status)
        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Benefits Policy' onRefresh={this._getDataFromDB}/>
            ); 
        }

        else if(pProgress==1){
            let oData = this.props.oEmpBenefits.company.data;
            return(
                <View style={styles.genericContainer}>
                    <View style={styles.benefitsStyles.contTitle}>
                        <Text style={styles.txtFormTitle}>{this.props.oEmpBenefits.company.title || 'COMPANY BENEFITS'}</Text>
                    </View>
                    {
                        oData.length === 0 ?
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.benefitsStyles.contEmpty}
                                onPress={this._addNewBenefit}>
                                <Text style={styles.benefitsStyles.txtDescription}>
                                    No existing company benefits. Tap here to add.
                                </Text>
                            </TouchableOpacity>
                        :
                            
                                <View style={styles.benefitsStyles.contCompanyBenefits}>
                                    <ScrollView>
                                    {
                                        oData.map((oData, index) => 
                                            <View key={index} style={styles.benefitsStyles.placeholderCompanyBenefit}>
                                                <View style={styles.benefitsStyles.contRemove}> 
                                                    <Text onPress={() => this._requestRemoveBenefit(oData)}>REMOVE</Text>
                                                </View>
                                                <View style={styles.benefitsStyles.contProperty}> 
                                                    <View style={styles.benefitsStyles.contPropertyLeft}>  
                                                        <Text style={styles.benefitsStyles.txtPropNameCompany}>NAME</Text>
                                                    </View>
                                                    <View style={styles.benefitsStyles.contPropertyRight}>  
                                                        <Text style={styles.benefitsStyles.txtPropValueCompany}>{oData.name}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.benefitsStyles.contProperty}> 
                                                    <View style={styles.benefitsStyles.contPropertyLeft}>  
                                                        <Text style={styles.benefitsStyles.txtPropNameCompany}>AMOUNT PER MONTH</Text>
                                                    </View>
                                                    <View style={styles.benefitsStyles.contPropertyRight}>  
                                                        <Text style={styles.benefitsStyles.txtPropValueCompany}>{oData.amountpermonth}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.benefitsStyles.contProperty}> 
                                                    <View style={styles.benefitsStyles.contPropertyLeft}>  
                                                        <Text style={styles.benefitsStyles.txtPropNameCompany}>SCHEME</Text>
                                                    </View>
                                                    <View style={styles.benefitsStyles.contPropertyRight}>  
                                                        <Text style={styles.benefitsStyles.txtPropValueCompany}>{oData.scheme.value}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.benefitsStyles.contProperty}> 
                                                    <View style={styles.benefitsStyles.contPropertyLeft}>  
                                                        <Text style={styles.benefitsStyles.txtPropNameCompany}>EFFECTIVE DATE</Text>
                                                    </View>
                                                    <View style={styles.benefitsStyles.contPropertyRight}>  
                                                        <Text style={styles.benefitsStyles.txtPropValueCompany}>
                                                            {oHelper.convertDateToString(oData.effectivedate.from.value, oData.effectivedate.from.format)}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }
                                    </ScrollView>
                                </View>
                            
                    }
                    {
                        this.state._showCompanyBenefitsForm ? 
                            <CompanyBenefitsForm
                                options={this.props.oBenefitsPolicy.data.company.data}
                                title={'ADD NEW COMPANY BENEFIT'}
                                visible={this.state._showCompanyBenefitsForm}
                                onCancel={this._onCancel}
                                onSubmit={this._onSubmit}
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
                    <ActionButton onPress={this._addNewBenefit} iconname='plus'/>
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
        oEmployee: state.employees.activeProfile.data,
        oBenefitsPolicy: state.companyPoliciesReducer.benefits
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
            benefits: bindActionCreators(benefitsPolicyActions, dispatch)
        },
    }
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpCompBenefits)