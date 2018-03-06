import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import t from 'tcomb-form-native';
import moment from "moment";

//Styles
import styles from './styles';
import stylesheet from '../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../global/tcomb-custom-select-android';
import { customDatePickerTemplate } from '../../global/tcomb-custom-datepicker-android';

//Children Components
import FormModal from '../../components/FormModal';

//Helpers
import * as oHelper from '../../helper';

//Constants
const Form = t.form.Form;

export default class DTRTimeForm extends Component {
    constructor(props){
        super(props);
        let oOldTime = moment(String(this.props.data.date + 'T' + this.props.data.oldtime), 'YYYY-MM-DDThh:mm:ss A');
        this.state = {
            _bHasError: false,
            _oTimeInfo: {
                employeename: this.props.data.employeename,
                date: new Date(this.props.data.date),
                oldtime: new Date(oOldTime),
                newtime: null ,
                remarks: this.props.data.remarks || ''
            }
        }
    }

    _onChange = (value) => {
        console.log('value: ' + JSON.stringify(value));
    }

    _onCancel = () => {
        this.props.onCancel();
    }

    _onSubmit = () => {
        let oTimeForm = this.refs.dtrtime_form.getValue();
        if (oTimeForm) {
            this._confirmToSubmit(oTimeForm);
        }
    }

    _confirmToSubmit = (oTimeForm) => {
        Alert.alert(
            'Warning',
            'All changes will be saved and will be irreversible. ' + 
            'Are you sure you want to ' + this.props.title + ' from "' + 
            oHelper.convertDateToString(oTimeForm.oldtime, 'hh:mm:ss A') + '" to "' +
            oHelper.convertDateToString(oTimeForm.newtime, 'hh:mm:ss A') + '" on ' +
            this.props.data.date + ' ?',
            [
                {text: 'NO', onPress: () => {}},
                {text: 'YES', onPress: () => this.props.onOK(oTimeForm)}
            ],
            { cancelable: false }
        )
    }

    render(){
       /*  console.log('this.state._oTimeInfo: ' + JSON.stringify(this.state._oTimeInfo)) */
        /* console.log('this.props.data: ' + JSON.stringify(this.props.data));
        console.log('this.props.data.date_TYPE: ' + typeof(this.props.data.date));
        console.log('this.props.data.date: ' + this.props.data.date);
        console.log('this.props.data.time_TYPE: ' + + typeof(this.props.data.time));
        console.log('this.props.data.time: ' + this.props.data.time);
        console.log('this.props.data.remarks: ' + JSON.stringify(this.props.data.remarks)); */
        const modalStyles = styles.formModal;
        const OPTIONS = {
            fields: {
                employeename: {
                    label: 'EMPLOYEE NAME' ,
                    returnKeyType: 'done',
                    editable: false,
                    error: '*Something went wrong'
                },
                date: {
                    template: customDatePickerTemplate,
                    label: 'DATE',
                    mode:'date',
                    disabled: true,
                    config:{
                        format: (strDate) => oHelper.convertDateToString(strDate, 'YYYY-MM-DD')
                    },
                    error: '*Something went wrong'
                },
                oldtime: {
                    template: customDatePickerTemplate,
                    label: 'CURRENT TIME',
                    mode:'time',
                    disabled: true,
                    config:{
                        dialogMode:'spinner',
                        format: (strDate) => oHelper.convertDateToString(strDate, 'hh:mm:ss A')
                    },
                    error: '*Something went wrong'
                },
                newtime: {
                    template: customDatePickerTemplate,
                    label: 'NEW TIME',
                    mode:'time',
                    config:{
                        dialogMode:'spinner',
                        format: (strDate) => oHelper.convertDateToString(strDate.setSeconds(0), 'hh:mm:ss A')
                    },
                    error: '*Pick a new time'
                },
                remarks:{ 
                    label: 'REMARKS' ,
                    returnKeyType: 'done'
                }
            },
            stylesheet: stylesheet
        }
        
        const TIME_INFO = t.struct({
            employeename: t.String,
            date: t.Date,
            oldtime: t.Date,
            newtime: t.Date,
            remarks: t.maybe(t.String)
        });

        
        return(
            <FormModal 
                containerStyle={modalStyles.container}
                visible={this.props.visible}
                onCancel={this._onCancel}
                onOK={this._onSubmit}
                title={this.props.title}>
                <ScrollView>
                    <View style={modalStyles.contContent}>
                        <Form 
                            ref='dtrtime_form'
                            type={TIME_INFO} 
                            value={this.state._oTimeInfo}
                            options={OPTIONS}
                            onChange={this._onChange}/>
                    </View>
                </ScrollView>
            </FormModal>
        )
    }
}
