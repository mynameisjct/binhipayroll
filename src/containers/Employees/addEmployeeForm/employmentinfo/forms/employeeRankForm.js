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

export default class EmployeeRankForm extends Component{
    constructor(props){
        super(props);
        console.log('this.props.activeData: ' + JSON.stringify(this.props.activeData));
        this.state = {
            _oEmpRankForm: {
                rankid: this.props.activeData.rankid || '',
                effectivedate:  this.props.activeData.effectivedate.from.value ?  
                    new Date(this.props.activeData.effectivedate.from.value) : null,
                remarks: this.props.activeData.remarks || ''
            },
            _dateFormat: 'MMMM DD, YYYY'
        }
    }

    _onChange = (value) => {
    }

    _onCancel = () => {
        Keyboard.dismiss();
        this.props.cancelForm();
    }
    
    _onSubmit = () => {
        Keyboard.dismiss();
        let oEmpRankForm = this.refs.form_employeerank.getValue();
        if(oEmpRankForm){
            this.setState({
                _oEmpRankForm: {...oEmpRankForm}
            },
                () => {
                    this.props.submitForm(oEmpRankForm);
                }
            )
        }
    }

    render(){
        console.log('ranksTypes: ' + JSON.stringify(this.props.ranksTypes));
        const bDeletable = 
            this.props.activeData.rankid != '' && this.props.activeData.effectivedate.from.value!=null ?
                true
            :
                false
        
        const RANKTYPES = t.enums(this.props.ranksTypes);

        const EMPRANK_OPTIONS = {
            fields: {
                rankid:{ 
                    template: customPickerTemplate,
                    label: 'SELECT RANK',
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

        const EMPLOYEE_RANK = t.struct({
            rankid: RANKTYPES,
            effectivedate: t.Date,
            remarks: t.maybe(t.String)
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
                            ref='form_employeerank'
                            type={EMPLOYEE_RANK}
                            onChange={this._onChange}
                            value={this.state._oEmpRankForm}
                            options={EMPRANK_OPTIONS}
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