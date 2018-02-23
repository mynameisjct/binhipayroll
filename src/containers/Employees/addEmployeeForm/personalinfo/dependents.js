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
import moment from "moment";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles';
import stylesheet from '../../../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../../../global/tcomb-custom-select-android';
import { customDatePickerTemplate } from '../../../../global/tcomb-custom-datepicker-android';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../data/activeProfile/actions';

//API
import * as employeeApi from '../../data/activeProfile/api'

//Helper 
import * as oHelper from '../../../../helper';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
import * as PromptScreen from '../../../../components/ScreenLoadStatus';
import MessageBox from '../../../../components/MessageBox';

//Constants
const add_loading_message = 'Saving New Employee Data. Please wait.';
const update_loading_message = 'Updating Existing Profile. Please wait...';
const delete_loading_message = 'Deleting a Profile. Please wait...';

const Form = t.form.Form;
const DEFAULT_DEPENDENT = {
    name: '', 
    birthdate: {
        value: null, 
        format: 'MMMM DD, YYYY'      
    },
    relationship: ''
}

const RELATIONSHIPS = t.enums({
    Son: 'Son',
    Daughter: 'Daughter',
    Parent: 'Parent',
    Brother: 'Brother',
    Sister: 'Sister',
    Relative: 'Relative'
});

class DependentsFields extends Component {
    constructor(props){
        super(props);
        this.state={
            _dateFormat: this.props.value.birthdate.format || "MMMM DD, YYYY",
            _oDependent: {
                name: this.props.value.name,
                birthdate: this.props.value.birthdate.value ? new Date(this.props.value.birthdate) : null,
                relationship: this.props.value.relationship,
            }
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(
            (this.state._oDependent.name !== nextProps.value.name) ||
            (this.state._oDependent.birthdate !== nextProps.value.birthdate) ||
            (this.state._oDependent.relationship !== nextProps.value.relationship)
        ){
            this.forceUpdate();
        }
    }

    _onChange = (curData) => {
        let bFlag = false;
        let oData = JSON.parse(JSON.stringify(curData));

        if(oHelper.isStringEmptyOrSpace(oData.name)){
            oData.birthdate = null;
            relationship = '';
            bFlag = true;
        }
        else{
            oData.birthdate = new Date(curData.birthdate)
        }

        this.setState({
            _oDependent: oData 
        },
            () => {
                if(bFlag && 
                    (
                        curData.birthdate != null || 
                        curData.relationship != ''
                    )
                ){
                    this._promptSpouseRequirements();
                }
            }
        )
        this.props.onChange(oData, this.props.formIndex);
    }

    _promptSpouseRequirements = () => {
        Alert.alert(
            'Required Information',
            'Dependent ' + (this.props.formIndex+1) + " information is cleared. Input a dependent's name first.",
            [
            {text: 'OK', onPress: () => {}},
            ],
            { cancelable: false }
        )
    }

    _onSubmit = () => {
        
    }

    focusName = () => {
        this.refs.dependent_form.getComponent('name').refs.input.focus();
    }

    setValue = (data) => {
        let oData = JSON.parse(JSON.stringify(data));
        let oDependent = JSON.parse(JSON.stringify(this.state._oDependent));
        oDependent.name = oData.name;
        oDependent.birthdate = new Date(oData.birthdate);
        oDependent.relationship = oData.relationship;
        this.setState({ _oDependent: oDependent })
    }

    getValue = () => { 
        let oForm = this.refs.dependent_form.getValue();
        if(oForm){
            return oForm;
        }
        else{
            return null;
        }
    }

    render(){
        console.log('---------------------------Rendering Dependents Fields')
        console.log('this.props.value: ' + JSON.stringify(this.props.value));
        let myFormatFunction = (format,date) => {
            return moment(date).format(format);
        }
          
        let oBday = {
            template: customDatePickerTemplate,
            label: 'BIRTHDATE',
            mode:'date',
            config:{
                format:(date) => myFormatFunction(this.state._dateFormat,date)
            },
            error: '*Select birth date'
        };

        const EMPLOYEEE_DEPENDENT = t.struct({
            name: t.maybe(t.String),
            birthdate: oHelper.isStringEmptyOrSpace(this.state._oDependent.name) ? t.maybe(t.Date) : t.Date,
            relationship: oHelper.isStringEmptyOrSpace(this.state._oDependent.name) ?  t.maybe(RELATIONSHIPS) : RELATIONSHIPS
        });
        
        const OPTIONS = {
            fields: {
                name:{ 
                    label: 'NAME',
                },
                birthdate: oBday,

                relationship:{ 
                    template: customPickerTemplate,
                    label: 'RELATIONSHIP',
                }
            },
            stylesheet: stylesheet
        };

        return(
            <View style={styles.genericContainer}>
                <Form 
                    ref='dependent_form'
                    type={EMPLOYEEE_DEPENDENT} 
                    value={this.state._oDependent}
                    options={OPTIONS}
                    onChange={this._onChange}/>
            </View>
        )
    }
}

class DependentsForm extends Component{
    constructor(props){
        super(props);
        this.state={
            _dependentRef: [],
            _value: this.props.value.length == 0 ? [JSON.parse(JSON.stringify(DEFAULT_DEPENDENT))] : [...this.props.value],
        }
    }

