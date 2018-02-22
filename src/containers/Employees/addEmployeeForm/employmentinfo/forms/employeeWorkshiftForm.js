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

export default class EmployeeWorkshiftForm extends Component{
  constructor(props){
    super(props);
    this.state = {
        _oEmpWorkshift: {
            workshifttype: this.props.activeData.workshiftid.value || '',
            effectivedate: this.props.activeData.effectivedate.from.value ? 
                new Date(this.props.activeData.effectivedate.from.value) : null,
            remarks: this.props.activeData.remarks || ''
        },
        _dateFormat: 'MMMM DD, YYYY'
    }
  }

    _onChange = (value) => {
    }

    _onCanncel = () => {
        Keyboard.dismiss();
        this.props.cancelForm();
    }
    
    _onSubmit = () => {
        Keyboard.dismiss();
        let oEmpWorkshiftForm = this.refs.form_employeeworkshift.getValue();
        if(oEmpWorkshiftForm){
            this.props.submitForm(oEmpWorkshiftForm)
        }
    }

    render(){
        const bDeletable = 
        this.props.activeData.workshiftid.value!='' && this.props.activeData.effectivedate.from.value!=null ?
            true
        :
            false 
    
    const WORKSHIFTTYPE = t.enums(this.props.workshifttype);

    const EMPWORKSHIFT_OPTIONS = {
        fields: {
            workshiftype:{ 
                template: customPickerTemplate,
                label: 'WORKSHIFT TYPE',
                error: '*Select a Workshift Type'
            },

            effectivedate: {
                template: customDatePickerTemplate,
                label: 'EFFECTIVE DATE',
                mode:'date',
                minimumDate: this.props.minEffectiveDate,
                config:{
                    format: (strDate) => oHelper.convertDateToString(strDate, this.state._dateFormat)
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

    const EMPLOYEE_WORKSHIFT = t.struct({
      workshiftype: WORKSHIFTTYPE,
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
                        ref='form_employeeworkshift'
                        type={EMPLOYEE_WORKSHIFT}
                        onChange={this._onChange}
                        value={this.state._oEmpWorkshift}
                        options={EMPWORKSHIFT_OPTIONS}
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