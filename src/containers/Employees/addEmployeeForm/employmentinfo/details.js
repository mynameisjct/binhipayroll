import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  DatePickerAndroid,
  Button,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import moment, { lang } from "moment";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles';
import stylesheet from '../../../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../../../global/tcomb-custom-select-android';
import { customDatePickerTemplate } from '../../../../global/tcomb-custom-datepicker-android'

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../data/activeProfile/actions';
import * as ranksActions from '../../../CompanyPolicies/data/ranks/actions';
import * as companyProfileActions from '../../../CompanyProfile/data/actions';
//API
import * as employeeApi from '../../data/activeProfile/api';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
import * as PromptScreen from '../../../../components/ScreenLoadStatus';
import { validate } from 'tcomb-validation';
import EmployeePositionForm from './forms/employeePositionForm';
import FixedCard1 from '../../../../components/FixedCards';
import MessageBox from '../../../../components/MessageBox';

//Helper
import * as oHelper from '../../../../helper';
import { CONSTANTS } from '../../../../constants/index';

const Form = t.form.Form;

const EMPLOYMENTTYPES = t.enums({
    Regular: 'Regular',
    Probationary: 'Probationary'
  });

export class EmployeePositions extends Component{
    _generateAttributesList = (oData) => {
        return [
            {
                label: 'POSITION',
                value: oData.position.label
            },
            {
                label: 'BRANCH',
                value: oData.branch.label
            },
            {
                label: 'REMARKS',
                value: oData.remarks
            }
        ]
    }
    
    render(){
        console.log('this.props.data: ' + JSON.stringify(this.props.data));
        return(
            <View>
                {
                    this.props.data.map((oData, index) => 
                        <View key={index} style={styles.contPosition}>
                            <FixedCard1
                                onEdit={() => {this.props.editItem(oData, index)}}
                                borderRadius={15}
                                iconSize={35}
                                title={
                                    (oHelper.isValidDate(new Date(oData.effectivedate.from.value)) ? 
                                        oHelper.convertDateToString(new Date(oData.effectivedate.from.value), oData.effectivedate.from.format)
                                    :
                                        oData.effectivedate.from.value)
                                    + 
                                        (oHelper.isValidDate(new Date(oData.effectivedate.to.value)) ? 
                                        ' - ' + oHelper.convertDateToString(new Date(oData.effectivedate.to.value), oData.effectivedate.to.format)
                                    :
                                        '')
                                }
                                attributes={this._generateAttributesList(oData)}/>
                        </View>
                    )
                }
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => this.props.onAddAction()}>
                    
                    <View style={styles.contIcon}>
                        <View style={styles.contAddLabel}>
                            <Text style={styles.txtAddLabel}>Add New</Text>
                        </View>
                        <View>
                            <Icon name='plus-circle-outline'  size={25} color='#EEB843'/>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
}

export class Details extends Component {
    constructor(props){
        super(props);
        this.state={
            _refreshing: false,
            _status: [2, 'Loading...'],
            _dateHiredFormat: this.props.oEmpDetails.datehired.format,
            _dateEndFormat: this.props.oEmpDetails.dateend.format,
            _oEmploymentDetails: {
                employmenttype: this.props.oEmpDetails.employmenttype || '',
                datehired: this.props.oEmpDetails.datehired.value ? new Date(this.props.oEmpDetails.datehired.value) : null,
                dateend: this.props.oEmpDetails.dateend.value ? new Date(this.props.oEmpDetails.dateend.value) : null
            },
            _positions: this.props.oEmpDetails.data || [],
            _showPositionForm: false,
            _activePosition: {},
            _activeIndex: '',
            _oDefaultPosition: {
                id: '',
                index: 1,
                position: {
                    label:'',
                    value:''
                },
                branch: {
                    label:'',
                    value:''
                },
                effectivedate: {
                    from: {
                        value: null,
                        format: 'MMMM DD, YYYY'
                    },
                    to: {
                        value: null,
                        format: 'MMMM DD, YYYY'
                    }
                },
                remarks: ''
            },

            _ranksList: {},
            _branchesList: {},

            //Generic States
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: ''
        }
    }

    componentDidMount(){
        this._getDataFromDB();
    }

    componentWillReceiveProps(nextProps){
        if(
            (nextProps.ranks.status[0] != this.state._status[0]) &&
            (nextProps.ranks.status[0] == nextProps.companyProfile.branchStatus[0]) &&
            (nextProps.ranks.status[0] == 1)
        ){
            if(nextProps.ranks.status[0] == 1){
                this._initData(nextProps.ranks.status);
            }
        }
    }

    _getDataFromDB = () => {
        this._getRanks();
        this._getBranches();
    }

    _getRanks = () => {
        this.props.actions.ranks.get();
    }

    _getBranches = () => {
        this.props.actions.companyProfile.getBranches();
    }

    _initData = async(oStatus) => {
        await this._generateOptions();
        this.setState({
            _status: oStatus
        })
    }

    _generateOptions = () => {
        this._generateRanks();
        this._generateBranches();
    }

