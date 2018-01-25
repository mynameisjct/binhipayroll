import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView,
  TouchableHighlight,
  Text,
  DatePickerAndroid,
  Button
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import moment from "moment";

//Styles
import stylesheet from '../../../../global/globalFormStyle';

//Redux
import { connect } from 'react-redux';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';

//Form Employee Basic Information
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
        fName: 'test',
        mName: 'test',
        lName: 'test',
        nName: 'test',
        bDay: 'test',
        gender: 'M',
        civilStatus: 'Married'
      },
      _oContactInfo:{
        mobile: ['0919900116', '091990333336', '0919900116'],
        telephone: ['888-42424'],
        email: ['test@gmail.com', 'hello@yahoo.com']
      },
      _oGovID:{
        tin: '11111',
        sss: '22222',
        philhealth: '333333',
        pagibig: '444444'
      }
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
    }
  }

  render() {
    const navigation = this.props.logininfo.navigation;
    
    //This is put into render method to allow direct access to class properties
    let myFormatFunction = (format,date) => {
      return moment(date).format(format);
    }
    
    let birthDate = {
        label: 'BIRTH DATE',
        mode:'date',
        config:{
            format:(date) => myFormatFunction("DD MMM YYYY",date)
        }
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
          label: 'GENDER'
        },
        bday: birthDate,
        civilStatus:{
          label: 'CIVIL STATUS',
        }
      },
      stylesheet: stylesheet
    };

    { /********** Basic Information **********/ }
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
          label: 'PAGIBIG NO)',
          returnKeyType: 'done'
        }
      },
      stylesheet: stylesheet
    };
    

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{flex: 1, padding:30}}>

            { /********** Basic Information **********/ }
            <View style={{marginTop: -25, marginBottom: 15, marginLeft: -20}}><PropTitle name='BASIC INFORMATION'/></View>
            <Form 
              ref='basic_form'
              type={EMPLOYEE_BASICINFO} 
              value={this.state._oBasicInfo}
              onChange={this._onChangeBasicInfo}
              options={OPTIONS_BASICINFO}/>

            { /********** Contact Information **********/ }
            <View style={{marginTop: -25, marginBottom: 15, marginLeft: -20}}><PropTitle name='CONTACT INFORMATION'/></View>
            
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

            { /********** GOV ID Information **********/ }
            <View style={{marginTop: -25, marginBottom: 15, marginLeft: -20}}><PropTitle name='GOVERNMENT IDS'/></View>
            <Form 
              ref='govid_form'
              type={EMPLOYEE_GOVID} 
              value={this.state._oGovID}
              onChange={this._onChange}
              options={OPTIONS_GOVID}/>

            <View style={{flex:1, paddingBottom: 15, paddingTop: 30}}>
              <Button
                /* onPress={() => {this._onPress()}} */
                onPress={() => {navigation.navigate('Address')}}
                title='Next'
                color="#3b5998"
                accessibilityLabel='Next'
              />
            </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

function mapStateToProps (state) {
  return {
      logininfo: state.loginReducer.logininfo,
      activecompany: state.activeCompanyReducer.activecompany
  }
}

export default connect(
  mapStateToProps,
)(Basic)