import React, { Component } from 'react';
import {
  View,
  Modal,
  Text,
  ScrollView, 
  Keyboard
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import moment from "moment";

//Styles
import styles from './styles';
import stylesheet from '../../../../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../../../../global/tcomb-custom-select-android';
import { customDatePickerTemplate } from '../../../../../global/tcomb-custom-datepicker-android';

//Custom Components
import FormModal from '../../../../../components/FormModal';

//Helpers
import * as oHelper from '../../../../../helper';

const Form = t.form.Form;

export default class EmployeePositionForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      _oPosition: {},
      _dateFormat: 'MMMM DD, YYYY'
    }
  }

  _onCanncel = () => {
    Keyboard.dismiss();
    this.props.cancelForm();
  }

  _onSubmit = () => {
    Keyboard.dismiss();
    let oPositionForm = this.refs.form_employeePosition.getValue();
    if(oPositionForm){
      this.props.submitForm(oPositionForm)
    }
  }

  render(){
    console.log('this.props.minEffectiveDate: ' + JSON.stringify(this.props.minEffectiveDate));
    const POSITIONS = t.enums(this.props.positions);
    const BRANCHES = t.enums(this.props.branches);

    let myFormatFunction = (format,strDate) => {
      return moment(strDate).format(format);
    }

    const POSTIONINFO_OPTIONS = {
      fields: {
        position:{ 
          template: customPickerTemplate,
          label: 'POSITION',
          error: '*Select a postion'
        },

        branch:{ 
          template: customPickerTemplate,
          label: 'BRANCH',
          error: '*Select a branch'
        },

        effectivedate: {
            template: customDatePickerTemplate,
            label: 'EFFECTIVE DATE',
            mode:'date',
            minimumDate: this.props.minEffectiveDate,
            config:{
                format: (strDate) => myFormatFunction(this.state._dateFormat, strDate)
            },
            error: '*Select effective date'
        },

        remarks:{ 
          label: 'REMARKS' ,
          returnKeyType: 'done'
        }
      },
      stylesheet: stylesheet
    };

    const EMPLOYEE_POSITIONINFO = t.struct({
      position: POSITIONS,
      branch: BRANCHES,
      effectivedate: t.Date,
      remarks: t.maybe(t.String)
    });
    
    return(
      <FormModal 
        containerStyle={styles.container}
        visible={this.props.visible}
        onCancel={this._onCanncel}
        onOK={this._onSubmit}
        title={this.props.title}>
        
        <View style={styles.contForm}>
          <ScrollView>
            <View style={styles.formContent}>
              <Form 
                ref='form_employeePosition'
                type={EMPLOYEE_POSITIONINFO}
                value={this.state._oPosition}
                options={POSTIONINFO_OPTIONS}
              />
            </View>
          </ScrollView>
        </View>

      </FormModal>
    )
  }
}