    _generateRanks = () => {
        let arrRanks = [...this.props.ranks.data.data];
        let oRanksList = {};
        arrRanks.map((data, index) => {
            oRanksList[data.name.value + CONSTANTS.SPLITSTRING + data.id] = data.name.value
        })
        oRanksList['_ADDNEWRANK_'] = '-- ADD NEW RANK --';

        this.setState({
            _ranksList: oRanksList
        })
    }
    
    _generateBranches = () => {
        let arrBranches = [...this.props.companyProfile.data.branch];
        let oBranchList = {};
        arrBranches.map((data, index) => {
            oBranchList[(data.name + CONSTANTS.SPLITSTRING + data.id)] = data.name
        })

        oBranchList['_ADDNEWBRANCH_'] = '-- ADD NEW BRANCH --';

        this.setState({
            _branchesList: oBranchList
        })
    }

    _onChangeData = (value) => {
        let oEmpDetails = {...this.state._oEmploymentDetails};
        oEmpDetails.employmenttype = value.employmenttype;
        oEmpDetails.datehired = value.datehired;
        oEmpDetails.dateend = value.dateend;
        this.setState({ _oEmploymentDetails: oEmpDetails })
    }

    _onSubmitForm = () => {
        const navigation = this.props.logininfo.navigation;
        let oFormDetails = this.refs.form_employment_details.getValue();
        if(oFormDetails){
            if(this.state._positions.length < 1){
                this._showMsgBox('error-ok', 'Employee Position/Rank should not be empty. Please add an employee position.')
            }
            else{
                let oDetails = JSON.parse(JSON.stringify(oFormDetails));
                oDetails.data = [...this.state._positions];
                this.props.actions.employee.updateEmploymentDetails(oDetails);
                navigation.navigate('EmployeeWorkShift');
            }
        }
    }

    _addPostion = () => {
        let oActivePos = {...this.state._activePosition};
        oActivePos = JSON.parse(JSON.stringify(this.state._oDefaultPosition))
        this.setState({
            _activeIndex: null,
            _activePosition: oActivePos
        },
            () => {
                this.setState({ _showPositionForm: true });
            }
        );
    }

    _onEditPosition = (oData, index) => {
        let oActivePos = {...this.state._activePosition};
        oActivePos = JSON.parse(JSON.stringify(oData))
        this.setState({
            _activePosition: oActivePos,
            _activeIndex: index
        },
            () => {
                console.log('XXXXXXXXX==index: ' + index);
                this.setState({ _showPositionForm: true });
            }
        );
    }

    _requestDeletePosition = () => {
        Alert.alert(
            'Warning',
            'Deleting a position is an irreversible action. Are you sure you want to proceed ?',
            [
            {text: 'NO', onPress: () => {}},
            {text: 'YES', onPress: () => this._deleteActivePosition()},
            ],
            { cancelable: false }
        )
    }

    _requestModifyPosition = (oData) => {
        Alert.alert(
            'Warning',
            'Are you sure you want to modify current position record ?',
            [
            {text: 'NO', onPress: () => {}},
            {text: 'YES', onPress: () => this._modifyActivePosition(oData)},
            ],
            { cancelable: false }
        )
    }

    _deleteActivePosition = () => {
        let arrNew = [...this.state._positions];
        arrNew.splice(this.state._activeIndex, 1)
        this.setState({
            _showPositionForm: false,
            _positions: arrNew
        })
    }

    _cancelPositionTransaction = () => {
        this.setState({_showPositionForm: false});
    }

    _submitPositionTransaction = (oData) => {
        if(this.state._activeIndex == null){
            let splitPos = oData.position.split(CONSTANTS.SPLITSTRING);
            let splitBr = oData.branch.split(CONSTANTS.SPLITSTRING);
            let oPosition = JSON.parse(JSON.stringify(this.state._oDefaultPosition));
            let arrPositions = [...this.state._positions];
            let oLastData = {};
            oPosition.id = ''; //Temp val
            oPosition.position.label = splitPos[0];
            oPosition.position.value = splitPos[1]; 
            oPosition.branch.label = splitBr[0];
            oPosition.branch.value = splitBr[1];
            oPosition.effectivedate.from.value = (oHelper.convertDateToString(oData.effectivedate, 'YYYY-MM-DD'));
            if(this.state._positions.length > 0){
                let oLastDate = new Date(oData.effectivedate);
                oLastDate = oLastDate.setDate(oLastDate.getDate()-1);
                arrPositions[0].effectivedate.to.value = (oHelper.convertDateToString(oLastDate, 'YYYY-MM-DD'));
            }
            /* oPosition.effectivedate.to.value = 'PRESENT'; */
            oPosition.effectivedate.to.value = '';

            oPosition.remarks = oData.remarks;
            arrPositions.splice(0,0,oPosition)
            this.setState({
                _positions: arrPositions,
                _showPositionForm: false
            });
        }
        else{
            this._requestModifyPosition(oData);
        }
    }

