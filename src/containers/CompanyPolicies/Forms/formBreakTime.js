/**************************************************************
 *  FileName:           formBreakTime.js
 *  Description:        Break Time A/M/D
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-11

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    TouchableNativeFeedback,
    TimePickerAndroid
} from 'react-native';
import moment from "moment";

import styles from './styles';
import SaveHeaderPrompt from '../../../components/SaveHeaderPrompt';
import {isStringEmptyOrSpace} from '../../../helper';

export default class FormBreakTime extends Component{
    constructor(props){
        super(props);
        this.state = {
            _showForm: false,
            _disableSave: true,
            _id: '',
            _timestart: '00:00 AM',
            _timeend: '00:00 PM',
            _name: '',
        }
    }

    componentWillReceiveProps(nextProps){
        if(!this.props.show && (this.props.show!=nextProps.show)){
            let objData = {...nextProps.data}

            this.setState({
                _id: objData.id,
                _name: objData.name,
                _timestart: objData.timestart,
                _timeend: objData.timeend,
            })
        }
    }

    _showTimePicker = async(strType) => {
        let defaultTime = '';
        if(strType == 'TIMESTART'){
            defaultTime = 10
        }
        else{
            defaultTime = 12
        }

        try {
            const {action, hour, minute} =await TimePickerAndroid.open({
                hour: defaultTime,
                minute: 0,
                is24Hour: false,
                mode: 'spinner'
            });

            if (action !== TimePickerAndroid.dismissedAction) {
               this._setTime(strType, hour, minute);
            }
            
            } catch ({code, message}) {
                console.warn('Cannot open time picker', message);
            }
    }

    _setTime = (strType, hour, minute) => {
        let strTime = moment(hour +':' + minute, 'hh:mm').format('hh:mm A');

        if(strType.toUpperCase() == 'TIMESTART'){
            this.setState({
                _timestart: strTime
            })
        }
        else{
            this.setState({
                _timeend: strTime
            })
        }
    }
    
    _updateName = (value) => {
        let bDisabled = true;
        if(!isStringEmptyOrSpace(value)){
            bDisabled= false;
        }

        this.setState({
            _name: value,
            _disableSave: bDisabled
        })
    }

    render(){
        return(
            <Modal 
                animationType="fade"
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {alert("Modal has been closed.")}}>
                <View style={styles.container}>
                    <SaveHeaderPrompt 
                        title={this.props.title}
                        onFormClose={() => this.props.onFormClose()}
                        disableSave={this.state._disableSave}/>

                    <View style={styles.formCont}>
                        <View style={styles.fieldCont}>
                            <Text style={styles.txtNameLabel}>NAME</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {
                                    this._updateName(inputTxt)
                                }}
                                value={this.state._name}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="done"
                            />
                        </View>
                        
                        <TouchableNativeFeedback
                            onPress={() => {this._showTimePicker('TIMESTART')}}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.timeFieldCont}>
                                <Text style={styles.txtLabel}>START TIME</Text>
                                <Text style={styles.txtTime}>{this.state._timestart}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        
                        <TouchableNativeFeedback
                            onPress={() => {this._showTimePicker('TIMEEND')}}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.timeFieldCont}>
                                <Text style={styles.txtLabel}>END TIME</Text>
                                <Text style={styles.txtTime}>{this.state._timeend}</Text>
                            </View>
                        </TouchableNativeFeedback>

                    </View>
                </View>
            </Modal>

        );
    }
}