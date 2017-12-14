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
import MessageBox from '../../../components/MessageBox';

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
            _duration: '',
            _timeDifference: '',

            //Messagebox
            _msgBoxType: '',
            _msgBoxShow: false,
            _resMsg: ''
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

    _verifyInput = () => {
/*         if(this.state._timeDifference <= 0){
            this.setState({
                _msgBoxType: 'error-ok',
                _msgBoxShow: true,
                _resMsg: 'Duration should be greater than 0min. Please modifiy Time Start or Time End.'
            })
        }
        else{
            this.props.onDone({
                id: this.state._id,
                name: this.state._name,
                timestart: this.state._timestart,
                timeend: this.state._timeend,
                duration: this.state._duration
            })
        } */
        this.props.onDone({
            id: this.state._id,
            name: this.state._name,
            timestart: this.state._timestart,
            timeend: this.state._timeend,
            duration: this.state._duration
        })
    }

    _calculateDifference = () => {
        let startTime=moment(this.state._timestart, "HH:mm a");
        let endTime=moment(this.state._timeend, "HH:mm a");
        let duration = moment.duration(endTime.diff(startTime));
        /* this.setState({
            _timeDifference: duration
        }) */
        let hours = parseInt(duration.asHours());
        let minutes = parseInt(duration.asMinutes())-hours*60;
        return (hours + 'hour '+ minutes+'min');
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        })
    }

    render(){
        if (!this.props.show){
            return null;
        }
        else{
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
                            disableSave={this.state._disableSave}
                            onDone = 
                                {
                                    () =>
                                    this._verifyInput()
                                }/>
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
                            <View style={styles.timeFieldCont}>
                                <Text style={styles.txtLabel}>DURATION</Text>
                                <Text style={styles.txtTime}>{this._calculateDifference()}</Text>
                            </View>

                        </View>

                        <MessageBox
                            promptType={this.state._msgBoxType}
                            show={this.state._msgBoxShow}
                            onClose={this._closeMsgBox}
                            onWarningContinue={this._continueActionOnWarning}
                            message={this.state._resMsg}
                        />
                        
                    </View>
                </Modal>
            );
        }
    }
}