    _modifyActivePosition = (oData) => {
        let splitPos = oData.position.split(CONSTANTS.SPLITSTRING);
        let splitBr = oData.branch.split(CONSTANTS.SPLITSTRING);
        let indexActive = this.state._activeIndex;
        let arrPositions = [...this.state._positions];
        arrPositions[indexActive].position.label = splitPos[0];
        arrPositions[indexActive].position.value = splitPos[1]; 
        arrPositions[indexActive].branch.label = splitPos[0];
        arrPositions[indexActive].branch.value = splitBr[1];
        arrPositions[indexActive].effectivedate.from.value = (oHelper.convertDateToString(oData.effectivedate, 'YYYY-MM-DD'));
        arrPositions[indexActive].remarks = oData.remarks;
        this.setState({
            _positions: arrPositions,
            _showPositionForm: false
        });
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

    render() {
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];
        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Tardiness Policy' onRefresh={this._getDataFromDB}/>
            );
        }

        else if(pProgress==1){
            const iPositionLength = this.state._positions.length;
            
            //This is put into render method to allow direct access to class properties
            let myFormatFunction = (format,strDate) => {
                return moment(strDate).format(format);
            }

            let oDateHiredConfig = {
                template: customDatePickerTemplate,
                label: 'DATE HIRED',
                mode:'date',
                config:{
                    format: (strDate) => myFormatFunction(this.state._dateHiredFormat, strDate)
                },
                error: '*Select birth date'
            };

            let oDateEndConfig = {
                template: customDatePickerTemplate,
                label: 'END DATE',
                mode:'date',
                disabled: true,
                config:{
                    format: (strDate) => myFormatFunction(this.state._dateEndFormat, strDate)
                }
            };

            const EMPLOYEE_EMPLOYMENTDETAILS = t.struct({
                employmenttype: EMPLOYMENTTYPES,
                datehired: t.Date,
                dateend: t.maybe(t.Date)
            });

            const OPTIONS_GENERALINFO = {
                fields: {
                    employmenttype:{ 
                        template: customPickerTemplate,
                        label: 'EMPLOYMENT TYPE',
                        error: '*Select an employment type'
                    },

                    datehired: oDateHiredConfig,

                    dateend: oDateEndConfig,
                },
                stylesheet: stylesheet
            };

            return (
                <View style={styles.genericContainer}>
                    <View style={styles.container}>
                        <ScrollView>
                            <View style={styles.contDivider}>
                                <View style={styles.contFormLeft}>

                                    { /********** GENERAL INFORMATION **********/ }
                                    <View style={styles.contTitle}>
                                        <Text style={styles.txtFormTitle}> GENERAL INFORMATION </Text>
                                    </View>
                                    <Form 
                                        ref='form_employment_details'
                                        type={EMPLOYEE_EMPLOYMENTDETAILS} 
                                        value={this.state._oEmploymentDetails}
                                        onChange={this._onChangeData}
                                        options={OPTIONS_GENERALINFO}/>
                                </View>

                                <View style={styles.contFormRight}>
                                    { /********** POSITION HISTORY **********/ }
                                    <View style={styles.contTitle}>
                                        <Text style={styles.txtFormTitle}> POSITION HISTORY </Text>
                                    </View>
                                    {
                                        this.state._positions.length === 0 ?
                                            <TouchableOpacity 
                                                activeOpacity={0.6}
                                                style={styles.contEmpty}
                                                onPress={() => {this._addPostion()}}>
                                                <Text>No Existing Positions. Tap here to Add.</Text>
                                            </TouchableOpacity>
                                        : 
                                            <EmployeePositions
                                                editItem={this._onEditPosition}
                                                onAddAction={this._addPostion}
                                                data={this.state._positions}/>
                                    }
                
                                </View>
                            </View>
                            <View style={{flex:1, padding: 40}}>
                                <Button
                                    onPress={this._onSubmitForm}
                                    title='Next'
                                    color="#3b5998"
                                    accessibilityLabel='Next'
                                />
                            </View>
                        </ScrollView>
                    </View>
                    {
                        this.state._showPositionForm ? 
                            <EmployeePositionForm 
                                minEffectiveDate={iPositionLength === 0 || this.state._activeIndex != null ?
                                    null
                                :
                                    this.state._activeIndex != null ? 
                                        oHelper.addDaysFromDate(this.state._positions[this.state._activeIndex - 1].effectivedate.from.value, 1) 
                                    :
                                        oHelper.addDaysFromDate(this.state._positions[0].effectivedate.from.value, 1)
                                }
                                onDelete={this._requestDeletePosition}
                                visible={this.state._showPositionForm}
                                activeData = {this.state._activePosition}
                                cancelForm={this._cancelPositionTransaction}
                                submitForm={this._submitPositionTransaction}
                                title='ADD NEW POSITION'
                                ranks={this.state._ranksList}
                                branches={this.state._branchesList}
                            />
                        :
                            null
                    }

                    <MessageBox
                        promptType={this.state._msgBoxType}
                        show={this.state._msgBoxShow}
                        onClose={this._closeMsgBox}
                        onWarningContinue={this._continueActionOnWarning}
                        message={this.state._resMsg}
                    /> 
                </View>
            );
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
)(Details)