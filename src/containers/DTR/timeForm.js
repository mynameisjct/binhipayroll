import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
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
        this.state = {
            _bHasError: false,
            /* _oTimeInfo: {
                oldtime: null,
                newtime: null,
                remarks: ''
            } */
        }
    }

    _onCancel = () => {
        this.props.onCancel();
    }

    _onSubmit = () => {
        this.props.onOK();
    }

    render(){
        const modalStyles = styles.formModal;
        const OPTIONS = {
            fields: {
                oldtime: {
                    template: customDatePickerTemplate,
                    label: 'CURRENT TIME',
                    mode:'time',
                    config:{
                        dialogMode:'spinner',
                        format: (strDate) => oHelper.convertDateToString('YYYY-MM-DD', strDate)
                    },
                    error: '*Something went wrong. Refresh the app.'
                },
                newtime: {
                    template: customDatePickerTemplate,
                    label: 'NEW TIME',
                    mode:'time',
                    config:{
                        dialogMode:'spinner',
                        format: (strDate) => oHelper.convertDateToString('YYYY-MM-DD',strDate)
                    },
                    error: '*Something went wrong. Refresh the app.'
                },
                remarks:{ 
                    label: 'REMARKS' ,
                    returnKeyType: 'done'
                }
            },
            stylesheet: stylesheet
        }
        
        const TIME_INFO = t.struct({
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
                
                <View style={modalStyles.contContent}>
                    <Form 
                        ref='dtrtime_form'
                        type={TIME_INFO} 
                        value={this.state._oTimeInfo}
                        options={OPTIONS}/>
                </View>
            </FormModal>
        )
    }
}
