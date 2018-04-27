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
            _list: this.props.data,
            _payrollEnums: oHelper.generateDateEnums(this.props.data, 'id', 'payrollDate', 'MMMM DD, YYYY'),
            _oActiveData: null,
            _oFormData: {
                payrollid: '',
                periodfrom: null,
                periodto: null,
                status: ''
            },
            _options: {}
        }
    }
    
    _onChange = (value) => {
        console.log('value: ' + JSON.stringify(value));
        let oFormData = {...this.state._oFormData};
        let oActiveData = {...this.state._oActiveData};

        if(oHelper.isStringEmpty(value.payrollid)){
            oFormData.periodfrom = null;
            oFormData.periodto = null;
            oFormData.status = '';
            oActiveData = null;
        }else{
            let oCurData = oHelper.getElementByPropValue(this.props.data, 'id', value.payrollid);
            oActiveData = oCurData;
            oFormData.payrollid = value.payrollid;
            oFormData.periodfrom = oHelper.convertStringToDate(oCurData.periodFrom);
            oFormData.periodto = oHelper.convertStringToDate(oCurData.periodTo);
            if(oCurData.posted){
                oFormData.status = 'CLOSED';
            }else{
                oFormData.status = 'OPEN';
            }
            
        }

        this.setState({
            _oFormData: oFormData,
            _oActiveData: oActiveData
        })
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
            this.props.onSubmit(this.state._oActiveData);
        }
    }

    render(){
        const formStyles = styles.formStyles;
        const OPTIONS = {
            fields: {
                payrollid: {
                    template: customPickerTemplate,
                    label: 'SELECT PAYROLL DATE',
                    error: '*Select Payroll Date'
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
            payrollid: t.enums(this.state._payrollEnums),
            periodfrom: oHelper.isStringEmpty(this.state._oFormData.payrollid) ? t.maybe(t.Date) : t.Date,
            periodto: oHelper.isStringEmpty(this.state._oFormData.payrollid) ? t.maybe(t.Date) : t.Date,
            status: oHelper.isStringEmpty(this.state._oFormData.payrollid) ? t.maybe(t.String) : t.String,
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