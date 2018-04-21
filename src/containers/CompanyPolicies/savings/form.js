import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Keyboard
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import moment from "moment";

//Form Template 
import { customPickerTemplate } from '../../../global/tcomb-custom-select-android';
import { customDatePickerTemplate } from '../../../global/tcomb-custom-datepicker-android';

//Styles
import styles from './styles';
import stylesheet from '../../../global/globalFormStyle';
import * as CustomForm from '../../../components/CustomForm';

//Custom Components
import FormModal from '../../../components/FormModal';

//Helper
import * as oHelper from '../../../helper';

const Form = t.form.Form;

export default class EmployeeSavingsPolicyForm extends Component {
    constructor(props){
        super(props);
        const validfrom = this.props.data.validfrom ? 
            oHelper.convertStringToDate(this.props.data.validfrom, this.props.data.displaydateformformat)
            :
            null;
        const validto = this.props.data.validto ? 
            oHelper.convertStringToDate(this.props.data.validto, this.props.data.displaydateformformat)
            :
            null;
        this.state={
            didMount: false,
            data: {
                id: this.props.data.id,
                companyid: this.props.data.companyid,
                isenabled: this.props.data.isenabled,
                validfrom: validfrom,
                validto: validto ,
                isEndSet: this.props.data.validto ? true : false ,
                amount: this.props.data.amount
            }
        }
    }

    componentDidMount(){
        this.setState({didMount: true});
    }

    _onDataChange = (value) => {
        let oData = {...this.state.data};
        oData.validfrom = value.validfrom;
        if(value.isEndSet){
            oData.validto = value.validto;
        }else{
            oData.validto = null;
        }
        
        oData.amount = value.amount;
        oData.isEndSet = value.isEndSet;

        this.setState({
            data: oData
        })
    }

    _onSubmit = () => {
        Keyboard.dismiss();
        let oData = this.refs.form_employeesavingspolicy.getValue();
        if(oData){
            this.props.onSubmit(this.state.data)
        }
    }

    render() {
        const ENTITY = t.struct({
            amount: t.Number,
            validfrom: t.Date,
            validto: this.state.data.isEndSet ? t.Date : t.maybe(t.Date),
            isEndSet: t.Boolean
        })
        
        const OPTIONS = {
            fields: {
                amount:{ 
                    label: 'AMOUNT PER PAY DAY',
                    error: '*Enter Savings Amount'
                },

                validfrom: {
                    template: customDatePickerTemplate,
                    label: this.state.data.isEndSet ? 'VALID FROM' : 'EFFECTIVE DATE',
                    mode:'date',
                    config:{
                        format:  (strDate) => oHelper.convertDateToString(strDate, this.props.data.displaydateformformat)
                    },
                    error: '*Required field'
                },

                validto: {
                    template: customDatePickerTemplate,
                    label: 'VALID TO',
                    hidden: !this.state.data.isEndSet,
                    mode:'date',
                    config:{
                        format:  (strDate) => oHelper.convertDateToString(strDate, this.props.data.displaydateformformat)
                    },
                    error: '*Required field'
                },

                isEndSet: {
                    label: 'SET END OF EFFECTIVITY'
                },
                 
            },
            stylesheet: stylesheet
        }

        return (
            <FormModal 
                containerStyle={styles.formStyles.container}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOK={this._onSubmit}
                title={this.props.title}
                submitLabel='SAVE'>
                
                <View style={styles.formStyles.contForm}>
                    {
                        this.state.didMount ?
                            <ScrollView>
                                <View style={styles.formStyles.formContent}>
                                    <Form 
                                        ref='form_employeesavingspolicy'
                                        type={ENTITY}
                                        value={this.state.data}
                                        options={OPTIONS}
                                        onChange={this._onDataChange}
                                    />
                                </View>
                            </ScrollView>
                        :
                            null
                    }
                    
                </View>
            </FormModal>
        );
    }
}
