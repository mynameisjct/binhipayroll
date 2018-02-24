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

export default class EffectiveDateForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            _oEffectiveDate: {
                effectivedate: this.props.effectivedate.from.value ? 
                    new Date(this.props.effectivedate.from.value) : null,
            },
            _dateFormat: this.props.effectivedate.from.format || 'MMMM DD, YYYY'
        }
    }

    _onCancel = () => {
        Keyboard.dismiss();
        this.props.onCancel();
    }
    
    _onSubmit = () => {
        Keyboard.dismiss();
        let oEffectiveDateForm = this.refs.form_effectivedate.getValue();
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
            },
            stylesheet: stylesheet
        };

        const EFFECTIVEDATE = t.struct({
            effectivedate: t.Date,
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
                            ref='form_effectivedate'
                            type={EFFECTIVEDATE}
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