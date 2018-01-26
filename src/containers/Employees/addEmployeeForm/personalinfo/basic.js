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

//Styles
import styles from './styles';
import stylesheet from '../../../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../../../global/tcomb-customTemplate';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../profile/data/actions';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
  
const Form = t.form.Form;

const Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

const CivilStatus = t.enums({
  Single: 'Single',
  Married: 'Married',
  Divorced: 'Divorced',
  Separated: 'Separated',
  Widowed: 'Widowed'
});

const EMPLOYEE_BASICINFO = t.struct({
  fName: t.String,
  mName: t.String,
  lName: t.String,
  nName: t.maybe(t.String),
  bday: t.Date,
  gender: Gender,
  civilStatus: CivilStatus
});

//Form - Employee Government IDs
const EMPLOYEE_GOVID = t.struct({
  tin: t.maybe(t.String),
  sss: t.maybe(t.String),
  philhealth: t.maybe(t.String),
  pagibig: t.maybe(t.String)
});


export class Basic extends Component {
  constructor(props){
    super(props);
    this.state={
      _oBasicInfo: {
        fName: 'Jose',
        mName: 'Protacio',
        lName: 'Rizal',
        nName: 'Prot-prot',
        bDay: '1990-06-01',
        gender: 'M',
        civilStatus: 'Divorced'
      },
      _oContactInfo:{
        mobile: ['0919900116', '091990333336', '0919900116'],
        telephone: ['888-42424'],
        email: ['test@gmail.com', 'hello@yahoo.com']
      },
      _oGovID:{
        tin: '111-11',
        sss: '222-22',
        philhealth: '3333-33',
        pagibig: '4444-44'
      }
    }
  }

  _onPress = () => {
    const navigation = this.props.logininfo.navigation;
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
      this.props.actions.employee.updateBasicInfo({basicinfo: oBasicForm});
      navigation.navigate('Benefits');
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
    }
  }

  render() {
    //This is put into render method to allow direct access to class properties
    let myFormatFunction = (format,date) => {
      return moment(date).format(format);
    }
    
    let birthDate = {
        label: 'BIRTH DATE',
        mode:'date',
        config:{
            format:(date) => myFormatFunction("MMMM DD, YYYY",date)
        },
        error: '*Select birth date'
    };

    { /********** Basic Information **********/ }
    const OPTIONS_BASICINFO = {
      fields: {
        fName:{ 
          label: 'FIRST NAME' ,
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.basic_form.getComponent('mName').refs.input.focus()},
          error: '*First Name should not be empty'
        },
        mName:{ 
          label: 'MIDDLE NAME',
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.basic_form.getComponent('lName').refs.input.focus()},
          error: '*Middle Name should not be empty'
        },
        lName:{ 
          label: 'LAST NAME',
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.basic_form.getComponent('nName').refs.input.focus()},
          error: '*Last Name should not be empty'
        },
        nName:{ 
          label: 'NICK NAME (Optional)',
          returnKeyType: 'next'
        },
        gender:{ 
          template: customPickerTemplate,
          label: 'GENDER',
          error: '*Select a gender'
        },
        bday: birthDate,
        civilStatus:{
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
                <PropTitle name='BASIC INFORMATION'/>
              </View>
              <Form 
                ref='basic_form'
                type={EMPLOYEE_BASICINFO} 
                value={this.state._oBasicInfo}
                onChange={this._onChangeBasicInfo}
                options={OPTIONS_BASICINFO}/>

              { /********** Basic Information **********/ }
              <View style={styles.contTitle}>
                <PropTitle name='GOVERNMENT IDS'/>
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
                <PropTitle name='CONTACT INFORMATION'/>
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
          <View style={{flex:1, padding: 40}}>
            <Button
                onPress={() => {this._onPress()}}
                title='Next'
                color="#3b5998"
                accessibilityLabel='Next'
            />
        </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
      logininfo: state.loginReducer.logininfo,
      activecompany: state.activeCompanyReducer.activecompany
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
)(Basic)