    componentWillReceiveProps(nextProps){
        let bFlag = true;
        if(nextProps.isSubmitted===true){
            this._validateDependents();
        }
    }
    
    _validateDependents = async() => {
        let oDependent = await this._validateEveryDepenent();
        this.props.validateAllData(oDependent);
    }
    
    _validateEveryDepenent = async() => {
        let bFlag = true;
        await this.state._value.map((data,index) => {
            if(this.state._dependentRef[index].getValue()){
                //do nothing
            }
            else{
                if(bFlag){
                    bFlag = false;
                }
            }
        });

        if(bFlag){
            console.log('ALL INPUTS ARE VALID!!!!!')
            if (oHelper.isStringEmptyOrSpace(this.state._value[0].name)) {
                return [];
            }
            else{
                return this.state._value;
            }
            
        }
        else{
            console.log('ONE OF THE INPUTS IS INVALID!!!!!')
            return null;
        }
    }

    _updateData = (curData, curIndex) => {
        console.log('curData: ' + JSON.stringify(curData));
        console.log('curIndex: ' + curIndex);
        let arrData = [...this.state._value];
        arrData[curIndex].name = curData.name;
        arrData[curIndex].birthdate = curData.birthdate;
        arrData[curIndex].relationship = curData.relationship;
        this.setState({_value: arrData})
    }

    _addNewRow = () => {
        let aList = [...this.state._value];
        let oLastRow = aList.slice(-1)[0];
        console.log
        if(oHelper.isStringEmptyOrSpace(oLastRow.name)){
            this.state._dependentRef[aList.length - 1].focusName();
        }
        else{
            console.log('DEFAULT_DEPENDENT: ' + JSON.stringify(DEFAULT_DEPENDENT));
            aList.push(JSON.parse(JSON.stringify(DEFAULT_DEPENDENT)));
            this.setState({
                _value: aList
            })
        }
    }

    _requestRemoveRow = (index) => {
        Alert.alert(
            'Confirm to Delete',
            'Removing a data is an irreversible action. Are you sure you want to proceed?',
            [
              {text: 'Cancel', onPress: () => {}},
              {text: 'YES', onPress: () => this._removeRow(index)},
            ],
            { cancelable: false }
          )
    }

    _removeRow = (index) => {
        console.log('DELETEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEXXX: ' + index);
        console.log('this.state._value: ' + JSON.stringify(this.state._value));
        let aList = [...this.state._value];
        let aDependentRef = [...this.state._dependentRef];

        aList.splice(index, 1);
        aDependentRef.splice(index, 1);

        this.setState({
            _value: aList
        },
            () => {
                this.state._value.map((data,index) =>
                    this.state._dependentRef[index].setValue(data)
                )
            }
        )
        
    }

