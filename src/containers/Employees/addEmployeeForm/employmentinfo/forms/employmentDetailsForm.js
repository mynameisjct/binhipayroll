import React, { Component } from 'react';
import {
  View,
  Modal,
  Text,
  ScrollView, 
  Keyboard,
  TouchableOpacity
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

export default class EmploymentDetailsForm extends Component{
  constructor(props){
    super(props);
    const oActiveData  = this.props.activeData;
    console.log('DDDDDDDDDDDDDoActiveData: ' + JSON.stringify(oActiveData));
    this.state = {
      _oData: {
        effectivedate: oHelper.convertStringToDate(oActiveData.effectivedate.from.value),
        employmenttype: oActiveData.employmenttype.value || '',
        datehired: oHelper.convertStringToDate(oActiveData.datehired.value),
        dateend: oHelper.convertStringToDate(oActiveData.dateend.value),
        paytype: oActiveData.paytype.value || '',
        payrate: oActiveData.payrate || '',
        position: oActiveData.position.id || '',
        branch: oActiveData.branch.id || '',
        remarks: oActiveData.remarks || ''
      },
      _dateFormat: 'MMMM DD, YYYY'
    }
  }

  _onChange = (value) => {
    this.setState({ _oData: {...value} });
  }

  _onCanncel = () => {
    Keyboard.dismiss();
    this.props.cancelForm();
  }
  

  _onSubmit = () => {
    Keyboard.dismiss();
    let oData = this.refs.form_employmentdetails.getValue();
    if(oData){
      this.props.submitForm(oData)
    }
  }

  render(){
    const bDeletable = this.props.activeData.id != '' ? true : false;

    const POSITIONS = t.enums(this.props.positions);
    const PAYTYPES = t.enums(this.props.paytypeoptions);
    const BRANCHES = t.enums(this.props.branches);
    const EMPLOYMENTTYPES = t.enums(this.props.employmenttypeoptions);

    const OPTIONS = {
      fields: {
        effectivedate: {
          template: customDatePickerTemplate,
          label: 'EFFECTIVE DATE',
          mode:'date',
          minimumDate: this.props.minEffectiveDate,
          config:{
              format:  (strDate) => oHelper.convertDateToString(strDate, this.state._dateFormat)
          },
          error: '*Select effective date'
        },

        employmenttype:{ 
          template: customPickerTemplate,
          label: 'EMPLOYMENT TYPE',
          error: '*Select an Employment Type'
        },
      
        datehired: {
          template: customDatePickerTemplate,
          label: 'DATE HIRED',
          mode:'date',
          minimumDate: this.props.minEffectiveDate,
          config:{
              format:  (strDate) => oHelper.convertDateToString(strDate, this.state._dateFormat)
          },
          error: '*Select effective date'
        },

        dateend: {
          template: customDatePickerTemplate,
          label: 'DATE END',
          mode:'date',
          hidden: !oHelper.isValidDate(this.props.activeData.dateend.value),
          minimumDate: this.props.minEffectiveDate,
          config:{
              format:  (strDate) => oHelper.convertDateToString(strDate, this.state._dateFormat)
          },
          error: ''
        },

        paytype:{ 
          template: customPickerTemplate,
          label: 'PAY TYPE',
          error: '*Select Pay Type'
        },

        payrate:{ 
          label: 'PAY RATE',
          error: '*Enter Employee Pay Rate'
        },

        position:{ 
          template: customPickerTemplate,
          label: 'POSITION',
          error: '*Select a postion'
        },

        branch:{ 
          template: customPickerTemplate,
          label: 'BRANCH ASSIGNED',
          error: '*Select a Branch'
        },

        remarks:{ 
          label: 'REMARKS' ,
          returnKeyType: 'done'
        }
      },
      stylesheet: stylesheet
    };

    const EMPLOYMENTDETAILS = t.struct({
      effectivedate: t.Date,
      employmenttype: EMPLOYMENTTYPES,
      datehired: t.Date,
      dateend: t.maybe(t.Date),
      paytype: PAYTYPES,
      payrate: t.Number,
      position: POSITIONS,
      branch: BRANCHES,
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
                ref='form_employmentdetails'
                type={EMPLOYMENTDETAILS}
                onChange={this._onChange}
                value={this.state._oData}
                options={OPTIONS}
              />

              {
                bDeletable ? 
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => this.props.onDelete()}>
                    
                    <View style={styles.btnDelete.container}>
                      <Text style={styles.btnDelete.txtBtn}>DELETE</Text>
                    </View>
                  </TouchableOpacity>
                :
                  null
              }
            </View>
          </ScrollView>
        </View>
      </FormModal>
    )
  }
}