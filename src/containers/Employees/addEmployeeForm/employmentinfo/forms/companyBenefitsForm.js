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

//Constants
import {CONSTANTS} from '../../../../../constants';

const Form = t.form.Form;

export default class CompanyBenefitsForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            _aBenefitsList:[],
            _oCompBenefit: {
                effectivedate: '', 
                benefittype: '', //ID
                amountpermonth: '', //string
                scheme: '' //string
            }
        }
    }

    _onCancel = () => {
        Keyboard.dismiss();
        this.props.onCancel();
    }
    
    _onSubmit = () => {
        Keyboard.dismiss();
        let oEffectiveDateForm = this.refs.form_employeecompbenefits.getValue();
        if(oEffectiveDateForm){
            this.props.onSubmit(oEffectiveDateForm)
        }
    }

    render(){
        const EFFECTIVEDATE_OPTIONS = {
            fields: {
                effectivedate: {
                    template: customDatePickerTemplate,
                    label: 'EFFECTIVE DATE',
                    mode:'date',
                    config:{
                        format: (strDate) => oHelper.convertDateToString(strDate, this.state._dateFormat)
                    },
                    error: '*Select effective date'
                },

                benefittype: {
                    template: customPickerTemplate,
                    label: 'COMPANY BENEFIT TYPE',
                    error: '*Select a Benefit'
                },
                
                amountpermonth: {
                    label: 'AMOUNT PER MONTH' ,
                    returnKeyType: 'done',
                    editable: false
                },

                scheme: {
                    label: 'SCHEME' ,
                    returnKeyType: 'done',
                    editable: false
                }
            },
            stylesheet: stylesheet
        };

        const EMPLOYEE_COMPBENEFITS = t.struct({
            effectivedate: t.Date,
            benefittype: t.enums({1:'Hello', 2:'Hi'}),
            amountpermonth: t.maybe(t.String),
            scheme: t.maybe(t.String)
        });
        
    return(
        <FormModal 
            containerStyle={styles.container}
            visible={this.props.visible}
            onCancel={this._onCancel}
            onOK={this._onSubmit}
            title={this.props.title}>
            
            <View style={styles.contForm}>
                <ScrollView>
                    <View style={styles.formContent}>
                        <Form 
                            ref='form_employeecompbenefits'
                            type={EMPLOYEE_COMPBENEFITS}
                            value={this.state._oEffectiveDate}
                            options={EFFECTIVEDATE_OPTIONS}
                        />
                    </View>
                </ScrollView>
                </View>
            </FormModal>
        )
    }
}