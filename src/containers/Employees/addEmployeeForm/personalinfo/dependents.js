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

//Helper 
import * as oHelper from '../../../../helper';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
  
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

    _onChange = (curData) => {
        this.setState({_oDependent: curData})
        this.props.onChange(curData, this.props.formIndex);
    }

    _onSubmit = () => {
        
    }

    getValue = () => { 
        let oForm = this.refs.dependent_form.getValue();
        if(oForm){
            return oForm;
        }
    }

    render(){
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
            name: t.String,
            birthdate: t.Date,
            relationship: RELATIONSHIPS
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
        this._dependentRef = [];
        this.state={
            _value: this.props.value.length == 0 ? [JSON.parse(JSON.stringify(DEFAULT_DEPENDENT))] : [...this.props.value],
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.isSubmitted === false && nextProps.isSubmitted===true){
            this._dependentRef[0].getValue();
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
            /* this._textInput.focus(); */
            /* aList.push(DEFAULT_DEPENDENT);
            this.setState({
                _value: aList
            }) */
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
        let aList = [...this.state._value];
        aList.splice(index, 1);
        this.setState({
            _value: aList
        })
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
                                ref = {(oInstance) => this._dependentRef[index] = oInstance}
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
            _dateFormat: this.props.oFamily.spouse.birthdate.format,
            _oSpouse: {
                name: this.props.oFamily.spouse.name,
                birthdate: this.props.oFamily.spouse.birthdate.value ? new Date(this.props.oFamily.spouse.birthdate.value) : null,
                jobtitle: this.props.oFamily.spouse.work.jobtitle,
                company: this.props.oFamily.spouse.work.company
            },
            _isSubmitted: false
        }
    }

    _setSubmitStatus = (value) => {
        let TEMP = this.refs.form_spouse.getValue();
        console.log('TEMP: ' + JSON.stringify(TEMP));
        console.log('this.state._oSpouse: ' + JSON.stringify(this.state._oSpouse));
        if(TEMP){
            
        }
        this.setState({ _isSubmitted: value })
    }

    _onChange = (curData) => {
        console.log('curData: ' + JSON.stringify(curData));
        let oData = JSON.parse(JSON.stringify(curData));
        let bFlag = false;
        if(oHelper.isStringEmptyOrSpace(oData.name)){
            oData.birthdate = null;
            oData.jobtitle = '';
            oData.company = '';
            bFlag = false;
        }
        this.setState({
            _oSpouse: oData
        })
    }

    _promptSpouseRequirements = () => {
        Alert.alert(
            'Required Information',
            'Enter the spouse name before setting information.',
            [
            {text: 'OK', onPress: () => {}},
            ],
            { cancelable: false }
        )
    }
    _onSubmitForm = () => {

        /* const navigation = this.props.logininfo.navigation;

        let oPresentAdd = this.refs.presentadd_form.getValue();
        let oPermanentAdd = this.refs.permanentadd_form.getValue();

        if (oPresentAdd && oPermanentAdd) {
        navigation.navigate('Family');
        }
        else{
            Alert.alert(
                'Error',
                'One of the inputs is invalid. Check the highlighted fields.',
                [
                {text: 'Review Form', onPress: () => {}},
                ],
                { cancelable: false }
            )
        } */
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
            company: oHelper.isStringEmptyOrSpace(this.state._oSpouse.name) ? t.maybe(t.String) : t.String
        });

        const OPTIONS_SPOUSE = {
            fields: {
                name:{ 
                    label: 'NAME' ,
                },

                birthdate: oBday,

                work:{ 
                    label: 'WORK',
                },

                company:{ 
                    label: 'COMPANY',
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
                            <PropTitle name='SPOUSE INFORMATION'/>
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
                            <PropTitle name='DEPENDENTS INFORMATION'/>
                        </View>
                        <DependentsForm 
                            isSubmitted={this.state._isSubmitted}
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
        </View>
        );
    }
}

function mapStateToProps (state) {
  return {
      logininfo: state.loginReducer.logininfo,
      activecompany: state.activeCompanyReducer.activecompany,
      oFamily: state.employees.activeProfile.data.personalinfo.family
  }
}

export default connect(
  mapStateToProps,
)(Dependents)