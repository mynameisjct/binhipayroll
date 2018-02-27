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
  Alert
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import moment from "moment";
import { withNavigation } from 'react-navigation';

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

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
  
const Form = t.form.Form;

const Gender = t.enums({
  Male: "Male",
  Female: "Female"
});

const CivilStatus = t.enums({
  Single: 'Single',
  Married: 'Married',
  Divorced: 'Divorced',
  Separated: 'Separated',
  Widowed: 'Widowed'
});

const EMPLOYEE_BASICINFO = t.struct({
  firstname: t.String,
  middlename: t.String,
  lastname: t.String,
  nickname: t.maybe(t.String),
  birthdate: t.Date,
  gender: Gender,
  civilstatus: CivilStatus
});

//Form - Employee Government IDs
const EMPLOYEE_GOVID = t.struct({
  tin: t.maybe(t.String),
  sss: t.maybe(t.String),
  philhealth: t.maybe(t.String),
  pagibig: t.maybe(t.String)
});


export class EmployeeBasicInfo extends Component {
  constructor(props){
    super(props);
    this.state={
      _dateFormat: this.props.employeePersonalInfo.basicinfo.birthdate.format || "MMMM DD, YYYY",
      _oBasicInfo: {
        firstname: this.props.employeePersonalInfo.basicinfo.firstname,
        middlename: this.props.employeePersonalInfo.basicinfo.middlename,
        lastname: this.props.employeePersonalInfo.basicinfo.lastname,
        nickname: this.props.employeePersonalInfo.basicinfo.nickname,
        birthdate: this.props.employeePersonalInfo.basicinfo.birthdate.value ? new Date( this.props.employeePersonalInfo.basicinfo.birthdate.value) : null,
        gender: this.props.employeePersonalInfo.basicinfo.gender.value,
        civilstatus: this.props.employeePersonalInfo.basicinfo.civilstatus.value,
      },
      _oContactInfo:{
        mobile: this.props.employeePersonalInfo.contactinfo.mobile,
        telephone: this.props.employeePersonalInfo.contactinfo.telephone,
        email: this.props.employeePersonalInfo.contactinfo.email
      },
      _oGovID:{
        tin: this.props.employeePersonalInfo.ids.tin.value,
        sss: this.props.employeePersonalInfo.ids.sss.value,
        philhealth: this.props.employeePersonalInfo.ids.philhealth.value,
        pagibig: this.props.employeePersonalInfo.ids.pagibig.value,
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(
      (this.props.formTriggerNext.index !== nextProps.formTriggerNext.index) &&
      (nextProps.formTriggerNext.key === this.props.navigation.state.key)
    ){
        this._onPress();
    }
  }

  _onPress = () => {
    let aMobile = this.mobileList.getValue();
    let aTelephone = this.telephoneList.getValue();
    let aEmail = this.emailList.getValue();

    let oBasicForm = this.refs.basic_form.getValue();
    let oGovForm = this.refs.govid_form.getValue();

    if (oBasicForm && oGovForm) {
      console.log('oBasicForm: ' + JSON.stringify(oBasicForm));
      console.log('oGovForm: ' + JSON.stringify(oGovForm));
      console.log('aMobile: ' + aMobile);
      console.log('aTelephone: ' + aTelephone);
      console.log('aEmail: ' + aEmail);
      let oContactInfo = {
        mobile: aMobile, 
        telephone: aTelephone, 
        email: aEmail
      }
      this.props.actions.employee.updateBasicInfo(oBasicForm);
      this.props.actions.employee.updateIDS(oGovForm);
      this.props.actions.employee.updateContactInfo(oContactInfo);

      this.setState({
        _oBasicInfo: {...oBasicForm},
        _oContactInfo: {...oContactInfo},
        _oGovID: {...oGovForm},
      });
      this.props.navigation.navigate('EmployeeAddress');
    }
    else{
      Alert.alert(
        'Error',
        'One of the inputs is invalid. Please check the highlighted fields.',
        [
          {text: 'Review Form', onPress: () => {}},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    console.log('=====RENDERING BASIC INFO!')
    //This is put into render method to allow direct access to class properties
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

    { /********** Basic Information **********/ }
    const OPTIONS_BASICINFO = {
      fields: {
        firstname:{ 
          label: 'FIRST NAME' ,
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.basic_form.getComponent('middlename').refs.input.focus()},
          error: '*First Name should not be empty'
        },
        middlename:{ 
          label: 'MIDDLE NAME',
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.basic_form.getComponent('lastname').refs.input.focus()},
          error: '*Middle Name should not be empty'
        },
        lastname:{ 
          label: 'LAST NAME',
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.basic_form.getComponent('nickname').refs.input.focus()},
          error: '*Last Name should not be empty'
        },
        nickname:{ 
          label: 'NICK NAME (Optional)',
          returnKeyType: 'next'
        },
        gender:{ 
          template: customPickerTemplate,
          label: 'GENDER',
          error: '*Select a gender'
        },
        birthdate: oBday,

        civilstatus:{
          template: customPickerTemplate,
          label: 'CIVIL STATUS',
          error: '*Select Civil Status'
        }
      },
      stylesheet: stylesheet
    };

    { /********** GOV IDS **********/ }
    const OPTIONS_GOVID = {
      fields: {
        tin:{ 
          label: 'TIN' ,
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.govid_form.getComponent('sss').refs.input.focus()},
          error: '*First Name should not be empty'
        },
        sss:{ 
          label: 'SSS NO',
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.govid_form.getComponent('philhealth').refs.input.focus()},
          error: '*Middle Name should not be empty'
        },
        philhealth:{ 
          label: 'PHILHEALTH NO',
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.govid_form.getComponent('pagibig').refs.input.focus()},
          error: '*Last Name should not be empty'
        },
        pagibig:{ 
          label: 'PAGIBIG NO',
          returnKeyType: 'done'
        }
      },
      stylesheet: stylesheet
    };
    

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.contDivider}>
            <View style={styles.contFormLeft}>
              { /********** Basic Information **********/ }
              <View style={styles.contTitle}>
                <Text style={styles.txtFormTitle}> BASIC INFORMATION </Text>
              </View>
              <Form 
                ref='basic_form'
                type={EMPLOYEE_BASICINFO} 
                value={this.state._oBasicInfo}
                onChange={this._onChangeBasicInfo}
                options={OPTIONS_BASICINFO}/>

              { /********** Basic Information **********/ }
              <View style={styles.contTitle}>
                <Text style={styles.txtFormTitle}> GOVERNMENT IDS </Text>
              </View>
              <Form 
                ref='govid_form'
                type={EMPLOYEE_GOVID} 
                value={this.state._oGovID}
                onChange={this._onChange}
                options={OPTIONS_GOVID}/>
              
            </View>

            <View style={styles.contFormRight}>
              { /********** Contact Information **********/ }
              <View style={styles.contTitle}>
                <Text style={styles.txtFormTitle}> CONTACT INFORMATION </Text>
              </View>
              
              <CustomForm.DynamicList 
                ref={(oInstance) => {this.mobileList = oInstance;}}
                label='MOBILE NO' 
                value={this.state._oContactInfo.mobile}
                /* onChange={(value) => this._onChange('MOBILE', value)} */
                keyboardType='phone-pad'/>

              <CustomForm.DynamicList 
                ref={(oInstance) => {this.telephoneList = oInstance;}}
                label='TELEPHONE NO' 
                value={this.state._oContactInfo.telephone}
                keyboardType='phone-pad'/>

              <CustomForm.DynamicList 
                ref={(oInstance) => {this.emailList = oInstance;}}
                label='EMAIL ADDRESS' 
                value={this.state._oContactInfo.email}
                keyboardType='email-address'/>
              
            </View>
          </View>
{/*           <View style={{flex:1, padding: 40}}>
            <Button
                onPress={this._onPress}
                title='Next'
                color="#3b5998"
                accessibilityLabel='Next'
            />
          </View> */}
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
      logininfo: state.loginReducer.logininfo,
      activecompany: state.activeCompanyReducer.activecompany,
      employeePersonalInfo: state.employees.activeProfile.data.personalinfo,
      formTriggerNext: state.employees.formTriggerNext
  }
}

function mapDispatchToProps (dispatch) {
  return {
      actions: {
          employee: bindActionCreators(employeeActions, dispatch),
      },
  }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeBasicInfo))