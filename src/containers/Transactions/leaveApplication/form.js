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

export default class LeaveApplicationForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            _bHasMounted: false,
            _aBenefitsList:[],
            _oFormData: {
                employeeid: '',
                category: '',
                leavetype: '',
                dateinformed: null,
                timeinformed: null,
                datefrom: null,
                dateto: null,
                rangedate: false,
                reason: '',
                remarks: ''
            },
            _options: {}
        }
    }
    
    _onChange = (value) => {
        console.log('value: ' + JSON.stringify(value));
        let oFormData = {...oFormData};
        oFormData.employeeid = value.employeeid;
        oFormData.category = value.category;
        oFormData.leavetype = value.leavetype;
        oFormData.dateinformed = value.dateinformed;
        oFormData.timeinformed = value.timeinformed;
        oFormData.datefrom = value.datefrom;
        oFormData.dateto = value.dateto;
        oFormData.rangedate = value.rangedate;
        oFormData.reason = value.reason;
        oFormData.remarks = value.remarks
        this.setState({_oFormData: oFormData})
    }

    componentDidMount(){
        this.setState({_bHasMounted: true});
/*         console.log('this.props.options: ' + JSON.stringify(this.props.options));
        this._generateOptions(); */
    }

    _generateOptions(){
/*         let oOptions = {};
        this.props.options.map((data,index) =>
            oOptions[Number(data.id)] = String(data.name)
        )
        this.setState({
            _bHasMounted: true,
            _options: oOptions
        }) */
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
                    label: 'EMPLOYEE NAME',
                    error: '*Select Employee'
                },

                category: {
                    template: customPickerTemplate,
                    label: 'CATEGORY',
                    error: '*Select Leave Category'
                },

                leavetype: {
                    template: customPickerTemplate,
                    enabled: this.state._oFormData.employeeid ? true : false,
                    label: 'LEAVE TYPE',
                    error: '*Select Leave Type'
                },

                dateinformed:{
                    template: customDatePickerTemplate,
                    label: 'DATE INFORMED',
                    mode:'date',
                    config:{
                        format: (strDate) => oHelper.convertDateToString(strDate, 'MMMM DD, YYYY')
                    },
                    error: '*Select effective date'
                },

                timeinformed:{
                    template: customDatePickerTemplate,
                    label: 'TIME INFORMED',
                    mode:'time',
                    config:{
                        format: (strDate) => oHelper.convertDateToString(strDate, 'hh:mm A')
                    },
                    error: '*Select effective date'
                },

                datefrom: {
                    template: customDatePickerTemplate,
                    label: !this.state._oFormData.rangedate ? 'Date of Leave' : 'Date of Leave FROM',
                    mode:'date',
                    config:{
                        format: (strDate) => oHelper.convertDateToString(strDate, 'MMMM DD, YYYY')
                    },
                    error: '*Select effective date'
                },

                dateto: {
                    template: customDatePickerTemplate,
                    label: 'Date of Leave UNTIL',
                    mode:'date',
                    hidden: !this.state._oFormData.rangedate,
                    config:{
                        format: (strDate) => oHelper.convertDateToString(strDate, 'MMMM DD, YYYY')
                    },
                    error: '*Select effective date'
                },

                rangedate: {
                    label: 'RANGED DATE OPTION'
                },

                reason: {
                    label: 'REASON FOR LEAVE',
                    returnKeyType: 'next',
                    onSubmitEditing: (event) => {this.refs.form_leaveapplication.getComponent('remarks').refs.input.focus()},
                    error: '*Enter Reason for Leave'
                },

                remarks:{ 
                    label: 'REMARKS' ,
                    returnKeyType: 'done'
                },
            },
            stylesheet: stylesheet
        };

        const FORMTYPE = t.struct({
            employeeid: t.enums({1:'Employee1', 2:'Employee2'}),
            category: t.enums({1:'Half Day Leave', 2:'Whole Day Leave'}),
            leavetype: t.enums({1:'Sick Leave (Bal. 0)', 2:'Vacation Leave (Bal. 5)', 3:'UNPAID LEAVE'}),
            dateinformed: t.Date,
            timeinformed: t.Date,
            datefrom: t.Date,
            dateto: t.Date,
            rangedate: t.maybe(t.Boolean),
            reason: t.String,
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
                                        ref='form_leaveapplication'
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