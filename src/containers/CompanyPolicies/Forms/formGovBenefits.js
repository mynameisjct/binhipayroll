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

//Styles
import styles from './styles';

//Custom Components
import SaveHeaderPrompt from '../../../components/SaveHeaderPrompt';
import {isStringEmptyOrSpace} from '../../../helper';
import MessageBox from '../../../components/MessageBox';
import * as PromptScreen from '../../../components/ScreenLoadStatus';

//Constants
const edit_loading_message = 'Saving changes on Company ID. Please wait...'

export default class FormGovBenefits extends Component{
    constructor(props){
        super(props);
        this.state = {
            //Component States
            _showForm: false,
            _disableSave: true,
            
            //Props
            _id: '',
            _name: '',
            _compid: '',

            //Messagebox
            _msgBoxType: '',
            _msgBoxShow: false,
            _resMsg: '',

            //Promt
            _promptShow: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(!this.props.show && (this.props.show!=nextProps.show)){
            let objData = {...nextProps.data}
            this.setState({
                _id: objData.id,
                _name: objData.name,
                _compid: ''+objData.compid,
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

    _updateCompanyID = (value) => {
        let strLastChar = value.slice(-1);
        if(this._validateCompanyID(value)){
            this.setState({
                _compid: value,
            },
                () => {
                    this._evaluateSaveButton();
                }
            )
        }
        else{
            this._showToast('INVALID INPUT. INPUT ONLY NUMBERS AND DASH (-).')
        }
    }

    _validateCompanyID = (value) => {
        let strLastChar = value.slice(-1);
        if(!isNaN(strLastChar) || strLastChar=='-'){
            return true;
        }
        else{
            return false;
        }
    }

    _evaluateSaveButton = () => {
        let bDisabled = true;
        
        if((this.props.data.name != this.state._name || 
            this.props.data.compid != this.state._compid) &&
            !isStringEmptyOrSpace(this.state._name) && 
            !isStringEmptyOrSpace(this.state._compid)) {
                
            bDisabled = false;
        }

        this.setState({
            _disableSave: bDisabled
        })
    }

    _onCommit = async() => {
        Keyboard.dismiss();
        this._showPrompt;
        let oData = {
            id: this.state._id,
            name: this.state._name,
            compid: this.state._compid
        }
        let oRes = await this.props.onDone(oData);
        if (oRes.flagno == 0){
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: oRes.message
            })
        }
    }

    _showPrompt = () =>{
        this.setState({
            _showPrompt: true
        })
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
            return(
                <Modal 
                    animationType="fade"
                    transparent={true}
                    visible={this.props.show}
                    onRequestClose={() => {}}>
                    <View style={styles.container}>
                        <PromptScreen.PromptGeneric 
                            show= {this.state._promptShow} 
                            title={edit_loading_message}/>
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
                                    editable={false}
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
                                <Text style={styles.txtNameLabel}>Company ID</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {this._updateCompanyID(inputTxt)}}
                                    value={this.state._compid}
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