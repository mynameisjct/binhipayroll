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

const Form = t.form.Form;

const Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

const User = t.struct({
  fName: t.String,
  mName: t.String,
  lName: t.String,
  nName: t.String,
  bday: t.Date,
  gender: Gender
});

export default class Basic extends Component {

  _onPress = () => {
    let value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }

  render() {
    //This is put into render method to allow direct access to class properties
    let myFormatFunction = (format,date) =>{
      return moment(date).format(format);
    }
    let effectiveDate = {
        label: 'BIRTH DATE',
        mode:'date',
        config:{
            format:(date) => myFormatFunction("DD MMM YYYY",date)
        }
    };

    const options = {
      fields: {
        fName:{ 
          label: 'FIRST NAME' ,
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.form.getComponent('mName').refs.input.focus()}
        },
        mName:{ 
          label: 'MIDDLE NAME',
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.form.getComponent('lName').refs.input.focus()}
        },
        lName:{ 
          label: 'LAST NAME',
          returnKeyType: 'next',
          onSubmitEditing: (event) => {this.refs.form.getComponent('nName').refs.input.focus()}
        },
        nName:{ 
          label: 'NICK NAME',
          returnKeyType: 'next'
        },
        gender:{ 
          label: 'GENDER'
        },
        bday: effectiveDate
      },
      stylesheet: stylesheet
    };    

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{flex: 1, padding:25}}>
            <View style={{marginTop: -25, marginBottom: 15, marginLeft: -20}}><PropTitle name='BASIC INFORMATION'/></View>
            <Form 
              ref='form'
              type={User} 
              options={options}/>
            <View style={{flex:1, paddingBottom: 30, paddingTop: 30}}>
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