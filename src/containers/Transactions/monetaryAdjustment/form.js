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
import styles from '../styles';
import stylesheet from '../../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../../global/tcomb-custom-select-android';
import { customDatePickerTemplate } from '../../../global/tcomb-custom-datepicker-android';

//Custom Components
import FormModal from '../../../components/FormModal';

//Helpers
import * as oHelper from '../../../helper';

//Constants
import {CONSTANTS} from '../../../constants';

const Form = t.form.Form;

export default class MonetaryAdjustmentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            _bHasMounted: false,
            _aBenefitsList:[],
            _oFormData: {
                employeeid: '',
                category: '',
                type: '',
                amount: '',
                payrollid: '',
                remarks: '',
            },
            _options: {}
        }
    }
    
    _onChange = (value) => {
        console.log('value: ' + JSON.stringify(value));
        let oFormData = {...oFormData};
        oFormData.employeeid = value.employeeid;
        oFormData.category = value.category;
        oFormData.type = value.type;
        oFormData.amount = value.amount;
        oFormData.payrollid = value.payrollid;
        oFormData.remarks = value.remarks;
        this.setState({_oFormData: oFormData})
    }

    _onSubmit = () => {
        Keyboard.dismiss();
        let oFormData = this.refs.form_monetaryadjustment.getValue();
        if(oFormData){
            this.props.onSubmit(this.state._oFormData);
        }
    }

    componentDidMount(){
        this.setState({_bHasMounted: true});
    }

    _onCancel = () => {
        Keyboard.dismiss();
        this.props.onCancel();
    }
    
    _onSubmit = () => {
        Keyboard.dismiss();
        let oFormData = this.refs.form_leaveapplication.getValue();
        if(oFormData){
            this.props.onSubmit(oFormData)
        }
    }

    render(){
        const formStyles = styles.formStyles;
        const OPTIONS = {
            fields: {
                employeeid: {
                    template: customPickerTemplate,
                    label: 'SELECT EMPLOYEE',
                    error: '*Select Employee'
                },

                category: {
                    template: customPickerTemplate,
                    label: 'CATEGORY',
                    error: '*Select Category'
                },

                type: {
                    label: 'TYPE OR DESCRIPTION',
                    error: '*Enter Description'
                },

                amount: {
                    label: 'AMOUNT',
                    error: '*Enter an Amount'
                },

                payrollid: {
                    template: customPickerTemplate,
                    label: 'PAYROLL DATE',
                    error: '*Select Payroll Date'
                },

                remarks:{ 
                    label: 'REMARKS' ,
                    returnKeyType: 'done'
                },
            },
            stylesheet: stylesheet
        };

        const FORMTYPE = t.struct({
            employeeid: t.enums(this.props.data.employeeList),
            payrollid: t.enums(this.props.data.payrollList),
            category: t.enums({1:'Deduction', 2:'Allowance'}),
            type: t.String,
            amount: t.Number,
            remarks: t.maybe(t.String)
            /* effectivedate: t.Date,
            benefittype: t.enums({1:'TEST1',2:'TEST2'}),
            amountpermonth: t.maybe(t.String),
            scheme: t.maybe(t.String) */
        });

            
        return(
            <FormModal 
                containerStyle={formStyles.container}
                visible={this.props.visible}
                onCancel={this._onCancel}
                onOK={this._onSubmit}
                title={this.props.title}
                submitLabel='SAVE'>
                
                <View style={formStyles.contForm}>
                    {
                        this.state._bHasMounted ?
                            <ScrollView>
                                <View style={formStyles.formContent}>
                                    <Form 
                                        ref='form_monetaryadjustment'
                                        type={FORMTYPE}
                                        value={this.state._oFormData}
                                        options={OPTIONS}
                                        onChange={this._onChange}
                                    />
                                </View>
                            </ScrollView>
                        :
                            null
                    }
                    
                </View>
            </FormModal>
        )
    }
}