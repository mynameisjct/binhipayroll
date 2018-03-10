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
            _bHasMounted: false,
            _aBenefitsList:[],
            _oCompBenefit: {
                effectivedate: null, 
                benefittype: '', //ID
                amountpermonth: '-', //string
                scheme: '-' //string
            },
            _options: {}
        }
    }
    
    _onChange = (value) => {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        console.log('value: ' + JSON.stringify(value));
        console.log('this.state._oCompBenefit: ' +JSON.stringify(this.state._oCompBenefit.benefittype));
        if(
            (value.benefittype !== undefined || value.benefittype !== null )  &&
            value.benefittype != this.state._oCompBenefit.benefittype){
            let oElement = oHelper.getElementByPropValue(this.props.options, 'id', value.benefittype);
            let oBenefitState = {...this.state._oCompBenefit};
            oBenefitState.effectivedate = value.effectivedate;
            oBenefitState.benefittype = value.benefittype;
            oBenefitState.amountpermonth = value.benefittype ? oElement.amountpermonth : '-';
            oBenefitState.scheme = value.benefittype ? oElement.scheme.value : '-';
            console.log('oElement: ' + JSON.stringify(oElement));
            this.setState({_oCompBenefit: oBenefitState}, console.log('_oCompBenefit: ' + JSON.stringify(this.state._oCompBenefit)))
        }
    }

    componentDidMount(){
        console.log('this.props.options: ' + JSON.stringify(this.props.options));
        this._generateOptions();
    }

    _generateOptions(){
        let oOptions = {};
        this.props.options.map((data,index) =>
            oOptions[Number(data.id)] = String(data.name)
        )
        this.setState({
            _bHasMounted: true,
            _options: oOptions
        })
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
  
        const COMPBENEFITS_OPTIONS = {
            fields: {
                effectivedate: {
                    template: customDatePickerTemplate,
                    label: 'EFFECTIVE DATE',
                    mode:'date',
                    config:{
                        format: (strDate) => oHelper.convertDateToString(strDate, 'MMMM DD, YYYY')
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
            benefittype: t.enums(this.state._options),
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
                    {
                        this.state._bHasMounted ?
                            <ScrollView>
                                <View style={styles.formContent}>
                                    <Form 
                                        ref='form_employeecompbenefits'
                                        type={EMPLOYEE_COMPBENEFITS}
                                        value={this.state._oCompBenefit}
                                        options={COMPBENEFITS_OPTIONS}
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