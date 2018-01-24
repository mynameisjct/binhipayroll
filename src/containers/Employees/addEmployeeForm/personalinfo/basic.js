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


export default class Basic extends Component {
  constructor(props){
    super(props);
    this.state={
      _value: null,
      _thumbColor: 'blue'
    }
  }

  _onPress = () => {
    let value = this.refs.basic_form.getValue();
    console.log(value);
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
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
              value={this.state._value}
              onChange={this._onChange}
              options={OPTIONS_BASICINFO}/>

            { /********** Contact Information **********/ }
            <View style={{marginTop: -25, marginBottom: 15, marginLeft: -20}}><PropTitle name='CONTACT INFORMATION'/></View>
            <CustomForm.DynamicList label='MOBILE NO' value={['11111', '22222']}/>

            { /********** GOV ID Information **********/ }
            <View style={{marginTop: -25, marginBottom: 15, marginLeft: -20}}><PropTitle name='GOVERNMENT IDS'/></View>
            <Form 
              ref='govid_form'
              type={EMPLOYEE_GOVID} 
              value={this.state._value}
              onChange={this._onChange}
              options={OPTIONS_GOVID}/>

            <View style={{flex:1, paddingBottom: 15, paddingTop: 30}}>
              <Button
                onPress={() => {this._onPress()}}
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