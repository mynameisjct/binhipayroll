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
import EmployeeRankForm from './forms/employeeRankForm';

//Custom Components
import GenericContainer from '../../../../components/GenericContainer';
import * as PromptScreen from '../../../../components/ScreenLoadStatus';

//Styles
import styles from './styles';
import Ranks from '../../../CompanyPolicies/ranks';
import MessageBox from '../../../../components/MessageBox';

//API
import * as employeeApi from '../../data/activeProfile/api'

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ranksActions from '../../../CompanyPolicies/data/ranks/actions';
import * as employeeActions from '../../data/activeProfile/actions';

//Helper
import * as oHelper from '../../../../helper';

//Constants 
import {CONSTANTS} from '../../../../constants';
const TITLE = 'Rank Based Rules';
const add_loading_message = 'Saving a New Employee Rank. Please wait.';
const delete_loading_message = 'Deleting an Employee Rank. Please wait...';
const update_loading_message = 'Updating an Employee Rank. Please wait...';

export class RankBasedRules extends Component{
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

            _oActiveData: null,
            _bShowRankForm: false,
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
    componentDidMount(){
        this._getRanksPolicyFromDB();
    }

    _getRanksPolicyFromDB = () => {
        if(this.props.ranksPolicy.status[0] != 1){
            this.props.actions.ranks.get()
        }
    }

    _getDataFromDB = () => {
        this.props.actions.ranks.get({...this._requiredInputs(), transtype:'get'});
    }

    _requiredInputs = () => {
        return({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername
        })
    }

    _setActiveData = (id) => {
        this.props.actions.ranks.setActiveRule(id);
    }

    _generateRanks = () => {
        let arrRTypes = [...this.props.ranksPolicy.data.data];
        let oRList = {};
        arrRTypes.map((data, index) => {
            oRList[data.name.value + CONSTANTS.SPLITSTRING + data.id] = data.name.value
        })
        return oRList;
    }

    _addNewRank = () => {
        let oCurData = JSON.parse(JSON.stringify(this.state._oDefaultData));
        this.setState({
            _oActiveData: oCurData,
            _bShowRankForm: true 
        })
    }

    _editActiveRank = () => {
        console.log('this.state._oActiveData: ' + JSON.stringify(this.state._oActiveData));
        this.setState({ 
            _bShowRankForm: true 
        })
    }

    _hideForm = () => {
        this.setState({ _bShowRankForm: false })
    }

    _submitTransaction = (value) => {
        let oData = JSON.parse(JSON.stringify(this.state._oDefaultData));
        let splitRType = value.rankid.split(CONSTANTS.SPLITSTRING);
        oData.id = this.state._oActiveData.id;
        oData.rankid = splitRType[1];
        oData.effectivedate.from.value = (oHelper.convertDateToString(value.effectivedate, 'YYYY-MM-DD'));
        oData.remarks = value.remarks;
        let oInputData = {
            employeeId: this.props.oEmployee.id,
            rank: {
                data: oData
            }
        };
        if( oData.id === ''){
            this._saveNewDataToDB(oInputData);
        }

        /* else{
            let originalData = {...this.state._oActiveData};
            let newData = {...oData};
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
        } */
    }

    _saveNewDataToDB = (oData) => {
        this._showLoadingPrompt(add_loading_message);
        let bFlag = false;
        let oRes = null;

        employeeApi.employmentinfo.rank.add(oData)
            .then((response) => response.json())
            .then((res) => {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                console.log('RANKres: ' + JSON.stringify(res));
                oRes = res;
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno === 1){
                    /* this.props.actions.employee.updateWorkshift(res.workshift.data); */
                    this._hideForm();
                }
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });
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
        console.log('this.props.ranksPolicy.status: ' + this.props.ranksPolicy.status);
        console.log('this.props.oEmpRank: ' + JSON.stringify(this.props.oEmpRank));
        return(
            <GenericContainer 
                status={this.props.ranksPolicy.status}
                title={TITLE}
                onRefresh={this._getEmployeeListFromDB}>

                <View style={styles.transparentContainer}>
                    { 
                        this.props.oEmpRank.data.length === 0 ?
                            <TouchableOpacity 
                                style={styles.emptyDataContainer}
                                activeOpacity={0.8}
                                onPress={this._addNewRank}>
                                    <Text>
                                        No Rank assigned to employee. Tap here to add.
                                    </Text>
                            </TouchableOpacity>
                        :
                        <View style={styles.container}>
                            <View style={styles.workshiftStyles.header.container}>
                                <View style={styles.workshiftStyles.header.contInfo}>
                                    <View style={styles.workshiftStyles.header.contInfoLabel}>
                                        <Text style={styles.workshiftStyles.header.txtInfo}>
                                            Effective Date:
                                        </Text>
                                    </View>
                                    <View style={styles.workshiftStyles.header.contInfoData}>
                                        <View style={styles.workshiftStyles.header.pickerContainer}>
                                            <Picker
                                                style={styles.workshiftStyles.header.namePickerStyle}
                                                selectedValue={String(this.props.ranksPolicy.activeRule)}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    this._setActiveData(itemValue);
                                                    }}>
                                                {
                                                    this.props.oEmpRank.data.map((oData, index) =>
                                                        <Picker.Item key={index} label={oHelper.convertRangeDateToString(oData.effectivedate)} value={String(oData.id)} />
                                                    )
                                                }
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.workshiftStyles.header.contBtn}>
                                </View>
                            </View>
                            <View style={styles.workshiftStyles.body.container}>
                                <View style={styles.workshiftStyles.body.contRule}>
                                    <Ranks hideHeader={true} viewOnly={true}/>
                                </View>
                            </View>

                            <ActionButton
                                bgColor='rgba(0,0,0,0.8)'
                                shadowStyle={{elevation: 30}}
                                buttonColor="#EEB843"
                                spacing={10}
                                icon={<Icon name="account-star" color='#fff' size={25} style={styles.actionButtonIcon} />}>
                                <ActionButton.Item size={45} buttonColor='#26A65B' title="ADD A NEW RANK" onPress={this._addNewRank}>
                                    <Icon name="bell-plus" color='#fff' size={18} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item size={45} buttonColor='#4183D7' title="MODIFY CURRENT RANK" onPress={this._editActiveRank}>
                                    <Icon name="table-edit" color='#fff' size={18} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                            
                        </View>
                    }
                </View>
                {
                    this.state._bShowRankForm ?
                        <EmployeeRankForm
                            activeScheduleValue = {this.state._oActiveData}
                            minEffectiveDate={null}
                            onDelete={this._requestDelete}
                            visible={this.state._bShowRankForm}
                            activeData = {this.state._oActiveData}
                            cancelForm={this._hideForm}
                            submitForm={this._submitTransaction}
                            title= {this.state._oActiveData.id ? 'MODIFY EMPLOYEE RANK' : 'ADD NEW EMPLOYEE RANK'}
                            ranksTypes={this._generateRanks()}/>
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
            </GenericContainer>
        )
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        ranksPolicy: state.companyPoliciesReducer.ranks,
        oEmpRank: state.employees.activeProfile.data.employmentinfo.rank,
        oEmployee: state.employees.activeProfile.data
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
            ranks: bindActionCreators(ranksActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RankBasedRules)