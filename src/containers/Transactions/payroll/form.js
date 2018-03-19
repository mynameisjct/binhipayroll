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

export default class PayrollTransactionForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            _bHasMounted: false,
            _oFormData: {
                payrolldate: '',
                code: 'TEMP',
                periodfrom: new Date(),
                periodto: new Date(),
                status: 'TEMP'
            },
            _options: {}
        }
    }
    
    _onChange = (value) => {
        console.log('value: ' + JSON.stringify(value));
        let oFormData = {...oFormData};
        oFormData.payrolldate = value.payrolldate;
        oFormData.code = value.code;
        oFormData.periodfrom = value.periodfrom;
        oFormData.periodto = value.periodto;
        oFormData.status = value.status;
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
                payrolldate: {
                    template: customPickerTemplate,
                    label: 'SELECT PAYROLL DATE',
                    error: '*Select Payroll Date'
                },

                code:{ 
                    label: 'PAYROLL CODE',
                    editable: false,
                    error: CONSTANTS.ERROR.FORM
                },

                periodfrom:{
                    template: customDatePickerTemplate,
                    label: 'Start of Period',
                    mode:'date',
                    disabled: true,
                    config:{
                        format: (strDate) => oHelper.convertDateToString(strDate, 'MMMM DD, YYYY')
                    },
                    error: CONSTANTS.ERROR.FORM
                },

                periodto:{
                    template: customDatePickerTemplate,
                    label: 'End of Period',
                    mode:'date',
                    disabled: true,
                    config:{
                        format: (strDate) => oHelper.convertDateToString(strDate, 'MMMM DD, YYYY')
                    },
                    error: CONSTANTS.ERROR.FORM
                },

                status:{ 
                    label: 'STATUS',
                    error: CONSTANTS.ERROR.FORM,
                    editable: false
                },
            },
            stylesheet: stylesheet
        };

        const FORMTYPE = t.struct({
            payrolldate: t.enums({1:'March 15, 2018', 2:'February 28, 2018'}),
            code: t.String,
            periodfrom: t.Date,
            periodto: t.Date,
            status: t.String
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
                submitLabel='GENERATE'>
                
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