    render(){
        console.log('this.state._value: ' + JSON.stringify(this.state._value));
        return(
            <View style={styles.genericContainer}>
                {
                    this.state._value.map((data,index) =>
                        <View style={styles.contGroupWrapper} key={index}>
                            <View style={styles.contLabel}>
                                <Text style={styles.txtGroupLabel}>{this.props.label + ' ' + (index+1) || 'ROW ' + (index+1)}</Text>
                            </View>
                            {console.log('data: ' + JSON.stringify(data))}
                            <DependentsFields 
                                ref = {(oInstance) => this.state._dependentRef[index] = oInstance}
                                key={index}
                                isSubmitted={this.props.isSubmitted}
                                formIndex = {index}
                                value={data}
                                onChange = {(curData, curIndex) => this._updateData(curData, curIndex)}
                                />
                            {
                                this.state._value.length !== 1 ?
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => {this._requestRemoveRow(index)}}
                                        style={{height: 36, paddingRight: 0, position: 'absolute', top: 20, right: 0, bottom: 0, alignItems: 'flex-end', justifyContent: 'center', width: 70}}
                                        >
                                        <Icon size={25} name='close-circle' color='#EEB843' />
                                    </TouchableOpacity>
                                :
                                    null
                            }
                        </View>
                    )
                }

                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this._addNewRow()}>
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
            </View>
        )
    }

}

export class Dependents extends Component {
    constructor(props){
        super(props);
        this.state={
            _isSpouseDataValid: false,
            _dateFormat: this.props.oFamily.spouse.birthdate.format || 'MMMM DD, YYYY',
            _oSpouse: {
                name: this.props.oFamily.spouse.name,
                birthdate: this.props.oFamily.spouse.birthdate.value ? new Date(this.props.oFamily.spouse.birthdate.value) : null,
                jobtitle: this.props.oFamily.spouse.work.jobtitle,
                company: this.props.oFamily.spouse.work.company
            },
            _isSubmitted: false,

            //Gereric States
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',
            _refreshing: false,
            _disabledMode: true,
            _status: [2, 'Loading...'],
            _hasSentRequest: false,
        }
    }

    _setSubmitStatus = (value) => {
        let TEMP = this.refs.form_spouse.getValue();

        if(TEMP){
            this.setState({ _hasSentRequest: true, _isSubmitted: value, _isSpouseDataValid: true });
            
        }
        else{
            this.setState({ _isSubmitted: value, _isSpouseDataValid: false });
        }
    }

    _validateAllData = async(oDependents) => {
        if(this.state._hasSentRequest){
            console.log('=-=-=-0=-=--=-=0-0--=-==-==-=-=-=-===-9-909=-==-');
            console.log('oDependents: ' + JSON.stringify(oDependents));
            if(oDependents && this.state._isSpouseDataValid){
                await this._updateAllData(this.state._oSpouse, oDependents);
                this._saveAndNavigate();
            }
            else{
                this._promptInvalidInputs();
            }

            this.setState({ _hasSentRequest: false, _isSubmitted: false })
        }
    }

    _updateAllData = async(oSpouse, oDependents) => {
        let arrDependents = await this._formatDependents(oDependents);
        this.props.actions.employee.updateDependents({spouse: oSpouse, dependents: arrDependents});
    }

    _saveAndNavigate = async() => {
        const navigation = this.props.logininfo.navigation;
        let bSuccess = await this._saveDataToDB({personalinfo: this.props.oPersonalInfo});
        if(bSuccess){
            navigation.navigate('BankAccount');
        }
    }

    _saveDataToDB = async(oData) => {
        this._showLoadingPrompt(add_loading_message);

        let bFlag = false;

        await employeeApi.createPersonalInfo(oData)
            .then((response) => response.json())
            .then((res) => {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                console.log('res: ' + JSON.stringify(res));
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno==1){
                   
                }
                
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });

