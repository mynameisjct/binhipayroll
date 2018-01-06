/**************************************************************
 *  FileName:           formLeaves.js
 *  Description:        Leaves Form
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
    TimePickerAndroid,
    Keyboard,
    ToastAndroid
} from 'react-native';
import moment from "moment";

import styles from './styles';
import SaveHeaderPrompt from '../../../components/SaveHeaderPrompt';
import {isStringEmptyOrSpace} from '../../../helper';
import MessageBox from '../../../components/MessageBox';

export default class FormLeaves extends Component{
    constructor(props){
        super(props);
        this.state = {
            //Component States
            _showForm: false,
            _disableSave: true,
            
            //Props
            _id: '',
            _name: '',
            _paiddays: '',

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
                _paiddays: ''+objData.paiddays,
            })
        }
    }

    _updateName = (value) => {
        this.setState({
            _name: value,
        },
            () => {
                this._evaluateSaveButton();
            }
        )
    }

    _updatePaidDays = (value) => {
        if(!isNaN(value)){
            this.setState({
                _paiddays: value,
            },
                () => {
                    this._evaluateSaveButton();
                }
            )
        }
        else{
            this._showToast('INPUT SHOULD BE A VALID NUMBER FORMAT')
        }
    }

    _evaluateSaveButton = () => {
        let bDisabled = true;
        
        if(this.props.data.name != this.state._name && 
            this.props.data.paiddays != this.state._paiddays &&
            !isStringEmptyOrSpace(this.state._name) && 
            !isStringEmptyOrSpace(this.state._paiddays)) {
                
            bDisabled = false;
        }

        this.setState({
            _disableSave: bDisabled
        })
    }

    _onCommit = () => {
        Keyboard.dismiss();
        let oData = {
            id: this.state._id,
            name: this.state._name,
            paiddays: this.state._paiddays
        }
        let oRes = this.props.onDone(oData);
        console.log('JSON.stringify(oRes): ' + JSON.stringify(oRes));
        if (oRes.flagno == 0){
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: oRes.message
            })
        }
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        })
    }

    _showToast = (value) => {
        ToastAndroid.show(value, ToastAndroid.SHORT);
    }

    render(){
        
        if (!this.props.show){
            return null;
        }
        else{
            console.log('===============RENDERING FormLeaves');
            console.log('id: ' + this.state._id);
            console.log('name: ' + this.state._name);
            console.log('paiddays:' + this.state._paiddays);

            return(
                <Modal 
                    animationType="fade"
                    transparent={true}
                    visible={this.props.show}
                    onRequestClose={() => {}}>
                    <View style={styles.container}>
                        <SaveHeaderPrompt 
                            title={this.props.title}
                            commitTitle='SAVE'
                            onFormClose={() => this.props.onFormClose()}
                            disableSave={this.state._disableSave}
                            onDone={() => {this._onCommit()}}/>
                        <View style={styles.formCont}>
                            <View style={styles.fieldCont}>
                                <Text style={styles.txtNameLabel}>NAME</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {this._updateName(inputTxt)}}
                                    value={this.state._name}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="done"
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />
                            </View>
                            <View style={styles.fieldCont}>
                                <Text style={styles.txtNameLabel}>NUMBER OF PAID DAYS</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {this._updatePaidDays(inputTxt)}}
                                    value={this.state._paiddays}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="done"
                                    keyboardType='numeric'
                                />
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