        return bFlag;
    }



    _formatDependents = async(oDependents) => {
        let arrNew = [];
        await oDependents.map((data, index) => {
            arrNew.push({
                name: data.name,
                birthdate: {
                    value: oHelper.convertDateToString(data.birthdate, 'YYYY-MM-DD'),
                    format: this.state._dateFormat
                },
                relationship: data.relationship
            })
        })

        return arrNew;
    }

    _promptInvalidInputs = () => {
        Alert.alert(
            'Error',
            'One or more inputs are invalid. Please check the highlighted fields.',
            [
                {text: 'Review Form', onPress: () => {}},
            ],
            { cancelable: false }
        )
    }

    _onChange = (curData) => {
        console.log('XXXXXXXXXXXXX');
        console.log('curData: ' + JSON.stringify(curData));
        let oData = JSON.parse(JSON.stringify(curData));
        let bFlag = false;
        if(oHelper.isStringEmptyOrSpace(oData.name)){
            oData.birthdate = null;
            oData.jobtitle = '';
            oData.company = '';
            bFlag = true;
        }
        else{
            oData.birthdate = new Date(curData.birthdate)
        }
        this.setState({
            _oSpouse: oData
        },
            () => {
                if(bFlag && 
                    (
                        curData.birthdate != null || 
                        curData.jobtitle != '' || 
                        curData.company != ''
                    )
                ){
                    this._promptSpouseRequirements();
                }
            }
        )
    }

    _showErrorAlert = () => {
        Alert.alert(
            'Error',
            'One of the inputs is invalid. Please check the highlighted fields.',
            [
              {text: 'Review Form', onPress: () => {}},
            ],
            { cancelable: false }
          )
    }

    _promptSpouseRequirements = () => {
        Alert.alert(
            'Required Information',
            'Spouse information is cleared. Input a spouse name first.',
            [
            {text: 'OK', onPress: () => {}},
            ],
            { cancelable: false }
        )
    }

    //GENERIC METHODS
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

    render() {
    //This is put into render method to allow direct access to class properties

        { /********** SPOUSE INFO **********/ }
        let myFormatFunction = (format,strDate) => {
            return moment(strDate).format(format);
        }

        let oBday = {
            template: customDatePickerTemplate,
            label: 'BIRTHDATE',
            mode:'date',
            config:{
                format: (strDate) => myFormatFunction(this.state._dateFormat, strDate)
            },
            error: '*Select birth date'
        };

        const EMPLOYEE_SPOUSE = t.struct({
            name: t.maybe(t.String),
            birthdate: oHelper.isStringEmptyOrSpace(this.state._oSpouse.name) ? t.maybe(t.Date) : t.Date,
            jobtitle: oHelper.isStringEmptyOrSpace(this.state._oSpouse.name) ? t.maybe(t.String) : t.String,
            company: t.maybe(t.String)
        });

        const OPTIONS_SPOUSE = {
            fields: {
                name:{ 
                    label: 'NAME',
                },

                birthdate: oBday,

                jobtitle:{ 
                    label: 'WORK',
                    error: '*Input a job title'
                },

                company:{ 
                    label: 'COMPANY'
                }
            },
            stylesheet: stylesheet
        };

        return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.contDivider}>
                    <View style={styles.contFormLeft}>
                        { /********** SPOUSE Information **********/ }
                        <View style={styles.contTitle}>
                            <Text style={styles.txtFormTitle}> SPOUSE INFORMATION </Text>
                        </View>
                        <View style={styles.contNote}>
                            <Text style={styles.txtNoteLabel}>Note: There is no need to add a spouse in the dependents.</Text>
                        </View>
                        <Form 
                            ref='form_spouse'
                            type={EMPLOYEE_SPOUSE} 
                            value={this.state._oSpouse}
                            options={OPTIONS_SPOUSE}
                            onChange={this._onChange}/>
                    </View>

                    <View style={styles.contFormRight}>
                        { /********** Dependents Information **********/ }
                            
                        <View style={styles.contTitle}>
                            <Text style={styles.txtFormTitle}> DEPENDENTS INFORMATION </Text>
                        </View>
                        <DependentsForm 
                            isSubmitted={this.state._isSubmitted}
                            validateAllData={this._validateAllData}
                            label='DEPENDENT'
                            value={[]}/>
                    </View>
                </View>
                <View style={{flex:1, padding: 40}}>
                    <Button
                        onPress={() => this._setSubmitStatus(true)}
                        title='Next'
                        color="#3b5998"
                        accessibilityLabel='Next'/>
                </View>
            </ScrollView>
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
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        oFamily: state.employees.activeProfile.data.personalinfo.family,
        oPersonalInfo: state.employees.activeProfile.data.personalinfo
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
        },
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dependents)